'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { templates, useThemeTemplate } from '@/context/editor-sidebar-context';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Crown } from 'lucide-react';

interface DemoSidebarProps {
  email: string;
}

export function DemoSidebar({ email }: DemoSidebarProps) {
  const { selectedTemplate, setSelectedTemplate } = useThemeTemplate();
  const router = useRouter();

  return (
    <div className="flex flex-col rounded-lg border bg-white p-4 shadow-lg h-full">
      <Label className="my-4 flex justify-center text-lg font-semibold">
        Select a Template
      </Label>
      <ScrollArea className="flex-grow">
        <div className="grid grid-cols-1 gap-4">
          {templates.map((template, index) => (
            <Card
              key={index}
              className={`${template.isPremium ? 'opacity-50' : ''} overflow-hidden`}
            >
              <CardHeader className="p-4">
                <div className="flex flex-row justify-between items-center">
                  <CardTitle className="text-base">{template.name}</CardTitle>
                  {template.isPremium && (
                    <Badge className="text-xs px-2 py-0.5 bg-gradient-to-r from-yellow-400 to-amber-600">
                      <Crown size={14} className="mr-2" /> Premium
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="relative w-full pt-[56.25%]">
                  <Image
                    src={template.image}
                    alt={template.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg shadow-lg"
                  />
                </div>
              </CardContent>
              <CardFooter className="p-4">
                <Button
                  className={cn('w-full text-sm py-2', {
                    'bg-purple-500 text-white': selectedTemplate === index,
                    'bg-purple-700 text-black': selectedTemplate !== index,
                  })}
                  disabled={template.isPremium}
                  onClick={() => setSelectedTemplate(index)}
                >
                  {selectedTemplate === index ? 'Selected' : 'Select'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
