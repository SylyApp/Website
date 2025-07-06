"use client";
import React from "react";
import { useState, useEffect, useRef } from "react";
import posthog from "posthog-js";

//posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, { api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST, autocapture: false });

function MainComponent() {
  const [isHovered, setIsHovered] = useState(false);
  const [dominantColor, setDominantColor] = useState("255, 255, 255");
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isPulsing, setIsPulsing] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Animation starten, sobald die Komponente gemountet ist
    const timer = setTimeout(() => setIsLoaded(true), 100); // kleiner Delay für nice Effekt
    const pulseTimer = setTimeout(() => setIsPulsing(false), 600);
    return () => {
      clearTimeout(timer);
      clearTimeout(pulseTimer);
    };
  }, []);


  // Hier kannst du den Zustand für die Verfügbarkeit der App setzen
  const openForNewUsers = true; 

  // useEffect(() => {
  //   // Sicherstellen, dass PostHog nur im Browser initialisiert wird
  //   if (typeof window !== "undefined") {
  //     posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, { api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST});
  //   }
  // }, []);

  const handleClick = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/android/i.test(userAgent) && openForNewUsers) {
      window.open("https://getwaitlist.com/waitlist/25243", "_blank");
      posthog.capture("click_to_download", { button: "Click to Download Button", platform: "Android" });
    } else if ((/iPad|iPhone|iPod/.test(userAgent) || /Macintosh/.test(userAgent)) && !window.MSStream && openForNewUsers) {
     window.open("https://apps.apple.com/de/app/syly/id6618152144", "_blank");
     posthog.capture("click_to_download", { button: "Click to Download Button", platform: "IOS" });
    } else {
    // Fallback: z. B. auf Landing Page oder Waitlist
    window.open("https://getwaitlist.com/waitlist/25243", "_blank");
    posthog.capture("click_to_download", { button: "Click to Download Button", platform: "ElseOrClosedForNewUsers" });
    }
  };
  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
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
    <div className="min-h-screen w-full bg-black flex flex-col px-4 md:px-20 overflow-y-auto md:overflow-hidden">
      <div className="flex-1 flex flex-col md:flex-row items-center justify-between py-8 md:py-0 gap-8 md:gap-0">
        <div className={`order-1 md:w-1/2 flex flex-col items-center justify-center`}>
          <div className="text-center mb-8 md:mb-4">
            <h1 className="font-inter text-6xl md:text-[150px] text-white tracking-[-0.1em] lowercase font-black mb-4">
              SYLY
            </h1>
            <p className="text-white/80 text-2xl md:text-3xl font-inter text-center">
              reactions 🤣 from friends 🙌 on memes
            </p>
          </div>
          <div className="flex flex-col items-center">
  <img
    src="/qr-code.svg"
    alt="QR Code"
    className={`hidden md:block w-36 h-36 transform transition-all duration-300 ease-in-out ${
      isHovered ? "scale-120" : "scale-100"
    } ${isPulsing ? "animate-scale-pulse" : ""}`}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
  />
<p className="hidden md:block text-white/80 text-sm md:text-base italic font-inter text-center mt-2 mb-8">
  scan to download
</p>


  {/* App Store Badges */}
  <div className="flex gap-4 mb-4">
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
      alt="App Store"
      className="h-11 w-auto"
      onClick={handleClick}
    />
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
      alt="Google Play"
      className="h-11 w-auto"
      onClick={handleClick}
    />
  </div>


  {/* Der Button darunter */}
  <button
    className={`block md:hidden transform transition-all duration-300 ease-in-out ${
      isHovered ? "scale-110" : "scale-100"
    } bg-[#FFDF60] text-black font-inter px-10 py-4 rounded-full text-xl font-bold`}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    onClick={handleClick}
  >
    Get The App
  </button>
</div>
        </div>

        <div className="order-2 md:w-1/2 flex items-center justify-center">
  <div
    className={`relative w-[290px] h-[570px] bg-[rgba(0,0,0,0.5)] rounded-[40px] flex items-center justify-center shadow-glow`}
  >
    <video
      ref={videoRef}
      className="w-[280px] h-[560px] object-cover rounded-[40px]"
      autoPlay
      loop
      muted
      playsInline
    >
      <source src="website_video1.mp4" type="video/mp4" />
    </video>
    <canvas ref={canvasRef} width="1" height="1" className="hidden" />
  </div>
</div>



        <div className="order-3 md:hidden w-full flex justify-center mt-10 mb-8 hidden md:block">
          <button
            className={`transform transition-all duration-300 ease-in-out ${
              isHovered ? "scale-110" : "scale-100"
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick} 
          >
            <a
              //href="https://getwaitlist.com/waitlist/25243"
              className="bg-[#FFDF60] text-black font-inter px-10 py-5 rounded-full text-xl font-bold"
              target="_blank" 
              rel="noopener noreferrer" 
            >
              Click to Download
            </a>
          </button>
        </div>
      </div>

      <div className="w-full flex justify-end pb-4">
        <div className="flex gap-6">
          <a
            href="https://syly.notion.site/privacy-policy"
            className="text-white/20 hover:text-white/40 text-sm transition-colors duration-300"
            target="_blank" 
          >
            Privacy Policy
          </a>
          <a
            href="https://syly.notion.site/privacy-policy"
            className="text-white/20 hover:text-white/40 text-sm transition-colors duration-300"
            target="_blank" 
          >
            Legal
          </a>
        </div>
      </div>

      <style jsx global>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }

        .shadow-glow {
          animation: shadowPulse 4s infinite;
          box-shadow: 0 0 100px rgba(${dominantColor}, 0.2);
        }

        @keyframes shadowPulse {
          0% { box-shadow: 0 0 100px rgba(${dominantColor}, 0.1); }
          50% { box-shadow: 0 0 150px rgba(${dominantColor}, 0.25); }
          100% { box-shadow: 0 0 100px rgba(${dominantColor}, 0.1); }
        }
      `}</style>
    </div>
  );
}

export default MainComponent;