 
"use client";

import {
  FileBadge,
  UserCheck,
  LogOut,
  ArrowRightLeft,
  BadgeCheck,
  Award,
  FileText,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const certificates = [
  {
    title: "Birth Certificate",
    icon: FileBadge,
  },
  {
    title: "Character Certificate",
    icon: UserCheck,
  },
  {
    title: "Leaving Certificate",
    icon: LogOut,
  },
  {
    title: "Transfer Certificate",
    icon: ArrowRightLeft,
  },
  {
    title: "Fees No Objection Certificate",
    icon: BadgeCheck,
  },
  {
    title: "Merit Certificate",
    icon: Award,
  },
  {
    title: "Admission Certificate",
    icon: FileText,
  },
];

export default function GenerateCertificates() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate Certificates</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid gap-4 grid-cols-2 ">
          {certificates.map((certificate) => {
            const Icon = certificate.icon;

            return (
              <div
                key={certificate.title}
                className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>

                  
                    <p className="font-medium">{certificate.title}</p>
                     
                </div>

                <Button size="sm">
                  Generate
                </Button>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}