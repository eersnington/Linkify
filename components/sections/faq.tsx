'use client';
import React from 'react';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  LucideLink,
  LucideGlobe,
  LucideShield,
  LucideSettings,
  LucideHelpCircle,
} from 'lucide-react';

const FAQItem = ({ question, answer, icon: Icon }) => (
  <AccordionItem value={question}>
    <AccordionTrigger className="text-lg text-black hover:text-purple-700">
      <span className="flex items-center">
        <Icon className="w-5 h-5 mr-2 text-purple-400" />
        {question}
      </span>
    </AccordionTrigger>
    <AccordionContent className="text-black text-lg">{answer}</AccordionContent>
  </AccordionItem>
);

export function FAQ() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const faqItems = [
    {
      question: 'What is the LinkedIn URL to Portfolio Website App?',
      answer:
        'Our app allows you to easily create a professional portfolio website using your LinkedIn profile data, streamlining the process of showcasing your skills and experiences online.',
      icon: LucideLink,
    },
    {
      question: 'How does the app work?',
      answer:
        'Simply connect your LinkedIn profile to our app, and it will automatically generate a sleek, customizable portfolio website based on your profile information, projects, and experiences.',
      icon: LucideGlobe,
    },
    {
      question: 'Is my LinkedIn data secure?',
      answer:
        'Absolutely. We prioritize your data security and privacy. We only access the information you explicitly allow and never store your LinkedIn credentials.',
      icon: LucideShield,
    },
    {
      question: 'Can I customize my portfolio website?',
      answer:
        'Yes, you can! Our app provides various customization options, including themes, layouts, and the ability to add or remove sections to best represent your professional brand.',
      icon: LucideSettings,
    },
    {
      question: 'Do I need coding skills to use this app?',
      answer:
        'Not at all! Our app is designed to be user-friendly and requires no coding knowledge. You can create and manage your portfolio website with just a few clicks.',
      icon: LucideHelpCircle,
    },
  ];

  return (
    <section className="w-full bg-white py-12">
      <motion.div
        className="container mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2
          className="text-6xl font-bold text-purple-950 mb-8 text-center"
          variants={itemVariants}
        >
          Frequently Asked Questions
        </motion.h2>
        <Accordion
          type="single"
          collapsible
          className="w-full max-w-2xl mx-auto"
        >
          {faqItems.map((item, index) => (
            <motion.div key={index} variants={itemVariants}>
              <FAQItem {...item} />
            </motion.div>
          ))}
        </Accordion>
      </motion.div>
    </section>
  );
}
