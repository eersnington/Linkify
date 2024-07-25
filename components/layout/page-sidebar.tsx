"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  templates,
  themes,
  useThemeTemplate,
} from "@/context/editor-sidebar-context";
import {
  Blocks,
  Crown,
  LayoutPanelLeft,
  Palette,
  Sparkles,
  Zap,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { LinkedInProfileForm } from "../forms/linkedin-update-form";

interface PageSidebarProps {
  email: string;
}

export function PageSidebar({ email }: PageSidebarProps) {
  const {
    selectedTheme,
    setSelectedTheme,
    selectedTemplate,
    setSelectedTemplate,
  } = useThemeTemplate();

  const router = useRouter();

  const PremiumBadge = () => (
    <Badge className="flex items-center gap-1 rounded-full bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 px-2 py-1 font-bold text-purple-500">
      <Crown size={14} />
      Premium
    </Badge>
  );

  const renderTemplateCards = () => (
    <>
      <Label
        htmlFor="template"
        className="my-4 flex justify-center text-center text-lg font-semibold"
      >
        Select a template
      </Label>
      {templates.map((template, index) => (
        <Card key={index} className="mb-4">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {template.name}
              {template.isPremium && <PremiumBadge />}
            </CardTitle>
            <CardDescription>
              <Image
                src={template.image}
                alt={template.name}
                width={200}
                height={200}
                className="mx-auto mb-4 rounded-lg shadow-lg"
              />
            </CardDescription>
          </CardHeader>
          <CardFooter>
            {template.isPremium ? (
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    className="bg-slate-800 hover:bg-purple-600"
                    onClick={() => setSelectedTemplate(index)}
                  >
                    Select this template
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-slate-50 sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle className="text-gradient_indigo-purple flex items-center gap-2 text-2xl font-bold">
                      <Sparkles className="size-6 text-yellow-500" />
                      Unlock Premium Theme
                    </DialogTitle>
                    <DialogDescription className="text-lg">
                      Elevate your profile with our exclusive premium theme!
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-purple-100 p-2">
                        <Sparkles className="size-6 text-purple-600" />
                      </div>
                      <div className="text-sm">
                        <p className="font-semibold">Enhanced Visual Appeal</p>
                        <p className="text-gray-500">
                          Stand out with unique designs
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-purple-100 p-2">
                        <Crown className="size-6 text-purple-600" />
                      </div>
                      <div className="text-sm">
                        <p className="font-semibold">Professional Edge</p>
                        <p className="text-gray-500">
                          Impress potential employers
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-purple-100 p-2">
                        <Zap className="size-6 text-purple-600" />
                      </div>
                      <div className="text-sm">
                        <p className="font-semibold">Advanced Features</p>
                        <p className="text-gray-500">
                          Custom domain, web analytics, and AI content
                        </p>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      type="submit"
                      className="bg-green-700 hover:bg-green-600"
                      onClick={() => router.push("/pricing")}
                    >
                      Subscribe Now
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            ) : (
              <Button
                className="bg-slate-800 hover:bg-purple-600"
                onClick={() => setSelectedTheme(index)}
              >
                {selectedTemplate === index
                  ? "Applied"
                  : "Select this template"}
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </>
  );

  const renderThemeCards = () => (
    <>
      <Label
        htmlFor="theme"
        className="my-4 flex justify-center text-center text-lg font-semibold"
      >
        Select a theme
      </Label>
      {themes.map((theme, index) => (
        <Card key={index} className="mb-4">
          <CardHeader>
            <CardTitle>{theme.name}</CardTitle>
            <CardDescription>
              <Badge className={cn(`${theme.color}`, "size-16 rounded-lg")} />
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button
              className="bg-slate-800 hover:bg-purple-600"
              onClick={() => setSelectedTheme(index)}
            >
              {selectedTheme === index ? "Applied" : "Select this theme"}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </>
  );

  return (
    <Tabs
      defaultValue="template"
      className="flex h-full flex-col overflow-hidden rounded-lg border bg-slate-50 p-4 drop-shadow-lg"
    >
      <TabsList className="grid w-full grid-cols-3 border">
        <TabsTrigger value="template">
          <LayoutPanelLeft /> Templates
        </TabsTrigger>
        <TabsTrigger value="theme">
          <Palette /> Themes
        </TabsTrigger>
        <TabsTrigger value="blocks">
          <Blocks /> Blocks
        </TabsTrigger>
      </TabsList>
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-4">
            <TabsContent value="template">{renderTemplateCards()}</TabsContent>
            <TabsContent value="theme">{renderThemeCards()}</TabsContent>
            <TabsContent value="blocks">
              <LinkedInProfileForm email={email} />
            </TabsContent>
          </div>
        </ScrollArea>
      </div>
    </Tabs>
  );
}
