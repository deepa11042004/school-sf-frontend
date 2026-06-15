 
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function CreateHostel() {
  const [hostelName, setHostelName] = useState("");
  const [code, setCode] = useState("");
  const [type, setType] = useState("Boys");
  const [wardenName, setWardenName] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("Active");

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header Section */}
        <div>
           
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Add Hostel
          </h1>
        </div>

        {/* Form Card */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Hostel Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Hostel Name */}
                <div className="space-y-2">
                  <Label>
                    Hostel Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    placeholder="Enter hostel name"
                    value={hostelName}
                    onChange={(e) => setHostelName(e.target.value)}
                    className="focus-visible:ring-indigo-500"
                  />
                </div>

                {/* Code */}
                <div className="space-y-2">
                  <Label>Code</Label>
                  <Input
                    placeholder="Enter hostel code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="focus-visible:ring-indigo-500"
                  />
                </div>

                {/* Type */}
                <div className="space-y-2">
                  <Label>
                    Type <span className="text-destructive">*</span>
                  </Label>
                  <Select value={type} onValueChange={setType}>
                    <SelectTrigger className="focus-visible:ring-indigo-500">
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Boys">Boys</SelectItem>
                      <SelectItem value="Girls">Girls</SelectItem>
                      <SelectItem value="Mixed">Mixed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Warden Name */}
                <div className="space-y-2">
                  <Label>Warden Name</Label>
                  <Input
                    placeholder="Enter warden name"
                    value={wardenName}
                    onChange={(e) => setWardenName(e.target.value)}
                    className="focus-visible:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Address */}
              <div className="space-y-2">
                <Label>Address</Label>
                <Textarea
                  placeholder="Enter hostel address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="min-h-[100px] focus-visible:ring-indigo-500"
                />
              </div>

              {/* Status */}
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="w-full md:w-1/2 focus-visible:ring-indigo-500">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Footer Actions */}
              <div className="flex flex-wrap gap-3 justify-start pt-4 border-t">
                
                <Button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
                >
                  Save Changes
                </Button>


                <Link href="/management/hostels">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}