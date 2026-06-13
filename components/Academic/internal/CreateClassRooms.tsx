 
"use client";

import { useState } from "react";
import { School } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

 
export default function CreateClassRooms() {
  const [status, setStatus] = useState("Ok");

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
       
        <h1 className="text-2xl font-bold">Add Classroom</h1>
 

      {/* Form */}
      <Card className="max-w-4xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <School className="h-5 w-5" />
            Classroom Information
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
                  placeholder="e.g. Room 101"
                  required
                />
              </div>

              {/* Capacity */}
              <div className="space-y-2">
                <Label>
                  Capacity <span className="text-destructive">*</span>
                </Label>

                <Input
                  type="number"
                  min="1"
                  placeholder="Enter classroom capacity"
                  required
                />
              </div>

              {/* Status */}
              <div className="space-y-2 md:col-span-2">
                <Label>
                  Status <span className="text-destructive">*</span>
                </Label>

                <Select
                  value={status}
                  onValueChange={setStatus}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="Ok">
                      OK
                    </SelectItem>

                    <SelectItem value="Maintenance">
                      Maintenance
                    </SelectItem>

                    <SelectItem value="Inactive">
                      Inactive
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label>Description</Label>

              <Textarea
                rows={4}
                placeholder="Enter classroom details..."
              />
            </div>
 

            {/* Footer */}
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-start">
              

              <Button type="submit">
                Save Classroom
              </Button>



              <Link href={`/academic/class-room`}>
              <Button type="button" variant="outline">
                Cancel
              </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}