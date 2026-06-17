import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

export function StepAdmission({ data, onChange }: Props) {
  return (
    <div className="space-y-6 animate-in fade-in-0 slide-in-from-right-4 duration-300">
      <SectionHeading title="Admission Details" />

      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {/* Admission Number */}
        <div className="space-y-1.5">
          <Label>Admission Number <Required /></Label>
          <Input
          type="text"
            value={data.admissionNo}
            onChange={(e) => onChange("admissionNo", e.target.value)}
             
          />
        </div>

        {/* Admission Date */}
        <div className="space-y-1.5">
          <Label>Admission Date <Required /></Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-slate-400 shrink-0" />
                {data.admissionDate
                  ? format(data.admissionDate, "dd MMM yyyy")
                  : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={data.admissionDate}
                onSelect={(d) => d && onChange("admissionDate", d)}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Class */}
        <div className="space-y-1.5">
          <Label>Class <Required /></Label>
          <Select value={data.studentClass} onValueChange={(v) => onChange("studentClass", v)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nc-a">NC (A)</SelectItem>
              <SelectItem value="nc-b">NC (B)</SelectItem>
              <SelectItem value="i-a">I (A)</SelectItem>
              <SelectItem value="viii-a">VIII (A)</SelectItem>
              <SelectItem value="xii-sci">XII Science</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Roll No */}
        <div className="space-y-1.5">
          <Label>Class Roll Number</Label>
          <Input
            placeholder="Auto-generate if empty"
            value={data.rollNo}
            onChange={(e) => onChange("rollNo", e.target.value)}
          />
          <p className="text-xs text-slate-400">
            Leave empty for auto-generation.
          </p>
        </div>

        {/* Discount */}
        <div className="space-y-1.5">
          <Label>Discount %</Label>
          <Input
            type="number"
            min={0}
            max={100}
            value={data.discount}
            onChange={(e) => onChange("discount", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

function SectionHeading({ title }: { title: string }) {
  return (
    <div className="border-b pb-2">
      <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50">
        {title}
      </h3>
    </div>
  );
}

function Required() {
  return <span className="text-red-500 ml-0.5">*</span>;
}