"use client";

import * as React from 'react';
import { motion } from 'framer-motion';

interface TestimonialCardProps {
  handleShuffle: () => void;
  testimonial: string;
  position: "front" | "middle" | "back";
  id: number;
  author: string;
}

export function TestimonialCard({ handleShuffle, testimonial, position, id, author }: TestimonialCardProps) {
  const dragRef = React.useRef(0);
  const isFront = position === "front";

  return (
    <motion.div
      style={{
        zIndex: position === "front" ? "2" : position === "middle" ? "1" : "0"
      }}
      animate={{
        rotate: position === "front" ? "-6deg" : position === "middle" ? "0deg" : "6deg",
        x: position === "front" ? "0%" : position === "middle" ? "33%" : "66%"
      }}
      drag={true}
      dragElastic={0.35}
      dragListener={isFront}
      dragConstraints={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }}
      onDragStart={(e) => {
        dragRef.current = 'clientX' in e ? e.clientX : (e as any).touches?.[0]?.clientX || 0;
      }}
      onDragEnd={(e) => {
        const clientX = 'clientX' in e ? e.clientX : (e as any).changedTouches?.[0]?.clientX || 0;
        if (dragRef.current - clientX > 150) {
          handleShuffle();
        }
        dragRef.current = 0;
      }}
      transition={{ duration: 0.35 }}
      className={`absolute left-0 top-0 grid h-[400px] w-[280px] md:h-[450px] md:w-[350px] select-none place-content-center space-y-4 md:space-y-6 rounded-2xl border border-white/10 bg-black/40 p-4 md:p-6 shadow-xl backdrop-blur-xl ${isFront ? "cursor-grab active:cursor-grabbing" : ""
        }`}
    >
      <div className="pointer-events-none mx-auto h-24 w-24 md:h-32 md:w-32 rounded-full border border-white/10 bg-black/30 flex items-center justify-center backdrop-blur-sm">
        <div className="text-2xl md:text-4xl text-[#31a39c] font-bold">
          {author?.charAt(0) || 'A'}
        </div>
      </div>
      <span className="text-center text-sm md:text-lg italic text-gray-300 leading-relaxed">"{testimonial}"</span>
      <span className="text-center text-xs md:text-sm font-medium text-[#31a39c]">{author}</span>
    </motion.div>
  );
};
