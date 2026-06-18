 
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  User,
  MapPinned ,
  Wallet ,
  Landmark ,
  Share2 ,
  CalendarClock 
} from "lucide-react";
import StffProfileDetailsTab from "./Tab/StffProfileDetailsTab";
import StaffAddressInfo from "./Tab/StaffAddressInfo";
import StaffPayrollInfo from "./Tab/StaffPayrollInfo";
import StaffLeavesInfo from "./Tab/StaffLeavesInfo";
import StaffBankDetail from "./Tab/StaffBankDetail";
import StaffSocialsInfo from "./Tab/StaffSocialsInfo";



const StaffDetails = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Edit Staff Details
        </h1>
      </div>

      <Tabs defaultValue="Personal Details" className="space-y-6">
        <TabsList className="grid h-auto w-full grid-cols-2 gap-2 p-2 md:grid-cols-6">
          <TabsTrigger value="Personal Details" className="gap-2">
            <User className="h-4 w-4" />
            <span>Personal Details</span>
          </TabsTrigger>

          <TabsTrigger value="Address" className="gap-2">
            <MapPinned  className="h-4 w-4" />
            <span>Address</span>
          </TabsTrigger>

          <TabsTrigger value="Payroll" className="gap-2">
            <Wallet  className="h-4 w-4" />
            <span>Payroll</span>
          </TabsTrigger>

          <TabsTrigger value="Leaves" className="gap-2">
            <CalendarClock className="h-4 w-4" />
            <span>Leaves</span>
          </TabsTrigger>

          <TabsTrigger value="Bank Detail" className="gap-2">
            <Landmark  className="h-4 w-4" />
            <span>Bank Details  </span>
          </TabsTrigger>

          <TabsTrigger value="Socials" className="gap-2">
            <Share2  className="h-4 w-4" />
            <span>Social Links</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="Personal Details">
            <StffProfileDetailsTab/>
        </TabsContent>

        <TabsContent value="Address">
            <StaffAddressInfo/> 
            
        </TabsContent>

        <TabsContent value="Payroll">
            <StaffPayrollInfo/>
            
        </TabsContent>

        <TabsContent value="Leaves">
            <StaffLeavesInfo/>
            
        </TabsContent>

        <TabsContent value="Bank Detail">
            <StaffBankDetail/>
            
        </TabsContent>

        <TabsContent value="Socials">

            <StaffSocialsInfo/>


            
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StaffDetails;
