const dotenv = require("dotenv");
dotenv.config();
const { HfInference } = require('@huggingface/inference');

const hf = new HfInference(process.env.HF_API_KEY);

(async () => {
  try {
    // console.log(process.env)
    // console.log("h: ",process.env.HF_API_KEY);
    const result = await hf.featureExtraction({
      model: 'sentence-transformers/all-MiniLM-L6-v2',  // 👈 this one works better here
      inputs: 'This is a test sentence',
    });

    console.log("Embedding length:", result.length);
    console.log("Embedding sample:", result.slice(0, 5)); // Preview first 5 dims
  } catch (err) {
    console.error("❌ Hugging Face error:", err.message);
  }
})();
