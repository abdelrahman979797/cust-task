
//Components

import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


export default function BarChartComponent({
  transactions,
  customerName,
  open,
  setOpen,
}) {
  if (!transactions) return null;

  const data = transactions.map((transaction) => {
    return { date: transaction.date, amount: transaction.amount };
  });

  return (
    <div className="">
      <div>
        <h5>
          {customerName}
        </h5>
        <ResponsiveContainer className="chart">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis dataKey="amount" />
            <Tooltip />
            <Bar
              dataKey="amount"
              fill="#40534C"
              barSize={50}
              activeBar={<Rectangle fill="#40534C" stroke="black" />}
              
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
