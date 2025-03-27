import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "./TrendGraph.css";

const data = [
    { month: "Jan", actual: 5000, predicted: 5500, savings: 1500 },
    { month: "Feb", actual: 4800, predicted: 5300, savings: 1700 },
    { month: "Mar", actual: 5100, predicted: 5600, savings: 1800 },
    { month: "Apr", actual: 5200, predicted: 5700, savings: 1900 },
    { month: "May", actual: 9000, predicted: 5500, savings: 1600 },
    { month: "Jun", actual: 5300, predicted: 5800, savings: 2000 },
    { month: "Jul", actual: 5400, predicted: 5900, savings: 2100 },
    { month: "Aug", actual: 5500, predicted: 6000, savings: 2200 },
    { month: "Sep", actual: 5600, predicted: 6100, savings: 2300 },
    { month: "Oct", actual: 5700, predicted: 6200, savings: 2400 },
    { month: "Nov", actual: 5800, predicted: 6300, savings: 2500 },
    { month: "Dec", actual: 5900, predicted: 6400, savings: 2600 },
];

// Custom Tooltip to show month name + values
const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip">
                <p className="tooltip-month">{label}</p>
                <p className="tooltip-text">💰 Actual: ₹{payload[0].value}</p>
                <p className="tooltip-text">📈 Predicted: ₹{payload[1].value}</p>
                <p className="tooltip-text">💾 Savings: ₹{payload[2].value}</p>
            </div>
        );
    }
    return null;
};

const TrendGraph: React.FC = () => {
    return (
        <div className="trend-graph-container">
            <div className="trend-graph-card">
                <ResponsiveContainer width="100%" height={320}>
                    <LineChart data={data} margin={{ top: 20, right: 30, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
                        <XAxis dataKey="month" tick={{ fill: "white" }} />
                        <YAxis tick={{ fill: "white" }} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend wrapperStyle={{ color: "white" }} />

                        {/* Actual Expenses Line */}
                        <Line type="linear" dataKey="actual" stroke="#541388" strokeWidth={3} dot={{ r: 5, fill: "#541388" }} name="Actual Expenses" />

                        {/* Predicted Expenses Line (Dotted) */}
                        <Line type="linear" dataKey="predicted" stroke="#D90368" strokeWidth={3} strokeDasharray="5 5" dot={{ r: 5, fill: "#D90368" }} name="Predicted Expenses" />

                        {/* Savings Line */}
                        <Line type="linear" dataKey="savings" stroke="#A3C4BC" strokeWidth={3} dot={{ r: 5, fill: "#A3C4BC" }} name="Savings" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default TrendGraph;
