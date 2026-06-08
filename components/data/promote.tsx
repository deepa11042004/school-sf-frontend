import { faker } from "@faker-js/faker";

export interface PromoteStudent {
  id: number;
  admissionNo: string;
  name: string;
  section: string;
  className: string;
}

const sections = ["A", "B", "C", "D"];

const classes = ["Class 1", "Class 2", "Class 3", "Class 4", "Class 5"];

faker.seed(42);

export const promoteStudents: PromoteStudent[] = Array.from(
  { length: 60 },
  (_, index) => {
    const className = faker.helpers.arrayElement(classes);
    const section = faker.helpers.arrayElement(sections);

    return {
      id: index + 1,

      admissionNo: `ADM${String(index + 1).padStart(4, "0")}`,

      name: faker.person.fullName(),

      section,

      className,
    };
  }
);