import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Bus, Home } from "lucide-react";

const SERVICES = [
  {
    id: "transport",
    icon: Bus,
    title: "Transport Service",
    description: "Enable to assign a bus route and stop for this student.",
  },
  {
    id: "hostel",
    icon: Home,
    title: "Hostel Accommodation",
    description: "Enable to assign a hostel room and bed.",
  },
] as const;

export function StepServices() {
  return (
    <div className="space-y-6 animate-in fade-in-0 slide-in-from-right-4 duration-300">
      <SectionHeading title="Transport & Hostel Services" />

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
        {SERVICES.map(({ id, icon: Icon, title, description }) => (
          <div
            key={id}
            className="flex items-start gap-4 rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900 p-4"
          >
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600">
              <Icon className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <Label htmlFor={id} className="font-medium text-sm cursor-pointer">
                {title}
              </Label>
              <p className="text-xs text-slate-400 mt-0.5">{description}</p>
            </div>
            <Switch id={id} className="shrink-0 mt-0.5" />
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionHeading({ title }: { title: string }) {
  return (
    <div className="border-b pb-2">
      <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50">{title}</h3>
    </div>
  );
}