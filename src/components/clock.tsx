import React from 'react';

export default function BirdhouseClock() {
  const [now, setNow] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const seconds = now.getSeconds();
  const minutes = now.getMinutes() + seconds / 60;
  const hours = (now.getHours() % 12) + minutes / 60;

  const secDeg = seconds * 6;
  const minDeg = minutes * 6;
  const hourDeg = hours * 30;

  const cx = 160;
  const cy = 258;

  const ticks = Array.from({ length: 12 }, (_, i) => {
    const angle = (i * 30 * Math.PI) / 180;
    const isMajor = i % 3 === 0;
    const r1 = isMajor ? 58 : 64;
    const r2 = 70;
    const x1 = cx + r1 * Math.sin(angle);
    const y1 = cy - r1 * Math.cos(angle);
    const x2 = cx + r2 * Math.sin(angle);
    const y2 = cy - r2 * Math.cos(angle);
    return (
      <line
        key={i}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="#C9A15A"
        strokeWidth={isMajor ? 2.5 : 1.2}
        strokeLinecap="round"
        opacity={isMajor ? 0.9 : 0.5}
      />
    );
  });

  return (
    <div className="flex  pointer-events-none z-10">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,500;1,500&family=Caveat:wght@600&display=swap');
      `}</style>

      <div className="flex flex-col items-center">
        <svg
          viewBox="0 0 320 400"
          className="w-full drop-shadow-xl"
          role="img"
          aria-label="A birdhouse-shaped analog clock with a heart entrance"
        >
          <defs>
            <linearGradient id="woodGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D48B6A" />
              <stop offset="100%" stopColor="#B96B4C" />
            </linearGradient>
            <radialGradient id="holeGlow" cx="50%" cy="40%" r="65%">
              <stop offset="0%" stopColor="#FFD9DC" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#FFD9DC" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* hanging string + hook */}
          <line x1="160" y1="6" x2="160" y2="24" stroke="#A85D40" strokeWidth="2" />
          <circle cx="160" cy="10" r="6" fill="none" stroke="#A85D40" strokeWidth="2.5" />

          {/* roof */}
          <polygon points="160,26 66,112 254,112" fill="#8B3A4A" stroke="#6E2C39" strokeWidth="2" />
          <polygon points="160,26 66,112 88,112" fill="#7A3140" opacity="0.6" />

          {/* gable heart ornament */}
          <path
            d="M160,58 C160,52 154,47 148,47 C142,47 137,52 137,58.5 C137,67 148,75 160,84 C172,75 183,67 183,58.5 C183,52 178,47 172,47 C166,47 160,52 160,58 Z"
            fill="#F4C2C2"
            stroke="#E3A6AA"
            strokeWidth="1"
          />

          {/* body */}
          <rect x="70" y="110" width="180" height="232" rx="18" fill="url(#woodGrad)" stroke="#A85D40" strokeWidth="2" />
          {[92, 112, 132, 152, 172, 192, 212, 232].map((x) => (
            <line key={x} x1={x} y1="114" x2={x} y2="338" stroke="#A85D40" strokeWidth="1" opacity="0.35" />
          ))}

          {/* entrance heart hole */}
          <circle cx="160" cy="160" r="34" fill="url(#holeGlow)" />
          <path
            d="M160,148 C160,141 153,134 145,134 C136,134 129,141 129,149 C129,160 143,171 160,185 C177,171 191,160 191,149 C191,141 184,134 175,134 C167,134 160,141 160,148 Z"
            fill="#4A1E27"
          />
          {/* tiny bird peeking from the hole */}
          <g transform="translate(160,178)">
            <circle cx="0" cy="0" r="7" fill="#F4C2C2" />
            <circle cx="-3" cy="-2" r="1.3" fill="#4A1E27" />
            <path d="M5,0 L11,2 L5,4 Z" fill="#C9A15A" />
          </g>

          {/* perch */}
          <line x1="140" y1="196" x2="180" y2="196" stroke="#A85D40" strokeWidth="3" strokeLinecap="round" />

          {/* clock face */}
          <circle cx={cx} cy={cy} r="76" fill="#FFF8F0" stroke="#C9A15A" strokeWidth="4" />
          <circle cx={cx} cy={cy} r="69" fill="none" stroke="#C9A15A" strokeWidth="1" opacity="0.5" />
          {ticks}

          {/* numerals */}
          <text x={cx} y={cy - 50} textAnchor="middle" fontFamily="Fraunces" fontStyle="italic" fontSize="16" fill="#9C6B3F">12</text>
          <text x={cx + 54} y={cy + 6} textAnchor="middle" fontFamily="Fraunces" fontStyle="italic" fontSize="16" fill="#9C6B3F">3</text>
          <text x={cx} y={cy + 62} textAnchor="middle" fontFamily="Fraunces" fontStyle="italic" fontSize="16" fill="#9C6B3F">6</text>
          <text x={cx - 54} y={cy + 6} textAnchor="middle" fontFamily="Fraunces" fontStyle="italic" fontSize="16" fill="#9C6B3F">9</text>

          {/* hands */}
          <line
            x1={cx} y1={cy} x2={cx} y2={cy - 38}
            stroke="#8B3A4A" strokeWidth="5" strokeLinecap="round"
            transform={`rotate(${hourDeg} ${cx} ${cy})`}
            className="transition-transform duration-300 ease-out"
          />
          <line
            x1={cx} y1={cy} x2={cx} y2={cy - 55}
            stroke="#B96B4C" strokeWidth="3.2" strokeLinecap="round"
            transform={`rotate(${minDeg} ${cx} ${cy})`}
            className="transition-transform duration-300 ease-out"
          />
          <g transform={`rotate(${secDeg} ${cx} ${cy})`} className="transition-transform duration-300 ease-out">
            <line x1={cx} y1={cy + 10} x2={cx} y2={cy - 58} stroke="#C9576B" strokeWidth="1.4" />
            <path
              d={`M${cx},${cy - 63} c-2,-3 -6,-3 -6,1 c0,3 6,7 6,9 c0,-2 6,-6 6,-9 c0,-4 -4,-4 -6,-1 Z`}
              fill="#C9576B"
            />
          </g>
          <circle cx={cx} cy={cy} r="5" fill="#C9A15A" />

          {/* base greenery */}
          <g transform="translate(78,332)">
            <path d="M0,10 C-6,2 -4,-8 4,-10 C2,-2 4,6 0,10 Z" fill="#8FA679" />
            <circle cx="6" cy="-6" r="2.5" fill="#E3A6AA" />
          </g>
          <g transform="translate(242,332) scale(-1,1)">
            <path d="M0,10 C-6,2 -4,-8 4,-10 C2,-2 4,6 0,10 Z" fill="#8FA679" />
            <circle cx="6" cy="-6" r="2.5" fill="#E3A6AA" />
          </g>

          {/* hanging plaque */}
          <line x1="130" y1="342" x2="118" y2="368" stroke="#A85D40" strokeWidth="1.5" />
          <line x1="190" y1="342" x2="202" y2="368" stroke="#A85D40" strokeWidth="1.5" />
          <rect x="100" y="366" width="120" height="30" rx="6" fill="#F4E3D3" stroke="#C9A15A" strokeWidth="1.5" />
          <text
            x="160" y="387" textAnchor="middle"
            fontFamily="Caveat" fontSize="20" fill="#8B3A4A"
          >
            every hour is ours
          </text>
        </svg>
      </div>
    </div>
  );
}