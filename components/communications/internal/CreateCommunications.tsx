"use client";
import { useState } from "react";
import { Mail, Send } from "lucide-react";

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

export default function CreateCommunications() {
  const [messageType, setMessageType] = useState("Email");
  const [recipientGroup, setRecipientGroup] = useState("All Students");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({
      messageType,
      recipientGroup,
    });

    // API Call Here
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Compose Message</h1>

        
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Send New Message
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Message Type */}
              <div className="space-y-2">
                <Label>
                  Message Type{" "}
                  <span className="text-destructive">*</span>
                </Label>

                <Select
                  value={messageType}
                  onValueChange={setMessageType}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="Email">Email</SelectItem>
                    <SelectItem value="SMS">SMS</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Recipient Group */}
              <div className="space-y-2">
                <Label>
                  Recipient Group{" "}
                  <span className="text-destructive">*</span>
                </Label>

                <Select
                  value={recipientGroup}
                  onValueChange={setRecipientGroup}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="All Students">
                      All Students
                    </SelectItem>

                    <SelectItem value="All Parents">
                      All Parents
                    </SelectItem>

                    <SelectItem value="All Staff">
                      All Staff
                    </SelectItem>

                    <SelectItem value="Teachers">
                      Teachers
                    </SelectItem>

                    <SelectItem value="Accountants">
                      Accountants
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <Label>
                Subject <span className="text-destructive">*</span>
              </Label>

              <Input
                placeholder="Enter message subject"
                required
              />
            </div>

            {/* Message */}
            <div className="space-y-2">
              <Label>
                Message <span className="text-destructive">*</span>
              </Label>

              <Textarea
                placeholder="Type your message here..."
                rows={8}
                required
              />
            </div>

            {/* Info Notice */}
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
              <p className="text-sm text-blue-700">
                The message will be sent to all recipients in the
                selected group. Please review the content carefully
                before sending.
              </p>
            </div>

            {/* Footer */}
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-start">
              

              <Button type="submit">
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </Button>


              <Button type="button" variant="outline">
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}