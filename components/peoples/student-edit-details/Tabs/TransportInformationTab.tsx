 
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Bus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TransportInformationTab() {
  const [hasTransport, setHasTransport] = useState(false);

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Bus className="h-6 w-6  " />

          <CardTitle>Transport Services</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-start justify-between gap-4 p-4 border rounded-lg bg-slate-50/50 dark:bg-neutral-900/50 transition-colors hover:bg-slate-100/50 dark:hover:bg-neutral-900">
          <div className="space-y-1">
            <Label
              htmlFor="sibling-toggle"
              className="text-base font-medium cursor-pointer"
            >
              Available Transport ?
            </Label>
             
          </div>
          <Switch
            id="sibling-toggle"
            checked={hasTransport}
            onCheckedChange={setHasTransport}
            className="mt-1 shrink-0"
          />
        </div>

        {hasTransport && (
          <div className="rounded-lg border border-indigo-200 bg-indigo-50 dark:border-indigo-900 dark:bg-indigo-950 p-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <p className="text-sm text-indigo-800 dark:text-indigo-200 font-medium">
            Transport routes not available.
            </p>
          </div>
        )}
      </CardContent>

      {/* Footer Actions */}
      <div className="flex flex-wrap gap-3 justify-start p-4 border-t">
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
    </Card>
  );
}
