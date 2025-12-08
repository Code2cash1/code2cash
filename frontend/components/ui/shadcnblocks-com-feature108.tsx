import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Layout, Shield, Zap, Code, Database, Cpu } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface TabContent {
  badge: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

interface Tab {
  value: string;
  icon: React.ReactNode;
  label: string;
  content: TabContent;
}

interface Feature108Props {
  badge?: string;
  heading?: string;
  description?: string;
  tabs?: Tab[];
}

const Feature108 = ({
  badge = "Code2Cash",
  heading = "Advanced Web Development Services",
  description = "Cutting-edge solutions for modern web applications",
  tabs = [
    {
      value: "tab-1",
      icon: <Shield className="h-auto w-4 shrink-0" />,
      label: "Secure Backend",
      content: {
        badge: "Enterprise Security",
        title: "Fortify Your Digital Infrastructure.",
        description:
          "Implement robust security protocols, advanced encryption, and multi-layer authentication to protect your web applications from cyber threats and ensure data integrity.",
        imageSrc:
          "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
        imageAlt: "Secure backend infrastructure",
      },
    },
    {
      value: "tab-2",
      icon: <Zap className="h-auto w-4 shrink-0" />,
      label: "Scalable Solutions",
      content: {
        badge: "High Performance",
        title: "Build for Growth and Excellence.",
        description:
          "Create scalable web architectures that handle millions of users with optimal performance. Implement cloud-native solutions with auto-scaling and load balancing.",
        imageSrc:
          "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop",
        imageAlt: "Scalable web solutions",
      },
    },
    {
      value: "tab-3",
      icon: <Code className="h-auto w-4 shrink-0" />,
      label: "Advanced Frontend",
      content: {
        badge: "Modern UI/UX",
        title: "Craft Exceptional User Experiences.",
        description:
          "Develop responsive, interactive interfaces with cutting-edge frameworks. Implement smooth animations, progressive web apps, and optimized user journeys.",
        imageSrc:
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
        imageAlt: "Advanced frontend development",
      },
    },
    {
      value: "tab-4",
      icon: <Database className="h-auto w-4 shrink-0" />,
      label: "Optimization",
      content: {
        badge: "Performance Boost",
        title: "Maximize Speed and Efficiency.",
        description:
          "Optimize every aspect of your web application for lightning-fast performance. Implement caching strategies, code splitting, and advanced optimization techniques.",
        imageSrc:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
        imageAlt: "Web performance optimization",
      },
    },
    {
      value: "tab-5",
      icon: <Layout className="h-auto w-4 shrink-0" />,
      label: "Custom Solutions",
      content: {
        badge: "Tailored Development",
        title: "Build Your Unique Vision.",
        description:
          "Create bespoke web solutions tailored to your specific business needs. From custom CMS to specialized workflows, we build what you envision.",
        imageSrc:
          "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop",
        imageAlt: "Custom web development",
      },
    },
    {
      value: "tab-6",
      icon: <Cpu className="h-auto w-4 shrink-0" />,
      label: "AI Integration",
      content: {
        badge: "Smart Technology",
        title: "Power Your Apps with AI.",
        description:
          "Integrate artificial intelligence and machine learning capabilities into your web applications. Implement smart features, predictive analytics, and automation.",
        imageSrc:
          "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
        imageAlt: "AI integration in web apps",
      },
    },
  ],
}: Feature108Props) => {
  return (
    <section className="py-12 md:py-32 bg-[#030303] overflow-x-hidden w-full">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center gap-4 text-center mb-8 md:mb-16">
          <Badge variant="outline" className="border-[#31a39c]/30 text-[#31a39c] bg-[#31a39c]/10">{badge}</Badge>
          <h1 className="max-w-4xl text-2xl md:text-5xl font-bold text-white leading-tight">
            {heading}
          </h1>
          <p className="text-white/60 text-sm md:text-lg max-w-2xl px-2">{description}</p>
        </div>
        <Tabs defaultValue={tabs[0].value} className="mt-4 md:mt-8 w-full">
          <TabsList className="flex flex-wrap items-center justify-center gap-2 bg-[#0a0a0a] border border-white/10 rounded-2xl p-2 w-full">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-[10px] md:text-sm font-semibold text-white/60 data-[state=active]:bg-[#31a39c] data-[state=active]:text-white transition-all duration-300 hover:bg-white/10 flex-grow md:flex-grow-0"
              >
                {tab.icon} {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="mx-auto mt-6 md:mt-8 max-w-screen-xl rounded-2xl bg-[#0a0a0a]/70 border border-white/10 p-4 md:p-16 backdrop-blur-sm">
            {tabs.map((tab) => (
              <TabsContent
                key={tab.value}
                value={tab.value}
                className="grid place-items-center gap-8 md:gap-20 lg:grid-cols-2 lg:gap-10 animate-in fade-in-50 duration-500"
              >
                <div className="flex flex-col gap-4 md:gap-6 text-center md:text-left">
                  <Badge variant="outline" className="w-fit mx-auto md:mx-0 bg-[#030303] border-[#31a39c]/30 text-[#31a39c]">
                    {tab.content.badge}
                  </Badge>
                  <h3 className="text-xl md:text-5xl font-bold text-white">
                    {tab.content.title}
                  </h3>
                  <p className="text-white/60 text-sm md:text-lg leading-relaxed">
                    {tab.content.description}
                  </p>
                </div>
                <div className="relative overflow-hidden rounded-xl w-full">
                  <img
                    src={tab.content.imageSrc}
                    alt={tab.content.imageAlt}
                    className="w-full h-auto rounded-xl transform transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#31a39c]/10 to-transparent rounded-xl"></div>
                </div>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </section>
  );
};

export { Feature108 };
