"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  FileCheck,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Layout,
  FileText,
  Palette,
  Bot,
  Lightbulb,
  Upload,
  AlertCircle,
} from "lucide-react"
import { FileUpload } from "@/components/file-upload"

interface ResumeCategory {
  name: string
  score: number
  iconType: "layout" | "bot" | "fileText" | "palette"
  issues: string[]
  suggestions: string[]
}

interface ResumeCheckResult {
  overallScore: number
  categories: ResumeCategory[]
}

const iconMap = {
  layout: Layout,
  bot: Bot,
  fileText: FileText,
  palette: Palette,
}

export function ResumeChecker() {
  const [resumeText, setResumeText] = useState("")
  const [isChecking, setIsChecking] = useState(false)
  const [result, setResult] = useState<ResumeCheckResult | null>(null)
  const [inputMode, setInputMode] = useState<"paste" | "upload">("upload")
  const [error, setError] = useState<string | null>(null)

  const handleFileExtracted = (text: string) => {
    setResumeText(text)
  }

  const handleCheck = async () => {
    if (!resumeText.trim()) return

    setIsChecking(true)
    setError(null)

    try {
      const response = await fetch("/api/check-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText }),
      })

      if (!response.ok) {
        throw new Error("Failed to check")
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError("Failed to check resume. Please try again.")
      console.error(err)
    } finally {
      setIsChecking(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-xl bg-teal-100">
          <FileCheck className="w-6 h-6 text-teal-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Resume Quality Checker</h1>
          <p className="text-muted-foreground">AI-powered formatting, ATS, and design analysis</p>
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
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Upload className="w-5 h-5" />
                    Your Resume
                  </CardTitle>
                  <CardDescription>Upload a file or paste your resume for analysis</CardDescription>
                </div>
                <div className="flex gap-1 bg-muted p-1 rounded-lg">
                  <Button
                    variant={inputMode === "upload" ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setInputMode("upload")}
                    className="text-xs h-7"
                  >
                    Upload
                  </Button>
                  <Button
                    variant={inputMode === "paste" ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setInputMode("paste")}
                    className="text-xs h-7"
                  >
                    Paste
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {inputMode === "upload" ? (
                <div className="space-y-3">
                  <FileUpload
                    onTextExtracted={handleFileExtracted}
                    label="Drop your resume here"
                    description="PDF, DOCX, DOC, or TXT (max 5MB)"
                  />
                  {resumeText && (
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-sm text-green-700 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        Resume loaded ({resumeText.split(/\s+/).length} words extracted)
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <Textarea
                  placeholder="Paste your complete resume text here..."
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  className="min-h-[400px] resize-none font-mono text-sm"
                />
              )}
            </CardContent>
          </Card>

          <Button className="w-full" size="lg" onClick={handleCheck} disabled={!resumeText.trim() || isChecking}>
            {isChecking ? (
              <>
                <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                Analyzing with AI...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Check Resume Quality
              </>
            )}
          </Button>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          {result ? (
            <>
              {/* Overall Score */}
              <Card className="border-border">
                <CardContent className="pt-6">
                  <div className="text-center mb-6">
                    <div className={`text-6xl font-bold mb-2 ${getScoreColor(result.overallScore)}`}>
                      {result.overallScore}
                      <span className="text-2xl text-muted-foreground">/100</span>
                    </div>
                    <Badge
                      variant="secondary"
                      className={
                        result.overallScore >= 70 ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {result.overallScore >= 80
                        ? "Excellent"
                        : result.overallScore >= 60
                          ? "Good"
                          : "Needs Improvement"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Category Scores */}
              {result.categories.map((category, idx) => {
                const IconComponent = iconMap[category.iconType] || FileText
                return (
                  <Card key={idx} className="border-border">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <IconComponent className="w-5 h-5 text-primary" />
                          {category.name}
                        </CardTitle>
                        <Badge className={getScoreColor(category.score)}>{category.score}%</Badge>
                      </div>
                      <Progress value={category.score} className="h-2" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {category.issues.length > 0 && (
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-1">
                            <AlertTriangle className="w-4 h-4" />
                            Issues Found
                          </p>
                          <ul className="space-y-1">
                            {category.issues.map((issue, issueIdx) => (
                              <li key={issueIdx} className="flex items-start gap-2 text-sm">
                                <XCircle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                                {issue}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-1">
                          <Lightbulb className="w-4 h-4" />
                          Suggestions
                        </p>
                        <ul className="space-y-1">
                          {category.suggestions.map((suggestion, sugIdx) => (
                            <li key={sugIdx} className="flex items-start gap-2 text-sm">
                              <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                              {suggestion}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </>
          ) : (
            <Card className="border-border border-dashed h-full">
              <CardContent className="flex flex-col items-center justify-center py-16 text-center h-full">
                <div className="p-4 rounded-full bg-muted mb-4">
                  <FileCheck className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">No Resume Checked</h3>
                <p className="text-sm text-muted-foreground max-w-xs">
                  Upload your resume file or paste the text to get an AI-powered quality analysis.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
