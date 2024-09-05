import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap';

const App = () => {
  const [timeLeft, setTimeLeft] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

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
      xPercent: -100, // Move the black screen to the left
      duration: 7,
      ease: "power2.out",
      ease: "power1.in",
      onComplete: () => setIsLoaded(true), // Show content after animation
    });
  }, []);
  return (

    <div className="relative min-h-screen overflow-hidden bg-gray-800 text-white">
      {/* Black screen overlay with message */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black flex items-center justify-center text-center"
        style={{ transform: 'translateX(0%)' }} // Start position on-screen
      >
        <div className="text-white p-8">
          <h1 className="text-3xl font-bold mb-4">Exciting Travel Experience Coming Soon!</h1>
          <p className="text-md">Track expenses, organize checklists, book flights and hotels, and share your travel stories—all in one place. Stay tuned for our launch!</p>
        </div>
      </div>

      {/* Main content */}
      <div
        ref={contentRef}
        className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ zIndex: isLoaded ? 10 : -1 }} // Ensure content is above the overlay
      >
        <h1 className="text-5xl font-bold mb-6">Exciting Travels Await!</h1>
        <p className="text-xl mb-8">Our new travel experience is launching soon. Stay tuned!</p>
        <div className="flex space-x-4 text-center">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
            <p className="text-3xl font-semibold">{timeLeft.days || 0}</p>
            <p className="text-sm text-gray-300">Days</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
            <p className="text-3xl font-semibold">{timeLeft.hours || 0}</p>
            <p className="text-sm text-gray-300">Hours</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
            <p className="text-3xl font-semibold">{timeLeft.minutes || 0}</p>
            <p className="text-sm text-gray-300">Minutes</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
            <p className="text-3xl font-semibold">{timeLeft.seconds || 0}</p>
            <p className="text-sm text-gray-300">Seconds</p>
          </div>
        </div>
      </div>
    </div>

  )
}

export default App
