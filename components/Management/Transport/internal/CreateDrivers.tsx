 
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
export default function CreateDrivers() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [licenseNo, setLicenseNo] = useState("");
  const [status, setStatus] = useState("Active");
  const [address, setAddress] = useState("");

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header Section */}
        <div>
          
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Add Driver
          </h1>
        </div>

        {/* Form Card */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Driver Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Name */}
                <div className="space-y-2">
                  <Label>
                    Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    placeholder="Enter driver name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="focus-visible:ring-indigo-500"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label>
                    Phone <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    type="tel"
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="focus-visible:ring-indigo-500"
                  />
                </div>

                {/* License No */}
                <div className="space-y-2">
                  <Label>License No</Label>
                  <Input
                    placeholder="Enter license number"
                    value={licenseNo}
                    onChange={(e) => setLicenseNo(e.target.value)}
                    className="focus-visible:ring-indigo-500"
                  />
                </div>

                {/* Status */}
                <div className="space-y-2">
                  <Label>
                    Status <span className="text-destructive">*</span>
                  </Label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger className="focus-visible:ring-indigo-500">
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Address */}
              <div className="space-y-2">
                <Label>Address</Label>
                <Textarea
                  placeholder="Enter driver address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="min-h-[100px] focus-visible:ring-indigo-500"
                />
              </div>

              {/* Footer Actions */}
              <div className="flex flex-wrap gap-3 justify-start pt-4 border-t">
               
                <Button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
                >
                  Save Changes
                </Button>


                <Link href="/management/transport/drivers">
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