"use client";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { FileText, SquarePen } from "lucide-react";
import { Button } from "@/components/ui/button";
import UserId from "@/components/profile/UserCard";
import BasicInfo from "./Tabs/BasicInfo";
import ParentsGuardiansTab from "@/components/peoples/student-profile/Tabs/ParentsGuardiansTab";
import AcademicTab from "@/components/peoples/student-profile/Tabs/AcademicTab";
import DocumentTab from "@/components/peoples/student-profile/Tabs/DocumentTab";
import ServicesTab from "@/components/peoples/student-profile/Tabs/ServicesTab";
import GenerateCertificatesTab from "@/components/peoples/student-profile/Tabs/GenerateCertificatesTab";
import StudentFeeDetails from "@/components/peoples/student-profile/Tabs/StudentFeeDetails";
import ExaminationHistoryTab from "@/components/peoples/student-profile/Tabs/ExaminationHistoryTab";
import AttendanceTab from "@/components/peoples/student-profile/Tabs/AttendanceTab";
export default function StudentProfile() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Student Details
        </h1>

        <div className="flex gap-3">
          <Button
            variant="outline"
            className="hover:bg-gray-300 dark:hover:bg-neutral-900 border border-black/20 dark:border-white/20"
          >
            <FileText className="mr-2 h-4 w-4" />
            Report Card
          </Button>

          <Link href={`/peoples/students/1/edit`}>
         
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">
            <SquarePen className="mr-2 h-4 w-4" />
            Edit Student
          </Button>
           </Link>
        </div>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <UserId
          name="AADESH KUMAR"
          lastname="YADAV"
          class_Name="NC A"
          admissionNo='1387'
          role="student"
          status="active"
          avatarUrl="https://imgs.search.brave.com/TbJLUnWF6fkPvCmXPUcgwGGTvT5fuP2Fd8fuHrqPjQA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMucGV4ZWxzLmNv/bS9waG90b3MvMTUz/OTM1OTAvcGV4ZWxz/LXBob3RvLTE1Mzkz/NTkwL2ZyZWUtcGhv/dG8tb2YtcGhvdG8t/b2YtYS1zaGlydGxl/c3MtaGFuZHNvbWUt/bWFuLWFnYWluc3Qt/dGhlLXNreS5qcGVn/P2F1dG89Y29tcHJl/c3MmY3M9dGlueXNy/Z2ImZHByPTEmdz01/MDA"
          userId="STD0018"
        />

        <div className="w-full lg:flex-1">
          <Tabs defaultValue="basic" className="space-y-6">
            <TabsList className="grid h-auto w-full grid-cols-2 gap-2 md:grid-cols-5 p-2">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="parents">Parents </TabsTrigger>
              <TabsTrigger value="academic">Academic</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>

              <TabsTrigger value="certificates">Certificates</TabsTrigger>
              <TabsTrigger value="examinations">Examinations</TabsTrigger>
              <TabsTrigger value="attendance">Attendance</TabsTrigger>
              <TabsTrigger value="fees">Fees</TabsTrigger>
            </TabsList>

            <TabsContent value="basic">
              <BasicInfo />
            </TabsContent>

            <TabsContent value="parents">
              <ParentsGuardiansTab />
            </TabsContent>

            <TabsContent value="academic">
              <AcademicTab />
            </TabsContent>

            <TabsContent value="documents">
              <DocumentTab />
            </TabsContent>

            <TabsContent value="services">
              <ServicesTab />
            </TabsContent>

            <TabsContent value="certificates">
              <GenerateCertificatesTab />
            </TabsContent>

            <TabsContent value="examinations">
              <ExaminationHistoryTab />
            </TabsContent>

            <TabsContent value="attendance">
              <AttendanceTab />
            </TabsContent>

            <TabsContent value="fees">
              <StudentFeeDetails />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
