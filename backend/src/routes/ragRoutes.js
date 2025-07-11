// backend/routes/ragRoute.js
const express =require("express");
const { runVenueQuery } =require("../rag/query.js");

const router = express.Router();

router.post("/venue", async (req, res) => {
  try {
    const { question } = req.body;
    const answer = await runVenueQuery(question);
    res.json({ answer });
  } catch (err) {
    console.error("RAG Error:", err);
    res.status(500).json({ error: "RAG query failed" });
  }
});

module.exports = router;
