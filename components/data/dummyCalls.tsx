import { faker } from "@faker-js/faker";

export interface CallLog {
  id: string;
  name: string;
  phone: string;
  date: Date;
  nextFollowUp: Date;
  callType: string;
  description: string;
}

const callTypes = [
  "FollowUp",
  "New",
  "Complaint",
  "Feedback",
  "Other",
];

const indianPhone = () => {
  const firstDigit = faker.helpers.arrayElement(["6", "7", "8", "9"]);
  const mobile = firstDigit + faker.string.numeric(9);

  return `+91 ${mobile.slice(0, 5)} ${mobile.slice(5)}`;
};

export const dummyCalls: CallLog[] = Array.from(
  { length: 50 },
  () => ({
    id: faker.string.uuid(),

    name: faker.person.fullName(),

    phone: indianPhone(),

    date: faker.date.recent({ days: 30 }),

    nextFollowUp: faker.date.soon({ days: 15 }),

    callType: faker.helpers.arrayElement(callTypes),

    description: faker.helpers.arrayElement([
      "Parent enquired about admission process.",
      "Requested fee structure details.",
      "Follow-up regarding admission documents.",
      "Complaint regarding transport service.",
      "Asked about scholarship eligibility.",
      "Feedback on school facilities.",
      "Requested callback from administration.",
      "Enquiry about available seats.",
      "Discussion regarding transfer certificate.",
      "General admission enquiry.",
    ]),
  })
);
