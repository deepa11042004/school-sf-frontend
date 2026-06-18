"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const examinations = [
  {
    id: "fa1",
    name: "FA 1",
    className: "NC A",
    date: "18 Jun 2026",
    subjects: [
      {
        subject: "English (1)",
        max: 10,
        min: 3,
        obtained: 8,
        result: "Pass",
        grade: "A",
      },
      {
        subject: "Hindi (2)",
        max: 10,
        min: 3,
        obtained: "-",
        result: "-",
        grade: "F",
      },
      {
        subject: "Maths (4)",
        max: 10,
        min: 3,
        obtained: "-",
        result: "-",
        grade: "F",
      },
      {
        subject: "E.V.S (8)",
        max: 10,
        min: 3,
        obtained: 6,
        result: "Pass",
        grade: "C",
      },
    ],
    total: {
      max: 20,
      obtained: 14,
      percentage: "70.00%",
    },
  },
  {
    id: "fa2",
    name: "FA 2",
    className: "NC A",
    date: "18 Jun 2026",
    subjects: [],
  },
  {
    id: "sa1",
    name: "SA 1",
    className: "NC A",
    date: "18 Jun 2026",
    subjects: [],
  },
  {
    id: "fa3",
    name: "FA 3",
    className: "NC A",
    date: "18 Jun 2026",
    subjects: [],
  },
  {
    id: "fa4",
    name: "FA 4",
    className: "NC A",
    date: "18 Jun 2026",
    subjects: [],
  },
  {
    id: "sa2",
    name: "SA 2",
    className: "NC A",
    date: "18 Jun 2026",
    subjects: [],
  },
];

export default function ExaminationHistoryTab() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
  <CardTitle>Examination History</CardTitle>

  <Button variant="outline" size="sm">
    <FileText className="mr-2 h-4 w-4" />
    View Annual Report Card
  </Button>
</CardHeader>

      <CardContent>
        <Accordion type="single" collapsible className="space-y-4">
          {examinations.map((exam) => (
            <AccordionItem
              key={exam.id}
              value={exam.id}
              className="overflow-hidden rounded-lg border bg-card"
            >
              <AccordionTrigger className="px-5 py-4 hover:no-underline">
                <div className="flex w-full items-center justify-between text-left">
                  <div>
                    <h3 className="font-semibold text-base">
                      {exam.name} ({exam.className})
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      Examination
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-medium">{exam.date}</p>
                  </div>
                </div>
              </AccordionTrigger>

              <AccordionContent className="border-t">
                {exam.subjects.length > 0 ? (
                  <div className="overflow-x-auto p-4">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Subject</TableHead>
                          <TableHead>Max Marks</TableHead>
                          <TableHead>Min Marks</TableHead>
                          <TableHead>Obtained</TableHead>
                          <TableHead>Result</TableHead>
                          <TableHead>Grade</TableHead>
                        </TableRow>
                      </TableHeader>

                      <TableBody>
                        {exam.subjects.map((subject, index) => (
                          <TableRow key={index}>
                            <TableCell>{subject.subject}</TableCell>
                            <TableCell>{subject.max}</TableCell>
                            <TableCell>{subject.min}</TableCell>
                            <TableCell>{subject.obtained}</TableCell>
                            <TableCell>{subject.result}</TableCell>
                            <TableCell>{subject.grade}</TableCell>
                          </TableRow>
                        ))}

                        <TableRow className="bg-muted/40 font-semibold">
                          <TableCell>Total</TableCell>
                          <TableCell>{exam.total?.max}</TableCell>
                          <TableCell>-</TableCell>
                          <TableCell>{exam.total?.obtained}</TableCell>
                          <TableCell>{exam.total?.percentage}</TableCell>
                          <TableCell>-</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="p-6">
                    <div className="rounded-lg border border-dashed py-8 text-center text-sm text-muted-foreground">
                      Result not available yet.
                    </div>
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}