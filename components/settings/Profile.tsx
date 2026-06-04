"use client";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import ProfileSettings from "./profile-settings";
import UserId from "./UserId";
import { User, IdCardLanyard } from "lucide-react";

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
  const [userData, setUserData] = useState<UserData>({
    firstName: "Alex",
    lastName: "Watson",
    email: "alex.watson@example.com",
    phone: "+1 (555) 123-4567",
    address: "123, Education Lane, Knowledge City",
    // UserId-only fields (would come from API, not editable in ProfileSettings)
    role: "admin",
    status: "active",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",

    userId: "USR-2024-0042",
    department: "Computer Science",
    joinDate: "September 2024",
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          My Profile
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Update your personal information and profile details
        </p>
      </div>

      <Tabs defaultValue="user-id" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
          <TabsTrigger value="user-id" className="flex items-center gap-2">
            <IdCardLanyard className="h-4 w-4" />
            User Id
          </TabsTrigger>
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
        </TabsList>

        <TabsContent value="user-id">
          <Card>
            <UserId
              name={`${userData.firstName} ${userData.lastName}`}
              email={userData.email}
              phone={userData.phone}
              address={userData.address}
              role={userData.role}
              status={userData.status}
              avatarUrl={userData.avatarUrl}
              userId={userData.userId}
              department={userData.department}
              joinDate={userData.joinDate}
            />
          </Card>
        </TabsContent>

        <TabsContent value="profile">
          <Card>
            <ProfileSettings userData={userData} setUserData={setUserData} />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}