import { cn } from "@/lib/utils"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export interface TestimonialAuthor {
    name: string
    handle: string
    avatar?: string
}

export interface TestimonialCardProps {
    author: TestimonialAuthor
    text: string
    href?: string
    className?: string
}

export function TestimonialCard({
    author,
    text,
    href,
    className
}: TestimonialCardProps) {
    const Card = href ? 'a' : 'div'

    // Calculate initials
    const initials = author.name
        .split(' ')
        .map(n => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();

    return (
        <Card
            {...(href ? { href } : {})}
            className={cn(
                "flex flex-col rounded-xl border border-white/5",
                "bg-white/5 backdrop-blur-sm",
                "p-4 text-start sm:p-6",
                "hover:border-primary/50 hover:bg-white/10",
                "max-w-[320px] sm:max-w-[320px]",
                "transition-all duration-300",
                className
            )}
        >
            <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                    <AvatarImage src={author.avatar} alt={author.name} />
                    <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start">
                    <h3 className="text-md font-semibold leading-none">
                        {author.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        {author.handle}
                    </p>
                </div>
            </div>
            <p className="sm:text-md mt-4 text-sm text-muted-foreground">
                {text}
            </p>
        </Card>
    )
}
