import Window from "./Window";
import Pc from "../assets/pc.png";
import L from "../assets/L.png";

const WIndowParent = () => {
  const data = [
    { id: 1, image: Pc, text: "ThisPc", x: 0, y: 0 },
    { id: 2, image: L, text: "ThisPc", x: 0, y: 150 },
  ];
  return (
    <div>
      {data.map((d) => {
        return (
          <Window image={d.image} text={d.text} key={d.id} x={d.x} y={d.y} />
        );
      })}
    </div>
  );
};

export default WIndowParent;
