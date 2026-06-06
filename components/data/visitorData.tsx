<<<<<<< HEAD
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

  return `(+91) ${firstPart} ${secondPart}`;
};

export const dummyVisitors: Visitor[] = Array.from(
  { length: 15 },
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



 
=======
// Dummy data for demonstration
const dummyVisitors = [
  {
    id: 1,
    name: "John Doe",
    phone: "+1 234 567 890",
    purpose: "Meeting",
    persons: 1,
    date: "2024-01-15",
    inTime: "09:30 AM",
    outTime: "11:00 AM",
  },
  {
    id: 2,
    name: "Jane Smith",
    phone: "+1 234 567 891",
    purpose: "Interview",
    persons: 1,
    date: "2024-01-15",
    inTime: "10:00 AM",
    outTime: "11:30 AM",
  },
  {
    id: 3,
    name: "Bob Johnson",
    phone: "+1 234 567 892",
    purpose: "Delivery",
    persons: 2,
    date: "2024-01-15",
    inTime: "11:00 AM",
    outTime: "11:45 AM",
  },
  {
    id: 4,
    name: "Alice Brown",
    phone: "+1 234 567 893",
    purpose: "Meeting",
    persons: 1,
    date: "2024-01-15",
    inTime: "02:00 PM",
    outTime: "03:30 PM",
  },
  {
    id: 5,
    name: "Charlie Wilson",
    phone: "+1 234 567 894",
    purpose: "Interview",
    persons: 1,
    date: "2024-01-15",
    inTime: "03:00 PM",
    outTime: "04:00 PM",
  },
  {
    id: 6,
    name: "Diana Lee",
    phone: "+1 234 567 895",
    purpose: "Meeting",
    persons: 3,
    date: "2024-01-16",
    inTime: "09:00 AM",
    outTime: "10:30 AM",
  },
  {
    id: 7,
    name: "Edward Kim",
    phone: "+1 234 567 896",
    purpose: "Delivery",
    persons: 1,
    date: "2024-01-16",
    inTime: "10:30 AM",
    outTime: "11:00 AM",
  },
  {
    id: 8,
    name: "Fiona Garcia",
    phone: "+1 234 567 897",
    purpose: "Meeting",
    persons: 2,
    date: "2024-01-16",
    inTime: "01:00 PM",
    outTime: "02:30 PM",
  },
  {
    id: 9,
    name: "George Martinez",
    phone: "+1 234 567 898",
    purpose: "Interview",
    persons: 1,
    date: "2024-01-16",
    inTime: "02:00 PM",
    outTime: "03:00 PM",
  },
  {
    id: 10,
    name: "Hannah Davis",
    phone: "+1 234 567 899",
    purpose: "Meeting",
    persons: 1,
    date: "2024-01-16",
    inTime: "03:30 PM",
    outTime: "05:00 PM",
  },
  {
    id: 11,
    name: "Ivan Rodriguez",
    phone: "+1 234 567 900",
    purpose: "Delivery",
    persons: 2,
    date: "2024-01-17",
    inTime: "09:15 AM",
    outTime: "09:45 AM",
  },
  {
    id: 12,
    name: "Julia Hernandez",
    phone: "+1 234 567 901",
    purpose: "Meeting",
    persons: 1,
    date: "2024-01-17",
    inTime: "10:00 AM",
    outTime: "11:30 AM",
  },
];

export { dummyVisitors };
>>>>>>> b8766311c17f412fb1d1d184f814b2a2ae32e961
