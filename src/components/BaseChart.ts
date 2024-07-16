import { customFetch, getWorkWeekNumber } from "../utils";
import { ProcessedData, Task } from "./interface";

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await customFetch("/issue/");
  return response.data;
};
export const calculateWorkWeekData = (tasks: Task[]): ProcessedData[] => {
  const weekData: { [key: number]: { profit: number; expenses: number } } = {};

  tasks.forEach((task) => {
    if (task.status === "Done" && task.date_finished) {
      const week = getWorkWeekNumber(new Date(task.date_finished));
      if (!weekData[week]) {
        weekData[week] = { profit: 0, expenses: 0 };
      }
      weekData[week].profit += task.received_from_client;
      weekData[week].expenses +=
        task.send_to_project_manager +
        task.send_to_account_manager +
        task.send_to_designer;
    }
  });

  return Object.keys(weekData)
    .map((week) => ({
      week: Number(week),
      profit: weekData[+week].profit,
      expenses: weekData[+week].expenses,
      difference: weekData[+week].profit - weekData[+week].expenses,
    }))
    .sort((a, b) => a.week - b.week);
};
