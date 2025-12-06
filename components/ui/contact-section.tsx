"use client";

import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function ContactSection() {
    return (
        <section className="py-24 bg-[#030303] relative overflow-hidden">
            {/* Background gradient effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#31a39c]/5 to-transparent pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#31a39c]/30 bg-[#31a39c]/10 backdrop-blur-sm">
                        <Mail className="h-4 w-4 text-[#31a39c]" />
                        <span className="text-sm font-medium text-[#31a39c]">Get In Touch</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                        Let's Build Something
                        <span className="block bg-gradient-to-r from-[#31a39c] to-[#2a8a84] bg-clip-text text-transparent">
                            Amazing Together
                        </span>
                    </h2>
                    <p className="text-lg text-white/70 max-w-2xl mx-auto">
                        Ready to transform your digital vision into reality? We're here to help you every step of the way.
                    </p>
                </div>

                {/* Contact Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <Card className="p-6 bg-[#0a0a0a] border-[#31a39c]/20 hover:border-[#31a39c]/40 transition-all duration-300 group">
                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className="w-12 h-12 rounded-full bg-[#31a39c]/10 flex items-center justify-center group-hover:bg-[#31a39c]/20 transition-colors">
                                <Mail className="h-6 w-6 text-[#31a39c]" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-2">Email Us</h3>
                                <a href="mailto:info@code2cash.com" className="text-white/70 hover:text-[#31a39c] transition-colors">
                                    info@code2cash.com
                                </a>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6 bg-[#0a0a0a] border-[#31a39c]/20 hover:border-[#31a39c]/40 transition-all duration-300 group">
                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className="w-12 h-12 rounded-full bg-[#31a39c]/10 flex items-center justify-center group-hover:bg-[#31a39c]/20 transition-colors">
                                <Phone className="h-6 w-6 text-[#31a39c]" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-2">Call Us</h3>
                                <a href="tel:+911234567890" className="text-white/70 hover:text-[#31a39c] transition-colors">
                                    +91 123 456 7890
                                </a>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6 bg-[#0a0a0a] border-[#31a39c]/20 hover:border-[#31a39c]/40 transition-all duration-300 group">
                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className="w-12 h-12 rounded-full bg-[#31a39c]/10 flex items-center justify-center group-hover:bg-[#31a39c]/20 transition-colors">
                                <MapPin className="h-6 w-6 text-[#31a39c]" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-2">Visit Us</h3>
                                <p className="text-white/70">
                                    India
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* CTA Section */}
                <div className="text-center">
                    <Card className="inline-block p-8 bg-gradient-to-br from-[#31a39c]/10 to-[#2a8a84]/10 border-[#31a39c]/30 backdrop-blur-sm">
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-white">Ready to Start Your Project?</h3>
                            <p className="text-white/70 max-w-md">
                                Let's discuss how we can help bring your ideas to life with cutting-edge technology.
                            </p>
                            <Button
                                className="bg-[#31a39c] hover:bg-[#2a8a84] text-white px-8 py-6 text-lg rounded-full transition-all duration-300 hover:scale-105"
                            >
                                <Send className="h-5 w-5 mr-2" />
                                Send us a Message
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </section>
    );
}
