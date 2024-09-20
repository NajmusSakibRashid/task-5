"use client";
import Image from "next/image";
import Navbar from "./components/navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import modifyObject from "./utils/error";
import { ClipLoader } from "react-spinners";

let lastCalled = 0;
let page = 0;

export default function Home() {
  const [state, setState] = useState({
    region: "es",
    error: 0,
    seed: "",
  });
  // const [page, setPage] = useState(0);
  const [table, setTable] = useState([]);
  const [loading, setLoading] = useState(false);
  const [getMore, setGetMore] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      // Calculate if we are at the bottom of the page
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;

      // Check if the user has scrolled to the bottom
      if (scrollTop + windowHeight >= scrollHeight - 1) {
        setGetMore((prev) => prev + 1);
      }
    };

    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const getData = async (append) => {
    const now = Date.now();
    if (now - lastCalled < 250) {
      // console.log("Too fast");
      return;
    }
    lastCalled = now;
    setLoading(true);
    let { data } = await axios.get(
      `/api?page=${page}&nat=${state.region}&seed=${state.seed}`
    );
    page++;
    setLoading(false);
    // console.log(data);
    data = data.map((obj) =>
      modifyObject(obj, Math.min(50, state.error || 0), state.region)
    );
    if (append) {
      setTable([...table, ...data]);
    } else {
      setTable(data);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    page = 0;
    getData(false);
  }, [state]);
  useEffect(() => {
    if (getMore > 1) getData(true);
  }, [getMore]);
  return (
    <div>
      {loading && (
        <div className="fixed inset-0 flex justify-center items-center bg-black opacity-30 z-10">
          <ClipLoader color="white" size={150} />
        </div>
      )}
      <Navbar state={state} setState={setState} loading={loading} />
      <div className="grid grid-cols-[auto_auto_auto_auto_auto] p-8 min-w-[100vw]">
        <div className="font-bold text-xl p-4 w-auto bg-white m-[1px]">
          Index
        </div>
        <div className="font-bold text-xl p-4 w-auto bg-white m-[1px]">
          Random Identifier
        </div>
        <div className="font-bold text-xl p-4 w-auto bg-white m-[1px]">
          Full Name
        </div>
        <div className="font-bold text-xl p-4 w-auto bg-white m-[1px]">
          Address
        </div>
        <div className="font-bold text-xl p-4 w-auto bg-white m-[1px]">
          Phone
        </div>
        {table.map((item, index) => (
          <>
            <div className={`text-gray-500 p-4 w-auto bg-white m-[1px]`}>
              {index + 1}
            </div>
            <div className={`text-gray-500 p-4 w-auto bg-white m-[1px]`}>
              {item.login.uuid}
            </div>
            <div className={`text-gray-500 p-4 w-auto bg-white m-[1px]`}>
              {item.name}
            </div>
            <div className={`text-gray-500 p-4 w-auto bg-white m-[1px]`}>
              {item.location.street.name +
                ", " +
                item.location.city +
                ", " +
                item.location.state}
            </div>
            <div className={`text-gray-500 p-4 w-auto bg-white m-[1px]`}>
              {item.phone}
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
