import React from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip } from "recharts";
import "./barChartBox.scss";
import { useFetchUserAssets } from "../../hooks/useFetchUserAssets";

type Props = {
  title: string;
  color: string;
  dataKey: string;
  chartData: object[];
};
const BarChartBox = (props: Props) => {
  // const { data, isLoading } = useFetchUserAssets("/crypto-assets");
  // if (isLoading) return "loading";
  // console.log(data);
  // // const getUserCryptoAssets = async () => {
  //   const { user } = useAuth();
  //   if (!user) {
  //     throw new Error("User is not logged in");
  //   }

  //   try {
  //     const res = await axiosInstance.get("crypto-assets", {
  //       params: {
  //         "filters[users_permissions_users][id][$eq]": user.id,
  //       },
  //     });

  //     console.log("User's CryptoAssets:", res.data);
  //     return res.data; // Return the data for further use
  //   } catch (error) {
  //     console.error("Error fetching user's CryptoAssets:", error);
  //     throw error; // Handle errors appropriately in your application
  //   }
  // };
  // getUserCryptoAssets();

  return (
    <div className="barChartBox">
      <h1>{props.title}</h1>
      <div className="chart">
        <ResponsiveContainer width="99%" height="100%">
          <BarChart data={props.chartData}>
            <Tooltip
              contentStyle={{
                background: "#2a3447",
                borderRadius: "5px",
              }}
              labelStyle={{ display: "none" }}
              cursor={{ fill: "none" }}
            />
            <Bar dataKey={props.dataKey} fill={props.color} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChartBox;
