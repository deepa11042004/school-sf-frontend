import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DetailItem from "../../custom/DetailItem";
const PayrollLeaveTab = () => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Payroll Information</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Payroll Details */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <DetailItem label="EPF No" value="N/A" />
            <DetailItem label="Basic Salary" value="N/A" />
            <DetailItem label="Contract Type" value="Permanent" />
            <DetailItem label="Contract Period" value="N/A" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Leave Balances (2025)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">Medical</p>

              <p className="mt-2 text-2xl font-bold">0</p>
            </div>

            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">Casual</p>
              <p className="mt-2 text-2xl font-bold">0</p>
            </div>

            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">Maternity</p>
              <p className="mt-2 text-2xl font-bold">0</p>
            </div>

            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">Sick</p>
              <p className="mt-2 text-2xl font-bold">0</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PayrollLeaveTab;
