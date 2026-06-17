import {
  School,
  User,
  MapPin,
  Users,
  GraduationCap,
  Bus,
  FileText,
} from "lucide-react";

export const PHASES = [
  { step: 1, title: "Admission Details", icon: School },
  { step: 2, title: "Personal Information", icon: User },
  { step: 3, title: "Contact & Address", icon: MapPin },
  { step: 4, title: "Parents & Guardian", icon: Users },
  { step: 5, title: "Academic History", icon: GraduationCap },
  { step: 6, title: "Services", icon: Bus },
  { step: 7, title: "Documents", icon: FileText },
] as const;

export interface FormState {
  // Step 1 – Admission
  admissionNo: string;
  admissionDate: Date;
  studentClass: string;
  rollNo: string;
  discount: string;

  // Step 2 – Personal
  aadharNo: string;
  penNumber: string;
  firstName: string;
  lastName: string;
  gender: string;
  dob: Date | undefined;
  bloodGroup: string;
  house: string;
  activity: string;
  religion: string;
  category: string;
  caste: string;
  nationality: string;
  isRte: boolean;
  hasSibling: boolean;

  // Step 3 – Contact
  primaryMobile: string;
  email: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;

  // Step 7 – Documents
  photoFile: File | null;
  docFile: File | null;
}

export const initialFormState: FormState = {
  admissionNo: "JH20260002",
  admissionDate: new Date(2026, 5, 17),
  studentClass: "",
  rollNo: "",
  discount: "0",

  aadharNo: "",
  penNumber: "",
  firstName: "",
  lastName: "",
  gender: "",
  dob: undefined,
  bloodGroup: "",
  house: "",
  activity: "None",
  religion: "",
  category: "",
  caste: "",
  nationality: "India",
  isRte: false,
  hasSibling: false,

  primaryMobile: "",
  email: "",
  streetAddress: "",
  city: "",
  state: "",
  zipCode: "",
  country: "India",

  photoFile: null,
  docFile: null,
};
