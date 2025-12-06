import React, { useState } from "react";
import ProjectDashboard, { Project, Message } from "@/components/ui/project-management-dashboard";

const initialProjects: Project[] = [
  {
    id: "p1",
    name: "E-Commerce Platform",
    subtitle: "Full-Stack Development",
    date: "2025-07-10",
    progress: 75,
    status: "inProgress",
    accentColor: "#31a39c",
    participants: [
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=64&q=80&auto=format&fit=crop",
    ],
    daysLeft: 5,
    bgColorClass: "bg-teal-50 dark:bg-teal-900/20",
  },
  {
    id: "p2",
    name: "Custom Dashboard",
    subtitle: "React Components",
    date: "2025-06-15",
    progress: 90,
    status: "inProgress",
    accentColor: "#31a39c",
    participants: [
      "https://images.unsplash.com/photo-1596815064285-45ed8a9c0463?w=64&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583195764036-6dc248ac07d9?w=64&q=80&auto=format&fit=crop",
    ],
    daysLeft: 2,
    bgColorClass: "bg-teal-50 dark:bg-teal-900/20",
  },
  {
    id: "p3",
    name: "Mobile App UI",
    subtitle: "React Native",
    date: "2025-03-02",
    progress: 100,
    status: "completed",
    accentColor: "#31a39c",
    participants: [
      "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?w=64&q=80&auto=format&fit=crop",
    ],
    daysLeft: 0,
    bgColorClass: "bg-teal-50 dark:bg-teal-900/20",
  },
  {
    id: "p4",
    name: "API Integration",
    subtitle: "RESTful Services",
    date: "2025-08-20",
    progress: 45,
    status: "upcoming",
    accentColor: "#31a39c",
    participants: [
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&q=80&auto=format&fit=crop",
    ],
    daysLeft: "Next Week",
    bgColorClass: "bg-teal-50 dark:bg-teal-900/20",
  },
  {
    id: "p5",
    name: "Performance Optimization",
    subtitle: "Speed & SEO",
    date: "2025-09-01",
    progress: 30,
    status: "upcoming",
    accentColor: "#31a39c",
    participants: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&q=80&auto=format&fit=crop",
    ],
    daysLeft: "2 Weeks",
    bgColorClass: "bg-teal-50 dark:bg-teal-900/20",
  },
];

const demoMessages: Message[] = [
  {
    id: "m1",
    name: "Stephanie",
    avatarUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=96&q=80&auto=format&fit=crop",
    text: "Got your first assignment—looks great. Ready for the next.",
    date: "Aug 20",
    starred: true,
  },
  {
    id: "m2",
    name: "Mark",
    avatarUrl:
      "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?w=96&q=80&auto=format&fit=crop",
    text: "How's the progress? Still waiting on your response.",
    date: "Aug 21",
  },
];

export default function DemoOne() {
  const [data, setData] = useState<Project[]>(initialProjects);

  return (
    <div className="min-h-screen bg-[#030303] p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Content */}
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-white">Customizable Components</h2>
            <p className="text-gray-400 text-lg max-w-md">
              We build fully customizable components that adapt to your needs, with complete control over design and functionality.
            </p>
          </div>
          
          {/* Right Dashboard */}
          <div className="bg-[#0a0a0a] rounded-lg border border-gray-800 p-4">
            <h3 className="text-lg font-semibold text-white mb-4">Live Projects</h3>
            <div className="space-y-3">
              {data.slice(0, 2).map((project) => (
                <div key={project.id} className="bg-[#0a0a0a] border border-gray-700 rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-white font-medium text-sm">{project.name}</h4>
                      <p className="text-gray-400 text-xs">{project.subtitle}</p>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-teal-900/30 text-teal-400 border border-teal-700/30">
                      {project.status}
                    </span>
                  </div>
                  <div className="mb-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-white text-xs">{project.progress}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${project.progress}%`,
                          backgroundColor: project.accentColor || "#31a39c",
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {project.participants?.slice(0, 2).map((url, i) => (
                        <img
                          key={i}
                          src={url}
                          alt=""
                          className="w-6 h-6 rounded-full ring-2 ring-[#0a0a0a] object-cover"
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-400">{project.daysLeft}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
