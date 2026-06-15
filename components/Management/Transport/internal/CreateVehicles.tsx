 
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
import { Label } from "@/components/ui/label";
import Link from "next/link";
export default function CreateVehicles() {
  const [vehicleNo, setVehicleNo] = useState("");
  const [capacity, setCapacity] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("Active");
  const [model, setModel] = useState("");

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header Section */}
        <div>
           
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Add Vehicle
          </h1>
        </div>

        {/* Form Card */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Vehicle Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Vehicle No */}
                <div className="space-y-2">
                  <Label>
                    Vehicle No <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    placeholder="e.g. DL01AB1234"
                    value={vehicleNo}
                    onChange={(e) => setVehicleNo(e.target.value)}
                    className="focus-visible:ring-indigo-500"
                  />
                </div>

                {/* Capacity */}
                <div className="space-y-2">
                  <Label>
                    Capacity <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    type="number"
                    placeholder="Enter capacity"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    className="focus-visible:ring-indigo-500"
                  />
                </div>

                {/* Type */}
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Select value={type} onValueChange={setType}>
                    <SelectTrigger className="focus-visible:ring-indigo-500">
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bus">Bus</SelectItem>
                      <SelectItem value="van">Van</SelectItem>
                      <SelectItem value="car">Car</SelectItem>
                      <SelectItem value="auto">Auto</SelectItem>
                    </SelectContent>
                  </Select>
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
                      <SelectItem value="Maintenance">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Model */}
                <div className="space-y-2">
                  <Label>Model</Label>
                  <Input
                    placeholder="Enter vehicle model"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
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
                  Save Changes
                </Button>


                <Link href="/management/transport/vehicles">
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