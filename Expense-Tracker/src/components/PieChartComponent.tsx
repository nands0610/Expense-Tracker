import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
    { category: "Food", value: 5000 },
    { category: "Rent", value: 12000 },
    { category: "Transport", value: 3000 },
    { category: "Entertainment", value: 2000 },
    { category: "Shopping", value: 4000 },
];

const COLORS = ["#ff6b6b", "#4cafff", "#ffcc29", "#34c759", "#9b59b6"]; // Vibrant colors

const PieChartComponent = () => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie 
                    data={data} 
                    cx="50%" 
                    cy="50%" 
                    outerRadius={100} 
                    fill="#015498"
                    dataKey="value"
                    nameKey="category" // 👈 This tells Recharts to use 'category' for legend labels
                    label
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default PieChartComponent;
