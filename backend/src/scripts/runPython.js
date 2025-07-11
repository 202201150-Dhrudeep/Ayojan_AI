// backend/src/scripts/runPython.js
const { spawn } = require('child_process');
const path = require('path');

function runPythonScript(scriptName, args = []) {
  const scriptPath = path.resolve(__dirname, scriptName);

  return new Promise((resolve, reject) => {
    const process = spawn('python', [scriptPath, ...args]);

    let output = '';
    let error = '';

    process.stdout.on('data', (data) => {
      output += data.toString();
    });

    process.stderr.on('data', (data) => {
      error += data.toString();
    });

    process.on('close', (code) => {
      if (code === 0) {
        try {
          const parsed = JSON.parse(output);
          console.log("Python script output:", parsed);
          resolve(parsed);
        } catch (e) {
          reject("Failed to parse Python JSON: " + e.message);
        }
      } else {
        reject(`Error (code ${code}): ${error}`);
      }
    });
  });
}

module.exports = runPythonScript;
