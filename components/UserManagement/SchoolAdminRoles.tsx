"use client";

import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type PermissionGroup = {
  name: string;
  permissions: string[];
};

import { permissionGroups } from "@/components/data/school-admin-roles";

export default function SchoolAdminRoles() {
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const togglePermission = (permission: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((p) => p !== permission)
        : [...prev, permission],
    );
  };

  const allPermissions = permissionGroups.flatMap((group) => group.permissions);

  const allPermissionsSelected =
    selectedPermissions.length === allPermissions.length;

  const handleToggleAllPermissions = () => {
    if (allPermissionsSelected) {
      setSelectedPermissions([]);
    } else {
      setSelectedPermissions(allPermissions);
    }
  };

  const toggleGroup = (group: PermissionGroup) => {
    const groupPermissions = group.permissions;

    const allSelected = groupPermissions.every((permission) =>
      selectedPermissions.includes(permission),
    );

    if (allSelected) {
      setSelectedPermissions((prev) =>
        prev.filter((permission) => !groupPermissions.includes(permission)),
      );
    } else {
      setSelectedPermissions((prev) => [
        ...new Set([...prev, ...groupPermissions]),
      ]);
    }
  };

  const handleSubmit = () => {
    console.log("Selected Permissions:", selectedPermissions);

    // API Call Here
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">School Admin Roles & Permissions</h1>

        <p className="text-sm text-muted-foreground">
          Managing access modules for the Admin account seamlessly.
        </p>
      </div>

      {/* Permission Groups */}

      <div className="grid gap-4 lg:grid-cols-2">
        {permissionGroups.map((group) => {
          const allSelected = group.permissions.every((permission) =>
            selectedPermissions.includes(permission),
          );

          return (
            <Accordion
              key={group.name}
              type="single"
              collapsible
              className="w-full"
            >
              <AccordionItem
                value={group.name}
                className="overflow-hidden rounded-xl border bg-card"
              >
                <AccordionTrigger className="px-5 py-4 hover:no-underline">
                  <div className="flex w-full items-center justify-between pr-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-primary/10 p-2">
                        <ShieldCheck className="h-4 w-4 text-primary" />
                      </div>

                      <div className="text-left">
                        <h3 className="font-semibold">{group.name}</h3>

                        <p className="text-xs text-muted-foreground">
                          {group.permissions.length} permissions
                        </p>
                      </div>
                    </div>

                    <label
                      className="flex items-center gap-2 text-sm"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        type="checkbox"
                        checked={allSelected}
                        onChange={() => toggleGroup(group)}
                        className="h-4 w-4"
                      />
                      Select All
                    </label>
                  </div>
                </AccordionTrigger>

                <AccordionContent>
                  <div className="space-y-2 border-t p-4">
                    {group.permissions.map((permission) => {
                      const checked = selectedPermissions.includes(permission);

                      return (
                        <button
                          key={permission}
                          type="button"
                          onClick={() => togglePermission(permission)}
                          className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-all
                    ${
                      checked
                        ? "border-primary bg-primary/10"
                        : "hover:bg-muted/50"
                    }
                  `}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            readOnly
                            className="h-4 w-4"
                          />

                          <span className="text-sm">{permission}</span>
                        </button>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          );
        })}
      </div>

      <Card>
        <CardContent className="flex flex-col gap-4 p-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-indigo-600" />

              <div>
                <h3 className="font-semibold">Roles & Permissions</h3>

                <p className="text-sm text-muted-foreground">
                  {selectedPermissions.length} permissions selected.
                </p>
              </div>
            </div>

             {/* Delete Action */}
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-start">
              <Button
                type="submit"
                onClick={handleSubmit}
                disabled={selectedPermissions.length === 0}
              >
                Save Master Permissions
              </Button>

              <Button variant="outline">Cancel</Button>
            </div>

           
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
