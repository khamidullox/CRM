import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../store";
import { useState } from "react";
import { enLang, ruLang } from "../slices/langSlice";
import WeekWork from "./WeekWork";

function Navbar() {
  const { lang } = useSelector((state: RootState) => state.lang);
  let dispatch = useDispatch();
  let [theme, setTheme] = useState<string>("light");
  document.querySelector("html")?.setAttribute("data-theme", theme);
  return (
    <div className="navbar bg-base-100 aligen-content max-w-[1600px] justify-between items-center  shadow-lg rounded-xl">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link className="link link-successt hover:link-info" to="/">
                {lang == "en" && "Comments"}
                {lang == "ru" && "Комментарий"}
              </Link>
            </li>
            <li>
              <Link
                className="link link-successt hover:link-info"
                to="/desinger"
              >
                {lang == "en" && "Desingers"}
                {lang == "ru" && "Дизайнеры"}
              </Link>
            </li>
            <li>
              <Link className="link link-successt hover:link-info" to="/task">
                {lang == "en" && "Task"}
                {lang == "ru" && "Заданний"}
              </Link>
            </li>
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">
          CRM
        </Link>
      </div>
      <div className="navbar-cente hidden lg:flex">
        <ul className="navbar-cente flex items-center gap-10">
          <li>
            <Link className="link link-successt hover:link-info" to="/">
              {lang == "en" && "Comments"}
              {lang == "ru" && "Комментарий"}
            </Link>
          </li>
          <li>
            <Link className="link link-successt hover:link-info" to="/desinger">
              {lang == "en" && "Desingers"}
              {lang == "ru" && "Дизайнеры"}
            </Link>
          </li>
          <li>
            <Link className="link link-successt hover:link-info" to="/task">
              {lang == "en" && "Task"}
              {lang == "ru" && "Заданний"}
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex-non navbar-end w-[55%] ">
        <ul className="flex  gap-5 pr-5 items-center">
          <li>
            <WeekWork />
          </li>
          <li className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className=" uppercase  hover:text-info underline "
            >
              {lang}
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content  flex flex-col bg-base-100 rounded-box z-[1] md:w-52 w-40 p-2 shadow"
            >
              <li>
                <button
                  className={`${
                    lang == "en" ? "bg-info  hover:bg-info " : ""
                  } w-full text-start p-1 rounded-lg`}
                  onClick={() => dispatch(enLang())}
                >
                  English
                </button>
              </li>
              <li>
                <button
                  className={`${
                    lang == "ru" ? "bg-info  hover:bg-info " : ""
                  } w-full text-start p-1 rounded-lg`}
                  onClick={() => dispatch(ruLang())}
                >
                  Русский
                </button>
              </li>
            </ul>
          </li>
          <li>
            <label className="grid cursor-pointer place-items-center">
              <input
                onClick={() => {
                  theme == "light" && setTheme("synthwave");
                  theme == "synthwave" && setTheme("light");
                }}
                type="checkbox"
                value="synthwave"
                className="toggle theme-controller bg-base-content col-span-2 col-start-1 row-start-1"
              />
              <svg
                className="stroke-base-100 fill-base-100 col-start-1 row-start-1"
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
              </svg>
              <svg
                className="stroke-base-100 fill-base-100 col-start-2 row-start-1"
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            </label>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
