"use client";

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Marquee } from '@/components/ui/3d-testimonials';

// Complete web development tech stack with proper logos
const techStack = [
  {
    name: 'HTML5',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    description: 'Markup Language',
    color: '#E34F26'
  },
  {
    name: 'CSS3',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
    description: 'Styling Language',
    color: '#1572B6'
  },
  {
    name: 'JavaScript',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    description: 'Programming Language',
    color: '#F7DF1E'
  },
  {
    name: 'TypeScript',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    description: 'Type Safety',
    color: '#3178C6'
  },
  {
    name: 'React',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    description: 'UI Framework',
    color: '#61DAFB'
  },
  {
    name: 'Next.js',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
    description: 'React Framework',
    color: '#000000'
  },
  {
    name: 'Angular',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg',
    description: 'Web Framework',
    color: '#DD0031'
  },
  {
    name: 'Vue.js',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
    description: 'Progressive Framework',
    color: '#4FC08D'
  },
  {
    name: 'Node.js',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    description: 'Runtime Environment',
    color: '#339933'
  },
  {
    name: 'Express.js',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
    description: 'Web Framework',
    color: '#000000'
  },
  {
    name: 'FastAPI',
    logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiByeD0iNCIgZmlsbD0iIzAwOTY4OCIvPgo8dGV4dCB4PSIxMiIgeT0iMTYiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkZhc3Q8L3RleHQ+Cjwvc3ZnPg==',
    description: 'Python API Framework',
    color: '#009688'
  },
  {
    name: 'Django',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg',
    description: 'Python Framework',
    color: '#092E20'
  },
  {
    name: 'Tailwind CSS',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
    description: 'CSS Framework',
    color: '#06B6D4'
  },
  {
    name: 'Bootstrap',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg',
    description: 'CSS Framework',
    color: '#7952B3'
  },
  {
    name: 'Sass',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg',
    description: 'CSS Preprocessor',
    color: '#CC6699'
  },
  {
    name: 'Redux',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg',
    description: 'State Management',
    color: '#764ABC'
  },
  {
    name: 'GraphQL',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg',
    description: 'Query Language',
    color: '#E10098'
  },
  {
    name: 'REST API',
    logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiByeD0iNCIgZmlsbD0iIzAwN0RGRiIvPgo8dGV4dCB4PSIxMiIgeT0iMTQiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSI4IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+UkVTVDwvdGV4dD4KPC9zdmc+',
    description: 'API Architecture',
    color: '#007DFF'
  },
  {
    name: 'MongoDB',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    description: 'NoSQL Database',
    color: '#47A248'
  },
  {
    name: 'PostgreSQL',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    description: 'SQL Database',
    color: '#4169E1'
  },
  {
    name: 'MySQL',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
    description: 'SQL Database',
    color: '#4479A1'
  },
  {
    name: 'Redis',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
    description: 'In-Memory Database',
    color: '#DC382D'
  },
  {
    name: 'Docker',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    description: 'Containerization',
    color: '#2496ED'
  },
  {
    name: 'Kubernetes',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg',
    description: 'Container Orchestration',
    color: '#326CE5'
  },
  {
    name: 'AWS',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg',
    description: 'Cloud Platform',
    color: '#FF9900'
  },
  {
    name: 'Vercel',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg',
    description: 'Deployment Platform',
    color: '#000000'
  },
  {
    name: 'Netlify',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg',
    description: 'Deployment Platform',
    color: '#00C7B7'
  },
  {
    name: 'GitHub',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
    description: 'Version Control',
    color: '#181717'
  },
  {
    name: 'GitLab',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg',
    description: 'DevOps Platform',
    color: '#FC6D26'
  },
  {
    name: 'Figma',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
    description: 'Design Tool',
    color: '#F24E1E'
  },
  {
    name: 'Sketch',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sketch/sketch-original.svg',
    description: 'Design Tool',
    color: '#F7B500'
  },
  {
    name: 'Material UI',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg',
    description: 'UI Library',
    color: '#0081CB'
  },
  {
    name: 'Ant Design',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/antdesign/antdesign-original.svg',
    description: 'UI Library',
    color: '#0170FE'
  },
  {
    name: 'Spline',
    logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMjIgN0wxOS4yIDE0LjVMMTIgMjJMNC44IDE0LjVMMiA3TDEyIDJaIiBmaWxsPSIjMzFBMzlDIi8+Cjwvc3ZnPg==',
    description: '3D Design Tool',
    color: '#31A39C'
  },
  {
    name: 'Framer Motion',
    logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIgMTJMMTIgMjJMMjIgMTJMMTIgMkwyIDEyWiIgZmlsbD0iIzMwMDA4OSIvPgo8L3N2Zz4=',
    description: 'Animation Library',
    color: '#300089'
  },
  {
    name: 'Three.js',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg',
    description: '3D Library',
    color: '#000000'
  },
  {
    name: 'Webpack',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg',
    description: 'Module Bundler',
    color: '#8DD6F9'
  },
  {
    name: 'Vite',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg',
    description: 'Build Tool',
    color: '#646CFF'
  },
  {
    name: 'Jest',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg',
    description: 'Testing Framework',
    color: '#C21325'
  },
  {
    name: 'Cypress',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cypressio/cypressio-original.svg',
    description: 'Testing Tool',
    color: '#17202C'
  }
];

function TechCard({ name, logo, description, color }: typeof techStack[0]) {
  return (
    <Card className="w-32 md:w-48 bg-[#0a0a0a] border-gray-800 hover:border-teal-500/50 transition-all duration-300">
      <CardContent className="p-2 md:p-4">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg bg-[#030303] flex items-center justify-center p-1 md:p-2">
            <img
              src={logo}
              alt={name}
              className="w-full h-full object-contain"
              style={{ filter: `drop-shadow(0 0 8px ${color}40)` }}
            />
          </div>
          <div className="flex flex-col">
            <h3 className="text-white font-semibold text-[10px] md:text-sm">{name}</h3>
            <p className="text-gray-400 text-[8px] md:text-xs hidden md:block">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Fixed order tech stack (no random shuffle to prevent hydration error)
const shuffledTechStack = techStack;

export default function TechStackMarqueeNew() {
  return (
    <div className="min-h-screen bg-[#030303] flex flex-col items-center justify-center p-4 md:p-8">
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-2xl md:text-5xl font-bold text-white mb-2 md:mb-4">
          Technologies We Work With
        </h2>
        <p className="text-sm md:text-xl text-gray-400 max-w-2xl mx-auto px-4">
          We leverage cutting-edge technologies to build scalable, performant, and innovative solutions for your business needs.
        </p>
      </div>

      <div className="relative w-full max-w-7xl h-[400px] md:h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="flex flex-row items-center gap-4 md:gap-8 transition-transform duration-500 will-change-transform"
          style={{
            perspective: '1000px',
          }}
        >
          {/* Wrapper for 3D tilt - Only on MD+ screens */}
          <div className="flex flex-row gap-4 md:gap-8 md:[transform:rotateX(15deg)_rotateY(-5deg)_rotateZ(5deg)]">
            {/* Column 1 - Top to Bottom */}
            <div className="flex flex-col">
              <Marquee vertical pauseOnHover repeat={6} className="[--duration:20s]">
                {shuffledTechStack.map((tech) => (
                  <TechCard key={`${tech.name}-1`} {...tech} />
                ))}
              </Marquee>
            </div>

            {/* Column 2 - Bottom to Top */}
            <div className="flex flex-col">
              <Marquee vertical pauseOnHover reverse repeat={6} className="[--duration:25s]">
                {shuffledTechStack.map((tech) => (
                  <TechCard key={`${tech.name}-2`} {...tech} />
                ))}
              </Marquee>
            </div>

            {/* Column 3 - Top to Bottom */}
            <div className="flex flex-col">
              <Marquee vertical pauseOnHover repeat={6} className="[--duration:30s]">
                {shuffledTechStack.map((tech) => (
                  <TechCard key={`${tech.name}-3`} {...tech} />
                ))}
              </Marquee>
            </div>

            {/* Column 4 - Bottom to Top */}
            <div className="flex flex-col">
              <Marquee vertical pauseOnHover reverse repeat={6} className="[--duration:35s]">
                {shuffledTechStack.map((tech) => (
                  <TechCard key={`${tech.name}-4`} {...tech} />
                ))}
              </Marquee>
            </div>

            {/* Column 5 - Top to Bottom */}
            <div className="flex flex-col">
              <Marquee vertical pauseOnHover repeat={6} className="[--duration:40s]">
                {shuffledTechStack.map((tech) => (
                  <TechCard key={`${tech.name}-5`} {...tech} />
                ))}
              </Marquee>
            </div>

            {/* Column 6 - Bottom to Top */}
            <div className="flex flex-col">
              <Marquee vertical pauseOnHover reverse repeat={6} className="[--duration:45s]">
                {shuffledTechStack.map((tech) => (
                  <TechCard key={`${tech.name}-6`} {...tech} />
                ))}
              </Marquee>
            </div>
          </div>
        </div>

        {/* Gradient overlays */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-[#030303]"></div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#030303]"></div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#030303]"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#030303]"></div>
      </div>
    </div>
  );
}
