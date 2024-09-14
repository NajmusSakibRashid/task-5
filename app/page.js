"use client";
import Image from "next/image";
import Navbar from "./components/navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import ShowJson from "./components/showjson";

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
      <div className="border-solid border-2 border-black grid grid-cols-[auto_auto_auto_auto_auto] m-8">
        <div className="border-2 border-solid border-black font-bold text-xl p-4 w-auto">
          Index
        </div>
        <div className="border-2 border-solid border-black font-bold text-xl p-4 w-auto">
          Random Identifier
        </div>
        <div className="border-2 border-solid border-black font-bold text-xl p-4 w-auto">
          Full Name
        </div>
        <div className="border-2 border-solid border-black font-bold text-xl p-4 w-auto">
          Address
        </div>
        <div className="border-2 border-solid border-black font-bold text-xl p-4 w-auto">
          Phone
        </div>
        {table.map((item, index) => (
          <>
            <div className="border-solid border-2 border-black p-4 w-auto">
              {index + 1}
            </div>
            <div className="border-solid border-2 border-black p-4 w-auto">
              {item.login.uuid}
            </div>
            <ShowJson>{item.name}</ShowJson>
            <ShowJson>{item.location}</ShowJson>
            <div className="border-solid border-2 border-black p-4 w-auto">
              {item.phone}
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
