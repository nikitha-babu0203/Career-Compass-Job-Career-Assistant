import { z } from "zod"

const ResumeCheckSchema = z.object({
  overallScore: z.number().min(0).max(100),
  categories: z.array(
    z.object({
      name: z.string(),
      score: z.number().min(0).max(100),
      iconType: z.enum(["layout", "bot", "fileText", "palette"]),
      issues: z.array(z.string()),
      suggestions: z.array(z.string()),
    }),
  ),
})

export async function POST(req: Request) {
  try {
    const { resumeText } = await req.json()

    if (!resumeText) {
      return Response.json({ error: "Resume text is required" }, { status: 400 })
    }

    // Analyze resume offline with intelligent text analysis
    const text = resumeText.toLowerCase()
    const lines = resumeText.split('\n')
    const wordCount = resumeText.split(/\s+/).length
    
    // Check for key sections
    const hasSummary = /summary|objective|profile/i.test(resumeText)
    const hasExperience = /experience|work history|employment/i.test(resumeText)
    const hasEducation = /education|degree|university|college/i.test(resumeText)
    const hasSkills = /skills|technologies|expertise/i.test(resumeText)
    
    // ATS-friendly keywords
    const actionVerbs = ['developed', 'managed', 'led', 'created', 'implemented', 'designed', 'achieved', 'improved', 'increased', 'reduced']
    const verbCount = actionVerbs.filter(verb => text.includes(verb)).length
    
    // Check for quantification (numbers, percentages)
    const hasNumbers = /\d+%|\d+\+|increased|decreased|improved|reduced/i.test(resumeText)
    const numberMatches = resumeText.match(/\d+/g) || []
    
    // Check contact info
    const hasEmail = /[\w.-]+@[\w.-]+\.\w+/.test(resumeText)
    const hasPhone = /\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/.test(resumeText)
    
    // Formatting analysis
    const avgLineLength = resumeText.length / lines.length
    const hasConsistentSpacing = lines.filter((l: string) => l.trim().length === 0).length > 2
    const bulletPoints = (resumeText.match(/•|●|○|→|▪|■/g) || []).length
    
    // Category 1: Formatting
    const formattingIssues: string[] = []
    const formattingSuggestions: string[] = []
    let formattingScore = 85
    
    if (wordCount < 200) {
      formattingIssues.push("Resume is too short - aim for 400-600 words")
      formattingSuggestions.push("Add more details about your experience and achievements")
      formattingScore -= 15
    } else if (wordCount > 800) {
      formattingIssues.push("Resume is too long - keep it concise")
      formattingSuggestions.push("Focus on the most relevant and recent 10 years of experience")
      formattingScore -= 10
    }
    
    if (!hasConsistentSpacing) {
      formattingIssues.push("Inconsistent spacing between sections")
      formattingSuggestions.push("Use consistent whitespace to improve readability")
      formattingScore -= 5
    }
    
    if (bulletPoints < 5) {
      formattingSuggestions.push("Use bullet points to list achievements and responsibilities")
      formattingScore -= 5
    }
    
    if (avgLineLength > 120) {
      formattingIssues.push("Some lines are too long")
      formattingSuggestions.push("Keep line lengths under 100 characters for better readability")
      formattingScore -= 5
    }
    
    // Category 2: ATS Compatibility
    const atsIssues: string[] = []
    const atsSuggestions: string[] = []
    let atsScore = 80
    
    if (!hasEmail || !hasPhone) {
      atsIssues.push("Missing contact information")
      atsSuggestions.push("Include both email and phone number at the top")
      atsScore -= 15
    }
    
    if (!hasSummary) {
      atsIssues.push("No professional summary section")
      atsSuggestions.push("Add a 2-3 line summary highlighting your key qualifications")
      atsScore -= 10
    }
    
    if (!hasExperience) {
      atsIssues.push("No clear work experience section")
      atsSuggestions.push("Create a dedicated 'Work Experience' or 'Professional Experience' section")
      atsScore -= 20
    }
    
    if (!hasSkills) {
      atsIssues.push("No dedicated skills section")
      atsSuggestions.push("Add a 'Skills' section with relevant keywords for ATS scanning")
      atsScore -= 15
    }
    
    if (verbCount < 5) {
      atsIssues.push("Insufficient action verbs")
      atsSuggestions.push("Start bullet points with strong action verbs (developed, managed, led, etc.)")
      atsScore -= 10
    }
    
    // Category 3: Content Quality
    const contentIssues: string[] = []
    const contentSuggestions: string[] = []
    let contentScore = 75
    
    if (!hasNumbers) {
      contentIssues.push("Missing quantifiable achievements")
      contentSuggestions.push("Add metrics and numbers to demonstrate impact (e.g., 'increased sales by 25%')")
      contentScore -= 15
    } else if (numberMatches.length < 3) {
      contentSuggestions.push("Include more quantifiable results to strengthen your achievements")
      contentScore -= 5
    }
    
    if (verbCount < 8) {
      contentIssues.push("Limited variety in action verbs")
      contentSuggestions.push("Use diverse action verbs to describe your accomplishments")
      contentScore -= 10
    }
    
    if (!hasEducation) {
      contentIssues.push("Education section is missing or unclear")
      contentSuggestions.push("Include your education with degree, institution, and graduation year")
      contentScore -= 10
    }
    
    if (wordCount < 300) {
      contentIssues.push("Insufficient detail about responsibilities and achievements")
      contentSuggestions.push("Expand on your key accomplishments in each role")
      contentScore -= 15
    }
    
    // Category 4: Design & Layout
    const designIssues: string[] = []
    const designSuggestions: string[] = []
    let designScore = 80
    
    if (bulletPoints === 0) {
      designIssues.push("No bullet points used")
      designSuggestions.push("Use bullet points to organize information and improve scannability")
      designScore -= 15
    }
    
    if (!hasConsistentSpacing) {
      designIssues.push("Poor visual hierarchy")
      designSuggestions.push("Use consistent spacing and clear section headers")
      designScore -= 10
    }
    
    if (lines.length < 15) {
      designIssues.push("Layout appears sparse")
      designSuggestions.push("Better utilize the space with relevant content")
      designScore -= 10
    }
    
    const hasSpecialChars = /[^\x00-\x7F]/.test(resumeText.replace(/[•●○→▪■]/g, ''))
    if (hasSpecialChars) {
      designIssues.push("Contains special characters that may not be ATS-compatible")
      designSuggestions.push("Stick to standard ASCII characters for better ATS compatibility")
      designScore -= 5
    }
    
    // Ensure scores don't go below reasonable thresholds
    formattingScore = Math.max(formattingScore, 40)
    atsScore = Math.max(atsScore, 35)
    contentScore = Math.max(contentScore, 30)
    designScore = Math.max(designScore, 40)
    
    const result = {
      overallScore: Math.round((formattingScore + atsScore + contentScore + designScore) / 4),
      categories: [
        {
          name: "Formatting",
          score: formattingScore,
          iconType: "layout" as const,
          issues: formattingIssues.length > 0 ? formattingIssues : ["Good formatting overall"],
          suggestions: formattingSuggestions.length > 0 ? formattingSuggestions : ["Maintain current formatting standards"],
        },
        {
          name: "ATS Compatibility",
          score: atsScore,
          iconType: "bot" as const,
          issues: atsIssues.length > 0 ? atsIssues : ["Good ATS compatibility"],
          suggestions: atsSuggestions.length > 0 ? atsSuggestions : ["Continue using ATS-friendly formatting"],
        },
        {
          name: "Content Quality",
          score: contentScore,
          iconType: "fileText" as const,
          issues: contentIssues.length > 0 ? contentIssues : ["Strong content quality"],
          suggestions: contentSuggestions.length > 0 ? contentSuggestions : ["Keep highlighting quantifiable achievements"],
        },
        {
          name: "Design & Layout",
          score: designScore,
          iconType: "palette" as const,
          issues: designIssues.length > 0 ? designIssues : ["Clean and professional design"],
          suggestions: designSuggestions.length > 0 ? designSuggestions : ["Maintain visual consistency"],
        },
      ],
    }
    
    const validated = ResumeCheckSchema.parse(result)

    return Response.json(validated)
  } catch (error) {
    console.error("Resume check error:", error)
    return Response.json({ error: "Failed to check resume" }, { status: 500 })
  }
}
