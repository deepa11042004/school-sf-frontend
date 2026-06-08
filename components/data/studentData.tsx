// data.tsx

import { faker } from "@faker-js/faker";

export interface Student {
  id: string;
  name: string;
  fatherName: string;
  className: string;
  admissionNo: string;
  contact: string;
  rteStatus: "Yes" | "No";
  discount: "Yes" | "No";
  prevDue: "Yes" | "No";
}

const classes = [
  "Class 1",
  "Class 2",
  "Class 3",
  "Class 4",
  "Class 5",
  "Class 6",
  "Class 7",
  "Class 8",
];

const indianPhone = () => {
  const firstPart = faker.string.numeric(5);
  const secondPart = faker.string.numeric(5);

  return `+91 ${firstPart} ${secondPart}`;
};


export const students: Student[] = Array.from(
  { length: 100 },
  (_, index) => ({
    id: String(index + 1),

    name: faker.person.fullName(),

    fatherName: faker.person.fullName({
      sex: "male",
    }),

    className: faker.helpers.arrayElement(classes),

    admissionNo: `ADM-${String(index + 1).padStart(4, "0")}`,

    contact: indianPhone(),

    rteStatus: faker.helpers.arrayElement(["Yes", "No"]),

    discount: faker.helpers.arrayElement(["Yes", "No"]),

    prevDue: faker.helpers.arrayElement(["Yes", "No"]),
  }),
);