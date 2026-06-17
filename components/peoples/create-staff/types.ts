import {
  User,
  MapPin,
  Landmark,
  Banknote,
} from "lucide-react";

export const PHASES = [
  { step: 1, title: "Personal Information", icon: User },
  { step: 2, title: "Address Information", icon: MapPin },
  { step: 3, title: "Bank & Social Media", icon: Landmark },
  { step: 4, title: "Payroll & Leaves", icon: Banknote },
] as const;

export interface FormState {
  // Step 1 – Personal Information
  firstName: string;
  lastName: string;
  aadharNo: string;
  penCode: string;
  gender: string;
  primaryMobile: string;
  whatsappNumber: string;
  email: string;
  bloodGroup: string;
  dateOfJoining: Date | undefined;
  fathersName: string;
  mothersName: string;
  dob: Date | undefined;
  maritalStatus: string;
  qualification: string;
  professionalQualification: string;
  workExperience: string;
  staffImage: File | null;
  resumeFile: File | null;
  notes: string;

  // Step 2 – Address Information (Permanent)
  permAddressLine1: string;
  permAddressLine2: string;
  permCity: string;
  permState: string;
  permPostalCode: string;
  permCountry: string;

  // Step 2 – Address Information (Current/Communication)
  commAddressLine1: string;
  commAddressLine2: string;
  commCity: string;
  commState: string;
  commPostalCode: string;
  commCountry: string;

  // Step 3 – Bank Details
  accountName: string;
  accountNumber: string;
  bankName: string;
  ifscCode: string;
  branchName: string;

  // Step 3 – Social Media Links
  facebookUrl: string;
  twitterUrl: string;
  linkedInUrl: string;
  instagramUrl: string;

  // Step 4 – Payroll Details
  epfNo: string;
  basicSalary: string;
  contractType: string;
  contractStart: Date | undefined;
  contractEnd: Date | undefined;

  // Step 4 – Leaves
  leaveYear: string;
  medicalLeaves: string;
  casualLeaves: string;
  maternityLeaves: string;
  sickLeaves: string;
}

export const initialFormState: FormState = {
  firstName: "",
  lastName: "",
  aadharNo: "",
  penCode: "",
  gender: "",
  primaryMobile: "",
  whatsappNumber: "",
  email: "",
  bloodGroup: "",
  dateOfJoining: undefined,
  fathersName: "",
  mothersName: "",
  dob: undefined,
  maritalStatus: "",
  qualification: "",
  professionalQualification: "",
  workExperience: "",
  staffImage: null,
  resumeFile: null,
  notes: "",

  permAddressLine1: "",
  permAddressLine2: "",
  permCity: "",
  permState: "",
  permPostalCode: "",
  permCountry: "India",

  commAddressLine1: "",
  commAddressLine2: "",
  commCity: "",
  commState: "",
  commPostalCode: "",
  commCountry: "India",

  accountName: "",
  accountNumber: "",
  bankName: "",
  ifscCode: "",
  branchName: "",

  facebookUrl: "",
  twitterUrl: "",
  linkedInUrl: "",
  instagramUrl: "",

  epfNo: "",
  basicSalary: "",
  contractType: "Permanent",
  contractStart: undefined,
  contractEnd: undefined,

  leaveYear: "2025",
  medicalLeaves: "0",
  casualLeaves: "0",
  maternityLeaves: "0",
  sickLeaves: "0",
};
