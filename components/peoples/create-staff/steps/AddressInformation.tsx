"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AddressInformation = () => {
  return (
    <div className="space-y-6 animate-in fade-in-0 slide-in-from-right-4 duration-300">
      <div className="border-b pb-2 mb-4">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
          Permanent Address
        </h3>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2 md:col-span-2">
          <Label>Address Line 1</Label>
          <Input placeholder="Street address, P.O. box" />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label>Address Line 2</Label>
          <Input placeholder="Apartment, suite, unit, building, floor, etc." />
        </div>
        <div className="space-y-2">
          <Label>City</Label>
          <Input placeholder="City" />
        </div>
        <div className="space-y-2">
          <Label>State</Label>
          <Input placeholder="State" />
        </div>
        <div className="space-y-2">
          <Label>Postal Code</Label>
          <Input placeholder="Postal Code" />
        </div>
        <div className="space-y-2">
          <Label>Country</Label>
          <Input defaultValue="India" />
        </div>
      </div>

      <div className="border-b pb-2 mb-4 mt-8">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
          Current / Communication Address
        </h3>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2 md:col-span-2">
          <Label>Address Line 1</Label>
          <Input placeholder="Street address, P.O. box" />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label>Address Line 2</Label>
          <Input placeholder="Apartment, suite, unit, building, floor, etc." />
        </div>
        <div className="space-y-2">
          <Label>City</Label>
          <Input placeholder="City" />
        </div>
        <div className="space-y-2">
          <Label>State</Label>
          <Input placeholder="State" />
        </div>
        <div className="space-y-2">
          <Label>Postal Code</Label>
          <Input placeholder="Postal Code" />
        </div>
        <div className="space-y-2">
          <Label>Country</Label>
          <Input defaultValue="India" />
        </div>
      </div>
    </div>
  );
};

export default AddressInformation;
