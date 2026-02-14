"use client";
import React, { useState, useEffect, useRef } from "react";
import posthog from "posthog-js";

/*
 * VARIANT 3: RETRO ARCADE / Y2K CYBER
 * Aesthetic: CRT scan lines, neon glow, pixel-adjacent elements, dark cyber background.
 * Color palette: Electric blue, hot magenta, toxic green on near-black.
 * References arcade cabinets, old-school game UIs, and Y2K digital culture.
 * Typography: Monospace header + tech sans body. Glitch effects on title.
 * The page feels like inserting a quarter into a meme machine.
 */

export default function Variant3() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [dominantColor, setDominantColor] = useState("255, 255, 255");
  const [loaded, setLoaded] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);

  const openForNewUsers = true;

  const handleClick = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/android/i.test(userAgent) && openForNewUsers) {
      window.open("https://getwaitlist.com/waitlist/25243", "_blank");
      posthog.capture("click_to_download", { button: "variant-3", platform: "Android" });
    } else if ((/iPad|iPhone|iPod/.test(userAgent) || /Macintosh/.test(userAgent)) && !window.MSStream && openForNewUsers) {
      window.open("https://apps.apple.com/de/app/syly/id6618152144", "_blank");
      posthog.capture("click_to_download", { button: "variant-3", platform: "IOS" });
    } else {
      window.open("https://getwaitlist.com/waitlist/25243", "_blank");
      posthog.capture("click_to_download", { button: "variant-3", platform: "Fallback" });
    }
  };

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    // Periodic glitch
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 4000);
    return () => { clearTimeout(t); clearInterval(glitchInterval); };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    const context = canvas.getContext("2d");
    const analyzeFrame = () => {
      context.drawImage(video, 0, 0, 1, 1);
      const [r, g, b] = context.getImageData(0, 0, 1, 1).data;
      setDominantColor(`${r}, ${g}, ${b}`);
      requestAnimationFrame(analyzeFrame);
    };
    if (video.readyState >= 3) analyzeFrame();
    else video.addEventListener("loadeddata", analyzeFrame);
    return () => video.removeEventListener("loadeddata", analyzeFrame);
  }, []);

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=JetBrains+Mono:wght@300;400;500;700&display=swap');

        .v3-arcade {
          --neon-blue: #00F0FF;
          --neon-pink: #FF00AA;
          --neon-green: #39FF14;
          --dark: #0A0A12;
          --darker: #050508;
          font-family: 'JetBrains Mono', monospace;
          background: var(--dark);
          color: white;
          overflow-x: hidden;
        }
        .v3-arcade .pixel-font {
          font-family: 'Press Start 2P', monospace;
        }

        /* Scanlines overlay */
        .v3-scanlines::after {
          content: '';
          position: fixed;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 0, 0, 0.15) 2px,
            rgba(0, 0, 0, 0.15) 4px
          );
          pointer-events: none;
          z-index: 100;
        }

        /* CRT vignette */
        .v3-crt-vignette::before {
          content: '';
          position: fixed;
          inset: 0;
          background: radial-gradient(ellipse at center, transparent 50%, rgba(0, 0, 0, 0.5) 100%);
          pointer-events: none;
          z-index: 99;
        }

        /* Grid background */
        .v3-grid-bg {
          background-image: 
            linear-gradient(rgba(0, 240, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 240, 255, 0.03) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        /* Glitch effect on title */
        @keyframes v3-glitch-1 {
          0%, 100% { clip-path: inset(0 0 0 0); transform: translate(0); }
          20% { clip-path: inset(20% 0 60% 0); transform: translate(-5px, -2px); }
          40% { clip-path: inset(50% 0 30% 0); transform: translate(5px, 2px); }
          60% { clip-path: inset(10% 0 80% 0); transform: translate(-3px, 1px); }
          80% { clip-path: inset(70% 0 10% 0); transform: translate(3px, -1px); }
        }
        @keyframes v3-glitch-2 {
          0%, 100% { clip-path: inset(0 0 0 0); transform: translate(0); }
          20% { clip-path: inset(60% 0 20% 0); transform: translate(5px, 2px); }
          40% { clip-path: inset(30% 0 50% 0); transform: translate(-5px, -2px); }
          60% { clip-path: inset(80% 0 10% 0); transform: translate(3px, -1px); }
          80% { clip-path: inset(10% 0 70% 0); transform: translate(-3px, 1px); }
        }

        .v3-glitch-text {
          position: relative;
        }
        .v3-glitch-text::before,
        .v3-glitch-text::after {
          content: attr(data-text);
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
        }
        .v3-glitch-active .v3-glitch-text::before {
          color: var(--neon-pink);
          animation: v3-glitch-1 0.2s steps(2) forwards;
        }
        .v3-glitch-active .v3-glitch-text::after {
          color: var(--neon-blue);
          animation: v3-glitch-2 0.2s steps(2) forwards;
        }

        /* Neon glow text */
        .v3-neon-blue {
          color: var(--neon-blue);
          text-shadow: 0 0 10px var(--neon-blue), 0 0 40px rgba(0, 240, 255, 0.3);
        }
        .v3-neon-pink {
          color: var(--neon-pink);
          text-shadow: 0 0 10px var(--neon-pink), 0 0 40px rgba(255, 0, 170, 0.3);
        }
        .v3-neon-green {
          color: var(--neon-green);
          text-shadow: 0 0 10px var(--neon-green), 0 0 40px rgba(57, 255, 20, 0.3);
        }

        /* Phone neon border */
        .v3-phone-neon {
          border: 2px solid var(--neon-blue);
          box-shadow:
            0 0 15px rgba(0, 240, 255, 0.3),
            0 0 60px rgba(0, 240, 255, 0.1),
            inset 0 0 15px rgba(0, 240, 255, 0.1),
            0 0 100px rgba(${dominantColor}, 0.15);
          border-radius: 36px;
        }

        /* Blink cursor */
        @keyframes v3-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .v3-cursor {
          animation: v3-blink 1s steps(1) infinite;
        }

        /* Entry animations */
        @keyframes v3-power-on {
          0% { opacity: 0; filter: brightness(10) contrast(0); }
          30% { opacity: 1; filter: brightness(3) contrast(0.5); }
          60% { filter: brightness(1.5) contrast(0.8); }
          100% { filter: brightness(1) contrast(1); }
        }
        @keyframes v3-type-in {
          from { width: 0; }
          to { width: 100%; }
        }
        @keyframes v3-slide-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .v3-loaded .v3-power { animation: v3-power-on 0.8s ease-out forwards; }
        .v3-loaded .v3-slide-1 { animation: v3-slide-up 0.5s 0.3s ease-out forwards; opacity: 0; }
        .v3-loaded .v3-slide-2 { animation: v3-slide-up 0.5s 0.5s ease-out forwards; opacity: 0; }
        .v3-loaded .v3-slide-3 { animation: v3-slide-up 0.5s 0.7s ease-out forwards; opacity: 0; }
        .v3-loaded .v3-slide-4 { animation: v3-slide-up 0.5s 0.9s ease-out forwards; opacity: 0; }

        /* CTA button */
        .v3-arcade-btn {
          background: linear-gradient(180deg, var(--neon-green) 0%, #20CC0A 100%);
          border: 2px solid var(--neon-green);
          box-shadow: 0 0 20px rgba(57, 255, 20, 0.3), 0 4px 0 #0A6600, inset 0 1px 0 rgba(255,255,255,0.2);
          transition: all 0.1s ease;
          color: #0A1600;
        }
        .v3-arcade-btn:hover {
          box-shadow: 0 0 30px rgba(57, 255, 20, 0.5), 0 4px 0 #0A6600, inset 0 1px 0 rgba(255,255,255,0.3);
          filter: brightness(1.1);
        }
        .v3-arcade-btn:active {
          box-shadow: 0 0 20px rgba(57, 255, 20, 0.3), 0 1px 0 #0A6600;
          transform: translateY(3px);
        }

        /* Score display */
        .v3-score-box {
          border: 1px solid rgba(0, 240, 255, 0.2);
          background: rgba(0, 240, 255, 0.05);
        }
      `}</style>

      <div className={`v3-arcade v3-scanlines v3-crt-vignette v3-grid-bg min-h-screen ${loaded ? 'v3-loaded' : ''} ${glitchActive ? 'v3-glitch-active' : ''}`}>
        {/* Top bar - arcade style */}
        <div className="relative z-10 flex justify-between items-center px-4 md:px-8 py-3 border-b border-[rgba(0,240,255,0.1)]">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[var(--neon-green)]" style={{ boxShadow: '0 0 8px var(--neon-green)' }} />
            <span className="text-[var(--neon-blue)] text-xs opacity-60">SYSTEM ONLINE</span>
          </div>
          <div className="v3-score-box px-3 py-1 rounded">
            <span className="pixel-font text-[10px] v3-neon-blue">HI-SCORE: 99,999</span>
          </div>
        </div>

        {/* Main content */}
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16 px-6 md:px-12 py-10 md:py-16 min-h-[calc(100vh-100px)]">
          {/* Left side - text content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-lg">
            {/* Terminal-style header */}
            <div className="v3-power mb-2">
              <span className="text-[var(--neon-green)] text-xs opacity-50">$ ./run_syly.exe</span>
            </div>

            {/* Title with glitch */}
            <h1 className="v3-power">
              <span
                className="pixel-font v3-glitch-text text-4xl md:text-6xl lg:text-7xl v3-neon-blue block mb-2"
                data-text="SYLY"
              >
                SYLY
              </span>
            </h1>

            {/* Tagline */}
            <div className="v3-slide-1 mt-4 mb-6">
              <p className="text-lg md:text-xl font-light">
                <span className="v3-neon-pink">reactions</span>{" "}
                <span className="text-white/50">from</span>{" "}
                <span className="v3-neon-blue">friends</span>{" "}
                <span className="text-white/50">on</span>{" "}
                <span className="v3-neon-green">memes</span>
                <span className="v3-cursor text-white/60">_</span>
              </p>
            </div>

            {/* Feature list - terminal style */}
            <div className="v3-slide-2 v3-score-box rounded-lg p-4 mb-8 w-full font-mono text-sm">
              <div className="text-[var(--neon-green)] opacity-70 mb-2 text-xs">{`>`} FEATURES.log</div>
              {[
                "send memes to your crew",
                "capture raw, real reactions",
                "share the joy, skip the cringe",
                "no followers, just friends",
              ].map((feat, i) => (
                <div key={i} className="flex items-center gap-2 mb-1">
                  <span className="v3-neon-pink text-xs">[{String(i + 1).padStart(2, '0')}]</span>
                  <span className="text-white/60 text-xs">{feat}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="v3-slide-3 flex flex-col items-center lg:items-start gap-4 w-full">
              <button
                onClick={handleClick}
                className="v3-arcade-btn pixel-font text-sm px-8 py-4 rounded-lg font-bold uppercase tracking-wider w-full md:w-auto"
              >
                INSERT COIN TO PLAY
              </button>

              <div className="flex gap-3">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                  alt="App Store"
                  className="h-9 w-auto cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
                  onClick={handleClick}
                />
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Google Play"
                  className="h-9 w-auto cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
                  onClick={handleClick}
                />
              </div>
            </div>

            {/* QR - desktop */}
            <div className="v3-slide-4 hidden md:flex items-center gap-3 mt-6 v3-score-box rounded-lg p-3">
              <img src="/qr-code-apple.svg" alt="QR Code" className="w-14 h-14 rounded" style={{ filter: 'brightness(0.9)' }} />
              <div>
                <p className="v3-neon-blue text-[10px] pixel-font">SCAN ME</p>
                <p className="text-white/30 text-xs mt-1">beam it to your phone</p>
              </div>
            </div>
          </div>

          {/* Right side - Phone */}
          <div className="v3-slide-2 flex-shrink-0">
            <div className="relative">
              {/* Corner brackets decoration */}
              <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-[var(--neon-pink)] opacity-50" />
              <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-[var(--neon-pink)] opacity-50" />
              <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-[var(--neon-pink)] opacity-50" />
              <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-[var(--neon-pink)] opacity-50" />
              
              <div className="v3-phone-neon p-1 overflow-hidden">
                <div className="rounded-[34px] overflow-hidden">
                  <video
                    ref={videoRef}
                    className="w-[240px] h-[480px] md:w-[260px] md:h-[520px] object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    <source src="/website_video2.mp4" type="video/mp4" />
                  </video>
                  <canvas ref={canvasRef} width="1" height="1" className="hidden" />
                </div>
              </div>

              {/* Floating label */}
              <div className="absolute -right-2 md:-right-12 top-8 v3-score-box rounded px-2 py-1">
                <span className="pixel-font text-[8px] v3-neon-green">LIVE FEED</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 border-t border-[rgba(0,240,255,0.1)] px-4 md:px-8 py-3 flex justify-between items-center">
          <span className="text-white/20 text-xs font-mono">SYLY.EXE v2.0.26</span>
          <div className="flex gap-4">
            <a href="https://syly.notion.site/privacy-policy" target="_blank" className="text-white/20 hover:text-[var(--neon-blue)] text-xs transition-colors font-mono">privacy</a>
            <a href="https://syly.notion.site/privacy-policy" target="_blank" className="text-white/20 hover:text-[var(--neon-blue)] text-xs transition-colors font-mono">legal</a>
          </div>
        </div>
      </div>
    </>
  );
}
