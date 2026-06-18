"use client";

import { IndianRupee, CheckCircle2, AlertCircle } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";

export default function StudentFeeDetails() {
  const feeDetails = [
    {
      feeHead: "Annual Fee",
      month: "April",
      due: 900,
      paid: 900,
      pending: 0,
      status: "Paid",
    },
    {
      feeHead: "Monthly",
      month: "April",
      due: 1500,
      paid: 1500,
      pending: 0,
      status: "Paid",
    },
    {
      feeHead: "Monthly",
      month: "May",
      due: 1500,
      paid: 1500,
      pending: 0,
      status: "Paid",
    },
    {
      feeHead: "Monthly",
      month: "June",
      due: 1500,
      paid: 1500,
      pending: 0,
      status: "Paid",
    },
    {
      feeHead: "Monthly",
      month: "July",
      due: 1500,
      paid: 0,
      pending: 1500,
      status: "Unpaid",
    },
    {
      feeHead: "Monthly",
      month: "August",
      due: 1500,
      paid: 0,
      pending: 1500,
      status: "Unpaid",
    },
    {
      feeHead: "Exam Fee",
      month: "August",
      due: 300,
      paid: 0,
      pending: 300,
      status: "Unpaid",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Total Due (Year)
                </p>
                <h2 className="text-2xl font-bold ">₹19,500</h2>
              </div>
              <IndianRupee className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Paid</p>
                <h2 className="text-2xl font-bold text-green-600">₹5,400</h2>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Outstanding</p>
                <h2 className="text-2xl font-bold text-red-600">₹14,100</h2>
              </div>
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fee Details */}
      <Card>
        <CardHeader>
          <CardTitle>Fee Details</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fee Head</TableHead>
                <TableHead>Month</TableHead>
                <TableHead>Due (₹)</TableHead>
                <TableHead>Paid (₹)</TableHead>
                <TableHead>Pending (₹)</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {feeDetails.map((item, index) => (
                <TableRow key={index}>
                  <TableCell
                    className={
                      item.feeHead === "Annual Fee"
                        ? "text-blue-600 font-bold"
                        : item.feeHead === "Exam Fee"
                          ? "text-yellow-600 font-bold"
                          : ""
                    }
                  >
                    {item.feeHead}
                  </TableCell>
                  <TableCell className={
                      item.feeHead === "Annual Fee"
                        ? "text-blue-600 font-bold"
                        : item.feeHead === "Exam Fee"
                          ? "text-yellow-600 font-bold"
                          : ""
                    }>{item.month}</TableCell>

                  <TableCell className={
                      item.feeHead === "Annual Fee"
                        ? "text-blue-600 font-bold"
                        : item.feeHead === "Exam Fee"
                          ? "text-yellow-600 font-bold"
                          : ""
                    }>₹{item.due.toLocaleString("en-IN")}</TableCell>

                 <TableCell className="text-center text-green-600 font-bold">
                    {item.paid ? `₹${item.paid.toLocaleString("en-IN")}` : "-"}
                  </TableCell>

                  <TableCell className="text-center text-red-600 font-bold">
                    {item.pending
                      ? `₹${item.pending.toLocaleString("en-IN")}`
                      : "-"}
                  </TableCell>

                  <TableCell>
                    {item.status === "Paid" ? (
                      <Badge className="bg-green-700 text-white ">Paid</Badge>
                    ) : (
                      <Badge
                        variant="destructive"
                        className="bg-red-700 text-white"
                      >
                        Unpaid
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}

              <TableRow className="font-bold bg-muted/40">
                <TableCell colSpan={2}>Grand Total</TableCell>

                <TableCell>₹19,500</TableCell>
                <TableCell>₹5,400</TableCell>
                <TableCell>₹14,100</TableCell>
                <TableCell />
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
