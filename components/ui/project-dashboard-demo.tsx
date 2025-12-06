import React, { useState } from "react";

interface Project {
  id: string;
  name: string;
  subtitle: string;
  date: string;
  progress: number;
  status: "inProgress" | "upcoming" | "completed";
  accentColor: string;
  participants: string[];
  daysLeft: number | string;
  bgColorClass: string;
}

interface Message {
  id: string;
  name: string;
  avatarUrl: string;
  text: string;
  date: string;
  starred?: boolean;
}

const initialProjects: Project[] = [
  {
    id: "p1",
    name: "E-Commerce Platform",
    subtitle: "Full-Stack Development",
    date: "2025-07-10",
    progress: 60,
    status: "inProgress",
    accentColor: "#31a39c",
    participants: [
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=64&q=80&auto=format&fit=crop",
    ],
    daysLeft: 2,
    bgColorClass: "bg-teal-50 dark:bg-teal-900/20",
  },
  {
    id: "p2",
    name: "Corporate Website",
    subtitle: "Modern UI/UX Design",
    date: "2025-06-15",
    progress: 50,
    status: "upcoming",
    accentColor: "#6366f1",
    participants: [
      "https://images.unsplash.com/photo-1596815064285-45ed8a9c0463?w=64&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583195764036-6dc248ac07d9?w=64&q=80&auto=format&fit=crop",
    ],
    daysLeft: "Due Friday",
    bgColorClass: "bg-indigo-50 dark:bg-indigo-900/20",
  },
  {
    id: "p3",
    name: "Mobile App Development",
    subtitle: "React Native Solution",
    date: "2025-03-02",
    progress: 100,
    status: "completed",
    accentColor: "#10b981",
    participants: [
      "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?w=64&q=80&auto=format&fit=crop",
    ],
    daysLeft: 0,
    bgColorClass: "bg-emerald-50 dark:bg-emerald-900/20",
  },
  {
    id: "p4",
    name: "API Integration",
    subtitle: "RESTful Services",
    date: "2025-08-20",
    progress: 35,
    status: "inProgress",
    accentColor: "#f59e0b",
    participants: [
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&q=80&auto=format&fit=crop",
    ],
    daysLeft: 5,
    bgColorClass: "bg-amber-50 dark:bg-amber-900/20",
  },
  {
    id: "p5",
    name: "Performance Optimization",
    subtitle: "Speed & SEO Enhancement",
    date: "2025-09-01",
    progress: 25,
    status: "upcoming",
    accentColor: "#ef4444",
    participants: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&q=80&auto=format&fit=crop",
    ],
    daysLeft: "Next Week",
    bgColorClass: "bg-red-50 dark:bg-red-900/20",
  },
];

const demoMessages: Message[] = [
  {
    id: "m1",
    name: "Sarah Johnson",
    avatarUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=96&q=80&auto=format&fit=crop",
    text: "The e-commerce platform looks amazing! Can we add a product comparison feature?",
    date: "Today",
    starred: true,
  },
  {
    id: "m2",
    name: "Michael Chen",
    avatarUrl:
      "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?w=96&q=80&auto=format&fit=crop",
    text: "Great progress on the corporate website. The mobile responsiveness is perfect!",
    date: "Yesterday",
    starred: true,
  },
  {
    id: "m3",
    name: "Emily Davis",
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=96&q=80&auto=format&fit=crop",
    text: "The API integration is working smoothly. Thanks for the detailed documentation.",
    date: "2 days ago",
  },
];

export default function ProjectDashboardDemo() {
  const [projects] = useState<Project[]>(initialProjects);
  const [messages] = useState<Message[]>(demoMessages);

  return (
    <div className="min-h-screen bg-[#030303] p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Code2Cash Projects</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`${project.bgColorClass} rounded-xl p-6 border border-white/10`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">{project.name}</h3>
                  <p className="text-sm text-white/60">{project.subtitle}</p>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-white/20 text-white">
                  {project.status}
                </span>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-white/60">Progress</span>
                  <span className="text-white">{project.progress}%</span>
                </div>
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${project.progress}%`,
                      backgroundColor: project.accentColor,
                    }}
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex -space-x-2">
                  {project.participants.slice(0, 3).map((url, i) => (
                    <img
                      key={i}
                      src={url}
                      alt=""
                      className="w-8 h-8 rounded-full ring-2 ring-white/10 object-cover"
                    />
                  ))}
                </div>
                <span className="text-sm text-white/60">{project.daysLeft}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">Client Messages</h2>
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="bg-[#0a0a0a] rounded-lg p-4 border border-white/10">
                <div className="flex items-start gap-3">
                  <img
                    src={message.avatarUrl}
                    alt=""
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-white">{message.name}</h4>
                      <span className="text-sm text-white/60">{message.date}</span>
                    </div>
                    <p className="text-white/80 mt-1">{message.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
