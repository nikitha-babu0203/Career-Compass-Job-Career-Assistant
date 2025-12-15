// Offline career chat implementation

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // Get the last user message
    const lastMessage = messages[messages.length - 1]?.content?.toLowerCase() || ''
    
    let response = ''
    
    // Career planning keywords
    if (lastMessage.includes('career') && (lastMessage.includes('change') || lastMessage.includes('switch'))) {
      response = "Making a career change is a significant decision! Here's my advice:\n\n" +
        "1. **Assess Your Skills**: Identify transferable skills from your current role\n" +
        "2. **Research**: Study the new industry's requirements, salary ranges, and growth potential\n" +
        "3. **Bridge the Gap**: Take online courses, earn certifications, or build portfolio projects\n" +
        "4. **Network**: Connect with people in your target field through LinkedIn and industry events\n" +
        "5. **Start Small**: Consider freelance work or side projects to gain experience\n\n" +
        "What specific field are you interested in transitioning to?"
    }
    // Resume help
    else if (lastMessage.includes('resume') || lastMessage.includes('cv')) {
      response = "I'd be happy to help with your resume! Here are key tips:\n\n" +
        "**Structure:**\n" +
        "- Contact info at top (email, phone, LinkedIn, GitHub)\n" +
        "- Professional summary (2-3 lines)\n" +
        "- Work experience (reverse chronological)\n" +
        "- Skills section with relevant technologies\n" +
        "- Education\n\n" +
        "**Content Tips:**\n" +
        "- Use action verbs: 'Developed', 'Led', 'Improved', 'Achieved'\n" +
        "- Quantify everything: 'Increased performance by 40%'\n" +
        "- Keep it to 1-2 pages\n" +
        "- Tailor it to each job posting\n\n" +
        "Use our Resume Checker feature to get detailed feedback on your resume!"
    }
    // Interview prep
    else if (lastMessage.includes('interview') && !lastMessage.includes('questions')) {
      response = "Interview preparation is crucial! Here's a comprehensive approach:\n\n" +
        "**Before the Interview:**\n" +
        "- Research the company thoroughly (products, culture, recent news)\n" +
        "- Practice STAR method for behavioral questions\n" +
        "- Prepare 5-10 questions to ask them\n" +
        "- Review the job description and align your experience\n\n" +
        "**Technical Prep:**\n" +
        "- Practice coding problems on LeetCode/HackerRank\n" +
        "- Review system design fundamentals\n" +
        "- Be ready to explain your past projects in detail\n\n" +
        "**During Interview:**\n" +
        "- Think out loud during technical problems\n" +
        "- Ask clarifying questions\n" +
        "- Be honest about what you don't know\n" +
        "- Show enthusiasm and cultural fit\n\n" +
        "Try our Interview Generator to practice with role-specific questions!"
    }
    // Skills and learning
    else if (lastMessage.includes('learn') || lastMessage.includes('skill')) {
      response = "Great question about skill development! Here's my framework:\n\n" +
        "**For Beginners:**\n" +
        "1. Start with fundamentals: HTML/CSS/JavaScript for web, or Python for general programming\n" +
        "2. Build small projects as you learn each concept\n" +
        "3. Use free resources: freeCodeCamp, The Odin Project, CS50\n\n" +
        "**For Intermediate:**\n" +
        "1. Learn a framework (React, Angular, Vue for frontend; Node/Django/Spring for backend)\n" +
        "2. Understand databases (SQL and NoSQL)\n" +
        "3. Learn Git and version control\n" +
        "4. Build 2-3 portfolio projects\n\n" +
        "**For Advanced:**\n" +
        "1. Master system design and architecture\n" +
        "2. Learn cloud platforms (AWS/Azure/GCP)\n" +
        "3. Contribute to open source\n" +
        "4. Earn relevant certifications\n\n" +
        "What's your current skill level and what are you interested in learning?"
    }
    // Salary and negotiation
    else if (lastMessage.includes('salary') || lastMessage.includes('negotiat')) {
      response = "Salary negotiation is important! Here's how to approach it:\n\n" +
        "**Research First:**\n" +
        "- Use Glassdoor, Levels.fyi, Payscale to find market rates\n" +
        "- Consider location, experience level, and company size\n" +
        "- Know your minimum acceptable offer\n\n" +
        "**During Negotiation:**\n" +
        "- Let them make the first offer if possible\n" +
        "- Always negotiate - most expect it\n" +
        "- Consider total compensation: salary, bonus, equity, benefits\n" +
        "- Ask for 10-20% more than their initial offer\n" +
        "- Be professional and grateful throughout\n\n" +
        "**What to Say:**\n" +
        "- 'Based on my research and experience, I was expecting something in the range of $X-Y'\n" +
        "- 'I'm very excited about this role. Is there any flexibility in the compensation?'\n" +
        "- 'Could we discuss the equity package and other benefits?'\n\n" +
        "Never accept on the spot - ask for 24-48 hours to consider."
    }
    // Job search
    else if (lastMessage.includes('job') && (lastMessage.includes('find') || lastMessage.includes('search') || lastMessage.includes('looking'))) {
      response = "Job searching can be challenging, but here's a strategic approach:\n\n" +
        "**Where to Look:**\n" +
        "- LinkedIn (set up job alerts)\n" +
        "- Company career pages directly\n" +
        "- AngelList/Wellfound for startups\n" +
        "- Indeed, Glassdoor, ZipRecruiter\n" +
        "- Tech-specific: Hired, Dice, Stack Overflow Jobs\n\n" +
        "**How to Stand Out:**\n" +
        "1. Optimize your LinkedIn profile (professional photo, detailed experience)\n" +
        "2. Network actively - 70% of jobs come through connections\n" +
        "3. Tailor your resume for each application\n" +
        "4. Follow up with recruiters after applying\n" +
        "5. Build a portfolio website with your projects\n\n" +
        "**Application Strategy:**\n" +
        "- Apply to 10-15 jobs per week\n" +
        "- Track all applications in a spreadsheet\n" +
        "- Follow up after 1 week\n" +
        "- Don't wait for perfect matches - apply if you meet 60% of requirements\n\n" +
        "Use our Job Analyzer to see how well your resume matches specific job descriptions!"
    }
    // Tech industry
    else if (lastMessage.includes('tech') && (lastMessage.includes('industry') || lastMessage.includes('trend'))) {
      response = "The tech industry is constantly evolving! Here are current trends and insights:\n\n" +
        "**Hot Technologies in 2024-2025:**\n" +
        "- AI/Machine Learning (huge demand)\n" +
        "- Cloud Computing (AWS, Azure, GCP)\n" +
        "- Cybersecurity\n" +
        "- Full-Stack Development (React, Node.js)\n" +
        "- DevOps and Site Reliability Engineering\n" +
        "- Mobile Development (React Native, Flutter)\n\n" +
        "**Industry Trends:**\n" +
        "- Remote/hybrid work is here to stay\n" +
        "- Companies valuing practical skills over degrees\n" +
        "- Emphasis on soft skills and collaboration\n" +
        "- Shift toward sustainable and ethical tech\n\n" +
        "**Career Advice:**\n" +
        "- Focus on fundamentals - they don't change\n" +
        "- Stay curious and keep learning\n" +
        "- Build a strong online presence\n" +
        "- Contribute to open source\n" +
        "- Network consistently\n\n" +
        "What specific area of tech interests you most?"
    }
    // Default helpful response
    else {
      response = "I'm Career Compass, your AI career advisor! I can help you with:\n\n" +
        "📝 **Resume & CV**: Tips for writing, formatting, and optimizing for ATS\n" +
        "💼 **Job Search**: Strategies for finding opportunities and standing out\n" +
        "🎯 **Interview Prep**: Technical and behavioral interview preparation\n" +
        "📚 **Skill Development**: Learning paths and resources for tech skills\n" +
        "💰 **Salary Negotiation**: How to negotiate offers effectively\n" +
        "🚀 **Career Planning**: Transitioning roles, career growth, and goal setting\n" +
        "🏢 **Company Research**: Insights on tech companies and interview processes\n\n" +
        "Try our other features:\n" +
        "- **Resume Checker**: Upload your resume for detailed ATS analysis\n" +
        "- **Job Analyzer**: See how well your resume matches a job description\n" +
        "- **Interview Generator**: Get personalized interview questions\n" +
        "- **Career Roadmap**: Create preparation plans for target companies\n" +
        "- **GitHub Analyzer**: Analyze your GitHub profile for recruiting\n\n" +
        "What would you like help with today?"
    }
    
    return Response.json({ content: response })
  } catch (error) {
    console.error("Career chat error:", error)
    return Response.json({ error: "Failed to process chat" }, { status: 500 })
  }
}
