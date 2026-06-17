import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormState } from "@/components/peoples/create-student/types";

interface Props {
  data: FormState;
  onChange: <K extends keyof FormState>(key: K, value: FormState[K]) => void;
}

export function StepContact({ data, onChange }: Props) {
  return (
    <div className="space-y-6 animate-in fade-in-0 slide-in-from-right-4 duration-300">
      <SectionHeading title="Student Contact & Address" />

      {/* Contact */}
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2">
        <Field label="Primary Mobile" required>
          <Input
            type="tel"
            inputMode="tel"
            placeholder="+91 XXXXX XXXXX"
            value={data.primaryMobile}
            onChange={(e) => onChange("primaryMobile", e.target.value)}
          />
        </Field>
        <Field label="Email">
          <Input
            type="email"
            inputMode="email"
            placeholder="student@example.com"
            value={data.email}
            onChange={(e) => onChange("email", e.target.value)}
          />
        </Field>
      </div>

      {/* Address */}
      <Field label="Current Address">
        <Textarea
          placeholder="Street / Locality / Colony"
          rows={3}
          value={data.streetAddress}
          onChange={(e) => onChange("streetAddress", e.target.value)}
        />
      </Field>

      <div className="grid gap-5 grid-cols-2 sm:grid-cols-4">
        <Field label="City">
          <Input
            value={data.city}
            onChange={(e) => onChange("city", e.target.value)}
          />
        </Field>
        <Field label="State">
          <Input
            value={data.state}
            onChange={(e) => onChange("state", e.target.value)}
          />
        </Field>
        <Field label="Pin Code">
          <Input
            inputMode="numeric"
            maxLength={6}
            value={data.zipCode}
            onChange={(e) => onChange("zipCode", e.target.value)}
          />
        </Field>
        <Field label="Country">
          <Input
            value={data.country}
            onChange={(e) => onChange("country", e.target.value)}
          />
        </Field>
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