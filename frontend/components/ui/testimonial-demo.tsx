import { TestimonialCard } from "@/components/ui/testimonial-cards";
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
    author: "Syed Asghar Ali - Senior Software Engineer @ HCL Tech"
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
    const last = newPositions.pop();
    if (last) {
      newPositions.unshift(last);
      setPositions(newPositions);
    }
  };

  return (
    <div className="grid place-content-center overflow-hidden bg-[#030303] px-8 py-24 text-slate-50 min-h-screen h-full w-full">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold text-white mb-4">
          What The Experts Say About Code2Cash
        </h2>
        <div className="text-4xl text-teal-400 font-bold">
          {testimonials[0].author?.charAt(0) || 'A'}
        </div>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Don't just take our word for it. Hear what industry leaders have to say about working with us.
        </p>
      </div>

      <div className="relative -ml-[100px] h-[450px] w-[350px] md:-ml-[175px]">
        {testimonials.slice(0, 3).map((testimonial, index) => (
          <TestimonialCard
            key={testimonial.id}
            {...testimonial}
            handleShuffle={handleShuffle}
            position={positions[index]}
          />
        ))}
      </div>

      <div className="text-center mt-12">
        <p className="text-gray-400 text-sm">
          Swipe or drag the card to see more testimonials
        </p>
      </div>
    </div>
  );
}

export { ShuffleCards }
