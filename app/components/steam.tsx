/**
 * Slow columns of steam rising over the hero photograph - a nod to the thermal
 * pool. Values are fixed rather than random so server and client markup match.
 */
const wisps = [
  { left: "8%", size: "170px", drift: "40px", duration: "17s", delay: "0s" },
  { left: "21%", size: "120px", drift: "-30px", duration: "21s", delay: "3.2s" },
  { left: "34%", size: "200px", drift: "56px", duration: "24s", delay: "1.4s" },
  { left: "47%", size: "140px", drift: "-44px", duration: "19s", delay: "6.1s" },
  { left: "58%", size: "185px", drift: "34px", duration: "26s", delay: "2.6s" },
  { left: "69%", size: "125px", drift: "-24px", duration: "18s", delay: "8.4s" },
  { left: "80%", size: "210px", drift: "48px", duration: "23s", delay: "4.7s" },
  { left: "91%", size: "150px", drift: "-38px", duration: "20s", delay: "10.2s" }
];

export function Steam() {
  return (
    <div className="hero__steam" aria-hidden="true">
      {wisps.map((wisp, index) => (
        <span
          key={index}
          className="hero__steamWisp"
          style={
            {
              "--left": wisp.left,
              "--size": wisp.size,
              "--drift": wisp.drift,
              "--duration": wisp.duration,
              "--delay": wisp.delay
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
