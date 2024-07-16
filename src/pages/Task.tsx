import TaksChart from "../components/TaksChart";
import { customFetch } from "../utils";

export let loader = async () => {
  let issueReq = await customFetch(`/issue/`);
  let issue = await issueReq.data;
  return { issue };
};

function Task() {
  return (
    <div className="mt-10">
      <TaksChart />
      {/* <div>
        <p>
          <span></span>
          {lang == "en" && "Profit"}
          {lang == "ru" && "Прибыль"}
        </p>
        <p>
          <span></span>
          {lang == "en" && "Expenses"}
          {lang == "ru" && "Затраты"}
        </p>
        <p>
          <span>
            {lang == "en" && "Difference"}
            {lang == "ru" && "Разница"}
          </span>
        </p>
      </div> */}
    </div>
  );
}

export default Task;
