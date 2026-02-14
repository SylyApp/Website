"use client";
import React, { useState, useEffect, useRef } from "react";
import posthog from "posthog-js";

/*
 * VARIANT 5: LIQUID / ORGANIC PLAYFUL
 * Aesthetic: Warm, saturated colors with organic blob shapes and bouncy interactions.
 * Palette: Sunflower yellow, coral, electric violet, sky blue on warm off-white.
 * Rounded everything, blob backgrounds, wavy dividers, sticker-like elements.
 * Typography: Bubbly rounded display + friendly geometric sans body.
 * Feels like a fun, approachable, slightly chaotic app for friends.
 */

export default function Variant5() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [dominantColor, setDominantColor] = useState("255, 255, 255");
  const [loaded, setLoaded] = useState(false);
  const [bounceTrigger, setBounceTrigger] = useState(null);

  const openForNewUsers = true;

  const handleClick = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/android/i.test(userAgent) && openForNewUsers) {
      window.open("https://getwaitlist.com/waitlist/25243", "_blank");
      posthog.capture("click_to_download", { button: "variant-5", platform: "Android" });
    } else if ((/iPad|iPhone|iPod/.test(userAgent) || /Macintosh/.test(userAgent)) && !window.MSStream && openForNewUsers) {
      window.open("https://apps.apple.com/de/app/syly/id6618152144", "_blank");
      posthog.capture("click_to_download", { button: "variant-5", platform: "IOS" });
    } else {
      window.open("https://getwaitlist.com/waitlist/25243", "_blank");
      posthog.capture("click_to_download", { button: "variant-5", platform: "Fallback" });
    }
  };

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
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

  const triggerBounce = (id) => {
    setBounceTrigger(id);
    setTimeout(() => setBounceTrigger(null), 500);
  };

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Lilita+One&family=Nunito:wght@400;500;600;700;800&display=swap');

        .v5-organic {
          --sunflower: #FFD23F;
          --coral: #FF6B6B;
          --violet: #7C3AED;
          --sky: #38BDF8;
          --cream: #FFFBF0;
          --text: #2D2D3A;
          font-family: 'Nunito', sans-serif;
          background: var(--cream);
          color: var(--text);
          overflow-x: hidden;
        }
        .v5-organic .display {
          font-family: 'Lilita One', sans-serif;
        }

        /* Blob shapes */
        .v5-blob-1 {
          border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          animation: v5-morph 12s ease-in-out infinite;
        }
        .v5-blob-2 {
          border-radius: 40% 60% 70% 30% / 40% 70% 30% 60%;
          animation: v5-morph 15s ease-in-out infinite reverse;
        }
        .v5-blob-3 {
          border-radius: 50% 50% 40% 60% / 60% 40% 60% 40%;
          animation: v5-morph 10s ease-in-out infinite;
        }

        @keyframes v5-morph {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          25% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
          50% { border-radius: 50% 50% 40% 60% / 40% 70% 60% 30%; }
          75% { border-radius: 40% 60% 50% 50% / 60% 40% 40% 60%; }
        }

        @keyframes v5-bounce-in {
          0% { opacity: 0; transform: scale(0.3) rotate(-10deg); }
          50% { transform: scale(1.1) rotate(2deg); }
          70% { transform: scale(0.95) rotate(-1deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes v5-slide-up-bounce {
          0% { opacity: 0; transform: translateY(60px); }
          60% { transform: translateY(-10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes v5-pop {
          0% { transform: scale(1); }
          30% { transform: scale(0.92); }
          60% { transform: scale(1.08); }
          100% { transform: scale(1); }
        }

        .v5-loaded .v5-bounce-1 { animation: v5-bounce-in 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .v5-loaded .v5-bounce-2 { animation: v5-bounce-in 0.7s 0.15s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; opacity: 0; }
        .v5-loaded .v5-bounce-3 { animation: v5-bounce-in 0.7s 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; opacity: 0; }
        .v5-loaded .v5-slide-1 { animation: v5-slide-up-bounce 0.6s 0.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; opacity: 0; }
        .v5-loaded .v5-slide-2 { animation: v5-slide-up-bounce 0.6s 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; opacity: 0; }
        .v5-loaded .v5-slide-3 { animation: v5-slide-up-bounce 0.6s 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; opacity: 0; }
        .v5-loaded .v5-slide-4 { animation: v5-slide-up-bounce 0.6s 0.65s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; opacity: 0; }

        .v5-pop-active { animation: v5-pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }

        .v5-sticker {
          border-radius: 20px;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          cursor: pointer;
        }
        .v5-sticker:hover {
          transform: scale(1.05) rotate(-2deg);
        }

        .v5-cta-btn {
          background: var(--violet);
          color: white;
          border-radius: 20px;
          font-weight: 800;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          overflow: hidden;
        }
        .v5-cta-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 30px rgba(124, 58, 237, 0.35);
        }
        .v5-cta-btn:active {
          transform: scale(0.97);
        }

        .v5-phone-container {
          background: white;
          border-radius: 36px;
          padding: 6px;
          box-shadow: 
            0 20px 60px rgba(45, 45, 58, 0.15),
            0 0 80px rgba(${dominantColor}, 0.12);
        }

        /* Wavy divider */
        .v5-wave {
          position: relative;
        }
        .v5-wave::after {
          content: '';
          display: block;
          width: 100%;
          height: 40px;
          background: var(--sunflower);
          clip-path: url(#wave-clip);
        }

        /* Floating emoji */
        @keyframes v5-float-emoji {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-15px) rotate(5deg); }
          75% { transform: translateY(10px) rotate(-3deg); }
        }
        .v5-float-emoji {
          animation: v5-float-emoji 4s ease-in-out infinite;
        }

        .v5-badge-pill {
          border-radius: 16px;
          padding: 4px 14px;
          font-size: 13px;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
      `}</style>

      <div className={`v5-organic min-h-screen relative ${loaded ? 'v5-loaded' : ''}`}>
        {/* Background blobs */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div
            className="v5-blob-1 absolute -top-20 -right-20 w-[400px] h-[400px] opacity-20"
            style={{ background: 'var(--sunflower)' }}
          />
          <div
            className="v5-blob-2 absolute top-1/3 -left-32 w-[350px] h-[350px] opacity-15"
            style={{ background: 'var(--coral)' }}
          />
          <div
            className="v5-blob-3 absolute bottom-0 right-1/4 w-[300px] h-[300px] opacity-15"
            style={{ background: 'var(--sky)' }}
          />
        </div>

        {/* Nav */}
        <nav className="relative z-10 flex justify-between items-center px-5 md:px-10 py-4">
          <div className="display text-3xl text-[var(--violet)] tracking-tight v5-bounce-1">
            syly
          </div>
          <button
            onClick={handleClick}
            className="v5-sticker bg-[var(--sunflower)] text-[var(--text)] px-5 py-2.5 font-bold text-sm v5-bounce-2"
          >
            Download
          </button>
        </nav>

        {/* Hero */}
        <main className="relative z-10 px-5 md:px-10 pt-6 md:pt-10 pb-10">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 max-w-6xl mx-auto">
            {/* Left: Content */}
            <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
              {/* Floating emojis - decorative */}
              <div className="relative w-full mb-4">
                <span className="v5-float-emoji absolute -top-4 left-4 text-4xl" style={{ animationDelay: '0s' }}>🤣</span>
                <span className="v5-float-emoji absolute -top-2 right-8 text-3xl" style={{ animationDelay: '1.5s' }}>🙌</span>
                <span className="v5-float-emoji absolute top-6 left-1/3 text-2xl hidden md:block" style={{ animationDelay: '3s' }}>🔥</span>
              </div>

              {/* Title */}
              <h1 className="v5-bounce-1 display text-[52px] md:text-[80px] lg:text-[100px] leading-[0.95] mb-4" style={{ paddingTop: '20px' }}>
                <span className="text-[var(--violet)]">share</span>{" "}
                <span className="text-[var(--coral)]">memes</span>
                <br />
                <span className="text-[var(--text)]">get</span>{" "}
                <span className="inline-block" style={{ 
                  background: 'var(--sunflower)', 
                  borderRadius: '16px', 
                  padding: '0 16px',
                  transform: 'rotate(-2deg)',
                  display: 'inline-block'
                }}>
                  reactions
                </span>
              </h1>

              {/* Subtitle */}
              <p className="v5-slide-1 text-lg md:text-xl text-[var(--text)] opacity-60 max-w-md mb-6 font-medium">
                Syly captures your friends' genuine reactions to your memes. No fake laughs, just real joy between real friends.
              </p>

              {/* Feature pills */}
              <div className="v5-slide-2 flex flex-wrap justify-center lg:justify-start gap-2 mb-8">
                {[
                  { emoji: "📸", text: "Real reactions", bg: "var(--coral)", color: "white" },
                  { emoji: "👯", text: "Friend groups", bg: "var(--sky)", color: "white" },
                  { emoji: "🎉", text: "Pure fun", bg: "var(--sunflower)", color: "var(--text)" },
                  { emoji: "💜", text: "No cringe", bg: "var(--violet)", color: "white" },
                ].map((pill, i) => (
                  <span
                    key={pill.text}
                    className={`v5-badge-pill v5-sticker ${bounceTrigger === i ? 'v5-pop-active' : ''}`}
                    style={{ background: pill.bg, color: pill.color }}
                    onClick={() => triggerBounce(i)}
                  >
                    <span>{pill.emoji}</span>
                    <span>{pill.text}</span>
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="v5-slide-3 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <button
                  onClick={handleClick}
                  className="v5-cta-btn px-10 py-4 text-lg w-full sm:w-auto display tracking-wide"
                >
                  Get Syly Free
                </button>
              </div>

              {/* Store badges */}
              <div className="v5-slide-4 flex flex-col items-center lg:items-start gap-4 mt-6">
                <div className="flex gap-3">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                    alt="App Store"
                    className="h-10 w-auto cursor-pointer hover:scale-105 transition-transform"
                    onClick={handleClick}
                  />
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                    alt="Google Play"
                    className="h-10 w-auto cursor-pointer hover:scale-105 transition-transform"
                    onClick={handleClick}
                  />
                </div>

                {/* QR - desktop */}
                <div className="hidden md:flex v5-sticker bg-white px-4 py-3 items-center gap-3 shadow-sm">
                  <img src="/qr-code-apple.svg" alt="QR Code" className="w-14 h-14 rounded-xl" />
                  <div>
                    <p className="text-sm font-bold text-[var(--violet)]">Scan me!</p>
                    <p className="text-xs text-[var(--text)] opacity-50">Point your camera here</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Phone */}
            <div className="v5-bounce-3 flex-shrink-0 relative">
              {/* Decorative sticker elements */}
              <div
                className="absolute -top-6 -left-6 v5-sticker bg-[var(--coral)] text-white px-3 py-1.5 font-bold text-sm z-10 v5-float-emoji"
                style={{ animationDelay: '0.5s', transform: 'rotate(-8deg)' }}
              >
                so funny 😂
              </div>
              <div
                className="absolute -bottom-4 -right-4 v5-sticker bg-[var(--sky)] text-white px-3 py-1.5 font-bold text-sm z-10 v5-float-emoji"
                style={{ animationDelay: '2s', transform: 'rotate(5deg)' }}
              >
                no cap 🧢
              </div>

              <div className="v5-phone-container">
                <div className="rounded-[30px] overflow-hidden">
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
            </div>
          </div>
        </main>

        {/* Wavy section with social proof */}
        <div className="relative z-10 mt-8">
          <svg width="0" height="0">
            <defs>
              <clipPath id="wave-clip" clipPathUnits="objectBoundingBox">
                <path d="M0,0.4 C0.15,0 0.35,0.8 0.5,0.4 C0.65,0 0.85,0.8 1,0.4 L1,1 L0,1 Z" />
              </clipPath>
            </defs>
          </svg>
          <div style={{ 
            background: 'var(--sunflower)', 
            clipPath: 'polygon(0 30%, 100% 0%, 100% 100%, 0% 100%)',
            padding: '80px 20px 40px',
          }}>
            <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-8 md:gap-16 text-center">
              {[
                { num: "10K+", label: "Reactions Shared" },
                { num: "100%", label: "Real & Unfiltered" },
                { num: "0", label: "Followers Needed" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="display text-3xl md:text-4xl text-[var(--violet)]">{stat.num}</div>
                  <div className="text-sm font-bold text-[var(--text)] opacity-60 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="relative z-10 bg-[var(--sunflower)] px-5 md:px-10 py-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <div className="display text-xl text-[var(--violet)]">syly</div>
          <div className="flex gap-6">
            <a href="https://syly.notion.site/privacy-policy" target="_blank" className="text-[var(--text)] opacity-40 hover:opacity-70 text-sm font-bold transition-opacity">Privacy</a>
            <a href="https://syly.notion.site/privacy-policy" target="_blank" className="text-[var(--text)] opacity-40 hover:opacity-70 text-sm font-bold transition-opacity">Legal</a>
          </div>
        </footer>
      </div>
    </>
  );
}
