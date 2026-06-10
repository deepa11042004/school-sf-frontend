 
"use client";

import { Activity } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CreateAdditionalActivities() {
  const [status, setStatus] = useState("Active");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({
      status,
    });

    // API Call Here
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Add Activity</h1>

       
      </div>

      {/* Form */}
      <Card className="max-w-3xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Activity Information
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Name */}
              <div className="space-y-2">
                <Label>
                  Name <span className="text-destructive">*</span>
                </Label>

                <Input
                  placeholder="e.g. Football"
                  required
                />
              </div>

              {/* Code */}
              <div className="space-y-2">
                <Label>Code</Label>

                <Input placeholder="e.g. FB" />
              </div>

              {/* Status */}
              <div className="space-y-2 md:col-span-2">
                <Label>
                  Status <span className="text-destructive">*</span>
                </Label>

                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="Active">
                      Active
                    </SelectItem>

                    <SelectItem value="Inactive">
                      Inactive
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            
            {/* Actions */}
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-start">
              

              <Button type="submit">
                Save Activity
              </Button>


              <Link href="/settings/activities">
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