const { Chroma } = require("@langchain/community/vectorstores/chroma");
const { HuggingFaceInferenceEmbeddings } = require("@langchain/community/embeddings/hf");

const embeddings = new HuggingFaceInferenceEmbeddings({
  apiKey: process.env.HUGGINGFACEHUB_API_KEY,
  model: "sentence-transformers/all-MiniLM-L6-v2",
});

async function getVectorStore() {
  console.log("📦 Loading vector store...");
  const store = await Chroma.fromExistingCollection(embeddings, {
    collectionName: "venue-store",
    persistDirectory: "./chroma_db",
  });
  console.log("✅ Vector store loaded!");
  return store;
}


module.exports = { getVectorStore };
