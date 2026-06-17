import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, FileText, FileUp, X } from "lucide-react";
import { FormState } from "@/components/peoples/create-student/types";

interface Props {
  data: FormState;
  onChange: <K extends keyof FormState>(key: K, value: FormState[K]) => void;
}

export function StepDocuments({ data, onChange }: Props) {
  return (
    <div className="space-y-6 animate-in fade-in-0 slide-in-from-right-4 duration-300">
      <SectionHeading title="Documents & Media" />

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
        <UploadField
          label="Student Photo"
          hint="JPG, PNG, JPEG · Max 2 MB"
          accept="image/*"
          icon={Upload}
          file={data.photoFile}
          onSelect={(f) => onChange("photoFile", f)}
          onRemove={() => onChange("photoFile", null)}
        />
        <UploadField
          label="Supporting Document (e.g. Birth Certificate)"
          hint="PDF, DOC, DOCX, JPG · Max 5 MB"
          accept=".pdf,.doc,.docx,.jpg,.png"
          icon={FileText}
          file={data.docFile}
          onSelect={(f) => onChange("docFile", f)}
          onRemove={() => onChange("docFile", null)}
        />
      </div>
    </div>
  );
}

interface UploadFieldProps {
  label: string;
  hint: string;
  accept: string;
  icon: React.ElementType;
  file: File | null;
  onSelect: (f: File) => void;
  onRemove: () => void;
}

function UploadField({
  label,
  hint,
  accept,
  icon: Icon,
  file,
  onSelect,
  onRemove,
}: UploadFieldProps) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>

      <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 dark:border-neutral-700 p-8 text-center transition-colors hover:border-indigo-400 hover:bg-indigo-50/40 dark:hover:bg-indigo-950/20">
        <Icon className="mb-3 h-8 w-8 text-slate-400" />
        <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
          {file ? "Change file" : "Click to upload"}
        </p>
        <p className="mt-1 text-xs text-slate-400">{hint}</p>
        <input
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onSelect(f);
            // Reset input so re-selecting same file fires onChange
            e.target.value = "";
          }}
        />
      </label>

      {file && (
        <div className="flex items-center gap-2 rounded-lg border bg-slate-50 dark:bg-neutral-900 px-3 py-2 text-sm">
          <FileUp className="h-4 w-4 shrink-0 text-indigo-600" />
          <span className="truncate flex-1 text-slate-700 dark:text-slate-300">
            {file.name}
          </span>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-6 w-6 shrink-0 text-red-500 hover:text-red-600 hover:bg-red-50"
            onClick={onRemove}
            aria-label="Remove file"
          >
            <X className="h-3.5 w-3.5" />
          </Button>
        </div>
      )}
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