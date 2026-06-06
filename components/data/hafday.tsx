import { faker } from "@faker-js/faker";

export interface HalfDayNotice {
  id: string;
  studentName: string;
  studentId: string;
  className: string;
  outTime: Date;
  reason: string;
  guardianName: string;
  guardianContact: string;
}

const reasons = [
  "Medical appointment",
  "Family emergency",
  "Personal work",
  "Dental checkup",
  "School competition preparation",
  "Health issue",
  "Parent request",
  "Urgent family matter",
  "Hospital visit",
  "Special permission granted",
];

const classes = [
  "Class 1",
  "Class 2",
  "Class 3",
  "Class 4",
  "Class 5",
];


const indianPhone = () => {
  const firstDigit = faker.helpers.arrayElement(["6", "7", "8", "9"]);
  const mobile = firstDigit + faker.string.numeric(9);

  return `+91 ${mobile.slice(0, 5)} ${mobile.slice(5)}`;
};

export const generateHalfDayNotices = (
  count: number = 50
): HalfDayNotice[] => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    studentName: faker.person.fullName(),
    studentId: `STD-${faker.string.numeric(5)}`,
    className: faker.helpers.arrayElement(classes),
    outTime: faker.date.between({
      from: new Date(),
      to: new Date(Date.now() + 1000 * 60 * 60 * 8),
    }),
    reason: faker.helpers.arrayElement(reasons),
    guardianName: faker.person.fullName(),
    guardianContact: indianPhone(),
  }));
};

export const halfDayNotices: HalfDayNotice[] =
  generateHalfDayNotices(30);