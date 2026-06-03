import { useRef, useEffect } from "react";

function Window(props) {
  const { image, text, x = 0, y = 0 } = props;

  const boxRef = useRef(null);
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });
  const pos = useRef({ x, y });

  // smooth frame control
  const frameRef = useRef(null);

  function handleMouseDown(e) {
    dragging.current = true;

    offset.current = {
      x: e.clientX - pos.current.x,
      y: e.clientY - pos.current.y,
    };
  }

  function handleMouseMove(e) {
    if (!dragging.current) return;

    const x = e.clientX - offset.current.x;
    const y = e.clientY - offset.current.y;

    pos.current = { x, y };

    cancelAnimationFrame(frameRef.current);

    frameRef.current = requestAnimationFrame(() => {
      boxRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });
  }

  function handleMouseUp() {
    dragging.current = false;
  }

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div
      ref={boxRef}
      style={{
        position: "absolute",
        transform: `translate3d(${x}px, ${y}px, 0)`,
        willChange: "transform",
      }}
    >
      <div
        onMouseDown={handleMouseDown}
        style={{
          cursor: "grab",
          userSelect: "none",
        }}
      >
        <img className="law" src={image} alt="logo" draggable={false} />
        <p style={{ color: "white", paddingLeft: "25px" }}>{text}</p>
      </div>
    </div>
  );
}

export default Window;
