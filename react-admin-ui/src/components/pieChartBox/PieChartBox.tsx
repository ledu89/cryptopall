import React from "react";
import "./pieChartBox.scss";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { formatPrice } from "../../helpers/formatPrice";
const data = [
  { name: "Mobile", value: 400, color: "#0088FE" },
  { name: "Desktop", value: 300, color: "#00C49F" },
  { name: "Laptop", value: 300, color: "#FFBB28" },
  { name: "Tablet", value: 200, color: "#FF8042" },
];

const PieChartBox = ({ sortedAssets }) => {
  return (
    <div className="pieChartBox">
      <h1>Pie chart of top crypto</h1>
      <div className="chart">
        {!sortedAssets.length ? (
          "Buy some coin"
        ) : (
          <ResponsiveContainer width="99%" height={300}>
            <PieChart>
              <Tooltip
                contentStyle={{ background: "white", borderRadius: "5px" }}
              />
              <Pie
                data={sortedAssets}
                innerRadius={"70%"}
                outerRadius={"90%"}
                paddingAngle={5}
                dataKey="totalAmount"
              >
                {sortedAssets.map((item) => (
                  <Cell key={item.name} fill={item.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
      <div className="options">
        {sortedAssets.map((item) => (
          <div className="option" key={item.name}>
            <div className="title">
              <div
                className="dot"
                style={{ backgroundColor: item.color }}
              ></div>
              <span>{item.name}</span>
            </div>
            <div className="number">{formatPrice(item.totalAmount)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChartBox;
