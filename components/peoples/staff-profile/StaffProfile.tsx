import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { FileText, SquarePen } from "lucide-react";
import { Button } from "@/components/ui/button";
import UserId from "@/components/profile/UserCard";
import PersonalInfo from "./Tab/PersonalInfo";
import AddressTab from "./Tab/AddressTab";
import PayrollLeaveTab from "./Tab/PayrollLeaveTab"
import BankInfoTab from "./Tab/BankInfoTab";
import SocialInfo from "./Tab/SocialInfo";



export default function StaffProfile() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Staff Details
        </h1>

        <div className="flex gap-3">
          <Button
            variant="outline"
            className="hover:bg-gray-300 dark:hover:bg-neutral-900 border border-black/20 dark:border-white/20"
          >
            <FileText className="mr-2 h-4 w-4" />
            Report Card
          </Button>

          <Link href={`/peoples/staff/1/edit`}>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">
              <SquarePen className="mr-2 h-4 w-4" />
              Edit Staff
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <UserId
          name="AJAY"
          role="teacher"
          status="active"
          avatarUrl="https://imgs.search.brave.com/TbJLUnWF6fkPvCmXPUcgwGGTvT5fuP2Fd8fuHrqPjQA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMucGV4ZWxzLmNv/bS9waG90b3MvMTUz/OTM1OTAvcGV4ZWxz/LXBob3RvLTE1Mzkz/NTkwL2ZyZWUtcGhv/dG8tb2YtcGhvdG8t/b2YtYS1zaGlydGxl/c3MtaGFuZHNvbWUt/bWFuLWFnYWluc3Qt/dGhlLXNreS5qcGVn/P2F1dG89Y29tcHJl/c3MmY3M9dGlueXNy/Z2ImZHByPTEmdz01/MDA"
          userId="STD0018"
        />

        <div className="w-full lg:flex-1">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid h-auto w-full grid-cols-5 gap-2  p-2">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>

              <TabsTrigger value="address">Addresses</TabsTrigger>

              <TabsTrigger value="payroll">Payroll & Leave</TabsTrigger>

              <TabsTrigger value="bank">Bank Details</TabsTrigger>

              <TabsTrigger value="social">Social Links</TabsTrigger>
            </TabsList>

            <TabsContent value="personal">
              <PersonalInfo />
            </TabsContent>

            <TabsContent value="address">
                <AddressTab/>
            </TabsContent>

            <TabsContent value="payroll">
                <PayrollLeaveTab/>
            </TabsContent>

            <TabsContent value="bank">

                <BankInfoTab/>
            </TabsContent>

            <TabsContent value="social">

                <SocialInfo/>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
