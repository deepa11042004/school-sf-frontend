"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Search, IndianRupee, Filter } from "lucide-react";

export default function FeesInvoices() {
  const [searchTerm, setSearchTerm] = useState("");
  const [timeFilter, setTimeFilter] = useState("today");
  const [mode, setMode] = useState("all");
  const [collectedBy, setCollectedBy] = useState("all");
  const [status, setStatus] = useState("active");

  const [openFilterDialog, setOpenFilterDialog] = useState(false);

  const activeFilterCount =
    (timeFilter !== "today" ? 1 : 0) +
    (mode !== "all" ? 1 : 0) +
    (collectedBy !== "all" ? 1 : 0) +
    (status !== "all" ? 1 : 0);

  const hasActiveFilters = activeFilterCount > 0;

  const clearFilters = () => {
    setTimeFilter("today");
    setMode("all");
    setCollectedBy("all");
    setStatus("all");
  };

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Fees Invoices
        </h1>

        {/* Stats Card */}
        <Card className="shadow-sm border-l-4 border-l-indigo-600">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium  ">Total Collected Amount</p>
                <div className="flex items-baseline gap-1 mt-1">
                  <IndianRupee className="h-6 w-6  " />
                  <span className="text-3xl font-bold ">0.00</span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-indigo-50">
                <IndianRupee className="h-8 w-8 text-indigo-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* filter pop up  */}

        <Dialog open={openFilterDialog} onOpenChange={setOpenFilterDialog}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Filter Collections</DialogTitle>

              <DialogDescription>
                Apply filters to narrow down collection records.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2">
              {/* Time Filter */}
              <div className="space-y-2">
                <Label>Time Filter</Label>

                <Select value={timeFilter} onValueChange={setTimeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Time" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Payment Mode */}
              <div className="space-y-2">
                <Label>Payment Mode</Label>

                <Select value={mode} onValueChange={setMode}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Modes" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="all">All Modes</SelectItem>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="card">Card</SelectItem>
                    <SelectItem value="upi">UPI</SelectItem>
                    <SelectItem value="bank">Bank Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Collected By */}
              <div className="space-y-2">
                <Label>Collected By</Label>

                <Select value={collectedBy} onValueChange={setCollectedBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Users" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="accountant">Accountant</SelectItem>
                    <SelectItem value="receptionist">Receptionist</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Status */}
              <div className="space-y-2">
                <Label>Status</Label>

                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>

              <Button onClick={() => setOpenFilterDialog(false)}>
                Apply Filters
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* search Section */}
        <Card className="shadow-sm">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              {/* Search */}
              <div className="w-full lg:max-w-sm space-y-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <Input
                    type="text"
                    placeholder="Search Student/Receipt..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 focus-visible:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex w-full flex-col gap-2 sm:flex-row sm:justify-end lg:w-auto">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto"
                  onClick={() => setOpenFilterDialog(true)}
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                  {hasActiveFilters && (
                    <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
                      {activeFilterCount}
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
