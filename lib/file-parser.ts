// File parsing utilities for PDF and DOCX files

export async function extractTextFromFile(file: File): Promise<string> {
  const fileType = file.type
  const fileName = file.name.toLowerCase()

  if (fileType === "application/pdf" || fileName.endsWith(".pdf")) {
    return extractTextFromPDF(file)
  } else if (
    fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    fileName.endsWith(".docx")
  ) {
    return extractTextFromDOCX(file)
  } else if (fileType === "application/msword" || fileName.endsWith(".doc")) {
    return extractTextFromDOC(file)
  } else if (fileType === "text/plain" || fileName.endsWith(".txt")) {
    return file.text()
  }

  throw new Error("Unsupported file format. Please upload a PDF, DOCX, DOC, or TXT file.")
}

async function extractTextFromPDF(file: File): Promise<string> {
  // Parse PDF using pdf.js. Prefer the bundled worker entry so the app
  // doesn't try to fetch the worker from a CDN at runtime (which can be
  // blocked or fail). If the bundle-provided worker can't be loaded we
  // fall back to the CDN as a last resort.
  const arrayBuffer = await file.arrayBuffer()

  // Use the legacy build which is compatible with bundlers/Next.js.
  const pdfjs = await import("pdfjs-dist/legacy/build/pdf")

  try {
    // Try to load the bundler-provided worker entry at runtime. We construct
    // the import path dynamically (instead of a static literal) so the
    // bundler won't attempt to resolve it at build time and emit module
    // not found warnings in environments like Turbopack where the worker
    // entry isn't exposed.
    const workerSegments = [
      'pdfjs-dist',
      'legacy',
      'build',
      'pdf.worker.entry',
    ]
    const workerPath = workerSegments.join('/')
    // @ts-ignore - dynamic import path
    const workerModule = await import(workerPath)
    // workerModule may export the worker URL as the default export or as
    // the module itself depending on bundler config — handle both cases.
    // @ts-ignore - dynamic module shape
    pdfjs.GlobalWorkerOptions.workerSrc = workerModule?.default || workerModule
  } catch (err) {
    // Bundler didn't expose a worker entry. Serve the worker from our
    // own /public path so the browser won't try to fetch it from an
    // external CDN (which can fail in offline or restricted environments).
    pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs'
    // eslint-disable-next-line no-console
    console.warn('pdf.worker entry not available via bundler; serving local worker /pdf.worker.min.mjs', err)
  }

  try {
  const pdf = await (pdfjs as any).getDocument({ data: arrayBuffer }).promise
    let fullText = ""

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i)
      const textContent = await page.getTextContent()
      const pageText = textContent.items.map((item: { str?: string }) => item.str || "").join(" ")
      fullText += pageText + "\n"
    }

    return fullText.trim()
  } catch (error) {
    console.error("PDF parsing error:", error)
    throw new Error("Failed to parse PDF. Please try pasting the text directly.")
  }
}

async function extractTextFromDOCX(file: File): Promise<string> {
  // Use mammoth.js for DOCX parsing
  const arrayBuffer = await file.arrayBuffer()

  try {
    const mammoth = await import("mammoth")
    const result = await mammoth.extractRawText({ arrayBuffer })
    return result.value.trim()
  } catch (error) {
    console.error("DOCX parsing error:", error)
    throw new Error("Failed to parse DOCX. Please try pasting the text directly.")
  }
}

async function extractTextFromDOC(file: File): Promise<string> {
  // DOC files are harder to parse in browser, suggest conversion
  throw new Error("DOC format is not fully supported. Please save as DOCX or paste the text directly.")
}

export function getFileIcon(fileName: string): string {
  const ext = fileName.split(".").pop()?.toLowerCase()
  switch (ext) {
    case "pdf":
      return "pdf"
    case "docx":
    case "doc":
      return "word"
    case "txt":
      return "text"
    default:
      return "file"
  }
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}
