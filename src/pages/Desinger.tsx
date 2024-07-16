import { DesingerIssues, DesingerItem } from "../components/interface";
import { customFetch } from "../utils";
///react icons
import { MdDoneOutline } from "react-icons/md";
import { TbProgressHelp } from "react-icons/tb";
import { PiCrownThin } from "react-icons/pi";
import { useEffect, useState } from "react";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";

function Desinger() {
  let [sortedDesigners, setSortedDesigners] = useState<DesingerItem[]>([]);
  const { lang } = useSelector((state: RootState) => state.lang);

  let [designers, setDesigners] = useState<{ results: [] }>();
  let [page, setPage] = useState<number>(2);
  useEffect(() => {
    const fetchDesigners = async () => {
      try {
        const designerReq = await customFetch(`/designer/?page=${page}`);
        const designerData = await designerReq.data;
        setDesigners(designerData);
      } catch (error) {
        console.error("Error fetching designers:", error);
      }
    };

    fetchDesigners();
  }, [page]);
  useEffect(() => {
    if (designers) {
      const processedDesigners = designers.results.map((des: DesingerItem) => {
        let counterDone = 0;
        let counterProgres = 0;

        des.issues.forEach((issue: DesingerIssues) => {
          if (issue.status === "Done") {
            counterDone++;
          } else {
            counterProgres++;
          }
        });

        return {
          ...des,
          counterDone,
          counterProgres,
        };
      });
      const sorted = processedDesigners.sort(
        (a, b) =>
          b.counterDone - a.counterDone || b.counterProgres - a.counterProgres
      );
      setSortedDesigners(sorted.slice(0, 20));
    }
  }, [designers]);

  if (!designers) {
    return <Loading />;
  }

  return (
    <>
      <div className=" lg:max-w-6xl md:mr-20 mt-6 lg:mt-6 flex items-center justify-end">
        <div className="  flex items-center justify-end gap-5">
          <button
            onClick={() => {
              if (page > 1) {
                setPage(page - 1);
              }
            }}
            className={` link link-primary ${page == 1 ? " opacity-50" : ""}`}
          >
            {lang == "en" && "Back"}
            {lang == "ru" && "Назад"}
          </button>
          <p className=" underline font-bold">{page}</p>
          <button
            onClick={() => {
              if (page < 16) {
                setPage(page + 1);
              }
            }}
            className="link link-primary"
          >
            {lang == "en" && "Next"}
            {lang == "ru" && "Следующий"}
          </button>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 grid-cols-1 justify-center w-full md:ml-20 gap-5 lg:ml-0 lg:gap-10 my-7">
        {sortedDesigners.map((des: DesingerItem, id: number) => {
          return (
            <div key={id} className="px-  ">
              <div className=" flex flex-col relative justify-between h-full max-h-82  max-w-xl rounded-xl px-10 py-8 shadow-lg hover:shadow-2xl transition duration-500">
                {id + 1 <= 10 && (
                  <span className=" absolute bg-yellow-400 p-2 left-7 rounded-full top-5">
                    <PiCrownThin />
                  </span>
                )}
                <div className="flex items-center space-x-4 ">
                  <figure className="">
                    <img
                      className=" rounded-full size-14"
                      src={des.avatar}
                      alt=""
                    />
                  </figure>
                  <div className="text-sm font-semibold ">
                    <h1 className=" capitalize">{des.username}</h1>
                    <h3 className=" opacity-50 ">{des.email}</h3>
                  </div>
                </div>
                <div className="grid grid-cols-2 row-span-5 p py-5 lg:gap-y-3 lg:gap-x-1 gap-y-2 gap-x-2 font-medium">
                  {des.issues.map((issue: DesingerIssues, id: number) => {
                    return (
                      <div key={id}>
                        {issue.status == "Done" && (
                          <div className=" flex items-center gap-2   ">
                            {id + 1}.<span className=" hidden"></span>
                            <p className="bg-green-500  text-black size-6 flex items-center justify-center text-center rounded-full">
                              <MdDoneOutline />
                            </p>
                            <p>
                              {lang == "en" && "Done"}
                              {lang == "ru" && "Сделанно"}
                            </p>
                          </div>
                        )}
                        {issue.status !== "Done" && (
                          <div className="flex items-center gap-2">
                            {id + 1}.
                            <p className="bg-warning text-black size-6  flex items-center justify-center text-center rounded-full">
                              <TbProgressHelp />
                            </p>
                            <p>
                              {" "}
                              {lang == "en" && "Progress"}
                              {lang == "ru" && "Процессе"}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="flex gap-10 mx-5 mt-3 py-2 px-5 font-bold items-center justify-center  text-xl md:border rounded-2xl">
                  {lang == "en" && "Overall"}
                  {lang == "ru" && "Общий"}
                  <p className="flex gap-2 text-lg font-bold items-center">
                    {des.counterDone}
                    <span className="bg-green-500  text-black size-6 flex items-center justify-center text-center rounded-full">
                      {" "}
                      <MdDoneOutline />
                    </span>
                  </p>
                  <p className="flex gap-2 text-lg font-bold items-center">
                    {des.counterProgres}
                    <span className="bg-warning  text-black size-6 flex items-center justify-center text-center rounded-full">
                      {" "}
                      <TbProgressHelp />
                    </span>{" "}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Desinger;
