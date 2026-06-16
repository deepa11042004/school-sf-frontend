 
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
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

export default function CreateVendors() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [gstNo, setGstNo] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("Active");

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header Section */}
        <div>
          
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Add Vendor
          </h1>
        </div>

        {/* Form Card */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Vendor Information</CardTitle>
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
                    placeholder="Enter vendor name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="focus-visible:ring-indigo-500"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input
                    type="tel"
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="focus-visible:ring-indigo-500"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    placeholder="Enter email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="focus-visible:ring-indigo-500"
                  />
                </div>

                {/* Contact Person */}
                <div className="space-y-2">
                  <Label>Contact Person</Label>
                  <Input
                    placeholder="Enter contact person name"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    className="focus-visible:ring-indigo-500"
                  />
                </div>

                {/* GST No */}
                <div className="space-y-2">
                  <Label>GST No</Label>
                  <Input
                    placeholder="Enter GST number"
                    value={gstNo}
                    onChange={(e) => setGstNo(e.target.value)}
                    className="focus-visible:ring-indigo-500"
                  />
                </div>

                {/* Status */}
                <div className="space-y-2">
                  <Label>Status</Label>
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
                  placeholder="Enter vendor address"
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


                <Link href="/inventory/vendors">
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