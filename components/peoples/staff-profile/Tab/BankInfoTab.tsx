import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import DetailItem from "../../custom/DetailItem";

const BankInfoTab = () => {
  return (
    <Card>
  <CardHeader>
    <CardTitle>Bank Account Details</CardTitle>
  </CardHeader>

  <CardContent>
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <DetailItem
        label="Account Name"
        value="Pooja Chatterjee"
      />

      <DetailItem
        label="Account Number"
        value="7816875334"
      />

      <DetailItem
        label="Bank Name"
        value="HDFC Bank"
      />

      <DetailItem
        label="IFSC Code"
        value="HDFC0001244"
      />

      <DetailItem
        label="Branch Name"
        value="Retail Branch"
      />
    </div>
  </CardContent>
</Card>
  )
}

export default BankInfoTab