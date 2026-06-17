"use client";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { FileText, SquarePen } from "lucide-react";
import { Button } from "@/components/ui/button";
import UserId from "@/components/profile/UserCard";
import BasicInfo from "./Tabs/BasicInfo";
import ParentsGuardiansTab from "@/components/peoples/student-profile/Tabs/ParentsGuardiansTab"
import AcademicTab from "@/components/peoples/student-profile/Tabs/AcademicTab"
import DocumentTab from "@/components/peoples/student-profile/Tabs/DocumentTab"
import ServicesTab from "@/components/peoples/student-profile/Tabs/ServicesTab"
export default function StudentProfile() {
  

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Full Name
        </h1>

        <div className="flex gap-3">
          <Button
            variant="outline"
            className="hover:bg-gray-300 dark:hover:bg-neutral-900 border border-black/20 dark:border-white/20"
          >
            <FileText className="mr-2 h-4 w-4" />
            Report Card
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">
            <SquarePen className="mr-2 h-4 w-4" />
            Edit Student
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <UserId
          name="AADESH KUMAR"
          lastname="YADAV"
          class_Name="NC A"
          admissionNo={1387}           
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
               <Card className="p-2"><BasicInfo/></Card>
                
              
            </TabsContent>

            <TabsContent value="parents">
              <Card ><ParentsGuardiansTab/></Card>
            </TabsContent>

            
             <TabsContent value="academic">
              <Card ><AcademicTab/></Card>
            </TabsContent>


             <TabsContent value="documents">
              <Card  ><DocumentTab/></Card>
            </TabsContent>


             <TabsContent value="services">
              <Card ><ServicesTab/></Card>
            </TabsContent>


               <TabsContent value="certificates">
              <Card className="p-6">certificates</Card>
            </TabsContent>


            <TabsContent value="examinations">
              <Card className="p-6">examinations</Card>
            </TabsContent>

            <TabsContent value="attendance">
              <Card className="p-6">attendance</Card>
            </TabsContent>

            <TabsContent value="fees">
              <Card className="p-6">fees</Card>
            </TabsContent>

          </Tabs>
        </div>
      </div>
    </div>
  );
}
