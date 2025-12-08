import { TestimonialsSection } from "@/components/ui/testimonials-with-marquee"

const testimonials = [
    {
        author: {
            name: "Zainab Fatima",
            handle: "Zeelock",
        },
        text: "Zeelock's security infrastructure has never been stronger. Code2Cash delivered a robust and scalable solution that exceeded our expectations.",
        href: "#"
    },
    {
        author: {
            name: "Arijit Mondal",
            handle: "Quantumbrize",
        },
        text: "The e-commerce platform developed by Code2Cash for Quantumbrize is a masterpiece. It handles high traffic effortlessly and converts visitors into customers.",
        href: "https://quantumbrize.com"
    },
    {
        author: {
            name: "Md Mehfooz Alam",
            handle: "One2z Sollutions",
        },
        text: "Partnering with Code2Cash was the best decision for One2z Solutions. Their technical expertise and timely delivery helped us scale rapidly.",
        href: "https://one2zsolutions.com"
    },
    {
        author: {
            name: "Ahmed Al-Fayed",
            handle: "Emirates Estate (Dubai)",
        },
        text: "Code2Cash transformed our real estate portal. Their understanding of the Dubai market and luxury design is impeccable.",
        href: "#"
    },
    {
        author: {
            name: "Fatima Al-Zahra",
            handle: "Gulf Fintech (Dubai)",
        },
        text: "Secure, fast, and reliable. The blockchain integration they built for us is world-class. Highly recommended for fintech projects.",
        href: "#"
    },
    {
        author: {
            name: "Omar Hassan",
            handle: "Desert Logistics (Dubai)",
        },
        text: "Automating our supply chain with their custom software saved us 40% in operational costs. A truly professional team.",
        href: "#"
    }
]

export function TestimonialsSectionDemo() {
    return (
        <TestimonialsSection
            title="What Our Clients Say"
            description="Trusted by industry leaders to deliver excellence."
            testimonials={testimonials}
        />
    )
}
