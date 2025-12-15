"use client"

export function WaveBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-60" />

      {/* Animated waves */}
      <svg
        className="absolute bottom-0 left-0 w-full h-[70%] animate-wave"
        viewBox="0 0 1440 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M0 600V400C120 350 240 380 360 400C480 420 600 450 720 420C840 390 960 300 1080 280C1200 260 1320 310 1440 340V600H0Z"
          fill="url(#wave1)"
          fillOpacity="0.7"
        />
        <defs>
          <linearGradient id="wave1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="50%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#e879f9" />
          </linearGradient>
        </defs>
      </svg>

      <svg
        className="absolute bottom-0 left-0 w-full h-[60%] animate-wave-delayed"
        viewBox="0 0 1440 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M0 500V350C160 300 320 350 480 370C640 390 800 420 960 380C1120 340 1280 260 1440 300V500H0Z"
          fill="url(#wave2)"
          fillOpacity="0.5"
        />
        <defs>
          <linearGradient id="wave2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#d946ef" />
          </linearGradient>
        </defs>
      </svg>

      <svg
        className="absolute bottom-0 left-0 w-full h-[50%] animate-wave-slow"
        viewBox="0 0 1440 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M0 400V280C200 320 400 260 600 250C800 240 1000 300 1200 320C1300 330 1380 310 1440 300V400H0Z"
          fill="url(#wave3)"
          fillOpacity="0.8"
        />
        {/* Line on top of wave */}
        <path
          d="M0 280C200 320 400 260 600 250C800 240 1000 300 1200 320C1300 330 1380 310 1440 300"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="2"
          fill="none"
        />
        <defs>
          <linearGradient id="wave3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="50%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#c084fc" />
          </linearGradient>
        </defs>
      </svg>

      {/* Decorative dot on the wave line */}
      <div className="absolute bottom-[35%] right-[35%] w-3 h-3 bg-white rounded-full shadow-lg animate-wave-delayed" />
    </div>
  )
}
