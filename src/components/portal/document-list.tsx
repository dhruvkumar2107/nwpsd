import { FileText, File, Image as ImageIcon, FileSpreadsheet } from "lucide-react"
import { format } from "date-fns"

interface DocumentItem {
  id: string
  name: string
  type: string
  url: string
  uploadedAt: Date | string
  engagementTitle?: string
}

function getIcon(type: string) {
  const lower = type.toLowerCase()
  if (lower.includes("pdf")) return <FileText className="h-5 w-5 text-red-500" />
  if (lower.includes("image") || lower.includes("png") || lower.includes("jpg"))
    return <ImageIcon className="h-5 w-5 text-blue-500" />
  if (lower.includes("sheet") || lower.includes("xlsx"))
    return <FileSpreadsheet className="h-5 w-5 text-green-500" />
  return <File className="h-5 w-5 text-gray-500" />
}

export function DocumentList({ documents }: { documents: DocumentItem[] }) {
  if (documents.length === 0) {
    return (
      <p className="text-sm text-ink-light py-8 text-center">No documents found.</p>
    )
  }

  return (
    <div className="divide-y divide-surface-alt">
      {documents.map((doc) => (
        <div
          key={doc.id}
          className="flex items-center gap-4 p-4 hover:bg-surface/50 transition-colors"
        >
          {getIcon(doc.type)}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-ink truncate">{doc.name}</p>
            <p className="text-xs text-ink-light">
              {doc.engagementTitle && <span>{doc.engagementTitle} &middot; </span>}
              {format(new Date(doc.uploadedAt), "MMM d, yyyy")}
            </p>
          </div>
          <a
            href={doc.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:text-primary-light font-medium shrink-0"
          >
            Download
          </a>
        </div>
      ))}
    </div>
  )
}
