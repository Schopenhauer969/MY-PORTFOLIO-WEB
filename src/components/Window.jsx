import { useRef, useEffect } from "react";

function Window({ image, text, x = 0, y = 0, link, onDoubleClick }) {
  const boxRef = useRef(null);

  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  const pos = useRef({ x, y });

  const RAF = useRef(null);

  const WIDTH = 80; // icon width approx
  const HEIGHT = 100; // icon height approx

  function clamp(value, min, max) {
    return Math.max(min, Math.min(value, max));
  }

  function updatePosition(nx, ny) {
    if (!boxRef.current) return;
    boxRef.current.style.transform = `translate3d(${nx}px, ${ny}px, 0)`;
  }

  function handleMouseDown(e) {
    dragging.current = true;

    offset.current = {
      x: e.clientX - pos.current.x,
      y: e.clientY - pos.current.y,
    };
  }

  useEffect(() => {
    const move = (e) => {
      if (!dragging.current) return;

      let nx = e.clientX - offset.current.x;
      let ny = e.clientY - offset.current.y;

      nx = clamp(nx, 0, window.innerWidth - WIDTH);
      ny = clamp(ny, 0, window.innerHeight * 0.9 - HEIGHT);

      pos.current = { x: nx, y: ny };

      if (RAF.current) cancelAnimationFrame(RAF.current);

      RAF.current = requestAnimationFrame(() => {
        updatePosition(nx, ny);
      });
    };

    const up = () => {
      dragging.current = false;

      // ✅ cleanup RAF properly
      if (RAF.current) {
        cancelAnimationFrame(RAF.current);
        RAF.current = null;
      }
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);

    updatePosition(x, y);
    pos.current = { x, y };

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);

      if (RAF.current) cancelAnimationFrame(RAF.current);
    };
  }, [x, y]);

  return (
    <div
      ref={boxRef}
      style={{
        position: "absolute",
        willChange: "transform",
        transform: "translate3d(0px, 0px, 0)",
        textAlign: "center",
      }}
    >
      <div
        onMouseDown={handleMouseDown}
        onDoubleClick={() => {
          if (onDoubleClick) {
            onDoubleClick();
          } else if (link) {
            window.open(link, "_blank");
          }
        }}
        style={{
          cursor: "pointer",
          userSelect: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img className="law" src={image} alt="logo" draggable={false} />

        <p
          style={{
            color: "white",
            margin: 0,
            padding: 0,
            fontSize: 12,
          }}
        >
          {text}
        </p>
      </div>
    </div>
  );
}

export default Window;
