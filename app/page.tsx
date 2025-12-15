"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Dashboard } from "@/components/dashboard"
import { JobAnalyzer } from "@/components/job-analyzer"
import { GithubAnalyzer } from "@/components/github-analyzer"
import { InterviewGenerator } from "@/components/interview-generator"
import { RoadmapGenerator } from "@/components/roadmap-generator"
import { ResumeChecker } from "@/components/resume-checker"
import { CareerChat } from "@/components/career-chat"
import { LoginPage } from "@/components/login-page"
import { useAuth } from "@/lib/auth-context"
import { Loader2 } from "lucide-react"

export type ViewType =
  | "dashboard"
  | "job-analyzer"
  | "github-analyzer"
  | "interview-generator"
  | "roadmap-generator"
  | "resume-checker"
  | "career-chat"

export default function Home() {
  const { user, isLoading } = useAuth()
  const [currentView, setCurrentView] = useState<ViewType>("dashboard")

  const renderView = () => {
    switch (currentView) {
      case "dashboard":
        return <Dashboard onNavigate={setCurrentView} />
      case "job-analyzer":
        return <JobAnalyzer />
      case "github-analyzer":
        return <GithubAnalyzer />
      case "interview-generator":
        return <InterviewGenerator />
      case "roadmap-generator":
        return <RoadmapGenerator />
      case "resume-checker":
        return <ResumeChecker />
      case "career-chat":
        return <CareerChat />
      default:
        return <Dashboard onNavigate={setCurrentView} />
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <LoginPage onSuccess={() => {}} />
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar currentView={currentView} onViewChange={setCurrentView} />
      <main className="container mx-auto px-4 py-8">{renderView()}</main>
    </div>
  )
}
