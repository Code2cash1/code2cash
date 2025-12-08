"use client";
import React from 'react';
import { ContactSection } from '@/components/ui/contact-section';

export function ContactSectionDemo() {
    const handleSubmit = (data: any) => {
        console.log("Form Data Submitted:", data);
        alert("Thanks for contacting us! We'll get back to you soon.");
    };

    return (
        <ContactSection
            title="We can turn your dream project into reality"
            mainMessage="Let's build something great! "
            contactEmail="hello@code2cash.com"
            onSubmit={handleSubmit}
        />
    );
}
