import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import DetailItem from "../../custom/DetailItem";
export default function BasicInfo() {
  return (
    <div className="space-y-6">
      {/* Personal Details */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Details</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <DetailItem label="Date of Birth" value="01 Apr 2023" />
            <DetailItem label="Gender" value="Male" />
            <DetailItem label="Blood Group" value="A+" />
            <DetailItem label="Nationality" value="Indian" />
            <DetailItem label="Religion" value="N/A" />
            <DetailItem label="Caste" value="NA" />
            <DetailItem label="Category" value="N/A" />
            <DetailItem label="Aadhaar Number" value="xxxx-xxxx-7878" />

            <div>
              <p className="text-sm text-muted-foreground">RTE Student</p>
              <Badge variant="outline" className="bg-red-700 text-white">
                No
              </Badge>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Discount</p>
              <Badge variant="secondary" className="bg-red-700 text-white">
                No Discount
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Details */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Details</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <DetailItem label="Primary Phone" value="9719044221" />

            <DetailItem label="Email" value="S781@example.com" />

            <div className="sm:col-span-2">
              <p className="text-sm text-muted-foreground">Current Address</p>
              <p className="font-medium">
                SUPRIYA COLONY, Rudrapur, Uttarakhand - 263153
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bank Details */}
      <Card>
        <CardHeader>
          <CardTitle>Bank Details</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <DetailItem label="Bank Name" value="ABC Bank" />

            <DetailItem label="Account Number" value="1234568499" />

            <DetailItem label="IFSC Code" value="ABCD0001843" />

            <DetailItem label="Branch" value="R Branch" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

 