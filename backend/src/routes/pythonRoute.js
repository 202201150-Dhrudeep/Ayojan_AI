const express = require('express');
const router = express.Router();
const runPythonScript = require('../scripts/runPython');

// POST /api/python/ask
router.post('/venue', async (req, res) => {
  const { question } = req.body;
  console.log("Received question:", question);

  if (!question) {
    return res.status(400).json({ success: false, error: "Missing 'question' in request body." });
  }

  try {
    const result = await runPythonScript('test2llm.py', [question]);
    res.json({ success: true, answer: result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.toString() });
  }
});

module.exports = router;
