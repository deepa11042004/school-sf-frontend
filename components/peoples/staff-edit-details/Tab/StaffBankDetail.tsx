"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Landmark } from "lucide-react";

export default function StaffBankDetail() {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Landmark className="h-5 w-5 " />

          <CardTitle>Bank Account Information</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <form className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Account Name */}
            <div className="space-y-2">
              <Label>Account Name</Label>
              <Input
                defaultValue="Pooja Chatterjee"
                className="focus-visible:ring-indigo-500"
              />
            </div>

            {/* Account Number */}
            <div className="space-y-2">
              <Label>Account Number</Label>
              <Input
                defaultValue="7816875334"
                className="focus-visible:ring-indigo-500"
              />
            </div>

            {/* Bank Name */}
            <div className="space-y-2">
              <Label>Bank Name</Label>
              <Input
                defaultValue="HDFC Bank"
                className="focus-visible:ring-indigo-500"
              />
            </div>

            {/* IFSC Code */}
            <div className="space-y-2">
              <Label>IFSC Code</Label>
              <Input
                defaultValue="HDFC0001244"
                className="uppercase focus-visible:ring-indigo-500"
              />
            </div>

            {/* Branch Name */}
            <div className="space-y-2">
              <Label>Branch Name</Label>
              <Input
                defaultValue="Retail Branch"
                className="focus-visible:ring-indigo-500"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex flex-wrap gap-3 justify-start pt-4 border-t">
            <Button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
            >
              Update
            </Button>

            <Button type="button" variant="outline">
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
