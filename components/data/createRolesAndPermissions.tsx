export type PermissionModule = {
  name: string;
  permissions: string[];
};

export type PermissionGroup = {
  name: string;
  modules: PermissionModule[];
};

export const permissionGroups: PermissionGroup[] = [
  {
    name: "Dashboards",
    modules: [
      {
        name: "Main Dashboard",
        permissions: [
          "Admin Dashboard",
          "Teacher Dashboard",
          "Student Dashboard",
          "Parent Dashboard",
        ],
      },
      {
        name: "Dashboard Components",
        permissions: [
          "Summary Stats",
          "Quick Links",
          "Financial Overview",
          "Attendance Summary",
          "Schedules & Events",
          "Visual Charts",
        ],
      },
    ],
  },
  {
    name: "Student Management",
    modules: [
      {
        name: "Student",
        permissions: ["Access", "Create", "Update", "Delete", "Import", "Export"],
      },
      {
        name: "Parent",
        permissions: ["Access", "Export"],
      },
      {
        name: "Promote Student",
        permissions: ["Access"],
      },
      {
        name: "Roll Number",
        permissions: ["Access"],
      },
    ],
  },
  {
    name: "Staff Management",
    modules: [
      {
        name: "Staff",
        permissions: ["Access", "Create", "Update", "Delete", "Import", "Export"],
      },
    ],
  },
  {
    name: "Attendance",
    modules: [
      {
        name: "Student Attendance",
        permissions: ["Access", "Create", "Update"],
      },
      {
        name: "Student Attendance Report",
        permissions: ["Access"],
      },
      {
        name: "Half Day Notices",
        permissions: ["Access"],
      },
      {
        name: "Staff Attendance",
        permissions: ["Access", "Create", "Update"],
      },
      {
        name: "Staff Attendance Report",
        permissions: ["Access"],
      },
    ],
  },
  {
    name: "Finance & Accounts",
    modules: [
      {
        name: "Collect Fees",
        permissions: ["Access", "Can Cancel Invoice"],
      },
      {
        name: "Fees Invoices",
        permissions: ["Access"],
      },
      {
        name: "Fees Maker",
        permissions: ["Fee Heads", "Class Fee Plans", "Fee Fine Rules"],
      },
      {
        name: "Miscellaneous",
        permissions: ["Access"],
      },
      {
        name: "Accounts",
        permissions: ["Cashflow Access", "Ledger Access"],
      },
      {
        name: "Expenses",
        permissions: ["Access"],
      },
      {
        name: "Fees Report",
        permissions: ["Access"],
      },
      {
        name: "Fees Collection",
        permissions: ["Access"],
      },
    ],
  },
  {
    name: "Academic",
    modules: [
      {
        name: "Class Room",
        permissions: ["Access", "Create", "Update", "Delete"],
      },
      {
        name: "Subject",
        permissions: ["Access", "Create", "Update", "Delete"],
      },
      {
        name: "Classes",
        permissions: ["Access", "Create", "Update", "Delete"],
      },
      {
        name: "Class Time Table",
        permissions: ["Access", "Create", "Update", "Delete"],
      },
      {
        name: "Teacher Time Table",
        permissions: ["Access"],
      },
      {
        name: "School Time Table",
        permissions: ["Access"],
      },
      {
        name: "Study Material",
        permissions: ["Access", "Create", "Update", "Delete"],
      },
      {
        name: "Homework",
        permissions: ["Access", "Create", "Update", "Delete"],
      },
      {
        name: "Assignments",
        permissions: ["Access", "Create", "Update", "Delete"],
      },
      {
        name: "Question Bank",
        permissions: ["Access", "Create", "Update", "Delete"],
      },
      {
        name: "Online Exam",
        permissions: ["Access", "Create", "Update", "Delete"],
      },
    ],
  },
  {
    name: "Front Office",
    modules: [
      {
        name: "Front Office",
        permissions: [
          "Visitors Log (Access)",
          "Phone Calls (Access)",
          "Half Day Notices (Access)",
          "Postal (Access)",
          "Admission Enquiries (Access)",
          "Complaints (Access)",
          "Setup (Access)",
        ],
      },
    ],
  },
  {
    name: "Examinations",
    modules: [
      {
        name: "Exam Patterns",
        permissions: ["Access", "Create", "Update", "Delete"],
      },
      {
        name: "Examination",
        permissions: ["Access", "Create", "Update"],
      },
    ],
  },
  {
    name: "Library",
    modules: [
      {
        name: "Library",
        permissions: ["Access"],
      },
    ],
  },
  {
    name: "Hostel",
    modules: [
      {
        name: "Hostel",
        permissions: ["Access"],
      },
    ],
  },
  {
    name: "Transport",
    modules: [
      {
        name: "Transport",
        permissions: ["Access"],
      },
    ],
  },
  {
    name: "Communication",
    modules: [
      {
        name: "Logs & History",
        permissions: ["Access"],
      },
      {
        name: "Compose Mail/SMS",
        permissions: ["Access"],
      },
    ],
  },
  {
    name: "Reports",
    modules: [
      {
        name: "Report",
        permissions: ["Access"],
      },
    ],
  },
  {
    name: "Competitions",
    modules: [
      {
        name: "Competitions",
        permissions: ["Access", "Create", "Update", "Delete"],
      },
    ],
  },
  {
    name: "Inventory",
    modules: [
      {
        name: "Dashboard",
        permissions: ["Access"],
      },
      {
        name: "Stock Ledger",
        permissions: ["Access"],
      },
      {
        name: "Items",
        permissions: ["Access", "Create", "Update", "Delete"],
      },
      {
        name: "Categories",
        permissions: ["Access", "Create", "Update", "Delete"],
      },
      {
        name: "Vendors",
        permissions: ["Access", "Create", "Update", "Delete"],
      },
      {
        name: "Purchases",
        permissions: ["Access", "Create", "Update (Receive)"],
      },
      {
        name: "Sales",
        permissions: ["Access", "Create", "Delete (Cancel)"],
      },
    ],
  },
  {
    name: "System Settings",
    modules: [
      {
        name: "Academic Year",
        permissions: ["Access"],
      },
      {
        name: "Houses & Activities",
        permissions: ["Access (Houses)", "Access (Activities)"],
      },
      {
        name: "School Base Settings",
        permissions: ["Access"],
      },
      {
        name: "Roles & Permissions",
        permissions: ["Access"],
      },
    ],
  },
];