import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const GUARDIANS = ["Father", "Mother", "Other Guardian"] as const;

export function StepParents() {
  return (
    <div className="space-y-6 animate-in fade-in-0 slide-in-from-right-4 duration-300">
      <SectionHeading title="Parents & Guardian Information" />

      <div className="space-y-4">
        {GUARDIANS.map((guardian) => (
          <GuardianCard key={guardian} guardian={guardian} />
        ))}
      </div>
    </div>
  );
}

function GuardianCard({ guardian }: { guardian: string }) {
  return (
    <Card className="border-slate-200 dark:border-neutral-800 bg-slate-50/50 dark:bg-neutral-900/50">
      <CardHeader className="pb-3 px-4 pt-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <CardTitle className="text-sm font-semibold">{guardian}</CardTitle>
          <div className="flex items-center gap-2">
            <Switch id={`primary-${guardian}`} />
            <Label
              htmlFor={`primary-${guardian}`}
              className="text-xs font-normal text-slate-500"
            >
              Primary Contact
            </Label>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-4 pb-4">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <Field label="Name">
            <Input placeholder={`${guardian} Name`} />
          </Field>
          <Field label="Aadhar Number">
            <Input placeholder="XXXX-XXXX-XXXX" />
          </Field>
          <Field label="Phone">
            <Input type="tel" inputMode="tel" />
          </Field>
          <Field label="Email">
            <Input type="email" inputMode="email" />
          </Field>
          <Field label="WhatsApp">
            <Input type="tel" inputMode="tel" />
          </Field>
          <Field label="Occupation">
            <Input />
          </Field>
          <div className="sm:col-span-2 lg:col-span-3 space-y-1.5">
            <Label className="text-xs font-medium text-slate-600 dark:text-slate-400">
              Address
            </Label>
            <Textarea
              placeholder={`${guardian}'s address`}
              rows={2}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium text-slate-600 dark:text-slate-400">
        {label}
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