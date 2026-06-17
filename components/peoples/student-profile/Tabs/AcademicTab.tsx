import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AcademicTab = () => {
  return (
    <CardContent>
      <div className="grid gap-4 lg:grid-row-2 pt-5">
        {/* Admission Details */}
        <Card>
          <CardHeader>
            <CardTitle>Admission Details</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2">
              <InfoRow label="Admission Date" value="22 Jul 2007" />

              <InfoRow label="Admission Number" value="1387" />

              <InfoRow label="PEN Number" value="PEN385857" />

              <InfoRow label="Current Class" value="NC A" />
            </div>
          </CardContent>
        </Card>

        {/* Previous School Details */}
        <Card>
          <CardHeader>
            <CardTitle>Previous School Details</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2">
              <InfoRow label="School Name" value="JHS" />

              <InfoRow label="Previous Class" value="N/A" />

              <InfoRow label="Year Passed" value="2026" />

              <InfoRow label="Last Exam %" value="0.00%" />
            </div>
          </CardContent>
        </Card>
      </div>
    </CardContent>
  );
};

export default AcademicTab;

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border p-3">
      <p className="text-sm text-muted-foreground">{label} : </p>

      <p className="font-medium break-words">{value}</p>
    </div>
  );
}
