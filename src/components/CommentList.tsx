import { useLoaderData } from "react-router-dom";
import { CommentItem, LoaderHome } from "./interface";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import { formatDistanceToNow, parseISO } from "date-fns";
import Loading from "./Loading";
function CommentList() {
  let { comment } = useLoaderData() as LoaderHome;
  const { lang } = useSelector((state: RootState) => state.lang);
  let [more, setMore] = useState<number[]>([0.1, 3]);

  let newData = comment.map((item: CommentItem) => {
    return formatDistanceToNow(parseISO(item.date_created), {
      addSuffix: true,
    });
  });

  let newComment = comment.map((com: CommentItem, id: number) => {
    return { ...com, newDate: newData[id] };
  });
  if (!comment) {
    return <Loading />;
  }
  return (
    <div className="grid lg:grid-cols-2 gap-10 grid-cols-1 my-10 ">
      {newComment.reverse().map((com: CommentItem, id: number) => {
        return (
          id < 10 && (
            <div key={id} className="  ">
              <div className="   max-w-xl rounded-xl md:px-10 md:py-8 px-5 py-2 md:ml-16 lg:m-0 shadow-lg hover:shadow-2xl transition duration-500">
                <div className="mt-4">
                  <h1 className="text-lg  font-semibold hover:underline cursor-pointer">
                    {lang == "en" && `Issue: ${com.issue}`}
                    {lang == "ru" && `Вопрос: ${com.issue}`}
                  </h1>

                  <p
                    className={`mt-4 text-md   ${
                      more[0] == com.id ? "line-clamp-100  " : "line-clamp-3  "
                    }`}
                  >
                    {com.message}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="mt-4 flex items-center space-x-4 py-6">
                      <div className="">
                        {" "}
                        <img
                          className=" rounded-full size-14"
                          src={com.designer.avatar}
                          alt=""
                        />
                      </div>
                      <div className="text-sm font-semibold capitalize">
                        {com.designer.username} •{" "}
                        <span className="font-normal"> {com.newDate}</span>
                      </div>
                    </div>
                    <div
                      onClick={() => {
                        if (more[0] == 0.1) {
                          setMore([com.id, 100]);
                        } else {
                          setMore([0.1, 3]);
                        }
                        // if (more[0] == com.id) {
                        //   setMore([com.id, 100]);
                        // }
                      }}
                      className="p-2 rounded-full   flex items-center justify-center text-2xl mt-4 shadow-lg cursor-pointer"
                    >
                      <IoIosArrowDown />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        );
      })}
    </div>
  );
}

export default CommentList;
