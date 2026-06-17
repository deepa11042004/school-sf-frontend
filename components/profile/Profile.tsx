"use client";

import { Card } from "@/components/ui/card";
import UserId from "./UserCard";

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
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          My Profile
        </h1>
      </div>

      <Card>
        <UserId
          name="Alex"
          lastname="Watson"
          role="admin"
          status="active"
          avatarUrl="https://imgs.search.brave.com/TbJLUnWF6fkPvCmXPUcgwGGTvT5fuP2Fd8fuHrqPjQA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMucGV4ZWxzLmNv/bS9waG90b3MvMTUz/OTM1OTAvcGV4ZWxz/LXBob3RvLTE1Mzkz/NTkwL2ZyZWUtcGhv/dG8tb2YtcGhvdG8t/b2YtYS1zaGlydGxl/c3MtaGFuZHNvbWUt/bWFuLWFnYWluc3Qt/dGhlLXNreS5qcGVn/P2F1dG89Y29tcHJl/c3MmY3M9dGlueXNy/Z2ImZHByPTEmdz01/MDA"
          userId="USR-2024-0042"
        />
      </Card>
    </div>
  );
}
