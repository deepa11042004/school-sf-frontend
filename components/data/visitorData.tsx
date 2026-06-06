import { faker } from "@faker-js/faker";

export interface Visitor {
  id: string;
  name: string;
  phone: string;
  purpose: string;
  persons: number;
  date: Date;
  inTime: string;
  outTime: string;
}

const purposes = [
  "Admission",
  "Meeting",
  "Interview",
  "Vendor",
];

const indianPhone = () => {
  const firstPart = faker.string.numeric(5);
  const secondPart = faker.string.numeric(5);

  return `+91 ${firstPart} ${secondPart}`;
};

export const dummyVisitors: Visitor[] = Array.from(
  { length: 20 },
  (_, index) => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    phone: indianPhone(),
    purpose: faker.helpers.arrayElement(purposes),
    persons: faker.number.int({ min: 1, max: 5 }),
    date: faker.date.recent({ days: 60 }),
    inTime: `${faker.number.int({ min: 8, max: 11 })}:${faker.helpers.arrayElement(["00", "15", "30", "45"])} AM`,
   outTime: `${faker.number.int({ min: 12, max: 17 })}:${faker.helpers.arrayElement(["00", "15", "30", "45"])}`
  })
);



 
