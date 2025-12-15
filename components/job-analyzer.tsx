"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  FileSearch,
  Upload,
  Sparkles,
  CheckCircle2,
  XCircle,
  Lightbulb,
  TrendingUp,
  Brain,
  AlertCircle,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { RoleFitRadar } from "@/components/role-fit-radar"
import { FileUpload } from "@/components/file-upload"

interface MatchResult {
  overallScore: number
  skillsFit: number
  experienceFit: number
  toolsFit: number
  domainFit: number
  communicationFit: number
  matchedSkills: string[]
  missingSkills: string[]
  suggestions: string[]
  personality: {
    analytical: number
    creative: number
    detailOriented: number
    leadership: number
    collaborative: number
    recommendedRoles: string[]
  }
}

export function JobAnalyzer() {
  const [jobDescription, setJobDescription] = useState("")
  const [resume, setResume] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [resumeInputMode, setResumeInputMode] = useState<"paste" | "upload">("upload")

  const handleAnalyze = async () => {
    if (!jobDescription.trim() || !resume.trim()) return

    setIsAnalyzing(true)
    setError(null)

    try {
      const response = await fetch("/api/analyze-job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume, jobDescription }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `Server error: ${response.status}`)
      }

      const data = await response.json()
      setMatchResult(data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred"
      setError(`Failed to analyze: ${errorMessage}. Please check your API key and try again.`)
      console.error("Job analysis error:", err)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleResumeFileExtracted = (text: string) => {
    setResume(text)
  }

  const getScoreLabel = (score: number) => {
    if (score >= 85) return { label: "Excellent Match", color: "bg-green-100 text-green-800" }
    if (score >= 70) return { label: "Strong Match", color: "bg-primary/10 text-primary" }
    if (score >= 50) return { label: "Moderate Match", color: "bg-yellow-100 text-yellow-800" }
    return { label: "Needs Improvement", color: "bg-red-100 text-red-800" }
  }

  const scoreInfo = matchResult ? getScoreLabel(matchResult.overallScore) : null

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-xl bg-primary/10">
          <FileSearch className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Job Match Analyzer</h1>
          <p className="text-muted-foreground">AI-powered analysis of your fit for any job opening</p>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-destructive" />
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Job Description
              </CardTitle>
              <CardDescription>Paste the job posting you want to analyze</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Paste the full job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="min-h-[200px] resize-none"
              />
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Upload className="w-5 h-5" />
                    Your Resume
                  </CardTitle>
                  <CardDescription>Upload a file or paste your resume content</CardDescription>
                </div>
                <div className="flex gap-1 bg-muted p-1 rounded-lg">
                  <Button
                    variant={resumeInputMode === "upload" ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setResumeInputMode("upload")}
                    className="text-xs h-7"
                  >
                    Upload
                  </Button>
                  <Button
                    variant={resumeInputMode === "paste" ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setResumeInputMode("paste")}
                    className="text-xs h-7"
                  >
                    Paste
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {resumeInputMode === "upload" ? (
                <div className="space-y-3">
                  <FileUpload
                    onTextExtracted={handleResumeFileExtracted}
                    label="Drop your resume here"
                    description="PDF, DOCX, DOC, or TXT (max 5MB)"
                  />
                  {resume && (
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-sm text-green-700 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        Resume loaded ({resume.split(/\s+/).length} words extracted)
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <Textarea
                  placeholder="Paste your resume text here..."
                  value={resume}
                  onChange={(e) => setResume(e.target.value)}
                  className="min-h-[200px] resize-none"
                />
              )}
            </CardContent>
          </Card>

          <Button
            className="w-full"
            size="lg"
            onClick={handleAnalyze}
            disabled={!jobDescription.trim() || !resume.trim() || isAnalyzing}
          >
            {isAnalyzing ? (
              <>
                <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                Analyzing with AI...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Analyze Match
              </>
            )}
          </Button>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          {matchResult ? (
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="gaps">Gap Analysis</TabsTrigger>
                <TabsTrigger value="personality">Personality</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <Card className="border-border">
                  <CardContent className="pt-6">
                    <div className="text-center mb-6">
                      <div className="text-6xl font-bold text-primary mb-2">
                        {matchResult.overallScore}
                        <span className="text-2xl text-muted-foreground">/100</span>
                      </div>
                      <Badge className={scoreInfo?.color} variant="secondary">
                        {scoreInfo?.label}
                      </Badge>
                    </div>

                    <RoleFitRadar
                      skillsFit={matchResult.skillsFit}
                      experienceFit={matchResult.experienceFit}
                      toolsFit={matchResult.toolsFit}
                      domainFit={matchResult.domainFit}
                      communicationFit={matchResult.communicationFit}
                    />
                  </CardContent>
                </Card>

                <div className="grid grid-cols-2 gap-4">
                  <Card className="border-border">
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-2 text-green-600 mb-2">
                        <CheckCircle2 className="w-4 h-4" />
                        <span className="text-sm font-medium">Matched Skills</span>
                      </div>
                      <p className="text-2xl font-bold">{matchResult.matchedSkills.length}</p>
                    </CardContent>
                  </Card>
                  <Card className="border-border">
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-2 text-yellow-600 mb-2">
                        <XCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">Missing Skills</span>
                      </div>
                      <p className="text-2xl font-bold">{matchResult.missingSkills.length}</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="gaps" className="space-y-4">
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2 text-green-600">
                      <CheckCircle2 className="w-5 h-5" />
                      Matched Skills
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {matchResult.matchedSkills.length > 0 ? (
                        matchResult.matchedSkills.map((skill, idx) => (
                          <Badge key={idx} variant="secondary" className="bg-green-50 text-green-700">
                            {skill}
                          </Badge>
                        ))
                      ) : (
                        <p className="text-muted-foreground text-sm">No direct skill matches found</p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2 text-yellow-600">
                      <XCircle className="w-5 h-5" />
                      Skills to Develop
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {matchResult.missingSkills.length > 0 ? (
                        matchResult.missingSkills.map((skill, idx) => (
                          <Badge key={idx} variant="outline" className="border-yellow-400 text-yellow-700">
                            {skill}
                          </Badge>
                        ))
                      ) : (
                        <p className="text-green-600 text-sm">Great! You have all required skills</p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-primary" />
                      AI-Powered Suggestions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {matchResult.suggestions.map((suggestion, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                        <TrendingUp className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <p className="text-sm">{suggestion}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="personality" className="space-y-4">
                {matchResult.personality && (
                  <>
                    <Card className="border-border">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Brain className="w-5 h-5 text-primary" />
                          Career Personality Decoder
                        </CardTitle>
                        <CardDescription>AI analysis of your resume tone and writing style</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {Object.entries({
                          Analytical: matchResult.personality.analytical,
                          Creative: matchResult.personality.creative,
                          "Detail-Oriented": matchResult.personality.detailOriented,
                          Leadership: matchResult.personality.leadership,
                          Collaborative: matchResult.personality.collaborative,
                        }).map(([trait, value]) => (
                          <div key={trait} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>{trait}</span>
                              <span className="text-muted-foreground">{value}%</span>
                            </div>
                            <Progress value={value} className="h-2" />
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    <Card className="border-border">
                      <CardHeader>
                        <CardTitle className="text-lg">Recommended Roles</CardTitle>
                        <CardDescription>Based on your personality profile</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {matchResult.personality.recommendedRoles.map((role, idx) => (
                            <Badge key={idx} variant="secondary">
                              {role}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </>
                )}
              </TabsContent>
            </Tabs>
          ) : (
            <Card className="border-border border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <div className="p-4 rounded-full bg-muted mb-4">
                  <FileSearch className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Ready to Analyze</h3>
                <p className="text-sm text-muted-foreground max-w-xs">
                  Paste a job description and upload your resume, then click analyze to see your AI-powered match score
                  and personalized insights.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
