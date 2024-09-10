import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import video1 from "../public/Project-Images/bghome.mp4";

const App = () => {
  const [timeLeft, setTimeLeft] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const textRefs = useRef([]);
  textRefs.current = [];
  const comp = useRef(null);

  // Function to calculate time left
  const calculateTimeLeft = () => {
    const targetDate = new Date('2024-09-30T23:59:59'); // Target date: September 30, 2024
    const now = new Date();
    const difference = targetDate - now;

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    }

    return timeLeft;
  };

  // Set up timer interval
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Animation effect on load
  useEffect(() => {
    gsap.to(overlayRef.current, {
      xPercent: +100, // Move the black screen to the left
      duration: 7, // Adjust the duration to make the animation slower
      ease: "power2.out",
      onComplete: () => setIsLoaded(true), // Show content after animation
    });
  }, []);

  // Animation effect for content
  useEffect(() => {
    if (isLoaded) {
      gsap.from(textRefs.current, {
        opacity: 0,
        y: 50,
        stagger: 0.5,
        duration: 1,
        ease: "power1.out",
      });
    }
  }, [isLoaded]);

  const addToRefs = (el) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
    }
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      const t1 = gsap.timeline()
      t1.from("#intro-slider", {
        xPercent: "-100",
        duration: 1.3,
        delay: 0.3,
      })
        .from(["#title-1", "#title-2", "#title-3"], {
          opacity: 0,
          y: "+=30",
          stagger: 0.5,
        })
        .to(["#title-1", "#title-2", "#title-3"], {
          opacity: 0,
          y: "-=30",
          delay: 0.3,
          stagger: 0.5,
        })
        .to("#intro-slider", {
          xPercent: "-100",
          duration: 1.3,
        })
        .from("#welcome", {
          opacity: 0,
          duration: 0.5,
        });
    }, comp);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-800 text-white">
      {/* Black screen overlay with message */}
      <div className="absolute inset-0 bg-black z-50 flex flex-col items-center justify-center" ref={overlayRef}>
        <p className="text-white text-2xl md:text-4xl lg:text-5xl font-bold">Loading...</p>
        {/* <h1 className="text-white text-2xl md:text-4xl lg:text-5xl font-bold" >Exciting Travel Experience Coming Soon...</h1> */}
      </div>

      <div className="relative" ref={comp}>
        <div
          id="intro-slider"
          className="h-screen p-10 bg-gray-50 absolute top-0 left-0 font-spaceGrotesk z-10 w-full flex flex-col gap-6 md:gap-10 lg:gap-12 tracking-tight"
        >
          <h1 className="text-4xl pt-36 md:text-5xl lg:text-6xl font-bold text-center text-black" id="title-1">
            "Adventure Awaits"
          </h1>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-black" id="title-2">
            "Your Journey Starts"
          </h1>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-black" id="title-3">
            "Stay Tuned"
          </h1>
        </div>
        <div className="h-screen flex bg-gray-950 justify-center items-center">
          <h1
            id="welcome"
            className="text-6xl md:text-7xl lg:text-9xl font-bold text-gray-100 font-spaceGrotesk"
          >
            Welcome.
          </h1>
        </div>
      </div>

      <div
        ref={contentRef}
        className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ zIndex: isLoaded ? 10 : -1 }} // Ensure content is above the overlay
      >
                <div className="absolute inset-0 flex flex-col items-center justify-center">
          <video
            className="absolute object-cover w-full h-full"
            autoPlay
            muted
            loop
            src={video1} // Replace with your video source
          />
          <div className="relative min-h-screen bg-opacity-60 flex flex-col items-center justify-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" ref={addToRefs}>
              Exciting Travels Await!
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-6 px-4 md:px-8 lg:px-12 text-center" ref={addToRefs}>
              Our new travel experience is launching soon. Stay tuned!
            </p>
            <p className="text-sm md:text-lg lg:text-xl mb-6 px-4 md:px-8 lg:px-16 text-center" ref={addToRefs}>
              The future of travel is on the horizon. We’re working on something amazing that will change the way you plan and experience your trips. Keep your eyes peeled and stay tuned for more details. The countdown to an incredible journey starts now!
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8 text-center">
              <div className="bg-gray-900 p-4 md:p-6 lg:p-8 rounded-lg shadow-lg flex flex-col items-center" ref={addToRefs}>
                <p className="text-2xl md:text-3xl lg:text-4xl font-semibold">{timeLeft.days || 0}</p>
                <p className="text-sm md:text-base lg:text-lg text-gray-300">Days</p>
              </div>
              <div className="bg-gray-900 p-4 md:p-6 lg:p-8 rounded-lg shadow-lg flex flex-col items-center" ref={addToRefs}>
                <p className="text-2xl md:text-3xl lg:text-4xl font-semibold">{timeLeft.hours || 0}</p>
                <p className="text-sm md:text-base lg:text-lg text-gray-300">Hours</p>
              </div>
              <div className="bg-gray-900 p-4 md:p-6 lg:p-8 rounded-lg shadow-lg flex flex-col items-center" ref={addToRefs}>
                <p className="text-2xl md:text-3xl lg:text-4xl font-semibold">{timeLeft.minutes || 0}</p>
                <p className="text-sm md:text-base lg:text-lg text-gray-300">Minutes</p>
              </div>
              <div className="bg-gray-900 p-4 md:p-6 lg:p-8 rounded-lg shadow-lg flex flex-col items-center" ref={addToRefs}>
                <p className="text-2xl md:text-3xl lg:text-4xl font-semibold">{timeLeft.seconds || 0}</p>
                <p className="text-sm md:text-base lg:text-lg text-gray-300">Seconds</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

