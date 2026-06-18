import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import DetailItem from "../../custom/DetailItem";
const PersonalInfo = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <DetailItem label="Full Name" value="Kusum" />
          <DetailItem label="Aadhar Number" value="N/A" />
          <DetailItem label="PN Code" value="N/A" />
          <DetailItem label="Gender" value="Female" />

          <DetailItem label="Primary Contact" value="9876543210" />
          <DetailItem label="WhatsApp" value="N/A" />
          <DetailItem label="Email" value="kusum@gmail.com" />
          <DetailItem label="Blood Group" value="N/A" />

          <DetailItem label="Date of Joining" value="05 Sep, 2015" />
          <DetailItem label="Father's Name" value="N/A" />
          <DetailItem label="Mother's Name" value="N/A" />
          <DetailItem label="Date of Birth" value="08 Oct, 1990" />

          <DetailItem label="Marital Status" value="N/A" />
          <DetailItem label="Qualification" value="M.Ed." />
          <DetailItem label="Prof. Qualification" value="N/A" />
          <DetailItem label="Work Experience" value="N/A" />
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border p-4">
            <p className="mb-2 text-sm text-muted-foreground">Staff Image</p>

            <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
              <span className="text-sm text-muted-foreground">
                No Image Uploaded
              </span>
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <p className="mb-2 text-sm text-muted-foreground">Resume</p>

            <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
              <span className="text-sm text-muted-foreground">
                No Resume Uploaded
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-sm text-muted-foreground">Notes</p>

          <div className="mt-2 rounded-lg border p-4">N/A</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInfo;
