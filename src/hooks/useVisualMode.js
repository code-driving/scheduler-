import React, { useState } from "react";

//function with the help of other student. 
  
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  const transition = (mode, replace = false) => {
    if (!replace) {
      setHistory((prev) => [...prev, mode]); //push()
    } else {
      setHistory((prev) => [...prev.slice(0, history.length - 1), mode]);
    }
  };
  const back = () => {
    if (history.length > 1) {
      setHistory((prev) => [...prev.slice(0, history.length - 1)]); //pop()
    }
  };
  return { transition, mode: history[history.length - 1], back };
}




