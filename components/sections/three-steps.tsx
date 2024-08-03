'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PlayCircle, Palette, Rocket } from 'lucide-react';
import { LinkedInLogoIcon } from '@radix-ui/react-icons';
import { Card, CardContent, CardHeader } from '../ui/card';

const steps = [
  {
    title: 'Connect your LinkedIn',
    description:
      "Transform your professional presence in seconds! Connect your LinkedIn with your email, and watch the magic unfold. It's that simple!",
    video:
      'https://tqbquifstcxowvavjpis.supabase.co/storage/v1/object/public/videos%20linkify/step_one.mp4',
    gradient: 'from-cyan-400 to-blue-500',
    icon: <LinkedInLogoIcon className="w-12 h-12" />,
  },
  {
    title: 'Customize Your Dream Website',
    description:
      'Unleash your creativity! Choose from our stunning templates and effortlessly personalize colors, fonts, and layout. Your perfect website is just a few clicks away!',
    video:
      'https://tqbquifstcxowvavjpis.supabase.co/storage/v1/object/public/videos%20linkify/step_two.mp4',
    gradient: 'from-teal-400 to-emerald-500',
    icon: <Palette className="w-12 h-12" />,
  },
  {
    title: 'Go Live and Shine!',
    description:
      'Ready to dazzle the world? Hit that publish button and instantly showcase your professional brand. Your new, impressive online presence is ready to conquer!',
    video:
      'https://tqbquifstcxowvavjpis.supabase.co/storage/v1/object/public/videos%20linkify/step_three.mp4',
    gradient: 'from-purple-400 to-pink-500',
    icon: <Rocket className="w-12 h-12" />,
  },
];

export function ThreeSteps() {
  return (
    <section className="relative overflow-hidden bg-white py-24">
      <div className="container mx-auto px-4 sm:px-8 text-center space-y-24">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="relative"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.3 }}
          >
            <Card className="max-w-2xl mx-auto">
              <CardHeader className="flex items-center justify-center mb-4">
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-r ${step.gradient} flex items-center justify-center`}
                >
                  {step.icon}
                </div>
                <div
                  className={`text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${step.gradient}`}
                >
                  {step.title}
                </div>
                <p className="text-lg text-gray-700">{step.description}</p>
              </CardHeader>
              <CardContent className="p-8">
                <video
                  src={step.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto rounded-lg shadow-md"
                  style={{ maxHeight: '720px' }}
                />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
