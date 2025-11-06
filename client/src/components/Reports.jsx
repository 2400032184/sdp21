import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts";
import "./Reports.css";

const Reports = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [ratingSummary, setRatingSummary] = useState([]);
  const [questionStats, setQuestionStats] = useState([]);

  // Modern aesthetic pastel palette
  const COLORS = ["#6CCECB", "#FF9AA2", "#FFD6A5", "#B5EAD7", "#CBAACB", "#FFDAC1"];

  useEffect(() => {
    const storedFeedbacks = JSON.parse(localStorage.getItem("userFeedbacks")) || [];
    setFeedbacks(storedFeedbacks.reverse());

    // Aggregate ratings for charts
    const summary = {};
    storedFeedbacks.forEach((fb) => {
      Object.entries(fb.ratings).forEach(([key, value]) => {
        if (!summary[key])
          summary[key] = { Excellent: 0, Good: 0, Average: 0, Poor: 0 };
        summary[key][value] += 1;
      });
    });

    const chartData = Object.entries(summary).map(([key, val]) => ({
      category: key,
      ...val,
    }));
    setRatingSummary(chartData);

    // Prepare per-question stats for mini pie charts
    const qStats = Object.entries(summary).map(([question, counts]) => {
      const totalResponses = Object.values(counts).reduce((a, b) => a + b, 0);
      const maxRating = Object.entries(counts).reduce((a, b) =>
        b[1] > a[1] ? b : a
      )[0];
      const stars = { Excellent: 5, Good: 4, Average: 3, Poor: 2 }[maxRating] || 0;
      const pieData = Object.entries(counts).map(([name, value]) => ({ name, value }));
      return { question, total: totalResponses, answer: maxRating, stars, pieData };
    });
    setQuestionStats(qStats);
  }, []);

  // Heatmap data (stacked bar style)
  const heatmapData = ratingSummary.map((item, i) => ({
    category: item.category,
    Excellent: item.Excellent,
    Good: item.Good,
    Average: item.Average,
    Poor: item.Poor,
    value: item.Excellent + item.Good + item.Average + item.Poor,
  }));

  // Scatter plot data
  const scatterData = ratingSummary.map((item, i) => ({
    x: i + 1,
    y: item.Excellent + item.Good + item.Average + item.Poor,
    z: item.Excellent,
  }));

  return (
    <>
      <div className="reports-page">
        <h1>User Feedback Reports</h1>
        <p>Total Feedbacks: {feedbacks.length}</p>

        {feedbacks.length > 0 ? (
          <>
            {/* Charts Section */}
            <div className="charts-container">
              {/* Bar Chart */}
              <div className="chart-card">
                <h2>Feedback Ratings - Bar Chart</h2>
                <BarChart width={500} height={300} data={ratingSummary}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Excellent" fill={COLORS[0]} />
                  <Bar dataKey="Good" fill={COLORS[1]} />
                  <Bar dataKey="Average" fill={COLORS[2]} />
                  <Bar dataKey="Poor" fill={COLORS[3]} />
                </BarChart>
              </div>

              {/* Pie Chart */}
              <div className="chart-card">
                <h2>Overall Feedback Distribution - Pie Chart</h2>
                <PieChart width={400} height={300}>
                  <Pie
                    data={[
                      {
                        name: "Excellent",
                        value: feedbacks.filter((fb) =>
                          Object.values(fb.ratings).includes("Excellent")
                        ).length,
                      },
                      {
                        name: "Good",
                        value: feedbacks.filter((fb) =>
                          Object.values(fb.ratings).includes("Good")
                        ).length,
                      },
                      {
                        name: "Average",
                        value: feedbacks.filter((fb) =>
                          Object.values(fb.ratings).includes("Average")
                        ).length,
                      },
                      {
                        name: "Poor",
                        value: feedbacks.filter((fb) =>
                          Object.values(fb.ratings).includes("Poor")
                        ).length,
                      },
                    ]}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {COLORS.map((color, index) => (
                      <Cell key={index} fill={color} />
                    ))}
                  </Pie>
                </PieChart>
              </div>

              {/* Line Chart */}
              <div className="chart-card">
                <h2>Feedback Trends - Line Chart</h2>
                <LineChart width={500} height={300} data={ratingSummary}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Excellent" stroke={COLORS[0]} />
                  <Line type="monotone" dataKey="Good" stroke={COLORS[1]} />
                  <Line type="monotone" dataKey="Average" stroke={COLORS[2]} />
                  <Line type="monotone" dataKey="Poor" stroke={COLORS[3]} />
                </LineChart>
              </div>

              {/* Heatmap Section */}
              <div className="chart-card">
                <h2>Heatmap - Ratings Distribution</h2>
                <BarChart width={500} height={300} data={heatmapData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  {["Excellent", "Good", "Average", "Poor"].map((key, i) => (
                    <Bar key={i} dataKey={key} fill={COLORS[i]} />
                  ))}
                </BarChart>
              </div>

              {/* Scatter Plot */}
              <div className="chart-card">
                <h2>Scatter Plot - Total Responses vs Question Index</h2>
                <ScatterChart width={500} height={300}>
                  <CartesianGrid />
                  <XAxis type="number" dataKey="x" name="Question Index" />
                  <YAxis type="number" dataKey="y" name="Total Responses" />
                  <ZAxis dataKey="z" range={[60, 400]} />
                  <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                  <Scatter data={scatterData} fill={COLORS[4]} />
                </ScatterChart>
              </div>
            </div>

            {/* Question Summary Section */}
            <div className="summary-section">
              <h2>Per-Question Feedback Summary</h2>
              {questionStats.map((item, idx) => (
                <div key={idx} className="summary-card">
                  <div className="summary-left">
                    <p>
                      <strong>Question:</strong> {item.question}
                    </p>
                    <p>
                      <strong>Most Common Answer:</strong> {item.answer}{" "}
                      <span className="stars">
                        {"★".repeat(item.stars)}
                        {"☆".repeat(5 - item.stars)}
                      </span>
                    </p>
                    <p>
                      <strong>Total Responses:</strong> {item.total}
                    </p>
                  </div>
                  <div className="summary-right">
                    <h4>Distribution:</h4>
                    <PieChart width={120} height={120}>
                      <Pie
                        data={item.pieData}
                        cx="50%"
                        cy="50%"
                        outerRadius={50}
                        label
                      >
                        {item.pieData.map((entry, index) => (
                          <Cell key={index} fill={COLORS[index]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </div>
                </div>
              ))}
            </div>

            {/* Suggestions Section */}
            <div className="suggestions-section">
              <h2>User Suggestions & Comments</h2>
              {feedbacks.map((fb, idx) => (
                <div key={idx} className="suggestion-card">
                  <p>
                    <strong>{fb.fullName}</strong> ({fb.date}, {fb.location})
                  </p>
                  <p>{fb.comments}</p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p>No feedbacks to display.</p>
        )}
      </div>
    </>
  );
};

export default Reports;
