import React, { useState } from "react";

export default function useVisualMode(initial) {
  // const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  const transition = (mode, replace = false) => {
    if (!replace) {
      setHistory((prev) => [...prev, mode]);
    } else {
      setHistory((prev) => [...prev.slice(0, prev.length - 1), mode]);
    }
  };
  const back = () => {
    if (history.length > 1) {
      setHistory((prev) => [...prev.slice(0, prev.length - 1)]);
    }
  };
  return { transition, mode: history[history.length - 1], back };
}
