"use client";

import { useState } from "react";
import { AlertTriangle, Settings, Trash2, ShieldAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function StudentSetting() {
  const [confirmationChecked, setConfirmationChecked] = useState(false);

  const [deleteScope, setDeleteScope] = useState<"class" | "all" | null>(null);

  const [selectedClass, setSelectedClass] = useState("");

  const canDelete =
    confirmationChecked &&
    deleteScope &&
    (deleteScope === "all" || selectedClass);

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Student Settings</h1>
      </div>

      {/* Admission Number Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Admission Number Configuration
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Prefix */}
            <div className="space-y-2">
              <Label>
                Admission Number Prefix{" "}
                <span className="text-destructive">*</span>
              </Label>

              <Input defaultValue="" placeholder="Enter Prefix" required />

              <p className="text-xs text-muted-foreground">Example: JH2026</p>
            </div>

            {/* Sequence */}
            <div className="space-y-2">
              <Label>
                Next Sequence Number <span className="text-destructive">*</span>
              </Label>

              <Input
                type="number"
                placeholder="Enter Sequence Number"
                defaultValue={""}
                min={1}
                required
              />

              <p className="text-xs text-muted-foreground">
                Example: 1 (will generate 0001)
              </p>
            </div>
          </div>

          <div className="mt-6 flex justify-start">
            <Button>Save Changes</Button>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-700 shadow-sm ">
        <CardHeader className="bg-red-700 rounded-t-lg">
          <CardTitle className="flex items-center gap-2  text-white">
            <AlertTriangle className="mt-0.5 h-6 w-6 " />
            Danger Zone: Bulk Delete Students
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6 pt-6">
          {/* Warning */}
          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="mt-1 text-sm text-red-700">
              <span className="font-bold text-red-600">Warning :</span> Deleting
              students here will permanently remove their records from the
              system. This includes their profiles, user accounts, fee ledgers,
              exam results, and attendance records.
              <span className="font-bold text-red-600">
                {" "}
                This action cannot be undone.
              </span>
            </p>
          </div>

          {/* Scope */}
          <div className="grid gap-3 md:grid-cols-2">
            <Button
              onClick={() => setDeleteScope("class")}
              className={`justify-start transition-all ${
                deleteScope === "class"
                  ? "bg-red-600 text-white hover:bg-red-700 border-red-600"
                  : "border border-red-200 bg-white text-red-700 hover:bg-red-50"
              }`}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Selected Class
            </Button>

            <Button
              onClick={() => setDeleteScope("all")}
              className={`justify-start transition-all ${
                deleteScope === "all"
                  ? "bg-red-600 text-white hover:bg-red-700 border-red-600"
                  : "border border-red-200 bg-white text-red-700 hover:bg-red-50"
              }`}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete ALL Students (Factory Reset)
            </Button>
          </div>

          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            {deleteScope === "class" ? (
              <>
                <h4 className="font-medium text-red-800">
                  Delete Selected Class
                </h4>
                <p className="mt-1 text-sm text-red-700">
                  All students belonging to the selected class will be
                  permanently deleted along with their fee records, attendance,
                  and results.
                </p>
              </>
            ) : deleteScope === "all" ? (
              <>
                <h4 className="font-medium text-red-800">
                  Factory Reset Warning
                </h4>
                <p className="mt-1 text-sm text-red-700">
                  This will remove ALL students from the school database. This
                  action cannot be undone.
                </p>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">
                Select a deletion scope to continue.
              </p>
            )}
          </div>

          {/* Class Selection */}
          {deleteScope === "class" && (
            <div className="space-y-2">
              <Label>
                Select Class to Delete{" "}
                <span className="text-destructive">*</span>
              </Label>

              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue placeholder="-- Select Class --" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="nursery">Nursery</SelectItem>

                  <SelectItem value="lkg">LKG</SelectItem>

                  <SelectItem value="ukg">UKG</SelectItem>

                  <SelectItem value="class-1">Class 1</SelectItem>

                  <SelectItem value="class-2">Class 2</SelectItem>

                  <SelectItem value="class-3">Class 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Confirmation */}
          <div className="flex items-start space-x-3 rounded-lg border p-4">
            <input
              type="checkbox"
              id="confirm-delete"
              checked={confirmationChecked}
              onChange={(e) => setConfirmationChecked(e.target.checked)}
              className="mt-0.5 h-4 w-4 cursor-pointer rounded border-slate-300 text-red-600 focus:ring-red-500"
            />

            <Label
              htmlFor="confirm-delete"
              className="cursor-pointer text-sm leading-relaxed"
            >
              {deleteScope === "all"
                ? "I understand that ALL student records will be permanently deleted and cannot be recovered."
                : "I understand that this action is permanent and cannot be undone."}
            </Label>
          </div>

          {/* Delete Action */}
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-start">
            <Button variant="destructive" disabled={!canDelete}>
              <Trash2 className="mr-2 h-4 w-4" />
              Proceed with Deletion
            </Button>

            <Button variant="outline">Cancel</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
