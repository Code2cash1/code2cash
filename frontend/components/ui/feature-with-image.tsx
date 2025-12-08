import { Badge } from "@/components/ui/badge";
import Image from "next/image";

function Feature() {
  return (
    <div className="w-full py-12 md:py-20 lg:py-40">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col-reverse lg:flex-row gap-8 md:gap-10 lg:items-center">
          <div className="bg-[#0a0a0a] rounded-md w-full aspect-video h-full flex-1 relative overflow-hidden min-h-[250px] md:min-h-[300px]">
            <Image
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
              alt="Code2Cash Team Working"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex gap-4 pl-0 lg:pl-20 flex-col flex-1">
            <div>
              <Badge className="bg-[#31a39c]/20 text-[#31a39c] border-[#31a39c]/30 text-xs md:text-sm">Our Expertise</Badge>
            </div>
            <div className="flex gap-2 flex-col">
              <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl tracking-tighter lg:max-w-xl font-regular text-left text-white">
                Building Digital Excellence
              </h2>
              <p className="text-sm md:text-base lg:text-lg max-w-full lg:max-w-sm leading-relaxed tracking-tight text-white/60 text-left">
                Our team of skilled developers and designers brings years of experience in creating 
                cutting-edge web solutions. We combine creativity with technical expertise to deliver 
                exceptional digital experiences that drive your business forward.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Feature };
