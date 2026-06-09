"use client";

import { useState } from "react";
import { CalendarIcon, PhoneCall  } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AddPhoneCall() {


  const [callDate, setCallDate] = useState<Date | undefined>(new Date());

  const [callTime, setCallTime] = useState(
    new Date().toTimeString().slice(0, 5),
  );

  const [checkInTime, setCheckInTime] = useState(
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
  );

  const currentDateTime = "06/09/2026 01:06 PM";
  function convertTo24Hour(time: string) {
    const [timePart, modifier] = time.split(" ");

    if (!modifier) return time;

    let [hours, minutes] = timePart.split(":");

    if (hours === "12") {
      hours = "00";
    }

    if (modifier === "PM") {
      hours = String(Number(hours) + 12);
    }

    return `${hours.padStart(2, "0")}:${minutes}`;
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Add Visitor</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Log Phone Call</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Caller Name */}
            <div className="space-y-2">
              <Label htmlFor="callerName">Caller Name</Label>

              <Input id="callerName" placeholder="Enter caller name" />
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">
                Phone Number <span className="text-destructive">*</span>
              </Label>

              <Input
                id="phoneNumber"
                type="tel"
                placeholder="Enter phone number"
              />
            </div>

            {/* Direction */}
            <div className="space-y-2">
              <Label>
                Direction <span className="text-destructive">*</span>
              </Label>

              <Select defaultValue="incoming">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="incoming">Incoming</SelectItem>
                  <SelectItem value="outgoing">Outgoing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date & Time */}
            <div className="space-y-2">
              <Label>Date & Time</Label>

              <div className="grid gap-3 sm:grid-cols-[1fr_140px]">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "justify-start text-left font-normal",
                        !callDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />

                      {callDate ? (
                        format(callDate, "dd/MM/yyyy")
                      ) : (
                        <span>Select date</span>
                      )}
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={callDate}
                      onSelect={setCallDate}
                   
                    />
                  </PopoverContent>
                </Popover>

                <Input
                  type="time"
                  value={callTime}
                  onChange={(e) => setCallTime(e.target.value)}
                />
              </div>
            </div>

            {/* Call Type */}
            <div className="space-y-2">
              <Label>Call Type</Label>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="enquiry">Enquiry</SelectItem>
                  <SelectItem value="complaint">Complaint</SelectItem>
                  <SelectItem value="followup">Follow Up</SelectItem>
                  <SelectItem value="support">Support</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Purpose */}
            <div className="space-y-2">
              <Label>Purpose</Label>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Purpose" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="admission">Admission Inquiry</SelectItem>
                  <SelectItem value="fee">Fee Related</SelectItem>
                  <SelectItem value="academic">Academic Query</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Duration */}
            <div className="space-y-2">
              <Label>Duration (Seconds)</Label>

              <Input type="number" min={0} placeholder="e.g. 120" />
            </div>
          </div>

          

          {/* Actions */}
          <div className="mt-8 flex flex-row gap-3 justify-start">

            <Link href="/front-office/phone-calls">
            <Button variant="outline">Cancel</Button>

            </Link>

            <Button>
              <PhoneCall  className="mr-2 h-4 w-4" />
              Save Call Log
            </Button>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
