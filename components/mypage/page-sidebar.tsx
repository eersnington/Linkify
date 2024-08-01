'use client';

import Image from 'next/image';
import {
  templates,
  themes,
  useThemeTemplate,
} from '@/context/editor-sidebar-context';
import {
  Blocks,
  Crown,
  LayoutPanelLeft,
  Palette,
  Sparkles,
  Zap,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { LinkedInProfileForm } from '../forms/linkedin-update-form';
import UploadCVButton from '../upload-cv-button';

interface PageSidebarProps {
  isUserPremium: boolean;
}

export function PageSidebar({ isUserPremium }: PageSidebarProps) {
  const {
    selectedTheme,
    setSelectedTheme,
    selectedTemplate,
    setSelectedTemplate,
  } = useThemeTemplate();

  const PremiumBadge = () => (
    <Badge className="text-xs px-2 py-0.5 bg-gradient-to-r from-yellow-400 to-amber-600">
      <Crown size={14} className="mr-2" /> Premium
    </Badge>
  );

  const renderTemplateCards = () => (
    <>
      <Label className="my-4 flex justify-center text-lg font-semibold">
        Select a Template
      </Label>
      <ScrollArea className="flex-grow">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
          {templates.map((template, index) => (
            <TooltipProvider key={index}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Card
                    className={cn(
                      'overflow-hidden',
                      template.isPremium && !isUserPremium && 'opacity-50'
                    )}
                  >
                    <CardHeader className="p-4">
                      <div className="flex flex-row justify-between items-center">
                        <CardTitle className="text-base">
                          {template.name}
                        </CardTitle>
                        {template.isPremium && <PremiumBadge />}
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
                          'bg-purple-700 text-white':
                            selectedTemplate === index,
                          'bg-slate-500 text-white': selectedTemplate !== index,
                        })}
                        disabled={template.isPremium && !isUserPremium}
                        onClick={() => setSelectedTemplate(index)}
                      >
                        {selectedTemplate === index ? 'Selected' : 'Select'}
                      </Button>
                    </CardFooter>
                  </Card>
                </TooltipTrigger>
                {template.isPremium && !isUserPremium && (
                  <TooltipContent className="bg-purple-500 text-white">
                    <p>
                      You need a Premium Subscription to access this template
                    </p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </ScrollArea>
    </>
  );

  const renderThemeCards = () => (
    <>
      <Label
        htmlFor="theme"
        className="my-4 flex justify-center text-center text-lg font-semibold"
      >
        Change the theme
      </Label>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Theme Editor</CardTitle>
          <CardDescription>
            {/*TODO: COLOR PICKER FOR EACH ELEMENT*/}
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button
            className="w-full text-sm py-2 bg-purple-700 text-white"
            onClick={() => setSelectedTheme(0)}
          >
            Set Theme
          </Button>
        </CardFooter>
      </Card>
    </>
  );

  return (
    <div className="flex flex-col rounded-lg border bg-gray-100 p-4 shadow-lg h-full">
      <Tabs
        defaultValue="template"
        className="flex h-full flex-col overflow-hidden rounded-lg bg-white p-4 drop-shadow-lg"
      >
        <TabsList className="grid w-full grid-cols-2 rounded-md">
          <TabsTrigger
            value="template"
            className="flex items-center justify-center space-x-2 text-sm font-medium transition-all hover:bg-white data-[state=active]:bg-white data-[state=active]:text-purple-700 rounded-md"
          >
            <LayoutPanelLeft size={16} />
            <span className="hidden sm:inline">Templates</span>
          </TabsTrigger>
          {/* <TabsTrigger
            value="theme"
            className="flex items-center justify-center space-x-2 text-sm font-medium transition-all hover:bg-white data-[state=active]:bg-white data-[state=active]:text-purple-700 rounded-md"
          >
            <Palette size={16} />
            <span className="hidden sm:inline">Themes</span>
          </TabsTrigger> */}
          <TabsTrigger
            value="blocks"
            className="flex items-center justify-center space-x-2 text-sm font-medium transition-all hover:bg-white data-[state=active]:bg-white data-[state=active]:text-purple-700 rounded-md"
          >
            <Blocks size={16} />
            <span className="hidden sm:inline">Blocks</span>
          </TabsTrigger>
        </TabsList>
        <div className="flex-1 overflow-hidden mt-4">
          <ScrollArea className="h-full">
            <div className="p-4">
              <TabsContent value="template">
                {renderTemplateCards()}
              </TabsContent>
              <TabsContent value="theme">{renderThemeCards()}</TabsContent>
              <TabsContent value="blocks">
                <LinkedInProfileForm />
                <UploadCVButton />
              </TabsContent>
            </div>
          </ScrollArea>
        </div>
      </Tabs>
    </div>
  );
}
