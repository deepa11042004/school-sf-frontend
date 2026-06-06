import { faker } from "@faker-js/faker";

export interface Complaint {
  id: string;
  referenceNo: string;
  complainant: string;
  type: "service" | "product" | "facility";
  category: string;
  date: Date;
  status: "pending" | "in progress" | "resolved";
}

const complaintTypes = ["service", "product", "facility"] as const;

const complaintCategories = [
  "Quality",
  "Defect",
  "Behavior",
  "Cleanliness",
  "Missing Item",
  "Late Delivery",
  "Maintenance",
  "Safety",
];

const complaintStatuses = [
  "pending",
  "in progress",
  "resolved",
] as const;

export const generateComplaints = (
  count: number = 20,
): Complaint[] => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    referenceNo: `CMP-${faker.string.numeric(4)}`,
    complainant: faker.person.fullName(),
    type: faker.helpers.arrayElement(complaintTypes),
    category: faker.helpers.arrayElement(complaintCategories),
    date: faker.date.recent({ days: 30 }),
    status: faker.helpers.arrayElement(complaintStatuses),
  }));
};

export const complaintsDummyData = generateComplaints(30);