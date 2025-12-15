"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, FileText, X, Loader2, AlertCircle, CheckCircle2 } from "lucide-react"
import { extractTextFromFile, formatFileSize } from "@/lib/file-parser"

interface FileUploadProps {
  onTextExtracted: (text: string) => void
  accept?: string
  maxSizeMB?: number
  label?: string
  description?: string
}

type UploadStatus = "idle" | "uploading" | "parsing" | "success" | "error"

export function FileUpload({
  onTextExtracted,
  accept = ".pdf,.docx,.doc,.txt",
  maxSizeMB = 5,
  label = "Upload Resume",
  description = "PDF, DOCX, DOC, or TXT (max 5MB)",
}: FileUploadProps) {
  const [status, setStatus] = useState<UploadStatus>("idle")
  const [fileName, setFileName] = useState<string | null>(null)
  const [fileSize, setFileSize] = useState<number>(0)
  const [error, setError] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = useCallback(
    async (file: File) => {
      // Reset state
      setError(null)
      setFileName(file.name)
      setFileSize(file.size)

      // Check file size
      const maxBytes = maxSizeMB * 1024 * 1024
      if (file.size > maxBytes) {
        setError(`File too large. Maximum size is ${maxSizeMB}MB.`)
        setStatus("error")
        return
      }

      setStatus("parsing")

      try {
        const text = await extractTextFromFile(file)
        if (!text || text.trim().length === 0) {
          throw new Error("No text could be extracted from the file.")
        }
        onTextExtracted(text)
        setStatus("success")
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to parse file")
        setStatus("error")
      }
    },
    [maxSizeMB, onTextExtracted],
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)

      const file = e.dataTransfer.files[0]
      if (file) {
        handleFile(file)
      }
    },
    [handleFile],
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        handleFile(file)
      }
    },
    [handleFile],
  )

  const handleClear = useCallback(() => {
    setStatus("idle")
    setFileName(null)
    setFileSize(0)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }, [])

  return (
    <Card
      className={`border-2 border-dashed transition-colors cursor-pointer ${
        isDragging
          ? "border-primary bg-primary/5"
          : status === "success"
            ? "border-success bg-success/5"
            : status === "error"
              ? "border-destructive bg-destructive/5"
              : "border-border hover:border-primary/50"
      }`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={() => status !== "parsing" && fileInputRef.current?.click()}
    >
      <CardContent className="flex flex-col items-center justify-center py-8 px-4">
        <input ref={fileInputRef} type="file" accept={accept} onChange={handleInputChange} className="hidden" />

        {status === "idle" && (
          <>
            <div className="p-4 rounded-full bg-muted mb-4">
              <Upload className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="font-medium text-foreground mb-1">{label}</p>
            <p className="text-sm text-muted-foreground mb-4">{description}</p>
            <Button variant="outline" size="sm" onClick={(e) => e.stopPropagation()}>
              Browse Files
            </Button>
          </>
        )}

        {status === "parsing" && (
          <>
            <Loader2 className="w-8 h-8 text-primary animate-spin mb-4" />
            <p className="font-medium text-foreground mb-1">Processing {fileName}</p>
            <p className="text-sm text-muted-foreground">Extracting text from your document...</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="p-4 rounded-full bg-success/10 mb-4">
              <CheckCircle2 className="w-8 h-8 text-success" />
            </div>
            <div className="flex items-center gap-2 mb-1">
              <FileText className="w-4 h-4 text-success" />
              <p className="font-medium text-foreground">{fileName}</p>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{formatFileSize(fileSize)} - Successfully parsed</p>
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                handleClear()
              }}
            >
              <X className="w-4 h-4 mr-1" />
              Remove
            </Button>
          </>
        )}

        {status === "error" && (
          <>
            <div className="p-4 rounded-full bg-destructive/10 mb-4">
              <AlertCircle className="w-8 h-8 text-destructive" />
            </div>
            <p className="font-medium text-foreground mb-1">Upload Failed</p>
            <p className="text-sm text-destructive mb-4 text-center max-w-xs">{error}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                handleClear()
              }}
            >
              Try Again
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  )
}
