"use client"

import {
  LayoutDashboard,
  FileSearch,
  Github,
  MessageSquare,
  Building2,
  FileCheck,
  Compass,
  ChevronLeft,
  ChevronRight,
  BotMessageSquare,
  LogOut,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth-context"
import type { ViewType } from "@/app/page"

interface SidebarProps {
  currentView: ViewType
  onViewChange: (view: ViewType) => void
  isOpen: boolean
  onToggle: () => void
}

const navItems = [
  { id: "dashboard" as ViewType, label: "Dashboard", icon: LayoutDashboard },
  { id: "job-analyzer" as ViewType, label: "Job Analyzer", icon: FileSearch },
  { id: "github-analyzer" as ViewType, label: "GitHub Analyzer", icon: Github },
  { id: "interview-generator" as ViewType, label: "Interview Prep", icon: MessageSquare },
  { id: "roadmap-generator" as ViewType, label: "Dream Company", icon: Building2 },
  { id: "resume-checker" as ViewType, label: "Resume Checker", icon: FileCheck },
  { id: "career-chat" as ViewType, label: "Career Chat", icon: BotMessageSquare },
]

export function Sidebar({ currentView, onViewChange, isOpen, onToggle }: SidebarProps) {
  const { user, logout } = useAuth()

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden" onClick={onToggle} />}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full bg-sidebar text-sidebar-foreground transition-all duration-300 flex flex-col",
          isOpen ? "w-64" : "w-16",
          "max-lg:translate-x-[-100%]",
          isOpen && "max-lg:translate-x-0",
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 p-4 border-b border-sidebar-border">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <Compass className="w-5 h-5" />
          </div>
          {isOpen && (
            <div className="flex flex-col">
              <span className="font-semibold text-sm">Career Compass</span>
              <span className="text-xs text-sidebar-foreground/60">AI Assistant</span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant={currentView === item.id ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start gap-3 text-sidebar-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent",
                currentView === item.id && "bg-sidebar-accent text-sidebar-accent-foreground",
                !isOpen && "justify-center px-2",
              )}
              onClick={() => onViewChange(item.id)}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {isOpen && <span>{item.label}</span>}
            </Button>
          ))}
        </nav>

        {user && (
          <div className="p-3 border-t border-sidebar-border">
            <div
              className={cn("flex items-center gap-3 p-2 rounded-lg bg-sidebar-accent/50", !isOpen && "justify-center")}
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground shrink-0">
                <User className="w-4 h-4" />
              </div>
              {isOpen && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{user.name}</p>
                  <p className="text-xs text-sidebar-foreground/60 truncate">{user.college || user.email}</p>
                </div>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "w-full mt-2 text-sidebar-foreground hover:bg-destructive/10 hover:text-destructive",
                !isOpen && "px-2",
              )}
              onClick={logout}
            >
              <LogOut className="w-4 h-4 shrink-0" />
              {isOpen && <span className="ml-2">Sign Out</span>}
            </Button>
          </div>
        )}

        {/* Toggle button */}
        <div className="p-3 border-t border-sidebar-border hidden lg:block">
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-sidebar-foreground hover:bg-sidebar-accent"
            onClick={onToggle}
          >
            {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </Button>
        </div>
      </aside>

      {/* Mobile menu button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-30 lg:hidden bg-transparent"
        onClick={onToggle}
      >
        <LayoutDashboard className="w-4 h-4" />
      </Button>
    </>
  )
}
