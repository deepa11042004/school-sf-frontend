// data.tsx

import { faker } from "@faker-js/faker";

export interface Guardian {
  id: string;
  name: string;
  type: string;
  phone: string;
  email: string;
  children: string;
  isPrimary: boolean;
  hasSiblings: boolean;
  className: string;
}

const guardianTypes = [
  "Father",
  "Mother",
   "Guardian"
];

const classes = [
  "Class 1",
  "Class 2",
  "Class 3",
  "Class 4",
  "Class 5",
];

faker.seed(123);


const indianPhone = () => {
  const firstDigit = faker.helpers.arrayElement(["6", "7", "8", "9"]);
  const mobile = firstDigit + faker.string.numeric(9);

  return `+91 ${mobile.slice(0, 5)} ${mobile.slice(5)}`;
};

export const dummyGuardians: Guardian[] = Array.from(
  { length: 100 },
  (_, index) => {
    const className = faker.helpers.arrayElement(classes);
    const studentName = faker.person.fullName();

    return {
      id: String(index + 1),

      name: faker.person.fullName(),

      type: faker.helpers.arrayElement(guardianTypes),

      phone: indianPhone(),

      email: faker.internet.email().toLowerCase(),

      children: `${studentName} (${className})`,

      isPrimary: faker.datatype.boolean(),

      hasSiblings: faker.datatype.boolean(),

      className,
    };
  }
);