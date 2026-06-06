import { faker } from "@faker-js/faker";

export interface AdmissionEnquiry {
  id: string;
  name: string;
  className: string;
  phone: string;
  source:
    | "website"
    | "walk-in"
    | "phone call"
    | "referral"
    | "social media";
  enquiryDate: Date;
  lastFollowUp: Date;
  nextFollowUp: Date;
  status:
    | "new"
    | "follow-up"
    | "converted"
    | "lost";
}

const sources = [
  "website",
  "walk-in",
  "phone call",
  "referral",
  "social media",
] as const;

const statuses = [
  "new",
  "follow-up",
  "converted",
  "lost",
] as const;

const classes = [
  "Class 1 A",
  "Class 2 A",
  "Class 3 A",
  "Class 4 A",
  "Class 5 A",
  "Class 6 A",
  "Class 7 A",
  "Class 8 A",
];
const indianPhone = () => {
  const firstDigit = faker.helpers.arrayElement(["6", "7", "8", "9"]);
  const mobile = firstDigit + faker.string.numeric(9);

  return `+91 ${mobile.slice(0, 5)} ${mobile.slice(5)}`;
};
export const generateAdmissionEnquiries = (
  count: number = 50,
): AdmissionEnquiry[] => {
  return Array.from({ length: count }, () => {
    const enquiryDate = faker.date.recent({ days: 60 });

    const lastFollowUp = faker.date.between({
      from: enquiryDate,
      to: new Date(),
    });

    const nextFollowUp = faker.date.future({
      years: 0.1,
      refDate: new Date(),
    });

    return {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      className: faker.helpers.arrayElement(classes),
      phone: indianPhone(),
      source: faker.helpers.arrayElement(sources),
      enquiryDate,
      lastFollowUp,
      nextFollowUp,
      status: faker.helpers.arrayElement(statuses),
    };
  });
};

export const admissionEnquiriesDummyData =
  generateAdmissionEnquiries(30);