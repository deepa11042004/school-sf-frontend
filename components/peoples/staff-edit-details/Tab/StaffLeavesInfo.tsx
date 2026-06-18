"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarDays } from "lucide-react";

export default function StaffLeavesInfo() {
  return (
 

        <Card className="shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-3">
               
                <CalendarDays className="h-5 w-5 " />
              
              <CardTitle>Leaves Allocation</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="grid gap-6 md:grid-cols-5">
                {/* Year */}
                <div className="space-y-2">
                  <Label>Year</Label>
                  <Input type="number" defaultValue="2025" className="focus-visible:ring-indigo-500" />
                </div>

                {/* Medical */}
                <div className="space-y-2">
                  <Label>Medical</Label>
                  <Input type="number" defaultValue="0" className="focus-visible:ring-indigo-500" />
                </div>

                {/* Casual */}
                <div className="space-y-2">
                  <Label>Casual</Label>
                  <Input type="number" defaultValue="0" className="focus-visible:ring-indigo-500" />
                </div>

                {/* Maternity */}
                <div className="space-y-2">
                  <Label>Maternity</Label>
                  <Input type="number" defaultValue="0" className="focus-visible:ring-indigo-500" />
                </div>

                {/* Sick */}
                <div className="space-y-2">
                  <Label>Sick</Label>
                  <Input type="number" defaultValue="0" className="focus-visible:ring-indigo-500" />
                </div>
              </div>

              {/* Footer Actions */}
              <div className="flex flex-wrap gap-3 justify-start pt-4 border-t">
               
                <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">
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