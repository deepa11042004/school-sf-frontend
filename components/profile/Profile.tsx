"use client";

import { KeyRound} from "lucide-react";
 
import UserId from "./UserCard";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
 

const permissionGroups = {
  Students: ["student.view", "staff.view"],

  Attendance: [
    "attendance.student.view",
    "attendance.student.report",
    "attendance.half_day.view",
    "attendance.staff.view",
    "attendance.staff.report",
    "attendance.mark",
    "attendance.report",
  ],

  Fees: [
    "fees.collect.view",
    "fees.payments.view",
    "fees.fee_heads.view",
    "fees.collect.pay",
    "fees.collect",
    "fees.manage_structure",
    "fees.report.view",
    "fees.reports.class_tuition",
    "fees.reports.transport_fees",
    "fees.reports.hostel_fees",
    "fees.reports.class_transport",
    "fees.reports.class_hostel",
  ],

  FrontOffice: [
    "frontoffice.visitors.view",
    "frontoffice.calls.view",
    "frontoffice.enquiries.view",
    "frontoffice.complaints.view",
    "frontoffice.categories.view",
    "frontoffice.categories.manage",
    "frontoffice.visitors.create",
    "frontoffice.visitors.update",
    "frontoffice.visitors.checkout",
    "frontoffice.calls.create",
    "frontoffice.postals.create",
    "frontoffice.enquiries.create",
    "frontoffice.enquiries.followup",
    "frontoffice.enquiries.close",
    "frontoffice.complaints.create",
    "frontoffice.complaints.resolve",
  ],

  Library: [
    "library.view",
    "library.books.view",
    "library.issues.view",
    "library.issue_return",
    "library.manage_books",
    "library.report",
  ],

  Transport: [
    "transport.view",
    "transport.routes.view",
    "transport.drivers.view",
    "transport.vehicles.view",
    "transport.manage_routes",
    "transport.manage_vehicles",
    "transport.assign_student",
  ],

  Hostel: ["hostel.view", "hostel.manage_rooms", "hostel.assign_student"],

  Inventory: [
    "inventory.dashboard.view",
    "inventory.stocks.view",
    "inventory.items.view",
    "inventory.categories.view",
    "inventory.vendors.view",
    "inventory.purchases.view",
    "inventory.sales.view",
    "inventory.sales.print",
  ],

  Communication: [
    "communication.logs.view",
    "communication.compose.view",
    "communication.create",
    "communication.send",
  ],

  Roles: ["roles.view", "role.view", "role.create", "role.edit", "role.delete"],
};

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  // UserId-only fields
  role: "admin" | "student" | "teacher";
  status: "active" | "inactive";
  avatarUrl: string;
  userId: string;
  department: string;
  joinDate: string;
}

export default function Profile() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          My Profile
        </h1>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <UserId
          name="Alex"
          lastname="Watson"
          role="admin"
          status="active"
          avatarUrl="https://imgs.search.brave.com/TbJLUnWF6fkPvCmXPUcgwGGTvT5fuP2Fd8fuHrqPjQA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMucGV4ZWxzLmNv/bS9waG90b3MvMTUz/OTM1OTAvcGV4ZWxz/LXBob3RvLTE1Mzkz/NTkwL2ZyZWUtcGhv/dG8tb2YtcGhvdG8t/b2YtYS1zaGlydGxl/c3MtaGFuZHNvbWUt/bWFuLWFnYWluc3Qt/dGhlLXNreS5qcGVn/P2F1dG89Y29tcHJl/c3MmY3M9dGlueXNy/Z2ImZHByPTEmdz01/MDA"
          userId="USR-2024-0042"
        />

        <div className="w-full lg:flex-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 ">
                <KeyRound className="h-5 w-5" />
                My Permissions
              </CardTitle>
            </CardHeader>

            <div className="grid gap-4 p-2">
              {Object.entries(permissionGroups).map(([group, permissions]) => {
                const filtered = permissions.filter((permission) =>
                  permission.toLowerCase(),
                );

                if (filtered.length === 0) return null;

                return (
                  <Card key={group}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{group}</span>

                        <Badge variant="secondary">{filtered.length}</Badge>
                      </CardTitle>
                    </CardHeader>

                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {filtered.map((permission) => (
                          <Badge
                            key={permission}
                            variant="outline"
                            className="font-mono"
                          >
                            {permission}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
