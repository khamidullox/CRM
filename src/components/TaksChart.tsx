import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ProcessedData } from "./interface";
import { calculateWorkWeekData, fetchTasks } from "./BaseChart";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import Loading from "./Loading";

function TaksChart() {
  const { lang } = useSelector((state: RootState) => state.lang);

  const [data, setData] = useState<ProcessedData[]>([]);
  const [weekCount, setWeekCount] = useState<number>(8);

  useEffect(() => {
    const loadTasks = async () => {
      const tasks = await fetchTasks();
      const processedData = calculateWorkWeekData(tasks.slice(0, 500));
      setData(processedData);
    };

    loadTasks();
  }, [lang]);

  const handleWeekCountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setWeekCount(Number(event.target.value));
  };

  const displayedData = data.slice(-weekCount);
  if (displayedData.length == 0) {
    return <Loading />;
  } else
    return (
      <div>
        <div className="my-10 flex gap-3">
          <label htmlFor="weekCount"> </label>
          {lang == "en" && "Number of weeks displayed:"}
          {lang == "ru" && "Количество отображаемых недель:"}
          <input
            type="number"
            id="weekCount"
            value={weekCount}
            onChange={handleWeekCountChange}
            min={1}
            max={data.length}
            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={displayedData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="profit" fill="#82ca9d" />
            <Bar dataKey="expenses" fill="#8884d8" />
            <Bar dataKey="difference" fill="#ff7300" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
}

export default TaksChart;
