// Skill extraction and analysis utilities

export interface ExtractedSkills {
  technical: string[]
  soft: string[]
  tools: string[]
  certifications: string[]
}

export interface MatchResult {
  overallScore: number
  skillsFit: number
  experienceFit: number
  toolsFit: number
  domainFit: number
  communicationFit: number
  matchedSkills: string[]
  missingSkills: string[]
  suggestions: string[]
}

export interface PersonalityTraits {
  analytical: number
  creative: number
  detailOriented: number
  leadership: number
  collaborative: number
  recommendedRoles: string[]
}

export interface GitHubAnalysis {
  strengthScore: number
  codeFrequency: string
  primaryLanguages: string[]
  documentationQuality: string
  activityTrend: string
  projectDepth: string
  insights: string[]
}

export interface ResumeQuality {
  overallScore: number
  formatting: { score: number; issues: string[] }
  atsCompatibility: { score: number; issues: string[] }
  design: { score: number; issues: string[] }
  content: { score: number; issues: string[] }
  improvements: string[]
}

// Common tech skills database for matching
export const techSkillsDatabase = [
  // Programming Languages
  "javascript",
  "typescript",
  "python",
  "java",
  "c++",
  "c#",
  "go",
  "rust",
  "ruby",
  "php",
  "swift",
  "kotlin",
  "scala",
  // Frontend
  "react",
  "vue",
  "angular",
  "next.js",
  "nuxt",
  "svelte",
  "html",
  "css",
  "sass",
  "tailwind",
  "bootstrap",
  // Backend
  "node.js",
  "express",
  "django",
  "flask",
  "spring",
  "fastapi",
  "rails",
  "laravel",
  // Database
  "sql",
  "postgresql",
  "mysql",
  "mongodb",
  "redis",
  "elasticsearch",
  "firebase",
  "supabase",
  // Cloud & DevOps
  "aws",
  "azure",
  "gcp",
  "docker",
  "kubernetes",
  "terraform",
  "jenkins",
  "github actions",
  "ci/cd",
  // Data & AI
  "machine learning",
  "deep learning",
  "tensorflow",
  "pytorch",
  "pandas",
  "numpy",
  "scikit-learn",
  // Tools
  "git",
  "jira",
  "figma",
  "postman",
  "webpack",
  "vite",
]

export const softSkillsDatabase = [
  "communication",
  "leadership",
  "teamwork",
  "problem-solving",
  "critical thinking",
  "time management",
  "adaptability",
  "creativity",
  "collaboration",
  "presentation",
  "mentoring",
  "project management",
  "stakeholder management",
  "agile",
  "scrum",
]

export function extractSkillsFromText(text: string): ExtractedSkills {
  const lowerText = text.toLowerCase()

  const technical = techSkillsDatabase.filter((skill) => lowerText.includes(skill.toLowerCase()))

  const soft = softSkillsDatabase.filter((skill) => lowerText.includes(skill.toLowerCase()))

  // Extract tools mentioned
  const toolPatterns = /(?:proficient in|experienced with|skilled in|using)\s+([a-zA-Z\s,]+)/gi
  const toolMatches = text.match(toolPatterns) || []
  const tools = [...new Set(toolMatches.flatMap((m) => m.split(/,|\sand\s/).map((t) => t.trim())))]

  // Extract certifications
  const certPatterns = /(?:certified|certification|certificate)\s+(?:in\s+)?([a-zA-Z\s]+)/gi
  const certMatches = text.match(certPatterns) || []
  const certifications = certMatches.map((c) => c.trim())

  return { technical, soft, tools, certifications }
}

export function calculateMatchScore(resumeSkills: ExtractedSkills, jdSkills: ExtractedSkills): MatchResult {
  // Calculate individual fit scores
  const skillsFit = calculateOverlap(resumeSkills.technical, jdSkills.technical)
  const toolsFit = calculateOverlap(resumeSkills.tools, jdSkills.tools)
  const softFit = calculateOverlap(resumeSkills.soft, jdSkills.soft)

  // Estimate other dimensions
  const experienceFit = Math.min(100, skillsFit * 1.1)
  const domainFit = Math.min(100, (skillsFit + toolsFit) / 2)
  const communicationFit = softFit > 0 ? softFit : 60

  const overallScore = Math.round(
    skillsFit * 0.3 + experienceFit * 0.2 + toolsFit * 0.2 + domainFit * 0.15 + communicationFit * 0.15,
  )

  const allJdSkills = [...jdSkills.technical, ...jdSkills.tools]
  const allResumeSkills = [...resumeSkills.technical, ...resumeSkills.tools]

  const matchedSkills = allJdSkills.filter((skill) =>
    allResumeSkills.some((rs) => rs.toLowerCase() === skill.toLowerCase()),
  )

  const missingSkills = allJdSkills.filter(
    (skill) => !allResumeSkills.some((rs) => rs.toLowerCase() === skill.toLowerCase()),
  )

  const suggestions = generateSuggestions(missingSkills, overallScore)

  return {
    overallScore,
    skillsFit,
    experienceFit,
    toolsFit,
    domainFit,
    communicationFit,
    matchedSkills,
    missingSkills,
    suggestions,
  }
}

function calculateOverlap(arr1: string[], arr2: string[]): number {
  if (arr2.length === 0) return 70 // Default if no requirements
  const matches = arr1.filter((item) =>
    arr2.some(
      (jdItem) =>
        jdItem.toLowerCase().includes(item.toLowerCase()) || item.toLowerCase().includes(jdItem.toLowerCase()),
    ),
  )
  return Math.round((matches.length / arr2.length) * 100)
}

function generateSuggestions(missingSkills: string[], score: number): string[] {
  const suggestions: string[] = []

  if (missingSkills.length > 0) {
    suggestions.push(`Consider learning ${missingSkills.slice(0, 3).join(", ")} to strengthen your application`)
  }

  if (score < 50) {
    suggestions.push("This role may require significant upskilling - consider similar entry-level positions")
  } else if (score < 70) {
    suggestions.push("Highlight transferable skills and projects that demonstrate related experience")
  } else if (score < 85) {
    suggestions.push("Strong candidate! Emphasize your most relevant projects in your cover letter")
  } else {
    suggestions.push("Excellent match! Focus on demonstrating cultural fit and passion for the role")
  }

  return suggestions
}

export function analyzePersonality(resumeText: string): PersonalityTraits {
  const lowerText = resumeText.toLowerCase()

  // Analyze based on keywords and patterns
  const analyticalKeywords = ["analyzed", "data", "metrics", "research", "optimization", "quantified", "measured"]
  const creativeKeywords = ["designed", "created", "innovative", "creative", "developed", "built", "launched"]
  const detailKeywords = ["accurate", "precise", "thorough", "documented", "organized", "systematic", "quality"]
  const leadershipKeywords = ["led", "managed", "directed", "supervised", "mentored", "coordinated", "team lead"]
  const collaborativeKeywords = ["collaborated", "partnered", "worked with", "cross-functional", "teamwork", "together"]

  const analytical = Math.min(100, countKeywords(lowerText, analyticalKeywords) * 15 + 30)
  const creative = Math.min(100, countKeywords(lowerText, creativeKeywords) * 15 + 25)
  const detailOriented = Math.min(100, countKeywords(lowerText, detailKeywords) * 15 + 35)
  const leadership = Math.min(100, countKeywords(lowerText, leadershipKeywords) * 20 + 20)
  const collaborative = Math.min(100, countKeywords(lowerText, collaborativeKeywords) * 15 + 40)

  const recommendedRoles = generateRoleRecommendations({
    analytical,
    creative,
    detailOriented,
    leadership,
    collaborative,
  })

  return { analytical, creative, detailOriented, leadership, collaborative, recommendedRoles }
}

function countKeywords(text: string, keywords: string[]): number {
  return keywords.reduce((count, keyword) => {
    const regex = new RegExp(keyword, "gi")
    const matches = text.match(regex)
    return count + (matches ? matches.length : 0)
  }, 0)
}

function generateRoleRecommendations(traits: Omit<PersonalityTraits, "recommendedRoles">): string[] {
  const roles: string[] = []

  if (traits.analytical > 70) {
    roles.push("Data Analyst", "Business Analyst", "Research Engineer")
  }
  if (traits.creative > 70) {
    roles.push("UX Designer", "Product Designer", "Creative Developer")
  }
  if (traits.detailOriented > 70) {
    roles.push("QA Engineer", "Technical Writer", "DevOps Engineer")
  }
  if (traits.leadership > 70) {
    roles.push("Engineering Manager", "Tech Lead", "Product Manager")
  }
  if (traits.collaborative > 70 && traits.analytical > 60) {
    roles.push("Full Stack Developer", "Solutions Architect")
  }

  return roles.length > 0 ? roles : ["Software Engineer", "Frontend Developer", "Backend Developer"]
}

export function getScoreLabel(score: number): { label: string; color: string } {
  if (score >= 85) return { label: "Excellent Match", color: "text-success" }
  if (score >= 70) return { label: "Strong Match", color: "text-primary" }
  if (score >= 50) return { label: "Moderate Match", color: "text-warning" }
  return { label: "Needs Improvement", color: "text-destructive" }
}
