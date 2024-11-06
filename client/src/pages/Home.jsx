import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import video1 from "../../public/Project-Images/bghome.mp4";
import bg from '../../public/bg.jpg'

const Home = () => {
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

  useEffect(() => {
    // GSAP animation for the welcome message
    setTimeout(() => {
      gsap.fromTo(
        '.welcome-message',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out' }
      );

      // GSAP animations for each section with delay and stagger
      gsap.fromTo('.section',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.3, delay: 2 }
      );
    }, 7000);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-800 text-white">
      <div className="relative" ref={comp}>
        <div
          id="intro-slider"
          className="h-screen p-10 bg-gray-50 absolute top-0 left-0 font-spaceGrotesk z-10 w-full flex flex-col gap-6 md:gap-10 lg:gap-12 tracking-tight"
        >
          <h1 className="text-5xl text-center font-bold pt-40 text-black md:text-5xl md:font-normal  md:p-0 md:text-start lg:text-9xl " id="title-1">
            Adventure Awaits
          </h1>
          <h1 className="text-5xl text-center font-bold text-black md:text-5xl md:font-normal md:text-start lg:text-9xl " id="title-2">
            Your Journey Starts
          </h1>
          <h1 className="text-5xl text-center font-bold text-black md:text-5xl md:font-normal  md:text-start lg:text-9xl " id="title-3">
            Stay Tuned...
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
          {/* <video
            className="absolute object-cover w-full h-full"
            autoPlay
            muted
            loop
            src={video1} // Replace with your video source
          /> */}



          <div className="w-full h-screen bg-black">
            <div className="relative flex flex-col items-center justify-center text-white w-full h-screen">

              {/* Background Image Div (Behind the Text) */}
              <div
                className="absolute top-0 left-0 w-full h-full"
                style={{
                  // backgroundImage: `url('https://i.pinimg.com/564x/d9/54/87/d95487ffab31b9722b12eaf0e5709494.jpg')`,
                  backgroundImage: `url(${bg})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  zIndex: -1,
                }}
              ></div>

              {/* Animated "Go-Traveling" Text */}
              <h1
                className="welcome-message text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl tracking-tighter font-[700] text-center relative z-10 h-[100px]"
                style={{
                  // backgroundImage: `url('https://i.pinimg.com/564x/d9/54/87/d95487ffab31b9722b12eaf0e5709494.jpg')`,
                  backgroundImage: `url(${bg})`,

                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  WebkitBackgroundClip: 'text', // Clips the background to the text shape
                  color: 'transparent', // Make the text color transparent to show the background image
                  display: 'inline-block', // Ensure text is inline to respect the background image clipping
                  lineHeight: 1, // Adjust line height to prevent misalignment with other elements
                  textAlign: 'center', // Center the text
                }}
              >
                Welcome to Go-Traveling!
              </h1>


              {/* Short Descriptions */}
              <div className="description text-center mt-10 w-3/4 sm:w-1/2 text-white px-4 sm:text-lg md:text-xl lg:text-[15px]">
                <p className="section">🌍 Discover new destinations and share your journey.</p>
                <p className="section">✈️ Plan your next adventure with fellow travelers.</p>
                <p className="section">💬 Connect, share, and make memories with a global community.</p>
                <p className="section">🌟 Explore, plan, and start your journey today!</p>
              </div>

              {/* Excitement Message about Future Features */}
              <p className="section text-center mt-10 font-semibold text-xl">
                🚀 **Exciting things are coming soon!** New features, tools, and adventures await you. Stay tuned for the next big update!
              </p>

              {/* Final Motivational Message */}
              <p className="section text-center mt-8 font-bold text-2xl">
                The world is waiting. Let’s explore it together. 🌎
              </p>
            </div>
          </div>




        </div>
      </div>
    </div>
  );
}

export default Home;

