"use client";

import { createContext, useContext } from "react";

/**
 * Positioning/behavior for the window currently being rendered, supplied by GDesktop for
 * each open window instance. WindowChrome reads it via context instead of every one of the
 * ~16 window components (WorksWindow, AboutWindow, ...) having to accept and forward extra
 * props just to make dragging/minimize/maximize work — none of those components change.
 */
type WindowInstanceValue = {
  x: number;
  y: number;
  z: number;
  maximized: boolean;
  visible: boolean; // false while minimized — stays mounted (state like terminal history survives) but hidden
  draggable: boolean; // false on mobile — dragging/floating multiple windows doesn't fit a small screen
  onFocus: () => void;
  onMinimize: () => void;
  onToggleMaximize: () => void;
  onMove: (x: number, y: number) => void;
};

const WindowInstanceContext = createContext<WindowInstanceValue | null>(null);

export function WindowInstance({ value, children }: { value: WindowInstanceValue; children: React.ReactNode }) {
  return <WindowInstanceContext.Provider value={value}>{children}</WindowInstanceContext.Provider>;
}

export function WindowChrome({
  title,
  onClose,
  width = "min(1040px,90vw)",
  height = "min(680px,84vh)",
  children,
}: {
  title: string;
  onClose: () => void;
  width?: string;
  height?: string;
  children: React.ReactNode;
}) {
  const inst = useContext(WindowInstanceContext);

  if (!inst || !inst.draggable) {
    // mobile / no instance context: single centered modal, tap outside to close — dragging
    // and floating multiple windows doesn't make sense on a small screen, so only the
    // close button is shown here (a real button, not a decorative dot with no handler).
    return (
      <div
        style={{ position: "absolute", inset: 0, zIndex: 55, display: "grid", placeItems: "center", background: "rgba(4,4,5,.52)", backdropFilter: "blur(3px)" }}
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div
          style={{
            width,
            height,
            display: "flex",
            flexDirection: "column",
            borderRadius: 14,
            overflow: "hidden",
            background: "rgba(20,20,22,.94)",
            border: "1px solid rgba(255,255,255,.14)",
            boxShadow: "0 26px 90px rgba(0,0,0,.6)",
            animation: "gjRise .45s cubic-bezier(.16,1,.3,1) both",
          }}
        >
          <div
            style={{
              height: 40,
              flex: "0 0 40px",
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "0 14px",
              background: "rgba(30,30,34,.9)",
              borderBottom: "1px solid rgba(255,255,255,.1)",
              fontSize: 11,
              letterSpacing: ".16em",
              color: "rgba(255,255,255,.72)",
            }}
          >
            <span onClick={onClose} style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57", cursor: "pointer" }} />
            <span style={{ margin: "0 auto" }}>{title}</span>
          </div>
          {children}
        </div>
      </div>
    );
  }

  // desktop: a real floating, draggable window — no shared full-screen backdrop, since
  // multiple of these can be open and stacked at once.
  const boxWidth = inst.maximized ? "min(1240px,96vw)" : width;
  const boxHeight = inst.maximized ? "min(880px,92vh)" : height;
  const left = inst.maximized ? "2vw" : inst.x;
  const top = inst.maximized ? "4vh" : inst.y;

  function startDrag(e: React.PointerEvent) {
    if (!inst) return;
    inst.onFocus();
    const startX = e.clientX;
    const startY = e.clientY;
    const baseX = inst.x;
    const baseY = inst.y;
    const move = (ev: PointerEvent) => {
      inst.onMove(baseX + (ev.clientX - startX), baseY + (ev.clientY - startY));
    };
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  }

  return (
    <div
      onPointerDown={inst.onFocus}
      style={{
        position: "absolute",
        left,
        top,
        zIndex: inst.z,
        width: boxWidth,
        height: boxHeight,
        display: inst.visible ? "flex" : "none",
        flexDirection: "column",
        borderRadius: 14,
        overflow: "hidden",
        background: "rgba(20,20,22,.94)",
        border: "1px solid rgba(255,255,255,.14)",
        boxShadow: "0 26px 90px rgba(0,0,0,.6)",
        animation: "gjRise .3s cubic-bezier(.16,1,.3,1) both",
      }}
    >
      <div
        onPointerDown={startDrag}
        style={{
          height: 40,
          flex: "0 0 40px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "0 14px",
          background: "rgba(30,30,34,.9)",
          borderBottom: "1px solid rgba(255,255,255,.1)",
          fontSize: 11,
          letterSpacing: ".16em",
          color: "rgba(255,255,255,.72)",
          cursor: "grab",
          touchAction: "none",
        }}
      >
        <span style={{ display: "flex", gap: 8 }}>
          <span
            onPointerDown={(e) => e.stopPropagation()}
            onClick={onClose}
            title="Close"
            style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57", cursor: "pointer" }}
          />
          <span
            onPointerDown={(e) => e.stopPropagation()}
            onClick={inst.onMinimize}
            title="Minimize"
            style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e", cursor: "pointer" }}
          />
          <span
            onPointerDown={(e) => e.stopPropagation()}
            onClick={inst.onToggleMaximize}
            title={inst.maximized ? "Restore" : "Maximize"}
            style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840", cursor: "pointer" }}
          />
        </span>
        <span style={{ margin: "0 auto" }}>{title}</span>
      </div>
      {children}
    </div>
  );
}

export function WindowBody({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "26px 30px" }}>
      {children}
    </div>
  );
}

export const rowLink: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 10,
  padding: 16,
  borderRadius: 10,
  border: "1px solid rgba(255,255,255,.12)",
  background: "rgba(255,255,255,.035)",
  color: "#f5f5f5",
  textDecoration: "none",
};
