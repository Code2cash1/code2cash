import { TestimonialCard } from "@/components/ui/testimonial-cards-dark";
import { useState } from "react";

const testimonials = [
  {
    id: 1,
    testimonial: "Code2Cash delivered our company website ahead of schedule with exceptional UI/UX design. The team was responsive throughout the project, and the final product exceeded our expectations.",
    author: "Rajesh Kumar — Senior Software Engineer @ HCL"
  },
  {
    id: 2,
    testimonial: "Working with Code2Cash was a smooth experience from start to finish. Their attention to detail in web development and modern design approach helped us launch our platform successfully.",
    author: "Priya Sharma — Senior Web Developer @ TCS"
  },
  {
    id: 3,
    testimonial: "Code2Cash transformed our outdated website into a modern, user-friendly platform. The development process was efficient, and they were always available for feedback. Impressed by their technical expertise.",
    author: "Arjun Patel — Full Stack Developer @ Infosys"
  },
  {
    id: 4,
    testimonial: "The UI/UX quality delivered by Code2Cash was outstanding. They understood our requirements perfectly and created a responsive, visually appealing website. The turnaround time was impressive.",
    author: "Neha Reddy — Frontend Developer @ Wipro"
  },
  {
    id: 5,
    testimonial: "Code2Cash built our web application with clean code and excellent performance. Their team was professional, met all deadlines, and provided great support post-launch. A reliable partner for development.",
    author: "Vikram Singh — Backend Engineer @ Tech Mahindra"
  },
  {
    id: 6,
    testimonial: "Code2Cash created a beautiful, functional website for our team. The design was modern and intuitive, and they delivered faster than expected. Their collaborative approach made the process stress-free.",
    author: "Ananya Iyer — Software Engineer @ Cognizant"
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#030303] px-8 py-24">
      <div className="text-center mb-16 max-w-4xl">
        <h2 className="text-5xl font-bold text-white mb-4">
          What Clients Say About <span className="text-[#31a39c]">Code2Cash</span>
        </h2>
        <p className="text-xl text-gray-400">
          Don't just take our word for it. Hear what our clients have to say about working with us.
        </p>
      </div>

      <div className="relative h-[450px] w-[350px] flex items-center justify-center">
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
