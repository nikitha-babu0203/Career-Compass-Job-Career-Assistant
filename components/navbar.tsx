"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth-context"
import {
  Compass,
  LayoutDashboard,
  FileSearch,
  Github,
  MessageSquare,
  Building2,
  FileCheck,
  BotMessageSquare,
  Menu,
  X,
  LogOut,
  User,
  ChevronDown,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { ViewType } from "@/app/page"

interface NavbarProps {
  currentView: ViewType
  onViewChange: (view: ViewType) => void
}

const navItems = [
  { id: "dashboard" as ViewType, label: "Home", icon: LayoutDashboard },
  { id: "job-analyzer" as ViewType, label: "Job Analyzer", icon: FileSearch },
  { id: "github-analyzer" as ViewType, label: "GitHub", icon: Github },
  { id: "interview-generator" as ViewType, label: "Interview Prep", icon: MessageSquare },
  { id: "roadmap-generator" as ViewType, label: "Roadmap", icon: Building2 },
  { id: "resume-checker" as ViewType, label: "Resume Check", icon: FileCheck },
  { id: "career-chat" as ViewType, label: "Chat", icon: BotMessageSquare },
]

export function Navbar({ currentView, onViewChange }: NavbarProps) {
  const { user, logout } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary text-primary-foreground">
              <Compass className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg text-foreground">Career Compass</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-full transition-colors",
                  currentView === item.id ? "text-primary" : "text-foreground/70 hover:text-foreground",
                )}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* User Menu / CTA */}
          <div className="flex items-center gap-3">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground">
                      <User className="w-4 h-4" />
                    </div>
                    <span className="hidden sm:inline text-sm font-medium">{user.name?.split(" ")[0]}</span>
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-3 py-2">
                    <p className="font-medium text-sm">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                    {user.college && <p className="text-xs text-muted-foreground mt-1">{user.college}</p>}
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button className="rounded-full px-6">Get Started</Button>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onViewChange(item.id)
                    setIsMobileMenuOpen(false)
                  }}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors",
                    currentView === item.id ? "bg-primary/10 text-primary" : "text-foreground/70 hover:bg-muted",
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </button>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
