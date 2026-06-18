import { Home, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


const AddressTab = () => {
  return (
   <Card>
  <CardHeader>
    <CardTitle>Addresses</CardTitle>
  </CardHeader>

  <CardContent>
    <div className="grid gap-6 md:grid-row-2">
      <div className="rounded-lg border p-5">
        <div className="mb-3 flex items-center gap-2">
          <Home className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-semibold">
            Permanent Address
          </h3>
        </div>

        <p className="text-muted-foreground">
          India -
        </p>
      </div>

      <div className="rounded-lg border p-5">
        <div className="mb-3 flex items-center gap-2">
          <MapPin className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-semibold">
            Current / Communication Address
          </h3>
        </div>

        <p className="text-muted-foreground">
          India -
        </p>
      </div>
    </div>
  </CardContent>
</Card>
  )
}

export default AddressTab