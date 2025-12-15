import { z } from "zod"

const RoadmapSchema = z.object({
  company: z.string(),
  skills: z.array(z.string()),
  certifications: z.array(z.string()),
  projects: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
    }),
  ),
  interviewProcess: z.array(
    z.object({
      stage: z.string(),
      description: z.string(),
    }),
  ),
  weeklyPlan: z.array(
    z.object({
      week: z.string(),
      tasks: z.array(z.string()),
    }),
  ),
  resumeTips: z.array(z.string()),
})

export async function POST(req: Request) {
  try {
    const { companyName } = await req.json()

    if (!companyName) {
      return Response.json({ error: "Company name is required" }, { status: 400 })
    }

    // Company-specific tech stacks and recommendations
    const companyLower = companyName.toLowerCase()
    
    let skills: string[] = []
    let certifications: string[] = []
    let companyType = 'tech'
    
    // Major tech companies
    if (companyLower.includes('google')) {
      skills = ['Python', 'C++', 'Go', 'Java', 'Kubernetes', 'TensorFlow', 'Distributed Systems', 'Algorithm Design']
      certifications = ['Google Cloud Professional Architect', 'Kubernetes Administrator (CKA)', 'TensorFlow Developer Certificate']
      companyType = 'FAANG'
    } else if (companyLower.includes('amazon') || companyLower.includes('aws')) {
      skills = ['Java', 'Python', 'AWS Services', 'DynamoDB', 'Lambda', 'System Design', 'Leadership Principles', 'Data Structures']
      certifications = ['AWS Solutions Architect', 'AWS Developer Associate', 'AWS SysOps Administrator']
      companyType = 'FAANG'
    } else if (companyLower.includes('microsoft')) {
      skills = ['C#', '.NET', 'Azure', 'TypeScript', 'SQL Server', 'Cloud Architecture', 'DevOps', 'Agile']
      certifications = ['Azure Solutions Architect', 'Azure Developer Associate', 'Microsoft Certified: DevOps Engineer']
      companyType = 'FAANG'
    } else if (companyLower.includes('meta') || companyLower.includes('facebook')) {
      skills = ['React', 'JavaScript', 'Python', 'C++', 'GraphQL', 'System Design', 'Mobile Development', 'Machine Learning']
      certifications = ['Meta Frontend Developer Certificate', 'AWS Certified Developer', 'System Design Course']
      companyType = 'FAANG'
    } else if (companyLower.includes('apple')) {
      skills = ['Swift', 'Objective-C', 'C++', 'iOS Development', 'macOS Development', 'System Design', 'Security', 'Hardware Integration']
      certifications = ['iOS Developer Certification', 'Swift Certification', 'Security+ Certification']
      companyType = 'FAANG'
    } else if (companyLower.includes('netflix')) {
      skills = ['Java', 'JavaScript', 'Python', 'AWS', 'Microservices', 'Streaming Technologies', 'DevOps', 'A/B Testing']
      certifications = ['AWS Solutions Architect', 'Microservices Architecture', 'Site Reliability Engineering']
      companyType = 'FAANG'
    } else {
      // Default tech stack
      skills = ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'SQL', 'Git', 'REST APIs', 'Agile', 'Testing']
      certifications = ['AWS Cloud Practitioner', 'Professional Scrum Master I', 'JavaScript Algorithms and Data Structures']
      companyType = 'tech'
    }
    
    // Projects
    const projects = [
      {
        title: `Full-Stack ${companyName} Clone`,
        description: `Build a simplified version of ${companyName}'s core product using ${skills[0]} and ${skills[1]}. Implement key features like authentication, data management, and responsive UI. Deploy to cloud platform with CI/CD pipeline.`
      },
      {
        title: "System Design Project",
        description: `Design and implement a scalable microservices architecture for a high-traffic application. Use ${skills.includes('AWS') ? 'AWS' : skills.includes('Azure') ? 'Azure' : 'cloud'} services for deployment, implement caching, load balancing, and monitoring.`
      },
      {
        title: "Algorithm & Data Structures Portfolio",
        description: "Create a GitHub repository with 50+ LeetCode solutions in " + skills[0] + ". Focus on medium and hard problems. Include detailed explanations, time/space complexity analysis, and multiple approaches for each problem."
      }
    ]
    
    // Interview Process
    const interviewProcess = companyType === 'FAANG' ? [
      {
        stage: "Initial Screening",
        description: "15-30 minute phone call with recruiter. Discuss your background, interest in the company, and basic technical qualifications. Prepare your elevator pitch."
      },
      {
        stage: "Online Assessment",
        description: "1-2 hour coding challenge on a platform like HackerRank. Typically 2-3 algorithmic problems. Focus on correctness, efficiency, and code quality."
      },
      {
        stage: "Technical Phone Screen",
        description: "45-60 minute video call with an engineer. Live coding problem solving (1-2 medium LeetCode problems). Use a collaborative editor. Think out loud."
      },
      {
        stage: "Virtual Onsite (4-5 rounds)",
        description: "Full day of back-to-back interviews covering: coding (2 rounds), system design (1 round), behavioral (1-2 rounds). Each 45-60 minutes."
      },
      {
        stage: "Hiring Committee Review",
        description: "Your interview feedback is reviewed by hiring committee. This can take 1-2 weeks. They evaluate technical skills, culture fit, and leveling."
      }
    ] : [
      {
        stage: "Initial Screening",
        description: "Phone call with recruiter or hiring manager. Discuss your experience, motivations, and general fit for the role."
      },
      {
        stage: "Technical Interview",
        description: "1-2 rounds of technical interviews covering coding, problem-solving, and relevant technologies. May include live coding or take-home assignment."
      },
      {
        stage: "Team Interview",
        description: "Meet with potential team members. Discuss past projects, collaboration style, and technical depth. Focus on cultural fit and teamwork."
      },
      {
        stage: "Final Interview",
        description: "Meeting with senior leadership or hiring manager. High-level technical discussion, career goals, and compensation negotiation."
      }
    ]
    
    // 8-Week Preparation Plan
    const weeklyPlan = [
      {
        week: "Week 1-2: Foundations",
        tasks: [
          "Review data structures: arrays, linked lists, stacks, queues, hash tables",
          "Practice 15-20 easy LeetCode problems",
          "Set up development environment with " + skills[0],
          "Research " + companyName + " products, culture, and recent news",
          "Update resume with quantifiable achievements"
        ]
      },
      {
        week: "Week 3-4: Algorithm Mastery",
        tasks: [
          "Study algorithms: sorting, searching, dynamic programming, graphs",
          "Practice 20-25 medium LeetCode problems",
          "Start building project #1: " + projects[0].title,
          "Practice explaining your thought process out loud",
          "Mock interview with friend or platform like Pramp"
        ]
      },
      {
        week: "Week 5-6: System Design",
        tasks: [
          "Study system design fundamentals: scalability, databases, caching, load balancing",
          "Read 'Designing Data-Intensive Applications' or 'System Design Interview' book",
          "Complete project #2: " + projects[1].title,
          "Practice 3-5 system design problems",
          "Join " + companyName + " technical communities and forums"
        ]
      },
      {
        week: "Week 7: Behavioral Prep",
        tasks: [
          "Prepare STAR method stories for 10+ scenarios",
          "Practice behavioral questions specific to " + companyName + " culture",
          "Complete project #3: " + projects[2].title,
          "Practice 5-10 hard LeetCode problems",
          "Research salary ranges and prepare negotiation points"
        ]
      },
      {
        week: "Week 8: Mock Interviews & Polish",
        tasks: [
          "Do 3-4 full mock interviews (coding + system design + behavioral)",
          "Review and optimize all projects - add READMEs and documentation",
          "Final resume review with specific " + companyName + " keywords",
          "Practice with timed coding challenges",
          "Prepare thoughtful questions to ask interviewers"
        ]
      }
    ]
    
    // Resume Tips
    const resumeTips = [
      "Start bullet points with action verbs and quantify impact (e.g., 'Reduced load time by 40%')",
      "Highlight technologies that align with " + companyName + "'s stack: " + skills.slice(0, 3).join(", "),
      "Include 2-3 impressive projects with GitHub links and live demos",
      "Keep it to 1-2 pages with clear section headers and consistent formatting",
      "Mention relevant certifications: " + certifications[0],
      "Use keywords from the job description naturally throughout your resume",
      "Add metrics to every achievement (users served, performance gains, cost savings)",
      "Include education, but keep it brief if you have 3+ years of experience"
    ]
    
    const result = {
      company: companyName,
      skills,
      certifications,
      projects,
      interviewProcess,
      weeklyPlan,
      resumeTips
    }
    
    const validated = RoadmapSchema.parse(result)

    return Response.json(validated)
  } catch (error) {
    console.error("Roadmap generation error:", error)
    return Response.json({ error: "Failed to generate roadmap" }, { status: 500 })
  }
}
