import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { FormState } from "@/components/peoples/create-student/types";

interface Props {
  data: FormState;
  onChange: <K extends keyof FormState>(key: K, value: FormState[K]) => void;
}

export function StepPersonal({ data, onChange }: Props) {
  return (
    <div className="space-y-6 animate-in fade-in-0 slide-in-from-right-4 duration-300">
      <SectionHeading title="Personal Information" />

      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="Aadhar Number">
          <Input
            placeholder="XXXX-XXXX-XXXX"
            value={data.aadharNo}
            onChange={(e) => onChange("aadharNo", e.target.value)}
          />
        </Field>

        <Field label="PEN Number">
          <Input
            value={data.penNumber}
            onChange={(e) => onChange("penNumber", e.target.value)}
          />
        </Field>

        <Field label="First Name" required>
          <Input
            value={data.firstName}
            onChange={(e) => onChange("firstName", e.target.value)}
          />
        </Field>

        <Field label="Last Name">
          <Input
            value={data.lastName}
            onChange={(e) => onChange("lastName", e.target.value)}
          />
        </Field>

        <Field label="Gender" required>
          <Select value={data.gender} onValueChange={(v) => onChange("gender", v)}>
            <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </Field>

        <Field label="Date of Birth" required>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4 text-slate-400 shrink-0" />
                {data.dob ? format(data.dob, "dd MMM yyyy") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={data.dob}
                onSelect={(d) => onChange("dob", d)}
                captionLayout="dropdown-buttons"
                fromYear={1990}
                toYear={new Date().getFullYear()}
              />
            </PopoverContent>
          </Popover>
        </Field>

        <Field label="Blood Group">
          <Select value={data.bloodGroup} onValueChange={(v) => onChange("bloodGroup", v)}>
            <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
            <SelectContent>
              {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((bg) => (
                <SelectItem key={bg} value={bg}>{bg}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field label="House">
          <Select value={data.house} onValueChange={(v) => onChange("house", v)}>
            <SelectTrigger><SelectValue placeholder="Select House" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="red">Red House</SelectItem>
              <SelectItem value="blue">Blue House</SelectItem>
              <SelectItem value="green">Green House</SelectItem>
              <SelectItem value="yellow">Yellow House</SelectItem>
            </SelectContent>
          </Select>
        </Field>

        <Field label="Additional Activity">
          <Select value={data.activity} onValueChange={(v) => onChange("activity", v)}>
            <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="None">None</SelectItem>
              <SelectItem value="sports">Sports</SelectItem>
              <SelectItem value="music">Music</SelectItem>
              <SelectItem value="dance">Dance</SelectItem>
            </SelectContent>
          </Select>
        </Field>

        <Field label="Religion">
          <Select value={data.religion} onValueChange={(v) => onChange("religion", v)}>
            <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="hindu">Hindu</SelectItem>
              <SelectItem value="muslim">Muslim</SelectItem>
              <SelectItem value="christian">Christian</SelectItem>
              <SelectItem value="sikh">Sikh</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </Field>

        <Field label="Category">
          <Select value={data.category} onValueChange={(v) => onChange("category", v)}>
            <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="general">General</SelectItem>
              <SelectItem value="obc">OBC</SelectItem>
              <SelectItem value="sc">SC</SelectItem>
              <SelectItem value="st">ST</SelectItem>
              <SelectItem value="ews">EWS</SelectItem>
            </SelectContent>
          </Select>
        </Field>

        <Field label="Caste">
          <Input
            value={data.caste}
            onChange={(e) => onChange("caste", e.target.value)}
          />
        </Field>

        <Field label="Nationality">
          <Input
            value={data.nationality}
            onChange={(e) => onChange("nationality", e.target.value)}
          />
        </Field>
      </div>

      {/* Toggle options – span full row */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 pt-2">
        <div className="flex items-center gap-3 rounded-lg border p-3 bg-slate-50 dark:bg-neutral-900">
          <Switch
            id="rte"
            checked={data.isRte}
            onCheckedChange={(v) => onChange("isRte", v)}
          />
          <div>
            <Label htmlFor="rte" className="font-medium">RTE Student</Label>
            <p className="text-xs text-slate-400 mt-0.5">
              Right to Education Act beneficiary
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-lg border p-3 bg-slate-50 dark:bg-neutral-900">
          <Switch
            id="sibling"
            checked={data.hasSibling}
            onCheckedChange={(v) => onChange("hasSibling", v)}
          />
          <div>
            <Label htmlFor="sibling" className="font-medium">Has Sibling in School</Label>
            <p className="text-xs text-slate-400 mt-0.5">
              If Yes,Parent details will be auto-linked.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label>
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </Label>
      {children}
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