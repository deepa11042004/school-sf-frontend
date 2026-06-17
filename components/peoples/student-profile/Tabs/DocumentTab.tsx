import {Card,CardHeader,CardTitle,CardContent} from "@/components/ui/card";
import {FileText} from "lucide-react";
const DocumentTab = () => {
  return (
  <Card>
  <CardHeader>
    <CardTitle>Documents & Media</CardTitle>
  </CardHeader>

  <CardContent>
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-10 text-center">
      <FileText className="mb-3 h-10 w-10 text-muted-foreground" />

      <h3 className="font-medium">
        No documents uploaded
      </h3>

      <p className="mt-1 text-sm text-muted-foreground">
        No student documents or media files are available.
      </p>
    </div>
  </CardContent>
</Card>
  )
}

export default DocumentTab