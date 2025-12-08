"use client";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface CodeBlock {
  title: string;
  language: string;
  code: string;
  description: string;
}

export const CodeShowcase = ({ blocks }: { blocks: CodeBlock[] }) => {
  const [activeBlock, setActiveBlock] = useState(0);

  return (
    <div className="w-full py-20 bg-[#030303]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-[#31a39c]/20 text-[#31a39c] border-[#31a39c]/30">
            Our Expertise
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Clean Code, Powerful Solutions
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            We write elegant, maintainable code that powers exceptional web experiences
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            {blocks.map((block, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setActiveBlock(index)}
                className={`p-6 rounded-xl border cursor-pointer transition-all duration-300 ${
                  activeBlock === index
                    ? "bg-[#31a39c]/10 border-[#31a39c]/50"
                    : "bg-[#0a0a0a] border-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-white">{block.title}</h3>
                  <Badge variant="outline" className="text-xs">
                    {block.language}
                  </Badge>
                </div>
                <p className="text-white/60 text-sm">{block.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="relative">
            <motion.div
              key={activeBlock}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-[#0a0a0a] rounded-xl border border-white/10 overflow-hidden"
            >
              <div className="flex items-center justify-between px-4 py-3 bg-[#1a1a1a] border-b border-white/5">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <Badge className="text-xs bg-[#31a39c]/20 text-[#31a39c] border-[#31a39c]/30">
                  {blocks[activeBlock].language}
                </Badge>
              </div>
              <div className="p-6 overflow-x-auto">
                <pre className="text-sm text-white/90 font-mono">
                  <code>{blocks[activeBlock].code}</code>
                </pre>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
