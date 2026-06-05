import "./NarBar.css";
import Start from "../page/StartForm";

import { useEffect, useState } from "react";

const NavBar = () => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {show && <Start />}
      <nav className="container">
        <div className="contain">
          <button className="start" onClick={() => setShow((prev) => !prev)}>
            start
          </button>

          <div className="time">
            <div>{date.toLocaleTimeString()}</div>
            <div> {date.toLocaleDateString()}</div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
