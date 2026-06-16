"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CalendarIcon, Upload, FileText, Plus, Trash2 } from "lucide-react";
import { format } from "date-fns";

interface PurchaseItem {
  id: string;
  itemId: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export default function CreatePurchases() {
  const [date, setDate] = useState<Date>(new Date(2026, 5, 16)); // June 16, 2026
  const [vendor, setVendor] = useState("");
  const [note, setNote] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [items, setItems] = useState<PurchaseItem[]>([
    { id: "1", itemId: "", quantity: 0, unitPrice: 0, total: 0 },
  ]);

  const handleItemChange = (
    id: string,
    field: keyof PurchaseItem,
    value: string | number,
  ) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          if (field === "quantity" || field === "unitPrice") {
            updatedItem.total =
              Number(updatedItem.quantity) * Number(updatedItem.unitPrice);
          }
          return updatedItem;
        }
        return item;
      }),
    );
  };

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        itemId: "",
        quantity: 0,
        unitPrice: 0,
        total: 0,
      },
    ]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const grandTotal = items.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header Section */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Create Purchase
          </h1>
        </div>

        {/* General Info Card */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>General Info</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Purchase No */}
                <div className="space-y-2">
                  <Label>
                    Purchase No <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    placeholder="Enter  Purchase No "
                    className="focus-visible:ring-indigo-500"
                  />
                </div>

                {/* Date */}
                <div className="space-y-2">
                  <Label>
                    Date <span className="text-destructive">*</span>
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal focus-visible:ring-indigo-500"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 text-slate-500" />
                        {date ? format(date, "MM/dd/yyyy") : "mm/dd/yyyy"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(newDate) => newDate && setDate(newDate)}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Vendor */}
                <div className="space-y-2">
                  <Label>
                    Vendor <span className="text-destructive">*</span>
                  </Label>
                  <Select value={vendor} onValueChange={setVendor}>
                    <SelectTrigger className="focus-visible:ring-indigo-500">
                      <SelectValue placeholder="Select Vendor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vendor1">ABC Suppliers</SelectItem>
                      <SelectItem value="vendor2">XYZ Enterprises</SelectItem>
                      <SelectItem value="vendor3">Global Traders</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Note */}
              <div className="space-y-2">
                <Label>Note</Label>
                <Textarea
                  placeholder="Enter any additional notes..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="min-h-[100px] focus-visible:ring-indigo-500"
                />
              </div>

              {/* Attach Invoice */}
              <div className="space-y-2">
                <Label>Attach Invoice</Label>
                <label
                  htmlFor="invoice-upload"
                  className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 p-8 transition hover:border-primary/50 hover:bg-muted/30"
                >
                  <Upload className="mb-3 h-8 w-8 text-muted-foreground" />
                  <p className="font-medium">
                    {file ? "Change file" : "Click to upload or drag and drop"}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {file ? file.name : "No file chosen"}
                  </p>
                  <input
                    id="invoice-upload"
                    type="file"
                    className="hidden"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                  />
                </label>
                {file && (
                  <div className="flex items-center gap-3 rounded-lg border bg-muted/40 p-3 mt-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(file.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setFile(null)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      Remove
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Items Card */}
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Items</CardTitle>

            <Button
              type="button"
              size="sm"
              onClick={addItem}
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/10 hover:bg-slate-50/10">
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                      Item <span className="text-destructive">*</span>
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                      Quantity <span className="text-destructive">*</span>
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                      Unit Price <span className="text-destructive">*</span>
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                      Total
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider text-right py-3">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="py-3">
                        <Select
                          value={item.itemId}
                          onValueChange={(value) =>
                            handleItemChange(item.id, "itemId", value)
                          }
                        >
                          <SelectTrigger className="w-full focus-visible:ring-indigo-500">
                            <SelectValue placeholder="Select Item" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="item1">Office Chairs</SelectItem>
                            <SelectItem value="item2">
                              A4 Paper Reams
                            </SelectItem>
                            <SelectItem value="item3">
                              Whiteboard Markers
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="py-3">
                        <Input
                          type="number"
                          min="0"
                          step="1"
                          value={item.quantity || ""}
                          onChange={(e) =>
                            handleItemChange(
                              item.id,
                              "quantity",
                              Number(e.target.value),
                            )
                          }
                          className="w-24 focus-visible:ring-indigo-500"
                        />
                      </TableCell>
                      <TableCell className="py-3">
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.unitPrice || ""}
                          onChange={(e) =>
                            handleItemChange(
                              item.id,
                              "unitPrice",
                              Number(e.target.value),
                            )
                          }
                          className="w-32 focus-visible:ring-indigo-500"
                        />
                      </TableCell>
                      <TableCell className="py-3 font-medium">
                        {item.total.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right py-3">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          disabled={items.length === 1}
                          className="text-red-600 hover:bg-zinc-800 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Grand Total */}
            <div className="mt-6 border-t pt-4">
              <div className="ml-auto w-full   rounded-lg bg-muted/40 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Total Items
                  </span>
                  <span className="font-medium">{items.length}</span>
                </div>

                <div className="mt-3 flex items-center justify-between border-t pt-3">
                  <span className="text-lg font-semibold">Grand Total</span>
                  <span className="text-2xl font-bold text-indigo-600">
                    ₹{grandTotal.toFixed(2)}
                  </span>
                </div>
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
            Save Purchase
          </Button>

          <Link href="/inventory/purchases">
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
