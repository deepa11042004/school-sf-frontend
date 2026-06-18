import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ParentsGuardiansTab = () => {
  return (
     
      <div className="grid gap-4 lg:grid-row-2 space-y-6 ">
        {/* Father */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-2">
              <div>
                <CardTitle>RAJESH SINGH YADAV</CardTitle>
                <p className="text-base text-muted-foreground pt-1">Father</p>
              </div>

              <Badge className="bg-indigo-700 text-white ">
                Primary Contact
              </Badge>
            </div>
          </CardHeader>

          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2">
              <InfoRow label="Phone" value="9719044221" />

              <InfoRow label="Email" value="S781@example.com" />

              <InfoRow label="Occupation" value="N/A" />

              <InfoRow label="Address" value="Same as Student" />
            </div>
          </CardContent>
        </Card>

        {/* Mother */}
        <Card>
          <CardHeader>
            <div>
              <CardTitle>VINEETA</CardTitle>

              <p className="text-base pt-1 text-muted-foreground">Mother</p>
            </div>
          </CardHeader>

          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2">
              <InfoRow label="Phone" value="9719044221" />

              <InfoRow label="Email" value="N/A" />

              <InfoRow label="Occupation" value="N/A" />

              <InfoRow label="Address" value="Same as Student" />
            </div>
          </CardContent>
        </Card>
      </div>
   
  );
};

export default ParentsGuardiansTab;

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border p-3">
      <p className="text-sm text-muted-foreground">{label} : </p>

      <p className="font-medium break-words">{value}</p>
    </div>
  );
}
