const { getVectorStore } = require("./cvLoader");

async function runVenueQuery(question) {
  const vectorStore = await getVectorStore();
  const results = await vectorStore.similaritySearch(question, 3);
  console.log("🔍 Query:", question);
  console.log("🔎 Top match:", results[0]?.pageContent);
  return results.map((doc) => doc.pageContent).join("\n\n");
}

module.exports = { runVenueQuery };
