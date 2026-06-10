"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Pencil, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
type Category = {
  id: number;
  groupKey: string;
  name: string;
  status: "Active" | "Inactive";
};

const initialCategories: Category[] = [
  // Visitor Purpose
  {
    id: 1,
    groupKey: "Visitor Purpose",
    name: "Admission Enquiry",
    status: "Active",
  },
  {
    id: 2,
    groupKey: "Visitor Purpose",
    name: "Fee Payment",
    status: "Active",
  },
  {
    id: 3,
    groupKey: "Visitor Purpose",
    name: "Meeting Staff",
    status: "Active",
  },
  {
    id: 4,
    groupKey: "Visitor Purpose",
    name: "Seminar/Workshop",
    status: "Active",
  },
  {
    id: 5,
    groupKey: "Visitor Purpose",
    name: "Vendor Visit",
    status: "Active",
  },
  {
    id: 6,
    groupKey: "Visitor Purpose",
    name: "Parent Visit",
    status: "Active",
  },

  // Call Purpose
  { id: 7, groupKey: "Call Purpose", name: "Admission", status: "Active" },
  {
    id: 8,
    groupKey: "Call Purpose",
    name: "Student Absence",
    status: "Active",
  },
  { id: 9, groupKey: "Call Purpose", name: "Fee Query", status: "Active" },
  {
    id: 10,
    groupKey: "Call Purpose",
    name: "Transport Query",
    status: "Active",
  },
  {
    id: 11,
    groupKey: "Call Purpose",
    name: "General Info",
    status: "Active",
  },
  { id: 12, groupKey: "Call Purpose", name: "Complaint", status: "Active" },

  // Call Type
  { id: 13, groupKey: "Call Type", name: "General", status: "Active" },
  { id: 14, groupKey: "Call Type", name: "Urgent", status: "Active" },
  { id: 15, groupKey: "Call Type", name: "Follow-up", status: "Active" },

  // Postal Type
  {
    id: 16,
    groupKey: "Postal Type",
    name: "Official Letter",
    status: "Active",
  },
  { id: 17, groupKey: "Postal Type", name: "Courier", status: "Active" },
  { id: 18, groupKey: "Postal Type", name: "Circular", status: "Active" },
  {
    id: 19,
    groupKey: "Postal Type",
    name: "Newspaper/Magazine",
    status: "Active",
  },

  // Enquiry Source
  { id: 20, groupKey: "Enquiry Source", name: "Walk-in", status: "Active" },
  { id: 21, groupKey: "Enquiry Source", name: "Phone", status: "Active" },
  { id: 22, groupKey: "Enquiry Source", name: "Website", status: "Active" },
  { id: 23, groupKey: "Enquiry Source", name: "Referral", status: "Active" },
  {
    id: 24,
    groupKey: "Enquiry Source",
    name: "Advertisement",
    status: "Active",
  },

  // Complaint Type
  {
    id: 25,
    groupKey: "Complaint Type",
    name: "Academic",
    status: "Active",
  },
  {
    id: 26,
    groupKey: "Complaint Type",
    name: "Infrastructure",
    status: "Active",
  },
  {
    id: 27,
    groupKey: "Complaint Type",
    name: "Behavioral",
    status: "Active",
  },
  {
    id: 28,
    groupKey: "Complaint Type",
    name: "Transport",
    status: "Active",
  },
];

export default function FrontOfficeSetup() {
  const [categories, setCategories] = useState(initialCategories);
  const [open, setOpen] = useState(false);
  const [groupKey, setGroupKey] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const groupedCategories = categories.reduce(
    (acc, category) => {
      if (!acc[category.groupKey]) {
        acc[category.groupKey] = [];
      }
      acc[category.groupKey].push(category);
      return acc;
    },
    {} as Record<string, Category[]>,
  );

  const handleAddCategory = () => {
    if (!groupKey || !categoryName) return;

    setCategories((prev) => [
      ...prev,
      {
        id: Date.now(),
        groupKey,
        name: categoryName,
        status: "Active",
      },
    ]);

    setCategoryName("");
    setDescription("");
  };
  const handleEdit = (category: Category) => {
    setEditingId(category.id);
    setGroupKey(category.groupKey);
    setCategoryName(category.name);
    setOpen(true);
  };

  const handleDelete = (id: number) => {
    setCategories((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6 p-6">
      {/* Breadcrumb */}
      <div>
        <h1 className="text-3xl font-bold">Front Office Setup</h1>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>
              {editingId ? "Edit Category" : "Create Category"}
            </SheetTitle>
          </SheetHeader>

          <div className="mt-6 space-y-4">
            <div>
              <Label className="mb-2 block text-sm font-medium">
                Group Key *
              </Label>

              <Select value={groupKey} onValueChange={setGroupKey}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Group Key" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="Visitor Purpose">
                    Visitor Purpose
                  </SelectItem>
                  <SelectItem value="Call Purpose">Call Purpose</SelectItem>
                  <SelectItem value="Call Type">Call Type</SelectItem>
                  <SelectItem value="Postal Type">Postal Type</SelectItem>
                  <SelectItem value="Enquiry Source">Enquiry Source</SelectItem>
                  <SelectItem value="Complaint Type">Complaint Type</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="mb-2 block text-sm font-medium">
                Category Name *
              </Label>

              <Input
                placeholder="e.g. Admission Enquiry"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </div>

            <div>
              <Label className="mb-2 block text-sm font-medium">
                Description
              </Label>

              <Textarea
                placeholder="Optional description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <Button
              className="w-full"
              onClick={() => {
                if (editingId) {
                  setCategories((prev) =>
                    prev.map((item) =>
                      item.id === editingId
                        ? {
                            ...item,
                            groupKey,
                            name: categoryName,
                          }
                        : item,
                    ),
                  );
                } else {
                  handleAddCategory();
                }

                setEditingId(null);
                setGroupKey("");
                setCategoryName("");
                setDescription("");
                setOpen(false);
              }}
            >
              {editingId ? "Update Category" : "Create Category"}
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Categories Master List</CardTitle>

          <Button
            onClick={() => {
              setEditingId(null);
              setGroupKey("");
              setCategoryName("");
              setDescription("");
              setOpen(true);
            }}
          >
            Create Category
          </Button>
        </CardHeader>
      </Card>

      <Accordion type="multiple" className="w-full">
        {Object.entries(groupedCategories).map(([groupName, items]) => (
          <AccordionItem key={groupName} value={groupName}>


            <AccordionTrigger className="rounded-lg border px-10 my-2 hover:no-underline hover:bg-zinc-300 dark:hover:bg-zinc-800">
              <div className="flex items-center justify-between w-full">
                <span className="font-semibold">{groupName}</span>
              </div>
            </AccordionTrigger>

            <AccordionContent>
              <div className="overflow-hidden rounded-md border">
                <div className="grid grid-cols-[1fr_120px_100px] border-b bg-muted/50 px-4 py-2 text-sm font-medium">
                  <div>Category Name</div>
                  <div>Status</div>
                  <div>Actions</div>
                </div>

                {items.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-[1fr_120px_100px] items-center border-b px-4 py-3 last:border-0"
                  >
                    <div>{item.name}</div>

                    <div>
                      <Badge variant="secondary">{item.status}</Badge>
                    </div>

                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(item)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
