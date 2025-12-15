"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  FileSearch,
  Github,
  MessageSquare,
  Building2,
  FileCheck,
  Sparkles,
  TrendingUp,
  Target,
  Zap,
  ArrowRight,
} from "lucide-react"
import { WaveBackground } from "@/components/wave-background"
import type { ViewType } from "@/app/page"

interface DashboardProps {
  onNavigate: (view: ViewType) => void
}

const features = [
  {
    id: "job-analyzer" as ViewType,
    title: "Job Match Analyzer",
    description: "Paste a job description and your resume to get instant match analysis with gap identification",
    icon: FileSearch,
    color: "bg-primary/10 text-primary",
    stats: "Match Score + Gap Analysis",
  },
  {
    id: "github-analyzer" as ViewType,
    title: "GitHub Profile Analyzer",
    description: "Analyze your GitHub activity, languages, and project quality for a comprehensive strength score",
    icon: Github,
    color: "bg-chart-2/10 text-chart-2",
    stats: "Code Frequency + Languages",
  },
  {
    id: "interview-generator" as ViewType,
    title: "Interview Question Generator",
    description: "Get personalized interview questions based on your resume and target job requirements",
    icon: MessageSquare,
    color: "bg-chart-3/10 text-chart-3",
    stats: "Custom Questions + Tips",
  },
  {
    id: "roadmap-generator" as ViewType,
    title: "Dream Company Roadmap",
    description: "Enter your dream company and get a complete preparation plan with skills and projects",
    icon: Building2,
    color: "bg-chart-4/10 text-chart-4",
    stats: "4-8 Week Plan + Projects",
  },
  {
    id: "resume-checker" as ViewType,
    title: "Resume Quality Checker",
    description: "Check your resume for formatting issues, ATS compatibility, and design problems",
    icon: FileCheck,
    color: "bg-chart-5/10 text-chart-5",
    stats: "Quality Score + Fixes",
  },
]

export function Dashboard({ onNavigate }: DashboardProps) {
  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-3xl bg-background border border-border min-h-[400px]">
        <WaveBackground />

        <div className="relative z-10 p-8 lg:p-12 max-w-2xl">
          <div className="flex items-center gap-2 text-primary mb-4">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm font-medium">AI-Powered Career Assistant</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
            Navigate Your
            <br />
            Career Path
          </h1>
          <p className="text-muted-foreground text-lg mb-8 max-w-md">
            Analyze job fit, identify skill gaps, prepare for interviews, and create your personalized roadmap to
            success.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="rounded-full px-8" onClick={() => onNavigate("job-analyzer")}>
              Start Job Analysis
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8 bg-white/80 backdrop-blur-sm"
              onClick={() => onNavigate("career-chat")}
            >
              Ask Career Questions
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-border rounded-2xl">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="p-3 rounded-2xl bg-primary/10">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">6</p>
              <p className="text-sm text-muted-foreground">Analysis Tools</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border rounded-2xl">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="p-3 rounded-2xl bg-accent/10">
              <TrendingUp className="w-6 h-6 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">5D</p>
              <p className="text-sm text-muted-foreground">Role Fit Radar</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border rounded-2xl">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="p-3 rounded-2xl bg-chart-3/10">
              <Zap className="w-6 h-6 text-chart-3" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">AI</p>
              <p className="text-sm text-muted-foreground">Powered Insights</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Feature Cards */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6">Career Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card
              key={feature.id}
              className="group cursor-pointer border-border rounded-2xl hover:border-primary/50 hover:shadow-xl transition-all duration-300"
              onClick={() => onNavigate(feature.id)}
            >
              <CardHeader className="pb-3">
                <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon className="w-7 h-7" />
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">{feature.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">{feature.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground bg-muted px-3 py-1.5 rounded-full">
                    {feature.stats}
                  </span>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
