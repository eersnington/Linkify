// components/enhance-content-button.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Wand2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLinkedInData } from '@/context/linkedin-data-context';
import { enhanceContent } from '@/actions/enhance-content';
import { toast } from '@/components/ui/use-toast';
import { useChangesMade } from '@/context/changes-made-context';

const pulseAnimation = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 1,
    repeat: Infinity,
  },
};

const gradientStyle = `
  bg-[linear-gradient(90deg,#ffdab9,#e6f2ff,#e6ffe6,#ffffcc,#ffe6f2,#e6e6ff)]
  hover:bg-[linear-gradient(90deg,#ffcba4,#ccebff,#ccffcc,#ffff99,#ffcceb,#ccccff)]
`;

export function EnhanceContentButton() {
  const [isEnhancing, setIsEnhancing] = useState(false);
  const { linkedInProfile, updateLinkedInProfile } = useLinkedInData();
  const { setChangesMade } = useChangesMade();

  const handleEnhanceContent = async () => {
    if (!linkedInProfile) return;

    setIsEnhancing(true);
    try {
      const enhancedProfile = await enhanceContent(linkedInProfile);
      updateLinkedInProfile(enhancedProfile);
      setChangesMade(true);
      toast({
        title: 'Content Enhanced',
        description: 'Your profile content has been improved by AI.',
        className: 'bg-green-500 text-white font-mono',
      });
    } catch (error) {
      console.error('Error enhancing content:', error);
      toast({
        title: 'Enhancement Failed',
        description:
          'There was an error enhancing your content. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsEnhancing(false);
    }
  };

  return (
    <motion.div animate={isEnhancing ? pulseAnimation : {}}>
      <Button
        variant="outline"
        onClick={handleEnhanceContent}
        disabled={isEnhancing}
        className={`
          relative overflow-hidden
          ${gradientStyle}
          text-purple-950 border-purple-700
          transition-all duration-300
        `}
      >
        <div className="relative z-10 flex items-center">
          <div
            className={`
            w-6 h-6 mr-2 rounded-full
            ${gradientStyle}
            flex items-center justify-center
          `}
          >
            <Wand2 className="h-4 w-4 text-purple-950" />
          </div>
          <span>{isEnhancing ? 'Enhancing...' : 'Enhance Content'}</span>
        </div>
        {isEnhancing && (
          <motion.div
            className="absolute inset-0 bg-purple-200 opacity-50"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.5 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </Button>
    </motion.div>
  );
}
