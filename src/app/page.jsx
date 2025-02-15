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

  // useEffect(() => {
  //   // Sicherstellen, dass PostHog nur im Browser initialisiert wird
  //   if (typeof window !== "undefined") {
  //     posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, { api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST});
  //   }
  // }, []);

  const handleClick = () => {
    posthog.capture("click_to_download", { button: "Click to Download Button" }); // Event senden
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
        <div className="order-1 md:w-1/2 flex flex-col items-center justify-center">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="font-inter text-6xl md:text-[150px] text-white tracking-[-0.1em] lowercase font-black mb-4">
              syly
            </h1>
            <p className="text-white/80 text-lg md:text-xl font-inter text-center">
              reactions 🤣 from friends 🙌 on memes
            </p>
          </div>
          <div className="hidden md:block">
            <button
              className={`transform transition-all duration-300 ease-in-out ${
                isHovered ? "scale-110" : "scale-100"
              }`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={handleClick} 
            >
              <a
                href="https://getwaitlist.com/waitlist/19042"
                className="bg-[#FFDF60] text-black font-inter px-8 py-4 rounded-full text-lg font-bold"
                target="_blank" 
                rel="noopener noreferrer" 
              >
                Click to Download
              </a>
            </button>
          </div>
        </div>

        <div className="order-2 md:w-1/2 flex items-center justify-center">
          <div
            className={`relative w-[300px] h-[600px] bg-black rounded-[50px] border-4 border-[#333] flex items-center justify-center shadow-glow`}
          >
            <div className="absolute top-0 w-[120px] h-[25px] bg-black rounded-b-[12px]">
              <div className="absolute left-[50%] top-[6px] transform translate-x-[-50%] w-[60px] h-[6px] bg-[#333] rounded-full flex items-center justify-between px-1">
                <div className="w-[8px] h-[8px] rounded-full bg-[#222]"></div>
                <div className="w-[10px] h-[4px] rounded-full bg-[#222]"></div>
              </div>
            </div>
            <div className="absolute right-[-4px] top-[120px] h-[30px] w-[4px] bg-[#333] rounded-l-lg"></div>
            <div className="absolute right-[-4px] top-[170px] h-[60px] w-[4px] bg-[#333] rounded-l-lg"></div>
            <div className="absolute right-[-4px] top-[250px] h-[60px] w-[4px] bg-[#333] rounded-l-lg"></div>
            <div className="absolute left-[-4px] top-[170px] h-[100px] w-[4px] bg-[#333] rounded-r-lg"></div>
            <video
              ref={videoRef}
              className="w-[280px] h-[560px] object-cover rounded-[40px]"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="example5.mp4" type="video/mp4" />
            </video>
            <canvas ref={canvasRef} width="1" height="1" className="hidden" />
          </div>
        </div>

        <div className="order-3 md:hidden w-full flex justify-center mt-8">
          <button
            className={`transform transition-all duration-300 ease-in-out ${
              isHovered ? "scale-110" : "scale-100"
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick} 
          >
            <a
              href="https://getwaitlist.com/waitlist/19042"
              className="bg-[#FFDF60] text-black font-inter px-6 py-3 rounded-full text-base font-bold"
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
            href="https://judicious-price-84b.notion.site/dataatsyly"
            className="text-white/20 hover:text-white/40 text-sm transition-colors duration-300"
            target="_blank" 
          >
            Privacy
          </a>
          <a
            href="https://judicious-price-84b.notion.site/syly-About-Site-483304a1b6ca4025810f907d0e83f3e3"
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