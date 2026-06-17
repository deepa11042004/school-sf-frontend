import {Card,CardHeader,CardTitle,CardContent} from "@/components/ui/card";
import {Bus,Building2} from "lucide-react";
const ServicesTab = () => {
  return (
  <Card>
  <CardHeader>
    <CardTitle>Transport & Hostel Services</CardTitle>
  </CardHeader>

  <CardContent>
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-12 text-center">
      <div className="mb-4 flex items-center gap-3">
        <Bus className="h-8 w-8 text-muted-foreground" />
        <Building2 className="h-8 w-8 text-muted-foreground" />
      </div>

      <p className="font-medium">
        No Optional Services Availed
      </p>

      <p className="text-sm text-muted-foreground">
        No transport or hostel services are currently assigned to this student.
      </p>
    </div>
  </CardContent>
</Card>
  )
}

export default ServicesTab