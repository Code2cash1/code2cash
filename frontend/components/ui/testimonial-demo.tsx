import { TestimonialCard } from "@/components/ui/testimonial-cards";
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
          What Clients Say About Code2Cash
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
