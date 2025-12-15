"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  Github,
  Code,
  GitBranch,
  BookOpen,
  TrendingUp,
  Folder,
  Sparkles,
  Star,
  GitCommit,
  AlertCircle,
} from "lucide-react"

interface GitHubResult {
  strengthScore: number
  codeFrequency: string
  primaryLanguages: { name: string; percentage: number }[]
  documentationQuality: string
  activityTrend: string
  projectDepth: string
  totalRepos: number
  totalCommits: number
  insights: string[]
}

export function GithubAnalyzer() {
  const [githubUrl, setGithubUrl] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<GitHubResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleAnalyze = async () => {
    if (!githubUrl.trim()) return

    setIsAnalyzing(true)
    setError(null)

    try {
      const response = await fetch("/api/analyze-github", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ githubUrl }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `Server error: ${response.status}`)
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred"
      setError(`Failed to analyze: ${errorMessage}. Please check the GitHub URL and your API key.`)
      console.error("GitHub analysis error:", err)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-primary"
    if (score >= 40) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-xl bg-purple-100">
          <Github className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">GitHub Profile Analyzer</h1>
          <p className="text-muted-foreground">AI-powered analysis of your coding activity and projects</p>
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
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-lg">Enter GitHub Profile URL</CardTitle>
          <CardDescription>We will analyze your public repositories and activity using AI</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Input
              placeholder="https://github.com/username"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleAnalyze} disabled={!githubUrl.trim() || isAnalyzing}>
              {isAnalyzing ? (
                <>
                  <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Analyze
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      {result ? (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Score Card */}
          <Card className="lg:col-span-1 border-border">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className={`text-6xl font-bold mb-2 ${getScoreColor(result.strengthScore)}`}>
                  {result.strengthScore}
                </div>
                <p className="text-sm text-muted-foreground mb-4">GitHub Strength Score</p>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="p-4 bg-muted rounded-lg">
                    <Folder className="w-5 h-5 mx-auto mb-2 text-primary" />
                    <p className="text-2xl font-bold">{result.totalRepos}</p>
                    <p className="text-xs text-muted-foreground">Repositories</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <GitCommit className="w-5 h-5 mx-auto mb-2 text-purple-600" />
                    <p className="text-2xl font-bold">{result.totalCommits}</p>
                    <p className="text-xs text-muted-foreground">Total Commits</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Details */}
          <div className="lg:col-span-2 space-y-4">
            {/* Languages */}
            <Card className="border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Code className="w-5 h-5 text-primary" />
                  Primary Languages
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {result.primaryLanguages.map((lang, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{lang.name}</span>
                      <span className="text-muted-foreground">{lang.percentage}%</span>
                    </div>
                    <Progress value={lang.percentage} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Metrics Grid */}
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="border-border">
                <CardContent className="pt-4">
                  <div className="flex items-center gap-3 mb-2">
                    <GitBranch className="w-5 h-5 text-blue-600" />
                    <span className="font-medium">Code Frequency</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{result.codeFrequency}</p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="pt-4">
                  <div className="flex items-center gap-3 mb-2">
                    <BookOpen className="w-5 h-5 text-green-600" />
                    <span className="font-medium">Documentation</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{result.documentationQuality}</p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="pt-4">
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="w-5 h-5 text-orange-600" />
                    <span className="font-medium">Activity Trend</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{result.activityTrend}</p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="pt-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Folder className="w-5 h-5 text-purple-600" />
                    <span className="font-medium">Project Depth</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{result.projectDepth}</p>
                </CardContent>
              </Card>
            </div>

            {/* Insights */}
            <Card className="border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  AI Insights & Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.insights.map((insight, idx) => (
                    <li key={idx} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                      <span className="text-primary font-bold">{idx + 1}.</span>
                      <span className="text-sm">{insight}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <Card className="border-border border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="p-4 rounded-full bg-muted mb-4">
              <Github className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">No Profile Analyzed</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              Enter your GitHub profile URL to get an AI-powered analysis of your coding activity, languages, and
              project quality.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
