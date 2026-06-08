// data.tsx

import { faker } from "@faker-js/faker";

export interface Staff {
  id: string;
  name: string;
  type: string;
  roles: string;
  phone: string;
  email: string;
  status: string;
  joiningDate: string;
}

const staffTypes = ["Teaching", "Administrative", "Support"];

const teachingRoles = [
  "Math Teacher",
  "Science Teacher",
  "English Teacher",
  "Hindi Teacher",
  "Computer Teacher",
  "Physics Teacher",
  "Chemistry Teacher",
  "Biology Teacher",
  "History Teacher",
  "Geography Teacher",
  "Sports Teacher",
];

const administrativeRoles = [
  "Principal",
  "Vice Principal",
  "Front Office Manager",
  "Accountant",
  "HR Manager",
  "Admission Officer",
  "School Coordinator",
];

const supportRoles = [
  "IT Support",
  "Librarian",
  "Lab Assistant",
  "Security Officer",
  "Transport Manager",
  "Maintenance Supervisor",
  "Receptionist",
];

const statuses = ["Active", "Inactive", "On Leave"];

faker.seed(123);

const indianPhone = () => {
  const firstPart = faker.string.numeric(5);
  const secondPart = faker.string.numeric(5);

  return `+91 ${firstPart} ${secondPart}`;
};

export const dummyStaff: Staff[] = Array.from(
  { length: 75 },
  (_, index) => {
    const type = faker.helpers.arrayElement(staffTypes);

    let role = "";

    switch (type) {
      case "Teaching":
        role = faker.helpers.arrayElement(teachingRoles);
        break;

      case "Administrative":
        role = faker.helpers.arrayElement(administrativeRoles);
        break;

      case "Support":
        role = faker.helpers.arrayElement(supportRoles);
        break;
    }

    return {
      id: `S${String(index + 1).padStart(3, "0")}`,

      name: faker.person.fullName(),

      type,

      roles: role,

      phone: indianPhone(),

      email: faker.internet.email().toLowerCase(),

      status: faker.helpers.arrayElement(statuses),

      joiningDate: faker.date
        .between({
          from: "2018-01-01",
          to: "2025-01-01",
        })
        .toISOString()
        .split("T")[0],
    };
  }
);