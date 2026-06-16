 
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
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

export default function CreateItem() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [sku, setSku] = useState("");
  const [unit, setUnit] = useState("");
  const [type, setType] = useState("Consumable");
  const [reorderLevel, setReorderLevel] = useState("");
  const [defaultSaleRate, setDefaultSaleRate] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Active");

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header Section */}
        <div>
           
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Add Item
          </h1>
        </div>

        {/* Form Card */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Item Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Name */}
                <div className="space-y-2">
                  <Label>
                    Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    placeholder="Enter item name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="focus-visible:ring-indigo-500"
                  />
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label>
                    Category <span className="text-destructive">*</span>
                  </Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="focus-visible:ring-indigo-500">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="stationery">Stationery</SelectItem>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="furniture">Furniture</SelectItem>
                      <SelectItem value="cleaning">Cleaning Supplies</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* SKU */}
                <div className="space-y-2">
                  <Label>SKU</Label>
                  <Input
                    placeholder="Enter SKU"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    className="focus-visible:ring-indigo-500"
                  />
                </div>

                {/* Unit */}
                <div className="space-y-2">
                  <Label>
                    Unit <span className="text-destructive">*</span>
                  </Label>
                  <Select value={unit} onValueChange={setUnit}>
                    <SelectTrigger className="focus-visible:ring-indigo-500">
                      <SelectValue placeholder="Select Unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pieces">Pieces</SelectItem>
                      <SelectItem value="box">Box</SelectItem>
                      <SelectItem value="kg">Kg</SelectItem>
                      <SelectItem value="liters">Liters</SelectItem>
                      <SelectItem value="meters">Meters</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Type */}
                <div className="space-y-2">
                  <Label>
                    Type <span className="text-destructive">*</span>
                  </Label>
                  <Select value={type} onValueChange={setType}>
                    <SelectTrigger className="focus-visible:ring-indigo-500">
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Consumable">Consumable</SelectItem>
                      <SelectItem value="Non-Consumable">Non-Consumable</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Reorder Level */}
                <div className="space-y-2">
                  <Label>Reorder Level</Label>
                  <Input
                    type="number"
                    placeholder="Enter reorder level"
                    value={reorderLevel}
                    onChange={(e) => setReorderLevel(e.target.value)}
                    className="focus-visible:ring-indigo-500"
                  />
                </div>

                {/* Default Sale Rate */}
                <div className="space-y-2">
                  <Label>Default Sale Rate</Label>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="Enter default sale rate"
                    value={defaultSaleRate}
                    onChange={(e) => setDefaultSaleRate(e.target.value)}
                    className="focus-visible:ring-indigo-500"
                  />
                </div>

                {/* Status */}
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger className="focus-visible:ring-indigo-500">
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  placeholder="Enter item description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[100px] focus-visible:ring-indigo-500"
                />
              </div>

              {/* Footer Actions */}
              <div className="flex flex-wrap gap-3 justify-start pt-4 border-t">
                
                <Button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
                >
                  Save Changes
                </Button>

                <Link href="/inventory/items">
                 <Button type="button" variant="outline">
                  Cancel
                </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}