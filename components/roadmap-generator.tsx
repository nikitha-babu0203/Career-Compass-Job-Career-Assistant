"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Building2,
  Sparkles,
  Code,
  FileText,
  CheckCircle2,
  GraduationCap,
  Briefcase,
  Target,
  AlertCircle,
  MapPin,
  Flag,
  Rocket,
  BookOpen,
  Users,
  Trophy,
  ChevronRight,
  Zap,
} from "lucide-react"

interface CompanyRoadmap {
  company: string
  skills: string[]
  certifications: string[]
  projects: { title: string; description: string }[]
  interviewProcess: { stage: string; description: string }[]
  weeklyPlan: { week: string; tasks: string[] }[]
  resumeTips: string[]
}

function RouteNode({
  number,
  title,
  description,
  icon: Icon,
  color,
  isLast = false,
  isActive = false,
  children,
}: {
  number: number
  title: string
  description: string
  icon: React.ElementType
  color: string
  isLast?: boolean
  isActive?: boolean
  children?: React.ReactNode
}) {
  return (
    <div className="relative flex gap-6">
      {/* Vertical line connector */}
      {!isLast && (
        <div className="absolute left-6 top-14 w-1 h-[calc(100%-3rem)] bg-gradient-to-b from-purple-400 to-violet-300 rounded-full" />
      )}

      {/* Node circle */}
      <div
        className={`relative z-10 flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${
          isActive
            ? "bg-gradient-to-br from-purple-600 to-violet-600 ring-4 ring-purple-200 animate-pulse"
            : `bg-gradient-to-br ${color}`
        }`}
      >
        <Icon className="w-6 h-6 text-white" />
      </div>

      {/* Content card */}
      <div className="flex-1 pb-8">
        <div
          className={`p-5 rounded-2xl border-2 transition-all hover:shadow-lg ${
            isActive ? "border-purple-400 bg-purple-50 shadow-md" : "border-gray-200 bg-white hover:border-purple-300"
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full">
              STEP {number}
            </span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-600 mb-3">{description}</p>
          {children}
        </div>
      </div>
    </div>
  )
}

function MilestoneBadge({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200">
      <div className="p-2 rounded-lg bg-purple-100">
        <Icon className="w-4 h-4 text-purple-600" />
      </div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  )
}

function JourneyHeader({ company }: { company: string }) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-700 p-8 text-white mb-8">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24" />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="w-5 h-5" />
          <span className="text-purple-200 text-sm font-medium">Your Career Journey to</span>
        </div>
        <h2 className="text-4xl font-bold mb-2">{company}</h2>
        <p className="text-purple-200 max-w-lg">
          Follow this personalized roadmap to prepare for your dream role. Each milestone brings you closer to success.
        </p>

        <div className="flex items-center gap-6 mt-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm">Journey Started</span>
          </div>
          <div className="flex items-center gap-2">
            <Flag className="w-4 h-4 text-yellow-400" />
            <span className="text-sm">6 Milestones</span>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-yellow-400" />
            <span className="text-sm">Goal: Get Hired</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function WeeklyTimeline({ weeklyPlan }: { weeklyPlan: { week: string; tasks: string[] }[] }) {
  return (
    <div className="relative">
      {/* Horizontal track */}
      <div className="absolute top-6 left-0 right-0 h-2 bg-gradient-to-r from-purple-200 via-violet-300 to-purple-200 rounded-full" />

      <div className="relative grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {weeklyPlan.map((week, idx) => (
          <div key={idx} className="relative pt-10">
            {/* Week marker */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-purple-600 border-4 border-white shadow-md z-10" />

            <div className="p-3 bg-white rounded-xl border border-gray-200 hover:border-purple-400 hover:shadow-md transition-all">
              <div className="text-center mb-2">
                <span className="text-xs font-bold text-purple-600">{week.week}</span>
              </div>
              <ul className="space-y-1">
                {week.tasks.slice(0, 2).map((task, taskIdx) => (
                  <li key={taskIdx} className="text-xs text-gray-600 flex items-start gap-1">
                    <ChevronRight className="w-3 h-3 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span className="line-clamp-2">{task}</span>
                  </li>
                ))}
                {week.tasks.length > 2 && (
                  <li className="text-xs text-purple-600 font-medium">+{week.tasks.length - 2} more</li>
                )}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function InterviewPipeline({ stages }: { stages: { stage: string; description: string }[] }) {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      {stages.map((stage, idx) => (
        <div key={idx} className="flex-1 relative">
          {/* Arrow connector */}
          {idx < stages.length - 1 && (
            <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
              <ChevronRight className="w-8 h-8 text-purple-400" />
            </div>
          )}

          <div
            className={`h-full p-4 rounded-2xl border-2 transition-all hover:shadow-lg ${
              idx === 0
                ? "bg-gradient-to-br from-green-50 to-emerald-50 border-green-300"
                : idx === stages.length - 1
                  ? "bg-gradient-to-br from-purple-50 to-violet-50 border-purple-300"
                  : "bg-white border-gray-200 hover:border-purple-300"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white ${
                  idx === 0 ? "bg-green-500" : idx === stages.length - 1 ? "bg-purple-600" : "bg-gray-400"
                }`}
              >
                {idx + 1}
              </span>
              <h4 className="font-semibold text-gray-900 text-sm">{stage.stage}</h4>
            </div>
            <p className="text-xs text-gray-600">{stage.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export function RoadmapGenerator() {
  const [companyName, setCompanyName] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [roadmap, setRoadmap] = useState<CompanyRoadmap | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!companyName.trim()) return

    setIsGenerating(true)
    setError(null)

    try {
      const response = await fetch("/api/generate-roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyName }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate")
      }

      const data = await response.json()
      setRoadmap(data)
    } catch (err) {
      setError("Failed to generate roadmap. Please try again.")
      console.error(err)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 shadow-lg">
          <MapPin className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dream Company Roadmap</h1>
          <p className="text-muted-foreground">Your personalized career journey map</p>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-destructive" />
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      {/* Input Section */}
      <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-white">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Building2 className="w-5 h-5 text-purple-600" />
            Where do you want to work?
          </CardTitle>
          <CardDescription>Enter your dream company and we will create your journey map</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Input
              placeholder="e.g., Google, Meta, Amazon, Microsoft..."
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="flex-1 border-2 focus:border-purple-400"
              onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
            />
            <Button
              onClick={handleGenerate}
              disabled={!companyName.trim() || isGenerating}
              className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                  Mapping...
                </>
              ) : (
                <>
                  <Rocket className="w-4 h-4 mr-2" />
                  Start Journey
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {roadmap ? (
        <div className="space-y-8">
          {/* Journey Header */}
          <JourneyHeader company={roadmap.company} />

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <MilestoneBadge icon={Code} label="Skills to Learn" value={`${roadmap.skills.length} Skills`} />
            <MilestoneBadge
              icon={GraduationCap}
              label="Certifications"
              value={`${roadmap.certifications.length} Certs`}
            />
            <MilestoneBadge icon={Briefcase} label="Projects" value={`${roadmap.projects.length} Projects`} />
            <MilestoneBadge
              icon={Target}
              label="Interview Rounds"
              value={`${roadmap.interviewProcess.length} Stages`}
            />
          </div>

          {/* Visual Route Map */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl border-2 border-gray-200 p-8">
            <div className="flex items-center gap-2 mb-8">
              <div className="p-2 rounded-lg bg-purple-100">
                <MapPin className="w-5 h-5 text-purple-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Your Journey Map</h2>
            </div>

            <div className="space-y-0">
              {/* Step 1: Skills Foundation */}
              <RouteNode
                number={1}
                title="Build Your Skills Foundation"
                description="Master these essential skills required for the role"
                icon={Code}
                color="from-blue-500 to-cyan-500"
                isActive={true}
              >
                <div className="flex flex-wrap gap-2">
                  {roadmap.skills.map((skill, idx) => (
                    <Badge key={idx} className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </RouteNode>

              {/* Step 2: Certifications */}
              <RouteNode
                number={2}
                title="Earn Valuable Certifications"
                description="Boost your credentials with industry-recognized certifications"
                icon={GraduationCap}
                color="from-purple-500 to-violet-500"
              >
                <ul className="space-y-2">
                  {roadmap.certifications.map((cert, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-purple-600" />
                      <span>{cert}</span>
                    </li>
                  ))}
                </ul>
              </RouteNode>

              {/* Step 3: Portfolio Projects */}
              <RouteNode
                number={3}
                title="Build Portfolio Projects"
                description="Create impressive projects that showcase your abilities"
                icon={Briefcase}
                color="from-orange-500 to-amber-500"
              >
                <div className="space-y-3">
                  {roadmap.projects.map((project, idx) => (
                    <div key={idx} className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                      <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                        <Zap className="w-4 h-4 text-orange-500" />
                        {project.title}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                    </div>
                  ))}
                </div>
              </RouteNode>

              {/* Step 4: Resume Optimization */}
              <RouteNode
                number={4}
                title="Optimize Your Resume"
                description={`Tailor your resume specifically for ${roadmap.company}`}
                icon={FileText}
                color="from-emerald-500 to-green-500"
              >
                <ul className="space-y-2">
                  {roadmap.resumeTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm p-2 bg-emerald-50 rounded-lg">
                      <span className="text-emerald-600 font-bold">{idx + 1}.</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </RouteNode>

              {/* Step 5: Interview Preparation */}
              <RouteNode
                number={5}
                title="Master the Interview Process"
                description="Prepare for each stage of the interview pipeline"
                icon={Users}
                color="from-pink-500 to-rose-500"
              >
                <InterviewPipeline stages={roadmap.interviewProcess} />
              </RouteNode>

              {/* Step 6: Weekly Execution Plan */}
              <RouteNode
                number={6}
                title="Execute Your Weekly Plan"
                description="Follow this structured timeline to stay on track"
                icon={BookOpen}
                color="from-indigo-500 to-blue-500"
                isLast={true}
              >
                <WeeklyTimeline weeklyPlan={roadmap.weeklyPlan} />
              </RouteNode>
            </div>
          </div>

          {/* Destination Card */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-500 to-emerald-600 p-8 text-white text-center">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12" />

            <div className="relative z-10">
              <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-300" />
              <h3 className="text-2xl font-bold mb-2">Destination: {roadmap.company}</h3>
              <p className="text-green-100 max-w-md mx-auto">
                Follow this roadmap consistently and you will be well-prepared to land your dream job. Good luck on your
                journey!
              </p>
              <Button className="mt-6 bg-white text-green-600 hover:bg-green-50" onClick={() => window.print()}>
                <FileText className="w-4 h-4 mr-2" />
                Save Roadmap
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <Card className="border-2 border-dashed border-purple-200">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="relative mb-6">
              <div className="p-6 rounded-full bg-gradient-to-br from-purple-100 to-violet-100">
                <MapPin className="w-12 h-12 text-purple-400" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
            </div>
            <h3 className="font-bold text-xl text-foreground mb-2">Start Your Career Journey</h3>
            <p className="text-sm text-muted-foreground max-w-sm mb-6">
              Enter your dream company name above to generate a personalized roadmap with skills, projects, interview
              tips, and a weekly preparation plan.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Code className="w-4 h-4" />
                <span>Skills</span>
              </div>
              <div className="w-1 h-1 bg-gray-300 rounded-full" />
              <div className="flex items-center gap-1">
                <Briefcase className="w-4 h-4" />
                <span>Projects</span>
              </div>
              <div className="w-1 h-1 bg-gray-300 rounded-full" />
              <div className="flex items-center gap-1">
                <Target className="w-4 h-4" />
                <span>Interview Prep</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
