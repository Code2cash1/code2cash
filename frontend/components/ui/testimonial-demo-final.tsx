import { TestimonialCard } from "@/components/ui/testimonial-cards-glass";
import { useState } from "react";

const testimonials = [
  {
    id: 1,
    testimonial: "Code2Cash transformed our entire digital presence. Their expertise in modern web development is unmatched.",
    author: "Sarah Chen - CTO @ TechVentures"
  },
  {
    id: 2,
    testimonial: "The team at Code2Cash delivered beyond our expectations. They understand both technology and business needs perfectly.",
    author: "Michael Rodriguez - CEO @ StartupHub"
  },
  {
    id: 3,
    testimonial: "Working with Code2Cash was a game-changer for our e-commerce platform. Performance increased by 300%.",
    author: "Emily Watson - Head of Product @ RetailMax"
  },
  {
    id: 4,
    testimonial: "Code2Cash's full-stack solutions helped us scale from 100 to 100,000 users without any downtime.",
    author: "David Kim - VP Engineering @ ScaleApp"
  },
  {
    id: 5,
    testimonial: "Their attention to detail and clean code practices make Code2Cash our go-to development partner.",
    author: "Lisa Anderson - Director of Innovation @ FutureCorp"
  }
];

function ShuffleCards() {
  const [positions, setPositions] = useState<("front" | "middle" | "back")[]>(["front", "middle", "back"]);

  const handleShuffle = () => {
    const newPositions = [...positions];
    newPositions.unshift(newPositions.pop()!);
    setPositions(newPositions);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#030303] px-4 md:px-8 py-12 md:py-24">
      <div className="text-center mb-8 md:mb-16 max-w-4xl">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 md:mb-4">
          What The Experts Say About <span className="text-[#31a39c]">Code2Cash</span>
        </h2>
        <p className="text-sm md:text-xl text-gray-400 px-4">
          Don't just take our word for it. Hear what industry leaders have to say about working with us.
        </p>
      </div>

      <div className="relative h-[400px] md:h-[450px] w-full max-w-[300px] md:max-w-[350px] flex items-center justify-center scale-90 md:scale-100 transform origin-center">
        {testimonials.slice(0, 3).map((testimonial, index) => (
          <TestimonialCard
            key={testimonial.id}
            {...testimonial}
            handleShuffle={handleShuffle}
            position={positions[index]}
          />
        ))}
      </div>

      <div className="text-center mt-8 md:mt-12">
        <p className="text-gray-400 text-xs md:text-sm">
          Swipe or drag the card to see more testimonials
        </p>
      </div>
    </div>
  );
}

export { ShuffleCards }
