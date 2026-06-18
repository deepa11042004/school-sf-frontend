"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, House } from "lucide-react";

export default function StaffAddressInfo() {
  return (
    <form className="space-y-6">
      {/* Permanent Address */}
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <House className="h-5 w-5 " />

            <CardTitle>Permanent Address</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <Label>Address Line 1</Label>
              <Input
                placeholder="Street address, P.O. box"
                className="focus-visible:ring-indigo-500"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Address Line 2</Label>
              <Input
                placeholder="Apartment, suite, unit, building, floor, etc."
                className="focus-visible:ring-indigo-500"
              />
            </div>
            <div className="space-y-2">
              <Label>City</Label>
              <Input
                placeholder="City"
                className="focus-visible:ring-indigo-500"
              />
            </div>
            <div className="space-y-2">
              <Label>State</Label>
              <Input
                placeholder="State"
                className="focus-visible:ring-indigo-500"
              />
            </div>
            <div className="space-y-2">
              <Label>Postal Code</Label>
              <Input
                placeholder="Postal Code"
                className="focus-visible:ring-indigo-500"
              />
            </div>
            <div className="space-y-2">
              <Label>Country</Label>
              <Input
                defaultValue="India"
                className="focus-visible:ring-indigo-500"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current / Communication Address */}
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 " />

            <CardTitle>Current / Communication Address</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <Label>Address Line 1</Label>
              <Input
                placeholder="Street address, P.O. box"
                className="focus-visible:ring-indigo-500"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Address Line 2</Label>
              <Input
                placeholder="Apartment, suite, unit, building, floor, etc."
                className="focus-visible:ring-indigo-500"
              />
            </div>
            <div className="space-y-2">
              <Label>City</Label>
              <Input
                placeholder="City"
                className="focus-visible:ring-indigo-500"
              />
            </div>
            <div className="space-y-2">
              <Label>State</Label>
              <Input
                placeholder="State"
                className="focus-visible:ring-indigo-500"
              />
            </div>
            <div className="space-y-2">
              <Label>Postal Code</Label>
              <Input
                placeholder="Postal Code"
                className="focus-visible:ring-indigo-500"
              />
            </div>
            <div className="space-y-2">
              <Label>Country</Label>
              <Input
                placeholder="Country"
                className="focus-visible:ring-indigo-500"
              />
            </div>
          </div>
        </CardContent>
      </Card>

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
  );
}
