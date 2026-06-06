// data/postal.ts

import { faker } from "@faker-js/faker";

export interface PostalRecord {
  id: string;
  type: string;
  referenceNo: string;
  title: string;
  direction: "dispatch" | "receive";
  date: Date;
}

export const generatePostalRecords = (
  count: number = 20,
): PostalRecord[] => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    type: "Letter",
    referenceNo: faker.string.alphanumeric({
      length: 8,
      casing: "upper",
    }),
    title: faker.lorem.sentence(),
    direction: faker.helpers.arrayElement(["dispatch", "receive"]),
    date: faker.date.recent({ days: 30 }),
  }));
};

export const postalDummyData = generatePostalRecords(20);