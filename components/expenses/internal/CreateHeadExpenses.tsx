 

"use client";

import { ReceiptText } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function CreateHeadExpenses() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // API Call Here
    console.log("Expense Head Submitted");
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Add Expense Head</h1>
 
      </div>

      {/* Form */}
      <Card className="max-w-3xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ReceiptText className="h-5 w-5" />
            Expense Head Information
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">
                Name <span className="text-destructive">*</span>
              </Label>

              <Input
                id="name"
                placeholder="e.g. Office Supplies"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>

              <Textarea
                id="description"
                placeholder="Enter expense head description..."
                rows={4}
              />
            </div>

            {/* Footer */}
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-start">
              

              <Button type="submit">
                Submit
              </Button>


              <Link href="/expenses/expenses-heads">
              <Button type="button" variant="outline">
                Cancel
              </Button></Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}