 
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
export default function CreateTrasnportRoutes() {
  const [routeName, setRouteName] = useState("");
  const [driver, setDriver] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [status, setStatus] = useState("Active");

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header Section */}
        <div>
         
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Add Route
          </h1>
        </div>

        {/* Form Card */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Route Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Route Name */}
                <div className="space-y-2 md:col-span-2">
                  <Label>
                    Route Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    placeholder="e.g. Route 1 - North"
                    value={routeName}
                    onChange={(e) => setRouteName(e.target.value)}
                    className="focus-visible:ring-indigo-500"
                  />
                </div>

                {/* Driver */}
                <div className="space-y-2">
                  <Label>Driver</Label>
                  <Select value={driver} onValueChange={setDriver}>
                    <SelectTrigger className="focus-visible:ring-indigo-500">
                      <SelectValue placeholder="Select Driver" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="driver1">John Doe</SelectItem>
                      <SelectItem value="driver2">Jane Smith</SelectItem>
                      <SelectItem value="driver3">Mike Johnson</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Vehicle */}
                <div className="space-y-2">
                  <Label>Vehicle</Label>
                  <Select value={vehicle} onValueChange={setVehicle}>
                    <SelectTrigger className="focus-visible:ring-indigo-500">
                      <SelectValue placeholder="Select Vehicle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vehicle1">DL01AB1234 (Bus)</SelectItem>
                      <SelectItem value="vehicle2">DL02CD5678 (Van)</SelectItem>
                      <SelectItem value="vehicle3">DL03EF9012 (Bus)</SelectItem>
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
                    </SelectContent>
                  </Select>
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


                <Link href="/management/transport/route">
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