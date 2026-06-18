import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  User,
  Users,
  ArrowRightLeft,
  UserRoundPlus,
  Bus,
  Building2,
} from "lucide-react";
import StudentProfileDetailsTab from "@/components/peoples/student-edit-details/Tabs/StudentProfileDetailsTab"
import ParentsProfileTab from "@/components/peoples/student-edit-details/Tabs/ParentsProfileTab"
import ChangeClassTab from "@/components/peoples/student-edit-details/Tabs/ChangeClassTab"
import SiblingInformationTab from "@/components/peoples/student-edit-details/Tabs/SiblingInformationTab"
import TransportInformationTab from "@/components/peoples/student-edit-details/Tabs/TransportInformationTab" 
import HostelInformationTab from "@/components/peoples/student-edit-details/Tabs/HostelInformationTab";

const StudentDetails = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Edit Student Details
        </h1>
      </div>

      <Tabs defaultValue="Personal Details" className="space-y-6">
        <TabsList className="grid h-auto w-full grid-cols-2 gap-2 p-2 md:grid-cols-6">
          <TabsTrigger value="Personal Details" className="gap-2">
            <User className="h-4 w-4" />
            <span>Personal Details</span>
          </TabsTrigger>

          <TabsTrigger value="parents" className="gap-2">
            <Users className="h-4 w-4" />
            <span>Parents</span>
          </TabsTrigger>

          <TabsTrigger value="Change Class" className="gap-2">
            <ArrowRightLeft className="h-4 w-4" />
            <span>Change Class</span>
          </TabsTrigger>

          <TabsTrigger value="Sibling" className="gap-2">
            <UserRoundPlus className="h-4 w-4" />
            <span>Sibling</span>
          </TabsTrigger>

          <TabsTrigger value="Transport" className="gap-2">
            <Bus className="h-4 w-4" />
            <span>Transport</span>
          </TabsTrigger>

          <TabsTrigger value="Hostel" className="gap-2">
            <Building2 className="h-4 w-4" />
            <span>Hostel</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="Personal Details">
            <StudentProfileDetailsTab/>
        </TabsContent>

        <TabsContent value="parents">
            <ParentsProfileTab/>
        </TabsContent>

        <TabsContent value="Change Class">
            <ChangeClassTab/>
        </TabsContent>

        <TabsContent value="Sibling">
            <SiblingInformationTab/>
        </TabsContent>

        <TabsContent value="Transport">
            <TransportInformationTab/>
        </TabsContent>

        <TabsContent value="Hostel">
            <HostelInformationTab/>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentDetails;
