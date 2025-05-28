import { useState } from "react";
import axios from "axios";
import './index.css';

export default function App() {
  const [transcript, setTranscript] = useState("");
  const [task, setTask] = useState("summary");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    setOutput("");
    try {
      const res = await axios.post("http://localhost:8000/analyze", {
        transcript,
        task,
      });
      setOutput(res.data.output);
    } catch (err) {
      setOutput("Error: " + (err?.response?.data?.detail || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>Smart Notes</h1>

      <div className="content">
        <textarea
          className="transcript-input"
          placeholder="Paste your meeting transcript here..."
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
        />

        <select
          className="task-select"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        >
          <option value="summary">📋 Summary</option>
          <option value="sentiment">💬 Sentiment Analysis</option>
          <option value="action_items">✅ Action Items</option>
        </select>

        <button
          className="analyze-button"
          onClick={handleAnalyze}
          disabled={loading}
        >
          {loading ? "Analyzing..." : "🔍 Analyze"}
        </button>

        {output && (
          <div className="output-box">
            <h2>Result:</h2>
            <p>{output}</p>
          </div>
        )}
      </div>
    </div>
  );
}
