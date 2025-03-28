import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
    { month: "Jan", Expenses: 5000 },
    { month: "Feb", Expenses: 7000 },
    { month: "Mar", Expenses: 4500 },
    { month: "Apr", Expenses: 6000 },
    { month: "May", Expenses: 8000 },
    { month: "Jun", Expenses: 6500 },
];

const SpendingChart = () => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip cursor={{ fill: "transparent" }} /> {/* 👈 Removes highlight effect */}
                <Legend />
                <Bar dataKey="Expenses" fill="#015498" radius={[5, 5, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default SpendingChart;
