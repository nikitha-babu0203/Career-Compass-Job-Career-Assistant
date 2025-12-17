# 🧭 Career Compass Assistant

A comprehensive AI-powered career guidance platform built with Next.js 16, React 19, and cutting-edge AI models. Career Compass helps job seekers analyze positions, evaluate their GitHub profiles, generate personalized career roadmaps, practice interviews, and receive intelligent career guidance through an AI chat assistant.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black)
![React](https://img.shields.io/badge/React-19.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1-38bdf8)
![License](https://img.shields.io/badge/license-MIT-green)

<img width="1906" height="889" alt="image" src="https://github.com/user-attachments/assets/7fcff8fc-a8e6-42c5-80d8-3449d91e0b72" />

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Routes](#api-routes)
- [Components](#components)
- [Configuration](#configuration)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### 🎯 Job Analyzer
- Analyze job descriptions and requirements
- Extract key skills and qualifications
- Get AI-powered insights on job fit
- Understand role expectations and responsibilities

### 💻 GitHub Profile Analyzer
- Connect and analyze GitHub repositories
- Evaluate coding activity and contributions
- Assess technical skills based on project portfolio
- Get recommendations for skill improvements

### 📝 Resume Checker
- Upload and parse resume files (PDF, DOCX)
- AI-powered resume analysis and scoring
- Get actionable feedback on resume content
- Identify missing keywords and skills
- ATS (Applicant Tracking System) compatibility check

### 🎤 Interview Generator
- Generate custom interview questions based on job roles
- Practice with AI-powered mock interviews
- Receive feedback on interview responses
- Prepare for technical and behavioral questions

### 🗺️ Career Roadmap Generator
- Create personalized learning paths
- Get step-by-step career progression plans
- Discover required skills and certifications
- Timeline-based milestone tracking

### 💬 Career Chat Assistant
- Real-time AI career counseling
- Ask questions about career transitions
- Get advice on skill development
- Personalized career recommendations

### 📊 Dashboard & Analytics
- Visual representation of career progress
- Role fit analysis with radar charts
- Track analysis history
- Comprehensive career insights

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16.0 (App Router)
- **UI Library**: React 19.2
- **Language**: TypeScript 5
- **Styling**: TailwindCSS 4.1
- **Component Library**: Radix UI
- **Icons**: Lucide React
- **Charts**: Recharts
- **Forms**: React Hook Form + Zod validation

### AI & ML
- **AI SDK**: Vercel AI SDK
- **LLM Providers**:
  - OpenAI GPT models
  - Google Gemini
  - Groq
  - Hugging Face models

### File Processing
- **PDF**: pdfjs-dist
- **DOCX**: Mammoth

### State & Authentication
- Custom Auth Context
- React Context API

### UI Components
- shadcn/ui components
- Custom component library
- Responsive design with mobile hooks

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/career-compass-assistant.git
cd career-compass-assistant
```

2. **Install dependencies**
```bash
pnpm install
# or
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
# AI API Keys
OPENAI_API_KEY=your_openai_api_key
GOOGLE_API_KEY=your_google_api_key
GROQ_API_KEY=your_groq_api_key
HUGGINGFACE_API_KEY=your_huggingface_api_key

# Optional: Analytics
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your_analytics_id

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. **Run the development server**
```bash
pnpm dev
# or
npm run dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
career-compass-assistant/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── analyze-github/       # GitHub profile analysis
│   │   ├── analyze-job/          # Job description analysis
│   │   ├── career-chat/          # AI chat endpoint
│   │   ├── check-resume/         # Resume parsing & analysis
│   │   ├── generate-interview/   # Interview question generation
│   │   └── generate-roadmap/     # Career roadmap generation
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
│
├── components/                   # React Components
│   ├── ui/                       # UI component library (shadcn/ui)
│   ├── career-chat.tsx           # Career chat interface
│   ├── dashboard.tsx             # Main dashboard
│   ├── file-upload.tsx           # File upload component
│   ├── github-analyzer.tsx       # GitHub analysis UI
│   ├── interview-generator.tsx   # Interview practice UI
│   ├── job-analyzer.tsx          # Job analysis UI
│   ├── login-page.tsx            # Authentication page
│   ├── navbar.tsx                # Navigation bar
│   ├── resume-checker.tsx        # Resume checker UI
│   ├── roadmap-generator.tsx     # Roadmap generation UI
│   ├── role-fit-radar.tsx        # Radar chart component
│   ├── sidebar.tsx               # Navigation sidebar
│   ├── theme-provider.tsx        # Theme management
│   └── wave-background.tsx       # Animated background
│
├── hooks/                        # Custom React hooks
│   ├── use-mobile.ts             # Mobile detection hook
│   └── use-toast.ts              # Toast notification hook
│
├── lib/                          # Utility functions & helpers
│   ├── analysis-utils.ts         # Analysis helper functions
│   ├── auth-context.tsx          # Authentication context
│   ├── file-parser.ts            # File parsing utilities
│   └── utils.ts                  # General utilities
│
├── public/                       # Static assets
│   └── pdf.worker.min.mjs        # PDF.js worker
│
├── styles/                       # Additional styles
│   └── globals.css               # Global CSS
│
├── components.json               # shadcn/ui configuration
├── next.config.mjs               # Next.js configuration
├── package.json                  # Dependencies
├── postcss.config.mjs            # PostCSS configuration
├── tailwind.config.ts            # Tailwind configuration
└── tsconfig.json                 # TypeScript configuration
```

## 🔌 API Routes

### POST `/api/analyze-job`
Analyzes job descriptions and extracts key information.

**Request Body:**
```json
{
  "jobDescription": "string",
  "userProfile": "object (optional)"
}
```

### POST `/api/analyze-github`
Analyzes GitHub profile and repositories.

**Request Body:**
```json
{
  "githubUsername": "string"
}
```

### POST `/api/check-resume`
Parses and analyzes uploaded resume files.

**Request Body:**
```json
{
  "resumeFile": "File",
  "targetRole": "string (optional)"
}
```

### POST `/api/generate-interview`
Generates interview questions based on role.

**Request Body:**
```json
{
  "role": "string",
  "level": "string",
  "skills": "array"
}
```

### POST `/api/generate-roadmap`
Creates personalized career roadmap.

**Request Body:**
```json
{
  "currentRole": "string",
  "targetRole": "string",
  "skills": "array",
  "timeline": "string"
}
```

### POST `/api/career-chat`
AI-powered career counseling chat endpoint.

**Request Body:**
```json
{
  "messages": "array",
  "context": "object (optional)"
}
```

## 🎨 Components

### Core Components

- **Dashboard**: Main overview with analytics and quick actions
- **JobAnalyzer**: Job description analysis interface
- **GithubAnalyzer**: GitHub profile evaluation tool
- **ResumeChecker**: Resume upload and analysis
- **InterviewGenerator**: Mock interview practice
- **RoadmapGenerator**: Career path visualization
- **CareerChat**: AI chatbot interface
- **RoleFitRadar**: Skill match visualization

### UI Components (shadcn/ui)

Over 40 pre-built, accessible UI components including:
- Buttons, Cards, Dialogs
- Forms, Inputs, Selects
- Tabs, Accordions, Tooltips
- Charts, Progress indicators
- And many more...

## ⚙️ Configuration

### Tailwind CSS

Custom configuration in `tailwind.config.ts`:
- Custom color schemes
- Dark mode support
- Custom animations
- Responsive breakpoints

### Next.js

Configuration in `next.config.mjs`:
- Image optimization
- API routes
- Build optimization
- Environment variables

### TypeScript

Strict mode enabled with custom path aliases:
```json
{
  "@/*": ["./*"],
  "@/components/*": ["./components/*"],
  "@/lib/*": ["./lib/*"]
}
```

## 🔐 Environment Variables

Create a `.env.local` file with the following variables:

```env
# Required AI API Keys
OPENAI_API_KEY=           # OpenAI API key
GOOGLE_API_KEY=           # Google AI API key
GROQ_API_KEY=             # Groq API key
HUGGINGFACE_API_KEY=      # Hugging Face API key

# Optional
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=  # Vercel Analytics
NEXT_PUBLIC_APP_URL=              # Application URL
```

## 📦 Build & Deployment

### Build for Production

```bash
pnpm build
# or
npm run build
```

### Start Production Server

```bash
pnpm start
# or
npm start
```

### Deployment Options

#### Vercel (Recommended)
```bash
vercel deploy
```

#### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

#### Other Platforms
- Netlify
- AWS Amplify
- Railway
- Render

## 🧪 Development

### Linting

```bash
pnpm lint
# or
npm run lint
```

### Code Formatting

Follow TypeScript and React best practices:
- Use functional components
- Implement proper TypeScript typing
- Follow component composition patterns
- Use custom hooks for reusable logic

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards

- Write meaningful commit messages
- Add comments for complex logic
- Update documentation for new features
- Write unit tests where applicable
- Follow existing code style

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Radix UI](https://www.radix-ui.com/) - Unstyled components
- [Vercel AI SDK](https://sdk.vercel.ai/) - AI integrations
- [Lucide](https://lucide.dev/) - Icon library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS

## 📞 Support

For support, email santhoshsans030@gmail.com or open an issue on GitHub.

## 🚧 Roadmap

- [ ] Add user authentication (OAuth)
- [ ] Implement database for user profiles
- [ ] Add more AI model providers
- [ ] Mobile app development
- [ ] Real-time collaboration features
- [ ] Advanced analytics dashboard
- [ ] Integration with job boards
- [ ] Resume template builder
- [ ] Video interview practice
- [ ] Skill assessment tests

## 📊 Stats

- **Components**: 50+
- **API Routes**: 6
- **Dependencies**: 60+
- **UI Components**: 40+
- **TypeScript Coverage**: 100%

---

Made with ❤️ by [Nikitha](https://github.com/Santhosh1631)

**Star ⭐ this repository if you find it helpful!**
