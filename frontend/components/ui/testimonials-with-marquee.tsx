import { cn } from "@/lib/utils"
import { TestimonialCard, TestimonialAuthor } from "@/components/ui/testimonial-card"
import { Marquee } from "@/components/ui/3d-testimonials"

interface TestimonialsSectionProps {
    title: string
    description: string
    testimonials: Array<{
        author: TestimonialAuthor
        text: string
        href?: string
    }>
    className?: string
}

export function TestimonialsSection({
    title,
    description,
    testimonials,
    className
}: TestimonialsSectionProps) {
    return (
        <section className={cn(
            "bg-background text-foreground",
            "py-12 sm:py-24 md:py-32 px-0",
            className
        )}>
            <div className="mx-auto flex max-w-container flex-col items-center gap-4 text-center sm:gap-16">
                <div className="flex flex-col items-center gap-4 px-4 sm:gap-8">
                    <h2 className="max-w-[720px] text-3xl font-semibold leading-tight sm:text-5xl sm:leading-tight">
                        {title}
                    </h2>
                    <p className="text-md max-w-[600px] font-medium text-muted-foreground sm:text-xl">
                        {description}
                    </p>
                </div>

                <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
                    <div className="flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
                        <Marquee pauseOnHover repeat={4} className="[--duration:20s] [--gap:1rem]">
                            {testimonials.map((testimonial, i) => (
                                <TestimonialCard
                                    key={i}
                                    {...testimonial}
                                />
                            ))}
                        </Marquee>
                    </div>

                    {/* Side Gradients for Fade Effect - Visible on all devices now */}
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-1/4 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-1/4 bg-gradient-to-l from-background via-background/80 to-transparent z-10" />
                </div>
            </div>
        </section>
    )
}
