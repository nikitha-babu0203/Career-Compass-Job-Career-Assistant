"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MessageSquare,
  Sparkles,
  Code,
  Users,
  Brain,
  Lightbulb,
  Target,
  Copy,
  Check,
  AlertCircle,
  Upload,
} from "lucide-react"
import { FileUpload } from "@/components/file-upload"
import { CheckCircle2 } from "lucide-react"

interface InterviewQuestion {
  category: string
  question: string
  tip: string
  difficulty: "Easy" | "Medium" | "Hard"
}

export function InterviewGenerator() {
  const [resume, setResume] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [questions, setQuestions] = useState<InterviewQuestion[]>([])
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [resumeInputMode, setResumeInputMode] = useState<"paste" | "upload">("upload")

  const handleGenerate = async () => {
    if (!resume.trim() || !jobDescription.trim()) return

    setIsGenerating(true)
    setError(null)

    try {
      const response = await fetch("/api/generate-interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume, jobDescription }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate")
      }

      const data = await response.json()
      setQuestions(data.questions)
    } catch (err) {
      setError("Failed to generate questions. Please try again.")
      console.error(err)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleResumeFileExtracted = (text: string) => {
    setResume(text)
  }

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Hard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Technical":
        return Code
      case "Behavioral":
        return Users
      case "System Design":
        return Brain
      case "Problem Solving":
        return Lightbulb
      default:
        return MessageSquare
    }
  }

  const categories = [...new Set(questions.map((q) => q.category))]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-xl bg-orange-100">
          <MessageSquare className="w-6 h-6 text-orange-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Interview Question Generator</h1>
          <p className="text-muted-foreground">AI-generated personalized interview questions</p>
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
                  <CardDescription>Upload or paste your resume</CardDescription>
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
                        Resume loaded ({resume.split(/\s+/).length} words)
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <Textarea
                  placeholder="Paste your resume text here..."
                  value={resume}
                  onChange={(e) => setResume(e.target.value)}
                  className="min-h-[150px] resize-none"
                />
              )}
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg">Target Job Description</CardTitle>
              <CardDescription>Paste the job you are interviewing for</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Paste the job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="min-h-[150px] resize-none"
              />
            </CardContent>
          </Card>

          <Button
            className="w-full"
            size="lg"
            onClick={handleGenerate}
            disabled={!resume.trim() || !jobDescription.trim() || isGenerating}
          >
            {isGenerating ? (
              <>
                <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                Generating with AI...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Interview Questions
              </>
            )}
          </Button>
        </div>

        {/* Results Section */}
        <div>
          {questions.length > 0 ? (
            <Tabs defaultValue={categories[0]} className="w-full">
              <TabsList className="flex flex-wrap h-auto gap-1 mb-4">
                {categories.map((category) => (
                  <TabsTrigger key={category} value={category} className="text-xs">
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>

              {categories.map((category) => (
                <TabsContent key={category} value={category} className="space-y-4">
                  {questions
                    .filter((q) => q.category === category)
                    .map((question, idx) => {
                      const Icon = getCategoryIcon(question.category)
                      const globalIndex = questions.indexOf(question)

                      return (
                        <Card key={idx} className="border-border">
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <Icon className="w-4 h-4 text-primary" />
                                <Badge className={getDifficultyColor(question.difficulty)}>{question.difficulty}</Badge>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => copyToClipboard(question.question, globalIndex)}
                              >
                                {copiedIndex === globalIndex ? (
                                  <Check className="w-4 h-4 text-green-600" />
                                ) : (
                                  <Copy className="w-4 h-4" />
                                )}
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <p className="font-medium text-foreground">{question.question}</p>
                            <div className="flex items-start gap-2 p-3 bg-primary/5 rounded-lg">
                              <Target className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                              <p className="text-sm text-muted-foreground">{question.tip}</p>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                </TabsContent>
              ))}
            </Tabs>
          ) : (
            <Card className="border-border border-dashed h-full">
              <CardContent className="flex flex-col items-center justify-center py-16 text-center h-full">
                <div className="p-4 rounded-full bg-muted mb-4">
                  <MessageSquare className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">No Questions Generated</h3>
                <p className="text-sm text-muted-foreground max-w-xs">
                  Add your resume and target job description to generate AI-powered personalized interview questions.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
