 
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileText, Eye, Pencil, Plus } from "lucide-react";

interface MiscFeeRecord {
  id: string;
  feeHeadName: string;
  studentsAssigned: number;
  studentsPaid: number;
  expectedCollection: number;
  receivedAmount: number;
  collectionPercentage: number;
}

// Currently empty as per the design prompt
const dummyFees: MiscFeeRecord[] = [];

export default function Miscellaneous() {
  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
      
           
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Miscellaneous Fees Dashboard
            </h1>

            <Link href='/fee/miscellaneous/create'>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">
              <Plus className="mr-2 h-4 w-4" />
              Assign New Fee
            </Button>
            </Link>
          </div>
        

        {/* Table Section */}
        <Card className="shadow-sm">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/10 hover:bg-slate-50/10">
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                      Fee Head Name
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3 text-center">
                      Students Assigned
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3 text-center">
                      Students Paid
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3 text-right">
                      Expected Collection
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3 text-right">
                      Received Amount
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3 text-center">
                      Collection %
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider text-right py-3">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dummyFees.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-64 text-center">
                        <div className="flex flex-col items-center justify-center gap-2 text-slate-400">
                          <div className="p-3 rounded-full bg-slate-100">
                            <FileText className="h-8 w-8 text-slate-400" />
                          </div>
                          <p className="text-sm font-medium text-slate-500">
                            No miscellaneous fees assigned yet.
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    dummyFees.map((fee) => (
                      <TableRow
                        key={fee.id}
                        className="border-b last:border-b-0 hover:bg-gray-300 dark:hover:bg-neutral-800 transition-colors"
                      >
                        <TableCell className="py-3 font-medium text-slate-900">
                          {fee.feeHeadName}
                        </TableCell>
                        <TableCell className="py-3 text-center text-slate-700">
                          {fee.studentsAssigned}
                        </TableCell>
                        <TableCell className="py-3 text-center text-slate-700">
                          {fee.studentsPaid}
                        </TableCell>
                        <TableCell className="py-3 text-right font-medium text-slate-900">
                          ₹{fee.expectedCollection.toLocaleString("en-IN")}
                        </TableCell>
                        <TableCell className="py-3 text-right font-medium text-slate-900">
                          ₹{fee.receivedAmount.toLocaleString("en-IN")}
                        </TableCell>
                        <TableCell className="py-3 text-center">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              fee.collectionPercentage >= 80
                                ? "bg-green-100 text-green-800"
                                : fee.collectionPercentage >= 50
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {fee.collectionPercentage}%
                          </span>
                        </TableCell>
                        <TableCell className="text-right py-3">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-slate-600 hover:bg-slate-50 hover:text-slate-700"
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}