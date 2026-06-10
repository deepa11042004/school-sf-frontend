"use client";

import Image from "next/image";
import {
  Shield,
  User,
  CheckCircle2,
  XCircle,
  Mail,
  Phone,
  Hash,
  GraduationCap,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

export type UserRole = "admin" | "student" | "teacher";
export type UserStatus = "active" | "inactive";

interface UserIdProps {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  role: UserRole;
  status: UserStatus;
  avatarUrl: string;
  userId?: string;
  department?: string;
  joinDate?: string;
}

const getRoleConfig = (role: UserRole) => {
  switch (role) {
    case "admin":
      return {
        label: "Administrator",
        icon: Shield,
        text: "text-rose-600 dark:text-rose-400",
        topGradient: "from-rose-500 via-pink-500 to-red-500",
        ringColor: "ring-rose-500/20",
        glowBg: "bg-rose-500",
        iconAccent: "text-rose-500 dark:text-rose-400",
      };
    case "teacher":
      return {
        label: "Teacher",
        icon: GraduationCap,
        text: "text-violet-600 dark:text-violet-400",
        topGradient: "from-violet-500 via-purple-500 to-indigo-500",
        ringColor: "ring-violet-500/20",
        glowBg: "bg-violet-500",
        iconAccent: "text-violet-500 dark:text-violet-400",
      };
    case "student":
    default:
      return {
        label: "Student",
        icon: User,
        text: "text-blue-600 dark:text-blue-400",
        topGradient: "from-blue-500 via-cyan-500 to-teal-500",
        ringColor: "ring-blue-500/20",
        glowBg: "bg-blue-500",
        iconAccent: "text-blue-500 dark:text-blue-400",
      };
  }
};

const getStatusConfig = (status: UserStatus) => {
  switch (status) {
    case "active":
      return {
        label: "Active",
        icon: CheckCircle2,
        dot: "bg-emerald-500",
        pulse: true,
      };
    case "inactive":
    default:
      return {
        label: "Inactive",
        icon: XCircle,
        dot: "bg-slate-400",
        pulse: false,
      };
  }
};

interface InfoChipProps {
  icon: LucideIcon;
  label: string;
  value?: string;
  accent?: string;
}

function InfoChip({
  icon: Icon,
  label,
  value,
  accent = "text-slate-500 dark:text-slate-400",
}: InfoChipProps) {
  if (!value) return null;

  return (
    <div className="group/chip flex items-center gap-3 px-3.5 py-2.5 rounded-2xl bg-slate-50/50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/80">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700">
        {/* Fixed Icon rendering and applied dynamic accent color handling */}
        <Icon className={`h-5 w-5 stroke-[2.5] text-red-500`} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          {label}
        </p>
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">
          {value}
        </p>
      </div>
    </div>
  );
}

export default function UserId({
  name,
  email,
  phone,
  role,
  status,
  avatarUrl,
  userId = "USR-2026-0042",
}: UserIdProps) {
  const roleConfig = getRoleConfig(role);
  const statusConfig = getStatusConfig(status);
  const RoleIcon = roleConfig.icon;
  const StatusIcon = statusConfig.icon;

  return (
    <Card className="group relative w-full max-w-sm mx-auto overflow-hidden rounded-[32px] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-100 dark:shadow-slate-950 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-200/80 dark:hover:shadow-slate-950/80">
      {/* ── TOP BANNER ── */}
      <CardHeader className="p-0 relative h-32 bg-gradient-to-br overflow-hidden">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${roleConfig.topGradient}`}
        />

        {/* Abstract SVGs for visual depth */}
        <div
          className="absolute inset-0 opacity-15 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "120px",
          }}
        />
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-xl transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute -left-6 -bottom-10 h-24 w-24 rounded-full bg-white/10 blur-lg" />

        {/* Badges container */}
        <div className="absolute inset-x-4 top-4 flex items-center justify-between z-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold text-white uppercase tracking-widest border border-white/20 shadow-sm">
            <StatusIcon className="h-3 w-3" />
            {statusConfig.label}
          </span>
        </div>
      </CardHeader>

      {/* ── PROFILE AVATAR BLOCK ── */}
      <div className="relative flex justify-center -mt-14 z-20">
        <div className="relative">
          {/* Animated Halo Ambient Ring */}
          <div
            className={`absolute inset-0 rounded-full ${roleConfig.glowBg} opacity-20 blur-xl transition-all duration-300 group-hover:scale-125 group-hover:opacity-30`}
          />

          <div
            className={`relative h-24 w-24 rounded-full p-1 bg-gradient-to-b from-white to-slate-100 dark:from-slate-800 dark:to-slate-900 shadow-xl ring-4 ${roleConfig.ringColor} transition-transform duration-300 group-hover:scale-105`}
          >
            <div className="h-full w-full rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800">
              <Image
                src={avatarUrl}
                alt={`${name}'s Profile`}
                width={96}
                height={96}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                priority
              />
            </div>
          </div>

          {/* Status Indicator Badge */}
          <span
            className={`absolute bottom-0.5 right-0.5 flex h-5 w-5 items-center justify-center rounded-full border-4 border-white dark:border-slate-900 ${statusConfig.dot} shadow-md`}
          >
            {statusConfig.pulse && (
              <span
                className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${statusConfig.dot}`}
              />
            )}
          </span>
        </div>
      </div>

      {/* ── USER DETAILS ── */}
      <CardContent className="px-6 pt-4 pb-6 text-center">
        <h2 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight leading-tight">
          {name}
        </h2>

        <p
          className={`mt-1 flex items-center justify-center gap-1.5 text-sm font-medium ${roleConfig.text}`}
        >
          <RoleIcon className="h-4 w-4" />
          <span>{roleConfig.label}</span>
        </p>

        {/* Dynamic geometric horizontal divider rule */}
        <div className="mt-5 flex items-center justify-center gap-3">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-slate-200 dark:to-slate-800" />
          <div
            className={`h-1.5 w-1.5 rounded-full ${roleConfig.glowBg} opacity-40`}
          />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-slate-200 dark:to-slate-800" />
        </div>

        {/* Informational Data Grid Layout */}
        <div className="mt-5 grid gap-2 text-left">
          <InfoChip
            icon={Hash}
            label="User ID"
            value={userId}
            accent={roleConfig.iconAccent}
          />
          <InfoChip
            icon={Mail}
            label="Email"
            value={email}
            accent={roleConfig.iconAccent}
          />
          <InfoChip
            icon={Phone}
            label="Contact"
            value={phone}
            accent={roleConfig.iconAccent}
          />
        </div>
      </CardContent>
    </Card>
  );
}
