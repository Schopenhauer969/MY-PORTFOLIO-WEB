import "./NarBar.css";

import { useEffect, useState } from "react";

const NavBar = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <nav className="container">
        <div className="contain">
          <button className="start">start</button>

          <div className="time">
            {date.toLocaleTimeString()} {date.toLocaleDateString()}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
