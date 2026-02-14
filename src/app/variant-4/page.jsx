"use client";
import React, { useState, useEffect, useRef } from "react";
import posthog from "posthog-js";

/*
 * VARIANT 4: EDITORIAL / HIGH-FASHION MAGAZINE
 * Aesthetic: Stark black & white with a single bold accent (vermilion red).
 * Big editorial typography, asymmetric layout, dramatic white space.
 * Inspired by fashion magazines, Kinfolk, and The New York Times style section.
 * Typography: Condensed serif display + elegant sans body.
 * The phone mockup breaks the grid. Text runs large. Everything breathes.
 */

export default function Variant4() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [dominantColor, setDominantColor] = useState("255, 255, 255");
  const [loaded, setLoaded] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState(null);

  const openForNewUsers = true;

  const handleClick = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/android/i.test(userAgent) && openForNewUsers) {
      window.open("https://getwaitlist.com/waitlist/25243", "_blank");
      posthog.capture("click_to_download", { button: "variant-4", platform: "Android" });
    } else if ((/iPad|iPhone|iPod/.test(userAgent) || /Macintosh/.test(userAgent)) && !window.MSStream && openForNewUsers) {
      window.open("https://apps.apple.com/de/app/syly/id6618152144", "_blank");
      posthog.capture("click_to_download", { button: "variant-4", platform: "IOS" });
    } else {
      window.open("https://getwaitlist.com/waitlist/25243", "_blank");
      posthog.capture("click_to_download", { button: "variant-4", platform: "Fallback" });
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

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Outfit:wght@300;400;500;600&display=swap');

        .v4-editorial {
          --red: #E53935;
          --black: #111111;
          --white: #FAFAF8;
          --gray: #999;
          font-family: 'Outfit', sans-serif;
          background: var(--white);
          color: var(--black);
          overflow-x: hidden;
        }
        .v4-editorial .display {
          font-family: 'Playfair Display', serif;
        }

        @keyframes v4-reveal {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes v4-reveal-scale {
          from { opacity: 0; transform: scale(0.92); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes v4-line-grow {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        @keyframes v4-slide-in-right {
          from { opacity: 0; transform: translateX(60px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .v4-loaded .v4-r1 { animation: v4-reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .v4-loaded .v4-r2 { animation: v4-reveal 0.8s 0.15s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
        .v4-loaded .v4-r3 { animation: v4-reveal-scale 0.8s 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
        .v4-loaded .v4-r4 { animation: v4-reveal 0.6s 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
        .v4-loaded .v4-r5 { animation: v4-slide-in-right 0.6s 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
        .v4-loaded .v4-line { animation: v4-line-grow 0.8s 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; transform: scaleX(0); transform-origin: left; }

        .v4-phone-editorial {
          box-shadow: 
            0 40px 80px rgba(0, 0, 0, 0.12),
            0 0 60px rgba(${dominantColor}, 0.08);
        }

        .v4-feature-item {
          border-bottom: 1px solid rgba(17, 17, 17, 0.1);
          transition: all 0.3s ease;
          cursor: default;
        }
        .v4-feature-item:hover {
          padding-left: 16px;
          border-color: var(--red);
        }
        .v4-feature-item:hover .v4-feature-num {
          color: var(--red);
        }

        .v4-red-btn {
          background: var(--red);
          color: white;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .v4-red-btn:hover {
          background: #C62828;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(229, 57, 53, 0.3);
        }

        .v4-marquee {
          display: flex;
          animation: v4-marquee 20s linear infinite;
        }
        @keyframes v4-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>

      <div className={`v4-editorial min-h-screen ${loaded ? 'v4-loaded' : ''}`}>
        {/* Nav */}
        <nav className="flex justify-between items-center px-6 md:px-12 lg:px-20 py-5 border-b border-[rgba(17,17,17,0.08)]">
          <div className="display text-2xl md:text-3xl font-bold tracking-tight italic">Syly</div>
          <div className="flex items-center gap-6">
            <span className="hidden md:block text-xs uppercase tracking-[0.2em] text-[var(--gray)]">Est. 2024</span>
            <button
              onClick={handleClick}
              className="v4-red-btn px-5 py-2.5 rounded-full text-sm font-medium"
            >
              Download
            </button>
          </div>
        </nav>

        {/* Hero */}
        <section className="px-6 md:px-12 lg:px-20 pt-10 md:pt-16 lg:pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4">
            {/* Left: Title */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="v4-r1">
                <span className="text-xs uppercase tracking-[0.3em] text-[var(--red)] font-medium mb-4 block">The Social App for Real Ones</span>
              </div>

              <h1 className="display v4-r1 text-[56px] md:text-[80px] lg:text-[110px] xl:text-[130px] font-black leading-[0.9] tracking-tight mb-6">
                Memes In,
                <br />
                <span className="italic font-normal text-[var(--red)]">Joy</span> Out
              </h1>

              <div className="v4-line h-[2px] bg-[var(--black)] w-full max-w-xs mb-6" />

              <p className="v4-r2 text-lg md:text-xl text-[var(--gray)] max-w-md leading-relaxed font-light">
                Syly captures the raw, unfiltered reactions your friends have to your memes. No likes, no followers{"\u2014"}just genuine moments of joy between people who actually know each other.
              </p>

              {/* CTA row */}
              <div className="v4-r4 flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-8">
                <button
                  onClick={handleClick}
                  className="v4-red-btn px-8 py-4 rounded-full text-base font-medium flex items-center gap-2"
                >
                  <span>Get Syly Free</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7" /><path d="M7 7h10v10" />
                  </svg>
                </button>

                <div className="flex gap-3">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                    alt="App Store"
                    className="h-10 w-auto cursor-pointer hover:opacity-70 transition-opacity"
                    onClick={handleClick}
                  />
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                    alt="Google Play"
                    className="h-10 w-auto cursor-pointer hover:opacity-70 transition-opacity"
                    onClick={handleClick}
                  />
                </div>
              </div>

              {/* QR - desktop */}
              <div className="v4-r4 hidden md:flex items-center gap-4 mt-8 pt-6 border-t border-[rgba(17,17,17,0.08)]" style={{ animationDelay: '0.6s' }}>
                <img src="/qr-code-apple.svg" alt="QR Code" className="w-16 h-16" />
                <div>
                  <p className="text-xs uppercase tracking-widest text-[var(--gray)]">Scan to download</p>
                  <p className="text-xs text-[var(--gray)] opacity-60 mt-0.5">Point your camera here</p>
                </div>
              </div>
            </div>

            {/* Right: Phone */}
            <div className="lg:col-span-5 flex items-center justify-center lg:justify-end v4-r3">
              <div className="relative">
                {/* Red accent line */}
                <div className="absolute -left-6 top-1/4 w-12 h-[2px] bg-[var(--red)] hidden lg:block" />
                
                <div className="v4-phone-editorial rounded-[40px] overflow-hidden">
                  <video
                    ref={videoRef}
                    className="w-[260px] h-[520px] md:w-[280px] md:h-[560px] object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    <source src="/website_video2.mp4" type="video/mp4" />
                  </video>
                  <canvas ref={canvasRef} width="1" height="1" className="hidden" />
                </div>

                {/* Floating label */}
                <div className="v4-r5 absolute -right-4 md:-right-16 bottom-20 bg-[var(--black)] text-[var(--white)] px-4 py-3 rounded-lg">
                  <p className="text-xs font-medium uppercase tracking-wider">Live Preview</p>
                  <p className="text-[10px] text-[var(--gray)] mt-0.5">Real app footage</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features strip */}
        <section className="px-6 md:px-12 lg:px-20 py-16 md:py-24">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.3em] text-[var(--red)] font-medium mb-8 block">How it works</span>
            {[
              { num: "01", title: "Send a meme", desc: "Share the funniest thing you've found with your friend group." },
              { num: "02", title: "Watch them react", desc: "Syly captures their genuine, unfiltered face reactions in real time." },
              { num: "03", title: "Share the moment", desc: "Save and share those candid reactions. The meme is the setup, the reaction is the punchline." },
            ].map((item, i) => (
              <div
                key={item.num}
                className="v4-feature-item py-5 flex items-start gap-6"
                onMouseEnter={() => setHoveredFeature(i)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <span className="v4-feature-num display text-2xl md:text-3xl font-bold text-[var(--gray)] transition-colors">{item.num}</span>
                <div>
                  <h3 className="display text-xl md:text-2xl font-bold mb-1">{item.title}</h3>
                  <p className="text-sm text-[var(--gray)] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Marquee */}
        <div className="border-t border-b border-[rgba(17,17,17,0.08)] py-4 overflow-hidden">
          <div className="v4-marquee">
            {Array(3).fill(null).map((_, i) => (
              <div key={i} className="flex items-center gap-8 shrink-0 px-4">
                <span className="display text-3xl md:text-4xl font-black italic text-[var(--black)]">Syly</span>
                <span className="text-[var(--red)] text-2xl">*</span>
                <span className="text-sm uppercase tracking-[0.3em] text-[var(--gray)]">Reactions from friends</span>
                <span className="text-[var(--red)] text-2xl">*</span>
                <span className="display text-3xl md:text-4xl font-black text-[var(--black)]">Memes</span>
                <span className="text-[var(--red)] text-2xl">*</span>
                <span className="text-sm uppercase tracking-[0.3em] text-[var(--gray)]">Pure Joy</span>
                <span className="text-[var(--red)] text-2xl">*</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="px-6 md:px-12 lg:px-20 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="display text-lg italic text-[var(--gray)]">Syly {new Date().getFullYear()}</div>
          <div className="flex gap-6">
            <a href="https://syly.notion.site/privacy-policy" target="_blank" className="text-xs uppercase tracking-widest text-[var(--gray)] hover:text-[var(--red)] transition-colors">Privacy</a>
            <a href="https://syly.notion.site/privacy-policy" target="_blank" className="text-xs uppercase tracking-widest text-[var(--gray)] hover:text-[var(--red)] transition-colors">Legal</a>
          </div>
        </footer>
      </div>
    </>
  );
}
