// scripts/buildVectorStore.js
require("dotenv").config();
const fs = require("fs");
const csv = require("csv-parser");
const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");
const { Chroma } = require("@langchain/community/vectorstores/chroma");
const { HuggingFaceInferenceEmbeddings } = require("@langchain/community/embeddings/hf");

const embeddings = new HuggingFaceInferenceEmbeddings({
  apiKey: process.env.HF_API_KEY,
  model: "sentence-transformers/paraphrase-MiniLM-L3-v2",

});

const createDoc = (content) => ({
  pageContent: content.trim(),
  metadata: {},
});

async function buildVectorStore() {
  const docs = [];

  return new Promise((resolve, reject) => {
    console.log("Entered",process.env.HF_API_KEY);
    fs.createReadStream("./src/data/venues.csv")
      .pipe(csv())
      .on("data", (row) => {
        const content = `
Name: ${row["Name"]}
Location: ${row["Location"]}
Rating: ${row["Rating"]}
Price: ${row["Price (Veg)"]}
Capacity: ${row["Capacity"]}
Rooms: ${row["Rooms"]}
More: ${row["More"]}
URL: ${row["URL"]}
Extra Info: ${row["Extra Info"]}
        `;
        docs.push(createDoc(content));
      })
      .on("end", async () => {
        const splitter = new RecursiveCharacterTextSplitter({
          chunkSize: 500,
          chunkOverlap: 50,
        });

        const splitDocs = docs;

        await Chroma.fromDocuments(splitDocs, embeddings, {
          collectionName: "venue-store",
          persistDirectory: "./chroma_db",
        });

        console.log("✅ Vector store built and saved!");
        resolve();
      })
      .on("error", reject);
  });
}

buildVectorStore();
