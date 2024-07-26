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

interface DemoSidebarProps {
  email: string;
}

export function DemoSidebar({ email }: DemoSidebarProps) {
  const { selectedTemplate, setSelectedTemplate } = useThemeTemplate();
  const router = useRouter();

  return (
    <div className="flex h-full flex-col rounded-lg border bg-white p-4 shadow-lg">
      <Label className="my-4 flex justify-center text-lg font-semibold">
        Select a Template
      </Label>
      <ScrollArea className="h-full">
        {templates.map((template, index) => (
          <Card
            key={index}
            className={`mb-4 ${template.isPremium ? 'opacity-50' : ''}`}
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {template.name}
                {template.isPremium && (
                  <Badge className="flex items-center gap-1 bg-gradient-to-r from-gray-400 to-gray-600 px-2 py-1">
                    Premium
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Image
                src={template.image}
                alt={template.name}
                width={200}
                height={200}
                className="mx-auto mb-4 rounded-lg shadow-lg"
              />
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-purple-600 hover:bg-purple-700"
                disabled={template.isPremium}
                onClick={() => setSelectedTemplate(index)}
              >
                {selectedTemplate === index ? 'Selected' : 'Select'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </ScrollArea>
    </div>
  );
}
