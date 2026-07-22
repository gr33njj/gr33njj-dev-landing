export default function Background() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-background">
      {/* Aurora blobs */}
      <div
        className="absolute animate-aurora"
        style={{
          top: "-20%",
          left: "-10%",
          width: "60vw",
          height: "60vw",
          background: "radial-gradient(circle, rgba(103,232,249,.16), transparent 62%)",
          filter: "blur(30px)",
        }}
      />
      <div
        className="absolute animate-aurora-reverse"
        style={{
          bottom: "-25%",
          right: "-12%",
          width: "62vw",
          height: "62vw",
          background: "radial-gradient(circle, rgba(154,19,232,.2), transparent 62%)",
          filter: "blur(30px)",
        }}
      />
      <div
        className="absolute animate-aurora-slow"
        style={{
          top: "30%",
          left: "40%",
          width: "40vw",
          height: "40vw",
          background: "radial-gradient(circle, rgba(56,189,248,.1), transparent 60%)",
          filter: "blur(40px)",
        }}
      />
      {/* Grid overlay, fading toward edges */}
      <div
        className="absolute inset-0 bg-grid-ice"
        style={{
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, #000 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, #000 30%, transparent 80%)",
        }}
      />
    </div>
  );
}
