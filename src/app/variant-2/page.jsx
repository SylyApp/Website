"use client";
import React, { useState, useEffect, useRef } from "react";
import posthog from "posthog-js";

/*
 * VARIANT 2: AURORA DREAMSCAPE
 * Aesthetic: Ethereal, luminous gradient meshes with frosted glass panels.
 * Soft, iridescent palette (lavender, peach, cyan, mint) that shifts slowly.
 * Glassmorphism cards with backdrop-blur, floating orbs, and gentle parallax.
 * Typography: Delicate serif display paired with clean sans-serif body.
 * Feels like a calm, premium, aesthetically-pleasing social app.
 */

export default function Variant2() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [dominantColor, setDominantColor] = useState("255, 255, 255");
  const [loaded, setLoaded] = useState(false);

  const openForNewUsers = true;

  const handleClick = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/android/i.test(userAgent) && openForNewUsers) {
      window.open("https://getwaitlist.com/waitlist/25243", "_blank");
      posthog.capture("click_to_download", { button: "variant-2", platform: "Android" });
    } else if ((/iPad|iPhone|iPod/.test(userAgent) || /Macintosh/.test(userAgent)) && !window.MSStream && openForNewUsers) {
      window.open("https://apps.apple.com/de/app/syly/id6618152144", "_blank");
      posthog.capture("click_to_download", { button: "variant-2", platform: "IOS" });
    } else {
      window.open("https://getwaitlist.com/waitlist/25243", "_blank");
      posthog.capture("click_to_download", { button: "variant-2", platform: "Fallback" });
    }
  };

  useEffect(() => {
    setLoaded(true);
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouse = (e) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouse);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouse);
    };
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

  const orbStyle = (baseX, baseY, size, color, delay) => ({
    position: "absolute",
    width: size,
    height: size,
    borderRadius: "50%",
    background: color,
    filter: `blur(${parseInt(size) / 3}px)`,
    left: `calc(${baseX}% + ${(mousePos.x - 0.5) * 30}px)`,
    top: `calc(${baseY}% + ${(mousePos.y - 0.5) * 30}px)`,
    transition: "left 0.8s ease-out, top 0.8s ease-out",
    opacity: 0.6,
    animationDelay: delay,
  });

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

        .v2-aurora {
          --lavender: #C4B5FD;
          --peach: #FBBF94;
          --cyan: #67E8F9;
          --mint: #A7F3D0;
          --deep: #0F0A1E;
          --glass: rgba(255, 255, 255, 0.08);
          --glass-border: rgba(255, 255, 255, 0.12);
          font-family: 'DM Sans', sans-serif;
          background: var(--deep);
          color: white;
          overflow-x: hidden;
        }

        .v2-aurora h1, .v2-aurora h2, .v2-aurora .serif {
          font-family: 'Instrument Serif', serif;
        }

        .v2-glass {
          background: var(--glass);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid var(--glass-border);
          border-radius: 24px;
        }

        @keyframes v2-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(1deg); }
          66% { transform: translateY(10px) rotate(-1deg); }
        }

        @keyframes v2-gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes v2-fade-in {
          from { opacity: 0; transform: translateY(30px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes v2-orb-drift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(30px, -40px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(40px, 30px) scale(1.05); }
        }

        .v2-orb {
          animation: v2-orb-drift 20s ease-in-out infinite;
        }

        .v2-loaded .v2-hero-title {
          animation: v2-fade-in 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .v2-loaded .v2-hero-sub {
          animation: v2-fade-in 1s 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        .v2-loaded .v2-hero-phone {
          animation: v2-fade-in 1s 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        .v2-loaded .v2-hero-cta {
          animation: v2-fade-in 0.8s 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        .v2-loaded .v2-hero-badges {
          animation: v2-fade-in 0.8s 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }

        .v2-glow-btn {
          position: relative;
          overflow: hidden;
        }
        .v2-glow-btn::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: inherit;
          background: linear-gradient(135deg, var(--lavender), var(--peach), var(--cyan), var(--mint));
          background-size: 300% 300%;
          animation: v2-gradient-shift 4s ease infinite;
          z-index: -1;
        }
        .v2-glow-btn::after {
          content: '';
          position: absolute;
          inset: 2px;
          border-radius: inherit;
          background: rgba(15, 10, 30, 0.85);
          z-index: -1;
        }

        .v2-phone-glow {
          box-shadow: 
            0 0 80px rgba(${dominantColor}, 0.15),
            0 0 160px rgba(${dominantColor}, 0.08),
            0 20px 60px rgba(0, 0, 0, 0.4);
          animation: v2-float 8s ease-in-out infinite;
        }

        .v2-star {
          animation: v2-twinkle 3s ease-in-out infinite;
        }
        @keyframes v2-twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.8; }
        }
      `}</style>

      <div className={`v2-aurora min-h-screen relative ${loaded ? 'v2-loaded' : ''}`}>
        {/* Background orbs */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="v2-orb" style={orbStyle(10, 15, "400px", "radial-gradient(circle, rgba(196, 181, 253, 0.3), transparent 70%)", "0s")} />
          <div className="v2-orb" style={orbStyle(70, 20, "350px", "radial-gradient(circle, rgba(251, 191, 148, 0.25), transparent 70%)", "5s")} />
          <div className="v2-orb" style={orbStyle(50, 65, "500px", "radial-gradient(circle, rgba(103, 232, 249, 0.2), transparent 70%)", "10s")} />
          <div className="v2-orb" style={orbStyle(20, 75, "300px", "radial-gradient(circle, rgba(167, 243, 208, 0.2), transparent 70%)", "15s")} />
          {/* Small stars */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="v2-star absolute w-1 h-1 rounded-full bg-white"
              style={{
                left: `${10 + (i * 7.3) % 80}%`,
                top: `${5 + (i * 11.7) % 90}%`,
                animationDelay: `${i * 0.4}s`,
              }}
            />
          ))}
        </div>

        {/* Navigation */}
        <nav className="relative z-10 flex justify-between items-center px-6 md:px-12 py-5">
          <div className="serif text-2xl text-white/90 italic">syly</div>
          <button
            onClick={handleClick}
            className="text-sm font-medium text-white/70 hover:text-white transition-colors px-4 py-2 rounded-full border border-white/10 hover:border-white/20 hover:bg-white/5"
          >
            Download
          </button>
        </nav>

        {/* Hero */}
        <main className="relative z-10 flex flex-col items-center px-6 pt-8 md:pt-16 pb-20">
          {/* Title */}
          <div className="text-center mb-6 v2-hero-title">
            <h1 className="text-[64px] md:text-[120px] lg:text-[160px] font-normal leading-[0.9] tracking-tight">
              <span className="italic" style={{ 
                background: 'linear-gradient(135deg, var(--lavender) 0%, var(--peach) 40%, var(--cyan) 70%, var(--mint) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundSize: '200% 200%',
                animation: 'v2-gradient-shift 6s ease infinite',
              }}>
                Syly
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <div className="v2-hero-sub text-center max-w-md mb-10 md:mb-14">
            <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed">
              Share memes. Capture genuine reactions from your friends. 
              <span className="text-white/80 font-normal"> Pure joy, no performance.</span>
            </p>
          </div>

          {/* Phone mockup */}
          <div className="v2-hero-phone mb-10 md:mb-14">
            <div className="v2-glass p-2 rounded-[40px] v2-phone-glow">
              <div className="rounded-[36px] overflow-hidden relative">
                <video
                  ref={videoRef}
                  className="w-[250px] h-[500px] md:w-[270px] md:h-[540px] object-cover"
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

          {/* CTA Button */}
          <div className="v2-hero-cta mb-6">
            <button
              onClick={handleClick}
              className="v2-glow-btn rounded-full px-10 py-4 text-white font-medium text-lg tracking-wide hover:scale-105 transition-transform duration-300 relative z-10"
            >
              Get Syly Free
            </button>
          </div>

          {/* Store badges */}
          <div className="v2-hero-badges flex flex-col items-center gap-5">
            <div className="flex gap-4">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                alt="App Store"
                className="h-10 w-auto cursor-pointer hover:opacity-80 transition-opacity"
                onClick={handleClick}
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Google Play"
                className="h-10 w-auto cursor-pointer hover:opacity-80 transition-opacity"
                onClick={handleClick}
              />
            </div>

            {/* QR - desktop */}
            <div className="hidden md:flex v2-glass px-5 py-4 items-center gap-4 mt-2">
              <img src="/qr-code-apple.svg" alt="QR Code" className="w-14 h-14 rounded-lg" />
              <div>
                <p className="text-white/50 text-xs font-medium uppercase tracking-wider">Scan to download</p>
                <p className="text-white/30 text-xs mt-0.5">Available on iOS</p>
              </div>
            </div>
          </div>

          {/* Feature pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-14 max-w-lg">
            {[
              { emoji: "🤣", text: "Real Reactions" },
              { emoji: "🙌", text: "Friend Groups" },
              { emoji: "🔥", text: "Daily Memes" },
              { emoji: "💜", text: "Share Joy" },
            ].map((item, i) => (
              <div
                key={item.text}
                className="v2-glass px-4 py-2 flex items-center gap-2 text-sm text-white/60 hover:text-white/80 transition-colors cursor-default"
                style={{ animationDelay: `${0.7 + i * 0.1}s` }}
              >
                <span>{item.emoji}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </main>

        {/* Footer */}
        <footer className="relative z-10 flex justify-center gap-6 pb-8 text-white/20 text-xs">
          <a href="https://syly.notion.site/privacy-policy" target="_blank" className="hover:text-white/40 transition-colors">Privacy Policy</a>
          <a href="https://syly.notion.site/privacy-policy" target="_blank" className="hover:text-white/40 transition-colors">Legal</a>
        </footer>
      </div>
    </>
  );
}
