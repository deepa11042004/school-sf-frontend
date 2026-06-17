import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function StepAcademic() {
  return (
    <div className="space-y-8 animate-in fade-in-0 slide-in-from-right-4 duration-300">
      {/* Previous School */}
      <section>
        <SectionHeading title="Previous School Details" />
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-5">
          <Field label="Previous School Name">
            <Input />
          </Field>
          <Field label="Previous Class">
            <Input />
          </Field>
          <Field label="Year Passed">
            <Input
              type="number"
              min={1990}
              max={new Date().getFullYear()}
              placeholder="YYYY"
            />
          </Field>
          <Field label="Year Due">
            <Input
              type="number"
              min={1990}
              max={new Date().getFullYear() + 5}
              placeholder="YYYY"
            />
          </Field>
          <Field label="Last Exam %">
            <Input
              type="number"
              step="0.01"
              min={0}
              max={100}
              placeholder="e.g. 87.50"
            />
          </Field>
          <Field label="Overpaid Amount">
            <Input
              type="number"
              defaultValue={0}
               
            />
          </Field>
        </div>
      </section>

      {/* Bank Details */}
      <section>
        <SectionHeading title="Bank Details" />
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 mt-5">
          <Field label="Account Holder Name">
            <Input />
          </Field>
          <Field label="Account Number">
            <Input inputMode="numeric" />
          </Field>
          <Field label="Bank Name">
            <Input />
          </Field>
          <Field label="Branch">
            <Input />
          </Field>
          <Field label="IFSC Code">
            <Input
              className="uppercase"
              maxLength={11}
              placeholder="e.g. SBIN0001234"
            />
          </Field>
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
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
