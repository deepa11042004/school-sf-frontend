"use client";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShieldCheck } from "lucide-react";
import {
  permissionGroups,
  type PermissionGroup,
} from "@/components/data/createRolesAndPermissions";
import Link from "next/link";
type PermissionState = Record<string, boolean>;

export default function CreateRolesAndPermissions() {
  const [roleName, setRoleName] = useState<string>("");
  const [permissions, setPermissions] = useState<PermissionState>({});

  const getPermissionKey = (
    groupName: string,
    moduleName: string,
    permission: string,
  ) => `${groupName}.${moduleName}.${permission}`;

  const getGroupPermissionKeys = (group: PermissionGroup): string[] =>
    group.modules.flatMap((module) =>
      module.permissions.map((permission) =>
        getPermissionKey(group.name, module.name, permission),
      ),
    );

  const togglePermission = (key: string) => {
    setPermissions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleGroup = (group: PermissionGroup) => {
    const keys = getGroupPermissionKeys(group);
    const allSelected = keys.every((key) => permissions[key]);
    const updates: PermissionState = {};
    keys.forEach((key) => {
      updates[key] = !allSelected;
    });
    setPermissions((prev) => ({ ...prev, ...updates }));
  };

  const toggleModule = (
    groupName: string,
    moduleName: string,
    modulePermissions: string[],
  ) => {
    const keys = modulePermissions.map((p) =>
      getPermissionKey(groupName, moduleName, p),
    );
    const allSelected = keys.every((key) => permissions[key]);
    const updates: PermissionState = {};
    keys.forEach((key) => {
      updates[key] = !allSelected;
    });
    setPermissions((prev) => ({ ...prev, ...updates }));
  };

  const totalSelected = Object.values(permissions).filter(Boolean).length;

  const handleReset = () => {
    setRoleName("");
    setPermissions({});
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Create Role</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Define a new role and assign the appropriate permissions.
        </p>
      </div>

      {/* Role Name */}
      <Card>
        <CardContent className="p-6">
          <div className="max-w-sm space-y-2">
            <Label htmlFor="role-name">
              Role Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="role-name"
              placeholder="e.g. Class Teacher, Accountant"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Permissions Heading */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Permissions</h2>
        {totalSelected > 0 && (
          <Badge variant="secondary">{totalSelected} selected</Badge>
        )}
      </div>

      {/* Permission Groups */}
      <div className="grid gap-4 lg:grid-cols-2">
        {permissionGroups.map((group) => {
          const groupKeys = getGroupPermissionKeys(group);
          const allGroupSelected = groupKeys.every((key) => permissions[key]);
          const someGroupSelected =
            !allGroupSelected && groupKeys.some((key) => permissions[key]);
          const groupSelectedCount = groupKeys.filter(
            (key) => permissions[key],
          ).length;

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
                          {groupSelectedCount}/{groupKeys.length} permissions
                        </p>
                      </div>
                    </div>

                    <div
                      className="flex items-center gap-2 text-sm"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        type="checkbox"
                        readOnly
                        className="h-4 w-4"
                        id={`group-${group.name}`}
                        checked={allGroupSelected}
                        onChange={() => toggleGroup(group)}
                      />
                      <Label
                        htmlFor={`group-${group.name}`}
                        className="cursor-pointer text-sm font-normal"
                      >
                        Select All
                      </Label>
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent>
                  <div className="border-t p-4 space-y-4">
                    {group.modules.map((module, moduleIndex) => {
                      const moduleKeys = module.permissions.map((p) =>
                        getPermissionKey(group.name, module.name, p),
                      );
                      const allModuleSelected = moduleKeys.every(
                        (key) => permissions[key],
                      );
                      const someModuleSelected =
                        !allModuleSelected &&
                        moduleKeys.some((key) => permissions[key]);

                      return (
                        <div key={module.name}>
                          {moduleIndex > 0 && <Separator className="mb-4" />}
                          <div className="rounded-lg border p-4">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-medium">{module.name}</h4>
                              {module.permissions.length > 1 && (
                                <div className="flex items-center gap-2">
                                  <input
                                    type="checkbox"
                                    readOnly
                                    className="h-4 w-4"
                                    id={`module-${group.name}-${module.name}`}
                                    checked={allGroupSelected}
                                    onChange={() =>
                                      toggleModule(
                                        group.name,
                                        module.name,
                                        module.permissions,
                                      )
                                    }
                                  />

                                  <Label
                                    htmlFor={`module-${group.name}-${module.name}`}
                                    className="cursor-pointer text-xs text-muted-foreground font-normal"
                                  >
                                    All
                                  </Label>
                                </div>
                              )}
                            </div>

                            <div className="grid gap-2 md:grid-cols-2">
                              {module.permissions.map((permission) => {
                                const key = getPermissionKey(
                                  group.name,
                                  module.name,
                                  permission,
                                );
                                const checked = permissions[key] ?? false;

                                return (
                                  <button
                                    key={key}
                                    type="button"
                                    onClick={() => togglePermission(key)}
                                    className={`flex items-center gap-3 rounded-lg border p-3 text-left transition-all
                                      ${
                                        checked
                                          ? "border-primary bg-primary/10"
                                          : "hover:bg-muted/50"
                                      }`}
                                  >
                                    <input
                                      type="checkbox"
                                      checked={checked}
                                      onClick={(e) => e.stopPropagation()}
                                      readOnly
                                      className="h-4 w-4"
                                    />

                                    <span className="text-sm">
                                      {permission}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          );
        })}
      </div>

      {/* Footer Action Card */}

      <Card>
        <CardContent className="flex flex-col gap-4 p-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-indigo-600" />

              <div>
                <h3 className="font-semibold">Roles & Permissions</h3>
                <p className="text-sm text-muted-foreground">
                  {totalSelected} permission{totalSelected !== 1 ? "s" : ""}{" "}
                  selected
                  {roleName && (
                    <>
                      {" "}
                      for{" "}
                      <span className="font-medium text-foreground">
                        {roleName}
                      </span>
                    </>
                  )}
                </p>
              </div>
            </div>

            {/* Delete Action */}
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-start">
              <Button type="submit" disabled={!roleName.trim()}>
                Save Role
              </Button>

              <Link href="/settings/roles">
                <Button variant="outline" type="button" onClick={handleReset}>
                  Cancel
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
