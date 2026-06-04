import Window from "./Window";
import Book from "../assets/bb.png";
import L from "../assets/L.png";
import { useState } from "react";
import ThisPcForm from "../page/ThisPcForm";

const WIndowParent = () => {
  const [showWindow, setShowWindow] = useState(false);
  const [showWindow1, setShowWindow1] = useState(false);
  const data = [
    {
      id: 1,
      image: Book,
      text: "Think Board",
      x: 0,
      y: 0,
      link: "",
      onDoubleClick: () => {
        setShowWindow(true);
      },
    },
    {
      id: 2,
      image: L,
      text: "ThisPc",
      link: "https://www.remove.bg/",
      x: 0,
      y: 130,
      onDoubleClick: () => {
        setShowWindow1(true);
      },
    },
    {
      id: 3,
      image: L,
      text: "ThisPc",
      link: "https://www.remove.bg/",
      x: 0,
      y: 260,
    },
    {
      id: 4,
      image: L,
      text: "ThisPc",
      link: "https://www.remove.bg/",
      x: 0,
      y: 390,
    },
    {
      id: 5,
      image: L,
      text: "ThisPc",
      link: "https://www.remove.bg/",
      x: 0,
      y: 520,
    },
    {
      id: 6,
      image: L,
      text: "ThisPc",
      link: "https://www.remove.bg/",
      x: 0,
      y: 650,
    },
    {
      id: 7,
      image: L,
      text: "ThisPc",
      link: "https://www.remove.bg/",
      x: 100,
      y: 5,
    },
  ];
  return (
    <div>
      {data.map((d) => {
        return (
          <Window
            image={d.image}
            text={d.text}
            key={d.id}
            x={d.x}
            y={d.y}
            link={d.link}
            onDoubleClick={d.onDoubleClick}
            onClick={() => window.open(d.link)}
          />
        );
      })}
      {showWindow && <ThisPcForm onClose={() => setShowWindow(false)} />}
      {showWindow1 && <ThisPcForm onClose={() => setShowWindow1(false)} />}
    </div>
  );
};

export default WIndowParent;
