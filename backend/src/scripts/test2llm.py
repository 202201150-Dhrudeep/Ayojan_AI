# backend/src/scripts/test2llm.py

import sys
import os
import io
import json
from dotenv import load_dotenv, find_dotenv
from pathlib import Path

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_openai import ChatOpenAI
from langchain_core.prompts import PromptTemplate
from langchain.chains import RetrievalQA
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS

# Load environment variables
load_dotenv(find_dotenv())
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
# Step 1: Get question from CLI arguments
if len(sys.argv) < 2:
    print(json.dumps({ "error": "No question provided." }))
    sys.exit(1)

user_query = " ".join(sys.argv[1:])

# Step 2: Define absolute path to vectorstore
BASE_DIR = Path(__file__).resolve().parent
DB_FAISS_PATH = (BASE_DIR / "vectorstore/db_faiss").resolve()
# print(DB_FAISS_PATH)
# Step 3: Load LLM
def load_llm():
    return ChatOpenAI(
        base_url="https://api.groq.com/openai/v1",
        api_key=os.getenv("GROQ_API_KEY"),
        model="llama3-8b-8192",  # or llama3-8b-8192 / gemma-7b-it
        temperature=0.7
    )

# Step 4: Custom prompt
CUSTOM_PROMPT_TEMPLATE = """
You are an expert event venue assistant. Your primary task is to extract and present venue information strictly from the provided 'Context'.

Context:
{context}

Question: {question}

Instructions:
1.  **Relevance Check:** If the user's question is entirely unrelated to event venues or the provided 'Context', respond with "I don't know.".
2.  **Venue Selection & Prioritization:**
    * Prioritize these venues based on the following criteria, in descending order of importance:
        * **Rating:** Higher rating is preferred.
        * **Capacity:** Venues closer to the requested capacity (if specified in the question) are preferred; otherwise, larger capacity is generally better.
        * **Price (Veg):** Lower price is generally preferred, if within a budget implied by the question.
    * Select the **top 15** prioritized venues.
3.  **Information Extraction & Missing Data:** For each selected venue, extract the specified details externally lile google maps **
    * If a piece of information (like "Contact number" or "details") is **not explicitly present** in the 'Context' for a venue, use "N/A" for that field's value.
    * For "details", provide a concise summary of any relevant 'Extra Info' or general details available in the context for that venue, or "N/A" if nothing suitable.
4.  **Output Format:** Your response MUST be a valid JSON array of objects. Do not include any additional text, explanations, or conversational phrases outside the JSON.
    * If the relevance check (Instruction 1) leads to "I don't know.", return *only* that phrase, not JSON.
remember:  just answer in json format.  dont even write that here is the reponse or anything just handover the json format without square brackets even.
Example JSON Format:
```json
[
  {{
    "Name": "Venue 1",
    "Location": "City",
    "Rating": "4.5",
    "Price (Veg)": "₹1200",
    "Capacity": "300",
    "Rooms": "Yes",
    "More": "Outdoor, AC Hall",
    "URL": "https://...",
    "Extra Info": "Some info",
    "Contact number": "1234567890",
    "details": "Located near city center, excellent for large gatherings."
  }},
  
]
"""


def set_custom_prompt(template):
    return PromptTemplate(template=template, input_variables=["context", "question"])

# Step 5: Load FAISS
embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
db = FAISS.load_local(DB_FAISS_PATH, embedding_model, allow_dangerous_deserialization=True)

# Step 6: Build the chain
qa_chain = RetrievalQA.from_chain_type(
    llm=load_llm(),
    chain_type="stuff",
    retriever=db.as_retriever(search_kwargs={"k": 20}),
    return_source_documents=True,
    chain_type_kwargs={"prompt": set_custom_prompt(CUSTOM_PROMPT_TEMPLATE)}
)

# Step 7: Run the query
response = qa_chain.invoke({ "query": user_query })

# Step 8: Build structured JSON output
result = {
    "answer": response["result"],
    "sources": [doc.page_content for doc in response["source_documents"]]
}

# Step 9: Output JSON to stdout
print(json.dumps(result, ensure_ascii=False))
