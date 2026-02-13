"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

export default function DigitalFlower() {
  useEffect(() => {
    // Remove not-loaded class after component mounts to start animation
    const timer = setTimeout(() => {
      const container = document.getElementById("flower-container");
      if (container) {
        container.classList.remove("not-loaded");
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="mx-auto max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8 text-center"
      >
        <h2 className="mb-2 text-2xl sm:text-3xl md:text-4xl text-[#ffb3d9] drop-shadow-[0_0_10px_rgba(255,179,217,0.8)]">
          Your Digital Flower
        </h2>
        <p className="text-sm sm:text-base text-[#ff6b9d]">
          Watch it bloom and grow
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, type: "spring" }}
        id="flower-container"
        className="flower-wrapper not-loaded relative min-h-[600px] overflow-hidden rounded-none border-4 border-[#ff6b9d] sm:min-h-[700px]"
        style={{
          boxShadow: `
            0 0 0 2px #1a0a2e,
            0 0 0 6px #ff6b9d,
            0 0 40px rgba(255, 107, 157, 0.5),
            inset 0 0 30px rgba(255, 107, 157, 0.1)
          `,
        }}
      >
        <style jsx global>{`
          .flower-wrapper {
            display: flex !important;
            align-items: flex-end !important;
            justify-content: center !important;
            perspective: 1000px !important;
            padding: 50px 0px !important;
            position: relative !important;
          }

          .flower-wrapper .night {
            position: absolute;
            left: 50%;
            top: 0;
            transform: translateX(-50%);
            width: 100%;
            height: 100%;
            filter: blur(0.1vmin);
            pointer-events: none;
          }

          .flower-wrapper .flowers {
            position: relative;
            transform: scale(0.9);
            z-index: 10;
          }

          .flower-wrapper .flower {
            position: absolute;
            bottom: 10vmin;
            transform-origin: bottom center;
            z-index: 10;
            --fl-speed: 0.8s;
          }

          .flower-wrapper .flower--1 {
            animation: moving-flower-1 4s linear infinite;
          }

          .flower-wrapper .flower--1 .flower__line {
            height: 70vmin;
            animation-delay: 0.3s;
          }

          .flower-wrapper .flower--2 {
            left: 50%;
            transform: rotate(20deg);
            animation: moving-flower-2 4s linear infinite;
          }

          .flower-wrapper .flower--2 .flower__line {
            height: 60vmin;
            animation-delay: 0.6s;
          }

          .flower-wrapper .flower--3 {
            left: 50%;
            transform: rotate(-15deg);
            animation: moving-flower-3 4s linear infinite;
          }

          .flower-wrapper .flower__leafs {
            position: relative;
            animation: blooming-flower 2s backwards;
          }

          .flower-wrapper .flower__leafs--1 {
            animation-delay: 1.1s;
          }

          .flower-wrapper .flower__leafs--2 {
            animation-delay: 1.4s;
          }

          .flower-wrapper .flower__leafs--3 {
            animation-delay: 1.7s;
          }

          .flower-wrapper .flower__leaf {
            position: absolute;
            bottom: 0;
            left: 50%;
            width: 8vmin;
            height: 11vmin;
            border-radius: 51% 49% 47% 53%/44% 45% 55% 69%;
            background-color: #a7ffee;
            background-image: linear-gradient(to top, #54b8aa, #a7ffee);
            transform-origin: bottom center;
            opacity: 0.9;
            box-shadow: inset 0 0 2vmin rgba(255, 255, 255, 0.5);
          }

          .flower-wrapper .flower__leaf--1 {
            transform: translate(-10%, 1%) rotateY(40deg) rotateX(-50deg);
          }

          .flower-wrapper .flower__leaf--2 {
            transform: translate(-50%, -4%) rotateX(40deg);
          }

          .flower-wrapper .flower__leaf--3 {
            transform: translate(-90%, 0%) rotateY(45deg) rotateX(50deg);
          }

          .flower-wrapper .flower__leaf--4 {
            width: 8vmin;
            height: 8vmin;
            transform-origin: bottom left;
            border-radius: 4vmin 10vmin 4vmin 4vmin;
            transform: translate(0%, 18%) rotateX(70deg) rotate(-43deg);
            background-image: linear-gradient(to top, #39c6d6, #a7ffee);
            z-index: 1;
            opacity: 0.8;
          }

          .flower-wrapper .flower__white-circle {
            position: absolute;
            left: -3.5vmin;
            top: -3vmin;
            width: 9vmin;
            height: 4vmin;
            border-radius: 50%;
            background-color: #fff;
          }

          .flower-wrapper .flower__line {
            height: 55vmin;
            width: 1.5vmin;
            background-image: linear-gradient(to left, rgba(0, 0, 0, 0.2), transparent, rgba(255, 255, 255, 0.2)), linear-gradient(to top, transparent 10%, #14757a, #39c6d6);
            box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.5);
            animation: grow-flower-tree 4s backwards;
          }

          .flower-wrapper .flower__line__leaf {
            --w: 7vmin;
            --h: calc(var(--w) + 2vmin);
            position: absolute;
            top: 20%;
            left: 90%;
            width: var(--w);
            height: var(--h);
            border-top-right-radius: var(--h);
            border-bottom-left-radius: var(--h);
            background-image: linear-gradient(to top, rgba(20, 117, 122, 0.4), #39c6d6);
          }

          .flower-wrapper .flower__line__leaf--1 {
            transform: rotate(70deg) rotateY(30deg);
            animation: blooming-leaf-right var(--fl-speed) 1.6s backwards;
          }

          .flower-wrapper .flower--1 .flower__line__leaf--2 {
            top: 45%;
            transform: rotate(70deg) rotateY(30deg);
            animation: blooming-leaf-right var(--fl-speed) 1.4s backwards;
          }

          .flower-wrapper .flower--1 .flower__line__leaf--3 {
            border-top-right-radius: 0;
            border-bottom-left-radius: 0;
            border-top-left-radius: var(--h);
            border-bottom-right-radius: var(--h);
            left: -460%;
            top: 12%;
            transform: rotate(-70deg) rotateY(30deg);
            animation: blooming-leaf-left var(--fl-speed) 1.2s backwards;
          }

          .flower-wrapper .flower--1 .flower__line__leaf--4 {
            border-top-right-radius: 0;
            border-bottom-left-radius: 0;
            border-top-left-radius: var(--h);
            border-bottom-right-radius: var(--h);
            left: -460%;
            top: 40%;
            transform: rotate(-70deg) rotateY(30deg);
            animation: blooming-leaf-left var(--fl-speed) 1s backwards;
          }

          .flower-wrapper .flower__light {
            position: absolute;
            bottom: 0vmin;
            width: 1vmin;
            height: 1vmin;
            background-color: rgb(255, 251, 0);
            border-radius: 50%;
            filter: blur(0.2vmin);
            animation: light-ans 4s linear infinite backwards;
          }

          .flower-wrapper .flower__light:nth-child(odd) {
            background-color: #23f0ff;
          }

          .flower-wrapper .flower__light--1 {
            left: -2vmin;
            animation-delay: 1s;
          }

          .flower-wrapper .flower__light--2 {
            left: 3vmin;
            animation-delay: 0.5s;
          }

          .flower-wrapper .not-loaded * {
            animation-play-state: paused !important;
          }

          @keyframes moving-flower-1 {
            0%, 100% {
              transform: rotate(2deg);
            }
            50% {
              transform: rotate(-2deg);
            }
          }

          @keyframes moving-flower-2 {
            0%, 100% {
              transform: rotate(18deg);
            }
            50% {
              transform: rotate(14deg);
            }
          }

          @keyframes moving-flower-3 {
            0%, 100% {
              transform: rotate(-18deg);
            }
            50% {
              transform: rotate(-20deg) rotateY(-10deg);
            }
          }

          @keyframes blooming-leaf-right {
            0% {
              transform-origin: left;
              transform: rotate(70deg) rotateY(30deg) scale(0);
            }
          }

          @keyframes blooming-leaf-left {
            0% {
              transform-origin: right;
              transform: rotate(-70deg) rotateY(30deg) scale(0);
            }
          }

          @keyframes grow-flower-tree {
            0% {
              height: 0;
              border-radius: 1vmin;
            }
          }

          @keyframes blooming-flower {
            0% {
              transform: scale(0);
            }
          }

          @keyframes light-ans {
            0% {
              opacity: 0;
              transform: translateY(0vmin);
            }
            25% {
              opacity: 1;
              transform: translateY(-5vmin) translateX(-2vmin);
            }
            50% {
              opacity: 1;
              transform: translateY(-15vmin) translateX(2vmin);
              filter: blur(0.2vmin);
            }
            75% {
              transform: translateY(-20vmin) translateX(-2vmin);
              filter: blur(0.2vmin);
            }
            100% {
              transform: translateY(-30vmin);
              opacity: 0;
              filter: blur(1vmin);
            }
          }
        `}</style>

        <div className="night"></div>
        <div className="flowers">
          <div className="flower flower--1">
            <div className="flower__leafs flower__leafs--1">
              <div className="flower__leaf flower__leaf--1"></div>
              <div className="flower__leaf flower__leaf--2"></div>
              <div className="flower__leaf flower__leaf--3"></div>
              <div className="flower__leaf flower__leaf--4"></div>
              <div className="flower__white-circle"></div>

              <div className="flower__light flower__light--1"></div>
              <div className="flower__light flower__light--2"></div>
              <div className="flower__light flower__light--3"></div>
              <div className="flower__light flower__light--4"></div>
              <div className="flower__light flower__light--5"></div>
              <div className="flower__light flower__light--6"></div>
              <div className="flower__light flower__light--7"></div>
              <div className="flower__light flower__light--8"></div>
            </div>
            <div className="flower__line">
              <div className="flower__line__leaf flower__line__leaf--1"></div>
              <div className="flower__line__leaf flower__line__leaf--2"></div>
              <div className="flower__line__leaf flower__line__leaf--3"></div>
              <div className="flower__line__leaf flower__line__leaf--4"></div>
              <div className="flower__line__leaf flower__line__leaf--5"></div>
              <div className="flower__line__leaf flower__line__leaf--6"></div>
            </div>
          </div>

          <div className="flower flower--2">
            <div className="flower__leafs flower__leafs--2">
              <div className="flower__leaf flower__leaf--1"></div>
              <div className="flower__leaf flower__leaf--2"></div>
              <div className="flower__leaf flower__leaf--3"></div>
              <div className="flower__leaf flower__leaf--4"></div>
              <div className="flower__white-circle"></div>

              <div className="flower__light flower__light--1"></div>
              <div className="flower__light flower__light--2"></div>
              <div className="flower__light flower__light--3"></div>
              <div className="flower__light flower__light--4"></div>
              <div className="flower__light flower__light--5"></div>
              <div className="flower__light flower__light--6"></div>
              <div className="flower__light flower__light--7"></div>
              <div className="flower__light flower__light--8"></div>
            </div>
            <div className="flower__line">
              <div className="flower__line__leaf flower__line__leaf--1"></div>
              <div className="flower__line__leaf flower__line__leaf--2"></div>
              <div className="flower__line__leaf flower__line__leaf--3"></div>
              <div className="flower__line__leaf flower__line__leaf--4"></div>
            </div>
          </div>

          <div className="flower flower--3">
            <div className="flower__leafs flower__leafs--3">
              <div className="flower__leaf flower__leaf--1"></div>
              <div className="flower__leaf flower__leaf--2"></div>
              <div className="flower__leaf flower__leaf--3"></div>
              <div className="flower__leaf flower__leaf--4"></div>
              <div className="flower__white-circle"></div>

              <div className="flower__light flower__light--1"></div>
              <div className="flower__light flower__light--2"></div>
              <div className="flower__light flower__light--3"></div>
              <div className="flower__light flower__light--4"></div>
              <div className="flower__light flower__light--5"></div>
              <div className="flower__light flower__light--6"></div>
              <div className="flower__light flower__light--7"></div>
              <div className="flower__light flower__light--8"></div>
            </div>
            <div className="flower__line">
              <div className="flower__line__leaf flower__line__leaf--1"></div>
              <div className="flower__line__leaf flower__line__leaf--2"></div>
              <div className="flower__line__leaf flower__line__leaf--3"></div>
              <div className="flower__line__leaf flower__line__leaf--4"></div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
