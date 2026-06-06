"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Save, X, User } from "lucide-react";
import type { UserData } from "./Profile";

interface ProfileSettingsProps {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
}

export default function ProfileSettings({
  userData,
  setUserData,
}: ProfileSettingsProps) {
  const [isEditing, setIsEditing] = useState(false);
  // Local draft so edits don't reflect live until saved
  const [draft, setDraft] = useState<UserData>(userData);

  const handleSave = () => {
    setUserData(draft);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDraft(userData); // discard changes
    setIsEditing(false);
  };

  return (
    <>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile Information
          </CardTitle>

          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} size="sm">
              Edit Profile
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button onClick={handleSave} size="sm">
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button onClick={handleCancel} variant="outline" size="sm">
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Profile Picture */}
        <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <Avatar className="h-16 w-16">
            <AvatarImage src={userData.avatarUrl} alt="Profile" />
            <AvatarFallback>
              {userData.firstName[0]}
              {userData.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-medium text-gray-900 dark:text-white">
              Profile Photo
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              This will be displayed on your profile
            </p>
            {isEditing && (
              <Button
                variant="outline"
                size="sm"
                className="mt-2 bg-transparent"
              >
                <Camera className="h-4 w-4 mr-2" />
                Change Photo
              </Button>
            )}
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid gap-4 md:gap-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={draft.firstName}
                onChange={(e) =>
                  setDraft({ ...draft, firstName: e.target.value })
                }
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={draft.lastName}
                onChange={(e) =>
                  setDraft({ ...draft, lastName: e.target.value })
                }
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={draft.email}
                onChange={(e) => setDraft({ ...draft, email: e.target.value })}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={draft.phone}
                onChange={(e) => setDraft({ ...draft, phone: e.target.value })}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              value={draft.address}
              onChange={(e) => setDraft({ ...draft, address: e.target.value })}
              disabled={!isEditing}
              rows={3}
              placeholder="Enter your address..."
            />
          </div>
        </div>
      </CardContent>
    </>
  );
}