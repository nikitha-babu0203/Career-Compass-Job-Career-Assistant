import { z } from "zod"

const InterviewQuestionsSchema = z.object({
  questions: z.array(
    z.object({
      category: z.enum(["Technical", "Behavioral", "System Design", "Problem Solving"]),
      question: z.string(),
      tip: z.string(),
      difficulty: z.enum(["Easy", "Medium", "Hard"]),
    }),
  ),
})

export async function POST(req: Request) {
  try {
    const { resume, jobDescription } = await req.json()

    if (!resume || !jobDescription) {
      return Response.json({ error: "Resume and job description are required" }, { status: 400 })
    }

    // Extract skills from resume and job description
    function extractSkills(text: string): string[] {
      const skillKeywords = [
        'javascript', 'typescript', 'python', 'java', 'c++', 'c#', 'ruby', 'php', 'go', 'rust',
        'react', 'angular', 'vue', 'node', 'express', 'django', 'flask', 'spring', 'laravel',
        'sql', 'nosql', 'mongodb', 'postgresql', 'mysql', 'redis', 'dynamodb',
        'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'ci/cd', 'jenkins', 'terraform',
        'git', 'agile', 'scrum', 'rest', 'api', 'microservices', 'graphql',
        'machine learning', 'ai', 'data science', 'devops', 'cloud', 'security'
      ]
      const lowerText = text.toLowerCase()
      return skillKeywords.filter(skill => lowerText.includes(skill))
    }
    
    const resumeSkills = extractSkills(resume)
    const jobSkills = extractSkills(jobDescription)
    const matchedSkills = resumeSkills.filter(skill => jobSkills.includes(skill))
    const gapSkills = jobSkills.filter(skill => !resumeSkills.includes(skill))
    
    // Determine seniority level
    const isSenior = /senior|lead|principal|architect|manager/i.test(jobDescription) || 
                    /10\+|10 years|8\+|8 years/i.test(jobDescription)
    
    const questions: Array<{
      category: "Technical" | "Behavioral" | "System Design" | "Problem Solving"
      question: string
      tip: string
      difficulty: "Easy" | "Medium" | "Hard"
    }> = []
    
    // Technical Questions (based on matched skills)
    if (matchedSkills.includes('javascript') || matchedSkills.includes('typescript')) {
      questions.push({
        category: "Technical",
        question: "Explain the difference between var, let, and const in JavaScript. When would you use each?",
        tip: "Focus on scope, hoisting, and immutability. Provide real-world examples of when each is appropriate.",
        difficulty: "Easy"
      })
    }
    
    if (matchedSkills.includes('react') || matchedSkills.includes('vue') || matchedSkills.includes('angular')) {
      questions.push({
        category: "Technical",
        question: "How do you optimize performance in a React application? Describe specific techniques you've used.",
        tip: "Mention React.memo, useMemo, useCallback, code splitting, lazy loading, and virtual scrolling. Share concrete examples from your experience.",
        difficulty: "Medium"
      })
    }
    
    if (matchedSkills.includes('python')) {
      questions.push({
        category: "Technical",
        question: "Explain Python decorators and provide an example of when you would use them.",
        tip: "Demonstrate understanding of higher-order functions. Common use cases include logging, authentication, and caching.",
        difficulty: "Medium"
      })
    }
    
    if (matchedSkills.includes('sql') || matchedSkills.includes('postgresql') || matchedSkills.includes('mysql')) {
      questions.push({
        category: "Technical",
        question: "How would you optimize a slow SQL query? Walk me through your debugging process.",
        tip: "Discuss EXPLAIN plans, indexing strategies, query rewriting, and avoiding N+1 queries. Use specific examples.",
        difficulty: "Medium"
      })
    }
    
    if (matchedSkills.includes('aws') || matchedSkills.includes('azure') || matchedSkills.includes('cloud')) {
      questions.push({
        category: "Technical",
        question: "Describe your experience with cloud services. How do you ensure security and cost optimization?",
        tip: "Cover IAM, VPC, security groups, cost monitoring tools, and resource tagging. Mention specific services you've used.",
        difficulty: "Medium"
      })
    }
    
    // Gap area questions (areas in job description but not in resume)
    if (gapSkills.length > 0) {
      const gapSkill = gapSkills[0]
      questions.push({
        category: "Technical",
        question: `I see the role requires ${gapSkill} experience. Can you tell me about your familiarity with ${gapSkill}?`,
        tip: `Be honest about your experience level. If you haven't used ${gapSkill} professionally, mention similar technologies you've used and your ability to learn quickly. Highlight any personal projects or coursework.`,
        difficulty: "Hard"
      })
    }
    
    // System Design (for senior roles)
    if (isSenior) {
      questions.push({
        category: "System Design",
        question: "Design a scalable URL shortening service like bit.ly. How would you handle millions of requests per day?",
        tip: "Cover database design, hashing algorithms, caching strategies, load balancing, and monitoring. Discuss trade-offs between different approaches.",
        difficulty: "Hard"
      })
      questions.push({
        category: "System Design",
        question: "How would you design a real-time notification system for a social media platform?",
        tip: "Discuss WebSockets vs Server-Sent Events, message queues, database design for fan-out, and handling scale. Consider reliability and latency requirements.",
        difficulty: "Hard"
      })
    } else {
      questions.push({
        category: "System Design",
        question: "Explain how you would design a simple e-commerce checkout flow. What components would you need?",
        tip: "Cover user authentication, shopping cart management, payment processing, inventory checks, and order confirmation. Discuss API design and data flow.",
        difficulty: "Medium"
      })
    }
    
    // Problem Solving
    questions.push({
      category: "Problem Solving",
      question: "Describe a complex technical problem you encountered and how you solved it.",
      tip: "Use the STAR method: Situation, Task, Action, Result. Be specific about the problem, your approach, and the measurable outcome. Show your debugging and analytical skills.",
      difficulty: "Medium"
    })
    
    questions.push({
      category: "Problem Solving",
      question: "How do you approach debugging a production issue that you can't reproduce locally?",
      tip: "Discuss logging, monitoring tools, error tracking, hypothesis-driven debugging, and working with production data safely. Mention specific tools you've used.",
      difficulty: "Medium"
    })
    
    // Behavioral Questions
    questions.push({
      category: "Behavioral",
      question: "Tell me about a time when you had to learn a new technology quickly for a project.",
      tip: "Use STAR method. Emphasize your learning process, resources you used, and how you applied the knowledge successfully. Show adaptability.",
      difficulty: "Easy"
    })
    
    questions.push({
      category: "Behavioral",
      question: "Describe a situation where you disagreed with a team member about a technical decision. How did you handle it?",
      tip: "Show collaboration skills, respect for others' opinions, and ability to find compromise. Focus on the problem-solving process rather than winning the argument.",
      difficulty: "Medium"
    })
    
    questions.push({
      category: "Behavioral",
      question: "Tell me about a time when you had to balance multiple competing priorities. How did you manage your time?",
      tip: "Discuss prioritization frameworks, communication with stakeholders, and delivering results under pressure. Show organizational skills.",
      difficulty: "Easy"
    })
    
    // Add one more technical question if we don't have enough
    if (questions.length < 10) {
      questions.push({
        category: "Technical",
        question: "What is your approach to writing maintainable code? How do you ensure code quality in your projects?",
        tip: "Discuss code reviews, testing strategies (unit, integration, e2e), documentation, naming conventions, and design patterns. Mention specific tools and practices.",
        difficulty: "Easy"
      })
    }
    
    const result = {
      questions: questions.slice(0, 12) // Limit to 12 questions
    }
    
    const validated = InterviewQuestionsSchema.parse(result)

    return Response.json(validated)
  } catch (error) {
    console.error("Interview generation error:", error)
    return Response.json({ error: "Failed to generate interview questions" }, { status: 500 })
  }
}
