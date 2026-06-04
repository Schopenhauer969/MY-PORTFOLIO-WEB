import { useRef, useState } from "react";

function AppWindow({ onClose }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [minimized, setMinimized] = useState(false);
  const [maximized, setMaximized] = useState(true); // ✅ START FULLSCREEN

  const url = "https://mern-thinkboard-notes-project.onrender.com";

  const dragging = useRef(false);
  const resizing = useRef(false);

  const offset = useRef({ x: 0, y: 0 });
  const startMouse = useRef({ x: 0, y: 0 });
  const startSize = useRef({ width: 0, height: 0 });

  const prevState = useRef({ pos: null, size: null });

  // ---------- DRAG ----------
  function handleMouseDown(e) {
    if (maximized) return; // ❌ block drag in fullscreen

    dragging.current = true;

    offset.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", stopDrag);
  }

  function handleMove(e) {
    if (!dragging.current) return;

    setPos({
      x: e.clientX - offset.current.x,
      y: e.clientY - offset.current.y,
    });
  }

  function stopDrag() {
    dragging.current = false;
    window.removeEventListener("mousemove", handleMove);
    window.removeEventListener("mouseup", stopDrag);
  }

  // ---------- RESIZE ----------
  function handleResizeMove(e) {
    if (!resizing.current) return;

    const dx = e.clientX - startMouse.current.x;
    const dy = e.clientY - startMouse.current.y;

    const newWidth = Math.max(350, startSize.current.width + dx);
    const newHeight = Math.max(105, startSize.current.height + dy);

    setSize({ width: newWidth, height: newHeight });
  }

  function stopResize() {
    resizing.current = false;

    window.removeEventListener("mousemove", handleResizeMove);
    window.removeEventListener("mouseup", stopResize);
  }

  if (minimized) return null;

  return (
    <div
      style={{
        position: maximized ? "fixed" : "absolute",
        left: maximized ? 0 : pos.x,
        top: maximized ? 0 : pos.y,
        width: maximized ? "100vw" : size.width,
        height: maximized ? "94vh" : size.height,
        background: "#fff",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        borderRadius: 5,
        zIndex: 9999,
      }}
    >
      {/* TITLE BAR */}
      <div
        onMouseDown={handleMouseDown}
        style={{
          background: "#ffffff",
          cursor: maximized ? "default" : "move",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span style={{ padding: 3, paddingLeft: 10, fontWeight: "bold" }}>
          ThinkBoard
        </span>
        <span />
        <div>
          <button className="size" onClick={() => setMinimized(true)}>
            −
          </button>

          {/* MAXIMIZE / RESTORE */}
          <button
            className="size"
            onClick={() => {
              if (maximized) {
                setMaximized(false);

                // restore default small window
                setSize({ width: 850, height: 600 });
                setPos({ x: 350, y: 100 });
              } else {
                prevState.current = { pos, size };
                setMaximized(true);

                setSize({
                  width: window.innerWidth,
                  height: window.innerHeight,
                });

                setPos({ x: 0, y: 0 });
              }
            }}
          >
            □
          </button>

          <button className="size-red" onClick={onClose}>
            x
          </button>
        </div>
      </div>

      {/* IFRAME */}
      <div style={{ flex: 1 }}>
        <iframe
          src={url}
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            pointerEvents: resizing.current ? "none" : "auto",
          }}
        />
      </div>

      {/* RESIZE HANDLE */}
      {!maximized && (
        <div
          onMouseDown={(e) => {
            e.preventDefault();

            resizing.current = true;

            startMouse.current = {
              x: e.clientX,
              y: e.clientY,
            };

            startSize.current = {
              width: size.width,
              height: size.height,
            };

            window.addEventListener("mousemove", handleResizeMove);
            window.addEventListener("mouseup", stopResize);
          }}
          style={{
            width: 14,
            height: 14,
            position: "absolute",
            right: 0,
            bottom: 0,
            cursor: "nwse-resize",
          }}
        />
      )}
    </div>
  );
}

export default AppWindow;
