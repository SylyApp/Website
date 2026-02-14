"use client";
import React, { useState, useEffect, useRef } from "react";
import posthog from "posthog-js";

/*
 * VARIANT 1: NEO-BRUTALIST
 * Aesthetic: Raw, unpolished, high-contrast brutalism meets Gen Z chaos energy.
 * Thick black borders, clashing accent colors (acid lime + hot pink), 
 * deliberately "broken" layout with rotated elements, visible grid structure,
 * and in-your-face typography. Think Craigslist meets a zine from 2026.
 */

export default function Variant1() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [tickerOffset, setTickerOffset] = useState(0);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [dominantColor, setDominantColor] = useState("255, 255, 255");
  const [loaded, setLoaded] = useState(false);

  const openForNewUsers = true;

  const handleClick = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/android/i.test(userAgent) && openForNewUsers) {
      window.open("https://getwaitlist.com/waitlist/25243", "_blank");
      posthog.capture("click_to_download", { button: "variant-1", platform: "Android" });
    } else if ((/iPad|iPhone|iPod/.test(userAgent) || /Macintosh/.test(userAgent)) && !window.MSStream && openForNewUsers) {
      window.open("https://apps.apple.com/de/app/syly/id6618152144", "_blank");
      posthog.capture("click_to_download", { button: "variant-1", platform: "IOS" });
    } else {
      window.open("https://getwaitlist.com/waitlist/25243", "_blank");
      posthog.capture("click_to_download", { button: "variant-1", platform: "Fallback" });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouse = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerOffset((prev) => prev - 1);
    }, 30);
    return () => clearInterval(interval);
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
    if (video.readyState >= 3) {
      analyzeFrame();
    } else {
      video.addEventListener("loadeddata", analyzeFrame);
    }
    return () => video.removeEventListener("loadeddata", analyzeFrame);
  }, []);

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Anybody:wght@400;700;900&display=swap');

        .v1-brutalist * {
          font-family: 'Space Mono', monospace;
        }
        .v1-brutalist h1, .v1-brutalist h2, .v1-brutalist .display-font {
          font-family: 'Anybody', sans-serif;
        }

        .v1-brutalist {
          --lime: #BFFF00;
          --hotpink: #FF2D8A;
          --cream: #FFF8E7;
          --ink: #1A1A1A;
          background: var(--cream);
          cursor: crosshair;
        }

        .v1-ticker {
          white-space: nowrap;
          animation: v1-scroll 15s linear infinite;
        }
        @keyframes v1-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .v1-border-thick {
          border: 4px solid var(--ink);
        }

        .v1-sticker {
          transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .v1-sticker:hover {
          transform: rotate(-3deg) scale(1.05) !important;
        }

        @keyframes v1-entry-left {
          from { opacity: 0; transform: translateX(-80px) rotate(-5deg); }
          to { opacity: 1; transform: translateX(0) rotate(0deg); }
        }
        @keyframes v1-entry-right {
          from { opacity: 0; transform: translateX(80px) rotate(5deg); }
          to { opacity: 1; transform: translateX(0) rotate(0deg); }
        }
        @keyframes v1-entry-up {
          from { opacity: 0; transform: translateY(60px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes v1-stamp {
          0% { opacity: 0; transform: scale(3) rotate(-20deg); }
          60% { opacity: 1; transform: scale(0.9) rotate(2deg); }
          100% { opacity: 1; transform: scale(1) rotate(-2deg); }
        }

        .v1-loaded .v1-anim-left { animation: v1-entry-left 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .v1-loaded .v1-anim-right { animation: v1-entry-right 0.6s 0.1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .v1-loaded .v1-anim-up { animation: v1-entry-up 0.5s 0.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .v1-loaded .v1-anim-stamp { animation: v1-stamp 0.4s 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }

        .v1-anim-left, .v1-anim-right, .v1-anim-up, .v1-anim-stamp { opacity: 0; }

        .v1-phone-shadow {
          box-shadow: 12px 12px 0px var(--ink);
        }

        .v1-btn-shadow {
          box-shadow: 6px 6px 0px var(--ink);
          transition: all 0.15s ease;
        }
        .v1-btn-shadow:hover {
          box-shadow: 3px 3px 0px var(--ink);
          transform: translate(3px, 3px);
        }
        .v1-btn-shadow:active {
          box-shadow: 0px 0px 0px var(--ink);
          transform: translate(6px, 6px);
        }

        .v1-grain::before {
          content: '';
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 9999;
        }
      `}</style>

      <div className={`v1-brutalist v1-grain min-h-screen ${loaded ? 'v1-loaded' : ''}`}>
        {/* Ticker tape top */}
        <div className="overflow-hidden bg-[var(--ink)] py-2 v1-border-thick border-t-0 border-l-0 border-r-0">
          <div className="v1-ticker flex gap-8 text-[var(--lime)] text-sm font-bold uppercase tracking-widest">
            {Array(4).fill(null).map((_, i) => (
              <span key={i} className="flex items-center gap-8 shrink-0">
                <span>SYLY</span><span>*</span>
                <span>SEND MEMES</span><span>*</span>
                <span>CAPTURE REACTIONS</span><span>*</span>
                <span>SHARE JOY</span><span>*</span>
                <span>NO CAP</span><span>*</span>
                <span>FR FR</span><span>*</span>
              </span>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="px-4 md:px-8 lg:px-16 py-6 md:py-12">
          {/* Hero section */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 mb-6">
            {/* Title block */}
            <div className="md:col-span-7 v1-border-thick bg-[var(--lime)] p-6 md:p-10 v1-anim-left relative overflow-hidden">
              <div className="absolute top-2 right-3 text-xs text-[var(--ink)] opacity-40 font-bold">001</div>
              <h1 className="display-font text-[72px] md:text-[140px] lg:text-[180px] font-black leading-[0.85] text-[var(--ink)] uppercase tracking-tight">
                SY
                <br />
                LY
              </h1>
              <div className="mt-4 md:mt-6 flex flex-wrap gap-2">
                {["memes", "reactions", "friends", "joy"].map((tag) => (
                  <span
                    key={tag}
                    className="v1-border-thick bg-[var(--cream)] px-3 py-1 text-sm font-bold uppercase text-[var(--ink)] v1-sticker"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Phone mockup block */}
            <div className="md:col-span-5 v1-border-thick bg-[var(--ink)] p-6 md:p-8 flex items-center justify-center v1-anim-right relative">
              <div className="absolute top-2 right-3 text-xs text-white/30 font-bold">002</div>
              <div className="v1-border-thick border-[var(--lime)] rounded-[32px] overflow-hidden v1-phone-shadow relative" style={{ borderColor: 'var(--lime)' }}>
                <video
                  ref={videoRef}
                  className="w-[220px] h-[440px] md:w-[240px] md:h-[480px] object-cover"
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
          </div>

          {/* Bottom row */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
            {/* Description block */}
            <div className="md:col-span-4 v1-border-thick bg-[var(--hotpink)] p-6 v1-anim-up relative">
              <div className="absolute top-2 right-3 text-xs text-[var(--ink)] opacity-40 font-bold">003</div>
              <p className="text-[var(--cream)] text-lg md:text-xl font-bold leading-snug">
                share memes.
                <br />
                capture reactions.
                <br />
                <span className="text-[var(--ink)]">no filter, just vibes.</span>
              </p>
              <div className="mt-4 text-[var(--cream)] text-sm opacity-70">
                the app where your friends' reactions are the content
              </div>
            </div>

            {/* CTA block */}
            <div className="md:col-span-5 v1-border-thick bg-[var(--cream)] p-6 flex flex-col justify-between v1-anim-up relative" style={{ animationDelay: '0.35s' }}>
              <div className="absolute top-2 right-3 text-xs text-[var(--ink)] opacity-40 font-bold">004</div>
              <div>
                <p className="text-[var(--ink)] text-base font-bold uppercase tracking-wide mb-4">
                  download now <span className="inline-block animate-bounce">^</span>
                </p>
                <button
                  onClick={handleClick}
                  className="v1-border-thick v1-btn-shadow bg-[var(--lime)] text-[var(--ink)] font-black text-xl md:text-2xl uppercase px-8 py-4 w-full display-font tracking-tight"
                >
                  GET SYLY FREE
                </button>
              </div>

              <div className="flex gap-4 mt-5">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                  alt="App Store"
                  className="h-10 w-auto cursor-pointer v1-sticker"
                  onClick={handleClick}
                />
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Google Play"
                  className="h-10 w-auto cursor-pointer v1-sticker"
                  onClick={handleClick}
                />
              </div>

              {/* QR code - desktop only */}
              <div className="hidden md:flex items-center gap-3 mt-5 pt-4" style={{ borderTop: '2px dashed var(--ink)' }}>
                <img src="/qr-code-apple.svg" alt="QR Code" className="w-16 h-16 v1-border-thick" />
                <span className="text-xs text-[var(--ink)] opacity-60 font-bold uppercase">scan with<br />your phone</span>
              </div>
            </div>

            {/* Stamp block */}
            <div className="md:col-span-3 v1-border-thick bg-[var(--ink)] p-6 flex items-center justify-center v1-anim-stamp relative">
              <div className="absolute top-2 right-3 text-xs text-white/30 font-bold">005</div>
              <div className="text-center">
                <div className="text-6xl md:text-7xl mb-2">🤣</div>
                <div className="text-[var(--lime)] text-xs font-bold uppercase tracking-[0.3em]">
                  real<br />reactions<br />only
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="v1-border-thick border-b-0 border-l-0 border-r-0 bg-[var(--ink)] px-4 md:px-8 py-3 flex justify-between items-center">
          <span className="text-[var(--cream)] text-xs opacity-40">SYLY {new Date().getFullYear()}</span>
          <div className="flex gap-4">
            <a href="https://syly.notion.site/privacy-policy" target="_blank" className="text-[var(--cream)] text-xs opacity-40 hover:opacity-70 transition-opacity">Privacy</a>
            <a href="https://syly.notion.site/privacy-policy" target="_blank" className="text-[var(--cream)] text-xs opacity-40 hover:opacity-70 transition-opacity">Legal</a>
          </div>
        </div>
      </div>
    </>
  );
}
