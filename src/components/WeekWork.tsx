import { useEffect, useState } from "react";
import { getWorkWeekNumber } from "../utils";
import { RootState } from "../store";
import { useSelector } from "react-redux";

function WeekWork() {
  const { lang } = useSelector((state: RootState) => state.lang);
  const [weekNumber, setWeekNumber] = useState<number>(0);

  useEffect(() => {
    const today = new Date();
    const week = getWorkWeekNumber(today);
    setWeekNumber(week);
  }, []);

  return (
    <div>
      <p>
        {" "}
        {lang == "en" && "Week"}
        {lang == "ru" && "Неделя"}: {weekNumber}
      </p>
    </div>
  );
}

export default WeekWork;
