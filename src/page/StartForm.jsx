import { useEffect, useRef, useState } from "react";
import Book from "../assets/bb.png";
import ThisPcForm from "../page/ThisPcForm";
import CalPic from "../assets/cal.png";
import AppWindow from "../page/Calculator"; // 👈 your calculator component

export default function Start() {
  const [showStart, setShowStart] = useState(true);
  const [activeApp, setActiveApp] = useState(null);

  const menuRef = useRef(null);

  const data = [
    {
      id: 1,
      image: Book,
      text: "Think Board",
      app: "thinkboard",
      des: "Keep your note here",
    },
    {
      id: 2,
      image: CalPic,
      text: "Calculator",
      app: "calculator",
      des: "Calculator here",
    },
  ];

  // CLICK OUTSIDE CLOSE START MENU
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowStart(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* START MENU */}
      {showStart && (
        <div
          ref={menuRef}
          style={{
            width: "300px",
            height: "450px",
            bottom: "50px",
            left: 0,
            background: "white",
            borderRadius: "5px 5px 0px 0px",
            position: "fixed",
            zIndex: 9999,
            overflow: "auto",
            borderTop: "1px solid gray",
            borderRight: "1px solid gray",
          }}
        >
          <div className="start-container">
            <div className="contain2">
              <p className="rotate">Explore The World!!!</p>
            </div>

            <div className="contain1">
              {data.map((d) => (
                <div
                  key={d.id}
                  className="manu"
                  onDoubleClick={() => setActiveApp(d.app)}
                >
                  <img src={d.image} width={60} height={60} />
                  <div>
                    <div className="manu-text">{d.text}</div>
                    <div className="manu-des">{d.des}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* THINK BOARD WINDOW */}
      {activeApp === "thinkboard" && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 999999,
          }}
        >
          <ThisPcForm onClose={() => setActiveApp(null)} />
        </div>
      )}

      {/* CALCULATOR WINDOW */}
      {activeApp === "calculator" && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 999999,
          }}
        >
          <AppWindow onClose={() => setActiveApp(null)} />
        </div>
      )}
    </>
  );
}
