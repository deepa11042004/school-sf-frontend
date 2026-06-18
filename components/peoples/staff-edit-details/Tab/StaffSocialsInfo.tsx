"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Share2 } from "lucide-react";

export default function StaffSocialsInfo() {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Share2 className="h-5 w-5  " />

          <CardTitle>Social Media Links</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <form className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Facebook URL */}
            <div className="space-y-2">
              <Label>Facebook URL</Label>
              <Input
                type="url"
                defaultValue="https://facebook.com/pooja.chatterjee"
                placeholder="https://facebook.com/..."
                className="focus-visible:ring-indigo-500"
              />
            </div>

            {/* Twitter URL */}
            <div className="space-y-2">
              <Label>Twitter URL</Label>
              <Input
                type="url"
                placeholder="https://twitter.com/..."
                className="focus-visible:ring-indigo-500"
              />
            </div>

            {/* LinkedIn URL */}
            <div className="space-y-2">
              <Label>LinkedIn URL</Label>
              <Input
                type="url"
                defaultValue="https://linkedin.com/in/poojachatterjee"
                placeholder="https://linkedin.com/in/..."
                className="focus-visible:ring-indigo-500"
              />
            </div>

            {/* Instagram URL */}
            <div className="space-y-2">
              <Label>Instagram URL</Label>
              <Input
                type="url"
                placeholder="https://instagram.com/..."
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
