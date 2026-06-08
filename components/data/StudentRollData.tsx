import { faker } from "@faker-js/faker";

export interface StudentRoll {
  id: string;
  name: string;
  admissionNo: string;
  dob: string;
  rollNumber: string;
  phone: string;
}

faker.seed(99);
const indianPhone = () => {
  const firstPart = faker.string.numeric(5);
  const secondPart = faker.string.numeric(5);

  return `+91 ${firstPart} ${secondPart}`;
};
export const dummyRolls: StudentRoll[] = Array.from(
  { length: 50 },
  (_, index) => {
    const dob = faker.date.birthdate({ min: 6, max: 10, mode: "age" });

    return {
      id: String(index + 1),

      name: faker.person.fullName(),

      admissionNo: `ADM-${String(index + 1).padStart(3, "0")}`,

      dob: dob.toISOString().split("T")[0], // YYYY-MM-DD format

      rollNumber: String(index + 1),

      phone: indianPhone(),
    };
  }
);