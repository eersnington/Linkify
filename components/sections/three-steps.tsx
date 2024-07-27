'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const steps = [
  {
    title: 'Effortlessly Import Your LinkedIn Profile',
    description:
      "Transform your professional presence in seconds! Just drop your LinkedIn URL or upload your CV, and watch the magic unfold. It's that simple!",
    video: '/videos/step_one.mp4',
    gradient: 'from-amber-400 to-orange-500',
  },
  {
    title: 'Customize Your Dream Website',
    description:
      'Unleash your creativity! Choose from our stunning templates and effortlessly personalize colors, fonts, and layout. Your perfect website is just a few clicks away!',
    video: '/videos/step_two.mp4',
    gradient: 'from-teal-400 to-emerald-500',
  },
  {
    title: 'Go Live and Shine!',
    description:
      'Ready to dazzle the world? Hit that publish button and instantly showcase your professional brand. Your new, impressive online presence is ready to conquer!',
    video: '/videos/step_three.mp4',
    gradient: 'from-purple-400 to-pink-500',
  },
];

export function ThreeSteps() {
  return (
    <div
      className="container mx-auto px-4 py-16 relative bg-grid bg-gray-100"
      style={{ '--tw-bg-opacity': '0.1' }}
    >
      <h2 className="text-5xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-amber-500 via-teal-500 to-purple-500">
        Your Dream Website in 3 Easy Steps
      </h2>
      <p className="text-2xl text-gray-600 mb-12 text-center">
        Experience the fastest, most effortless way to create your professional
        online presence!
      </p>
      <div className="space-y-24 relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-500 via-teal-500 to-purple-500" />
        {steps.map((step, index) => (
          <Card
            key={index}
            className="relative z-10 bg-white/80 backdrop-blur-sm"
          >
            <CardHeader className="relative">
              <motion.div
                className={`w-16 h-16 rounded-full bg-gradient-to-r ${step.gradient} text-white flex items-center justify-center text-3xl font-bold mx-auto`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 20,
                  delay: index * 0.3,
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {index + 1}
                <motion.div
                  className="absolute inset-0 rounded-full bg-white opacity-30"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
              <CardTitle className="mt-4 text-2xl font-bold">
                {step.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-gray-600 mb-6">{step.description}</p>
              <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-lg shadow-lg">
                <video
                  src={step.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
