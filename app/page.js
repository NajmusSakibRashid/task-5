"use client";
import Image from "next/image";
import Navbar from "./components/navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import ShowJson from "./components/showjson";
import modifyObject from "./utils/error";

let lastCalled = 0;

export default function Home() {
  const [state, setState] = useState({
    region: "es,fr,ir",
    error: 0,
    seed: "",
  });
  const [page, setPage] = useState(1);
  const [table, setTable] = useState([]);
  useEffect(() => {
    const handleScroll = () => {
      // Calculate if we are at the bottom of the page
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;

      // Check if the user has scrolled to the bottom
      if (scrollTop + windowHeight >= scrollHeight - 1) {
        setPage((page) => page + 1);
      }
    };

    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const getData = async (results, append) => {
    const now = Date.now();
    if (now - lastCalled < 500) {
      console.log("Too fast");
      return;
    }
    lastCalled = now;
    setPage(1);
    const { data } = await axios.get(
      `https://randomuser.me/api/?inc=login,name,phone,location&results=${results}&page=${page}&nat=${state.region}&seed=${state.seed}`
    );
    // console.log(data.results);
    data.results = data.results.map((obj) =>
      modifyObject(obj, Math.min(50, state.error))
    );
    if (append) {
      setTable([...table, ...data.results]);
    } else {
      setTable(data.results);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    getData(20, false);
  }, [state]);
  useEffect(() => {
    if (page > 1) getData(10, true);
  }, [page]);
  return (
    <div>
      <Navbar state={state} setState={setState} />
      <div className=" border-2 border-white grid grid-cols-[auto_auto_auto_auto_auto] p-8 min-w-full">
        <div className="border-2  border-white font-bold text-xl p-4 w-auto bg-blue-300">
          Index
        </div>
        <div className="border-2  border-white font-bold text-xl p-4 w-auto bg-blue-300">
          Random Identifier
        </div>
        <div className="border-2  border-white font-bold text-xl p-4 w-auto bg-blue-300">
          Full Name
        </div>
        <div className="border-2  border-white font-bold text-xl p-4 w-auto bg-blue-300">
          Address
        </div>
        <div className="border-2  border-white font-bold text-xl p-4 w-auto bg-blue-300">
          Phone
        </div>
        {table.map((item, index) => (
          <>
            <div
              className={`hover:bg-blue-600 hover:text-white border-2 border-white p-4 w-auto ${
                index % 2 == 0 ? "bg-blue-200" : "bg-blue-400"
              }`}
            >
              {index + 1}
            </div>
            <div
              className={`hover:bg-blue-600 hover:text-white border-2 border-white p-4 w-auto ${
                index % 2 == 0 ? "bg-blue-200" : "bg-blue-400"
              }`}
            >
              {item.login.uuid}
            </div>
            <ShowJson key={index} index={index} nested={false}>
              {item.name}
            </ShowJson>
            <ShowJson key={index} index={index} nested={false}>
              {item.location}
            </ShowJson>
            <div
              className={`hover:bg-blue-600 hover:text-white border-2 border-white p-4 w-auto ${
                index % 2 == 0 ? "bg-blue-200" : "bg-blue-400"
              }`}
            >
              {item.phone}
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
