"use client";

import { useState } from "react";
import { Trophy, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function CreateCompetition() {
  const [date, setDate] = useState<Date>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({
      competitionDate: date,
    });

    // API Call Here
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}

      <h1 className="text-2xl font-bold">Create Competition</h1>

      {/* Form */}
      <Card className="max-w-4xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Competition Details
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="flex justify-between items-center gap-5">


           
            {/* Competition Name */}
            <div className="space-y-2 w-full">
              <Label>
                Name <span className="text-destructive">*</span>
              </Label>

              <Input placeholder="e.g. Chess Tournament 2024" required />
            </div>

            {/* Competition Date */}
            <div className="space-y-2 w-full">
              <Label>
                Date <span className="text-destructive">*</span>
              </Label>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className={`w-full justify-start text-left font-normal ${
                      !date && "text-muted-foreground"
                    }`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />

                    {date ? format(date, "dd/MM/yyyy") : "mm/dd/yyyy"}
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                  
                  />
                </PopoverContent>
              </Popover>
            </div>
             </div>

            {/* Description */}
            <div className="space-y-2">
              <Label>Description</Label>

              <Textarea
                rows={5}
                placeholder="Enter details about the competition..."
              />
            </div>

            

            {/* Actions */}
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-start">
              <Button type="submit" disabled={!date}>
                Create Competition
              </Button>
              <Link href="/competition">
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
