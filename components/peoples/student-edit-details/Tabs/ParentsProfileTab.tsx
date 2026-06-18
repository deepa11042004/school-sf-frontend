"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { User, UserPlus } from "lucide-react";

export default function ParentsProfileTab() {
  return (
    <form className="space-y-6">
      <Accordion type="multiple" className="grid gap-4">
        {/* Father */}
        <AccordionItem
          value="father"
          className="overflow-hidden rounded-sm border bg-card shadow-sm"
        >
          <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-slate-50/50 dark:hover:bg-neutral-900/50 transition-colors">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5" />
              <span className="font-semibold text-lg">Father</span>
            </div>
          </AccordionTrigger>

          <AccordionContent className="px-6 pb-6 pt-2">
            <div className="mb-6 flex items-center justify-start gap-5">
              <Switch id="father-primary" defaultChecked />
              <Label htmlFor="father-primary" className="cursor-pointer">
                Set as Primary Contact
              </Label>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input defaultValue="RAJESH SINGH YADAV" />
              </div>

              <div className="space-y-2">
                <Label>Aadhar Number</Label>
                <Input defaultValue="XXXX-XXXX-XXXX" />
              </div>

              <div className="space-y-2">
                <Label>Phone</Label>
                <Input type="tel" defaultValue="9719044221" />
              </div>

              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" defaultValue="S781@example.com" />
              </div>

              <div className="space-y-2">
                <Label>WhatsApp</Label>
                <Input type="tel" />
              </div>

              <div className="space-y-2">
                <Label>Occupation</Label>
                <Input />
              </div>

              <div className="space-y-2 md:col-span-3">
                <Label>Address</Label>
                <Textarea placeholder="Enter address" />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Mother */}
        <AccordionItem
          value="mother"
          className="overflow-hidden rounded-sm border bg-card shadow-sm"
        >
          <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-slate-50/50 dark:hover:bg-neutral-900/50 transition-colors">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5" />

              <span className="font-semibold text-lg">Mother</span>
            </div>
          </AccordionTrigger>

          <AccordionContent className="px-6 pb-6 pt-2">
            <div className="mb-6 flex items-center justify-start gap-5">
              <Switch id="mother-primary" />

              <Label htmlFor="mother-primary" className="cursor-pointer">
                Set as Primary Contact
              </Label>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input defaultValue="VINEETA" />
              </div>

              <div className="space-y-2">
                <Label>Aadhar Number</Label>
                <Input defaultValue="XXXX-XXXX-XXXX" />
              </div>

              <div className="space-y-2">
                <Label>Phone</Label>
                <Input type="tel" defaultValue="9719044221" />
              </div>

              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" />
              </div>

              <div className="space-y-2">
                <Label>WhatsApp</Label>
                <Input type="tel" />
              </div>

              <div className="space-y-2">
                <Label>Occupation</Label>
                <Input />
              </div>

              <div className="space-y-2 md:col-span-3">
                <Label>Address</Label>
                <Textarea placeholder="Enter address" />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Other Guardian */}
        <AccordionItem
          value="other"
          className="overflow-hidden rounded-sm border bg-card shadow-sm"
        >
          <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-slate-50/50 dark:hover:bg-neutral-900/50 transition-colors">
            <div className="flex items-center gap-3">
              <UserPlus className="h-5 w-5" />

              <span className="font-semibold text-lg">Other Guardian</span>
            </div>
          </AccordionTrigger>

          <AccordionContent className="px-6 pb-6 pt-2">
            <div className="mb-6 flex items-center justify-start gap-5">
              <Switch id="other-primary" />

              <Label htmlFor="other-primary" className="cursor-pointer">
                Set as Primary Contact
              </Label>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input />
              </div>

              <div className="space-y-2">
                <Label>Aadhar Number</Label>
                <Input defaultValue="XXXX-XXXX-XXXX" />
              </div>

              <div className="space-y-2">
                <Label>Phone</Label>
                <Input type="tel" />
              </div>

              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" />
              </div>

              <div className="space-y-2">
                <Label>WhatsApp</Label>
                <Input type="tel" />
              </div>

              <div className="space-y-2">
                <Label>Occupation</Label>
                <Input />
              </div>

              <div className="space-y-2 md:col-span-3">
                <Label>Address</Label>
                <Textarea placeholder="Enter address" />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Footer Actions */}
      <div className="flex flex-wrap gap-3 justify-start pt-4 border-t">
        <Button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
        >
          Update Details
        </Button>

        <Button type="button" variant="outline">
          Cancel
        </Button>
      </div>
    </form>
  );
}
