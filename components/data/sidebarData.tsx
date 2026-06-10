// data/sideData.tsx

import {
  Home,
  FileText,
  Activity,
  Package,
  ShoppingCart,
  Wallet,
  Receipt,
  CreditCard,
  ClipboardList,
  Mail,
  Calendar,
  LucideIcon,
  History,
  Phone,
  CalendarClock,
  MessageSquareWarning,
  Server,
  MessageCircleQuestionMark,
  GraduationCap,
  UserStar,
  BriefcaseBusiness,
  UserPen,
  ListOrdered,
  UserCheck,
  ContactRound,
  Landmark,
  BadgeIndianRupee,
  Scale,
  CircleDollarSign,
  BookOpenText,
  ReceiptText,
  Building,
  BarChart3,
  Coins,
  Van,
  School,
  BookOpen,
  Users,
  CalendarDays,
  UserRound,
  Clock3,
  LibraryBig,
  NotebookPen,
  ClipboardCheck,
  FileQuestion,
  MonitorCheck,
  FileCheck,
  Repeat,
  Route,
  Bus,
  Send,
  Boxes,
  Tags,
  Store,
  LayoutDashboard,
  FileBarChart,
  MonitorPlay,
  Trophy,
  ShieldCheck,
  KeyRound,
  Settings,
  CalendarCog,
  UserRoundCog,
} from "lucide-react";

interface SubMenuItem {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
  isNew?: boolean;
  children?: SubMenuItem[];
}

interface MenuItem {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<any>;
  badge?: string;
  isNew?: boolean;
  children?: SubMenuItem[];
}

interface MenuSection {
  id: string;
  label: string;
  items: MenuItem[];
}
export const menuData: MenuSection[] = [
  {
    id: "Dashboard",
    label: "Dashboard",
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        href: "/dashboard",
        icon: Home,
      },
    ],
  },
  {
    id: "front-office",
    label: "FRONT OFFICE",
    items: [
      {
        id: "front-office",
        label: "Front Office",
        href: "/",
        icon: ClipboardList,
        badge: "7",
        children: [
          {
            id: "visitors-log",
            label: "Visitors Log",
            href: "/front-office/visitors",
            icon: History,
          },
          {
            id: "phone-calls",
            label: "Phone Calls",
            href: "/front-office/phone-calls",
            icon: Phone,
          },
          {
            id: "half-day-notices",
            label: "Half Day Notices",
            href: "/front-office/half-day-notices",
            icon: CalendarClock,
          },
          {
            id: "postal",
            label: "Postal",
            href: "/front-office/postal",
            icon: Mail,
            isNew: true,
          },
          {
            id: "admission-enquiries",
            label: "Admission Enquiries",
            href: "/front-office/admission-enquiries",
            icon: MessageCircleQuestionMark,
            isNew: true,
          },
          {
            id: "complaints",
            label: "Complaints",
            href: "/front-office/complaints",
            icon: MessageSquareWarning,
          },
          {
            id: "setup",
            label: "Setup",
            href: "/front-office/setup",
            icon: Server,
          },
        ],
      },
    ],
  },
  {
    id: "peoples",
    label: "PEOPLES",
    items: [
      {
        id: "students",
        label: "Students",
        href: "/peoples/students",
        icon: GraduationCap,
      },
      {
        id: "parents",
        label: "Parents",
        href: "/peoples/parents",
        icon: UserStar,
      },
      {
        id: "staff",
        label: "Staff",
        href: "/peoples/staff",
        icon: BriefcaseBusiness,
      },
      {
        id: "promote-student",
        label: "Promote Student",
        href: "/peoples/promote-student",
        icon: UserPen,
      },
      {
        id: "roll-numbers",
        label: "Roll Numbers",
        href: "/peoples/roll-numbers",
        icon: ListOrdered,
      },
    ],
  },
  {
    id: "attendance",
    label: "Attendance",
    items: [
      {
        id: "student-attendance",
        label: "Student Attendance",
        href: "/attendance/student-attendance",
        icon: UserCheck,
      },
      {
        id: "student-attendance-report",
        label: "Student Attendance Report",
        href: "/attendance/student-attendance-report",
        icon: ClipboardList,
      },
      {
        id: "half-day-notices",
        label: "Half Day Notices",
        href: "/attendance/attendance-half-day-notices",
        icon: CalendarClock,
      },
      {
        id: "staff-attendance",
        label: "Staff Attendance",
        href: "/attendance/staff-attendance",
        icon: ContactRound,
      },
      {
        id: "staff-attendance-report",
        label: "Staff Attendance Report",
        href: "/attendance/staff-attendance-report",
        icon: ListOrdered,
      },
    ],
  },
  {
    id: "finance",
    label: "Finance & Accounts",
    items: [
      {
        id: "collect-fees",
        label: "Collect Fees",
        href: "/fee/collect-fees",
        icon: BadgeIndianRupee,
      },
      {
        id: "fees-invoices",
        label: "Fees Invoices",
        href: "/fee/fees-invoices",
        icon: FileText,
      },
      {
        id: "fees-maker",
        label: "Fees Maker",
        href: "#",
        icon: Wallet,
        badge: "3",
        children: [
          {
            id: "fee-heads",
            label: "Fee Heads",
            href: "/fee/fee-heads",
            icon: Landmark,
          },
          {
            id: "class-fee-plans",
            label: "Class Fee Plans",
            href: "/fee/class-fee-plans",
            icon: ReceiptText,
          },
          {
            id: "fee-fine-rules",
            label: "Fee Fine Rules",
            href: "/fee/fine-rules",
            icon: Scale,
          },
        ],
      },

      {
        id: "miscellaneous",
        label: "Miscellaneous",
        href: "/fee/miscellaneous",
        icon: Coins,
      },

      {
        id: "accounts",
        label: "Accounts",
        href: "#",
        badge: "2",
        icon: Landmark,
        children: [
          {
            id: "cashflow",
            label: "Cashflow",
            href: "/acount/cashflow",
            icon: CircleDollarSign,
          },
          {
            id: "ledger",
            label: "Ledger",
            href: "/acount/ledger",
            icon: BookOpenText,
          },
        ],
      },

      {
        id: "expenses",
        label: "Expenses",
        href: "#",
        badge: "3",
        icon: CreditCard,
        children: [
          {
            id: "expense-head",
            label: "Expense Head",
            href: "/expenses/expenses-heads",
            icon: Receipt,
          },
          {
            id: "expense-list",
            label: "Expense List",
            href: "/expenses/expenses-list",
            icon: FileText,
          },
          {
            id: "add-expense",
            label: "Add Expense",
            href: "/expenses/expenses-list/create",
            icon: BadgeIndianRupee,
          },
        ],
      },

      {
        id: "report",
        label: "Fees Report",
        href: "#",
        badge: "5",
        icon: BarChart3,
        children: [
          {
            id: "fees-report",
            label: "Fees Report",
            href: "#",
            icon: BarChart3,
          },
          {
            id: "transport-fee-report",
            label: "Transport Fee Report",
            href: "#",
            icon: Van,
          },
          {
            id: "hostel-fee-report",
            label: "Hostel Fee Report",
            href: "#",
            icon: Building,
          },
          {
            id: "transport-fee-report-class-wise",
            label: "Transport Fee Report (Class-wise)",
            href: "#",
            icon: Van,
          },
          {
            id: "hostel-fee-report-class-wise",
            label: "Hostel Fee Report (Class-wise)",
            href: "#",
            icon: Building,
          },
        ],
      },

      {
        id: "fees-collection",
        label: "Fees Collection",
        href: "#",
        badge: "3",
        icon: Wallet,
        children: [
          {
            id: "collect-fees",
            label: "Collect Fees",
            href: "#",
            icon: BadgeIndianRupee,
          },
          {
            id: "collect-hostel-fee",
            label: "Collect Hostel Fees",
            href: "#",
            icon: Building,
          },
          {
            id: "collect-transport-fee",
            label: "Collect Transport Fees",
            href: "#",
            icon: Van,
          },
        ],
      },
    ],
  },
  {
    id: "academic",
    label: "Academic",
    items: [
      {
        id: "class-room",
        label: "Class Room",
        href: "#",
        icon: School,
      },

      {
        id: "subject",
        label: "Subject",
        href: "#",
        icon: BookOpen,
      },

      {
        id: "classes",
        label: "Classes",
        href: "/",
        icon: Users,
      },

      {
        id: "time-table",
        label: "Time Table",
        href: "#",
        icon: Calendar,
        badge: "3",
        children: [
          {
            id: "class-time-table",
            label: "Class Time Table",
            href: "#",
            icon: CalendarDays,
          },
          {
            id: "teacher-time-table",
            label: "Teacher Time Table",
            href: "#",
            icon: UserRound,
          },
          {
            id: "school-time-table",
            label: "School Time Table",
            href: "#",
            icon: Clock3,
          },
        ],
      },

      {
        id: "study-material",
        label: "Study Material",
        href: "#",
        icon: LibraryBig,
      },

      {
        id: "homework",
        label: "Homework",
        href: "#",
        icon: NotebookPen,
      },

      {
        id: "assignments",
        label: "Assignments",
        href: "#",
        icon: ClipboardCheck,
      },

      {
        id: "question-bank",
        label: "Question Bank",
        href: "#",
        icon: FileQuestion,
      },

      {
        id: "online-exam",
        label: "Online Exam",
        href: "#",
        icon: MonitorCheck,
      },
    ],
  },
  {
    id: "examinations",
    label: "Examinations",
    items: [
      {
        id: "Exam Patterns",
        label: "Exam Patterns",
        href: "#",
        icon: ClipboardList,
      },
      {
        id: "examination",
        label: "Examination",
        href: "#",
        icon: FileCheck,
      },
    ],
  },
  {
    id: "management",
    label: "Management",
    items: [
      {
        id: "library",
        label: "Library",
        href: "#",
        icon: LibraryBig,
        badge: "2",
        children: [
          {
            id: "books",
            label: "Books",
            href: "#",
            icon: BookOpen,
          },
          {
            id: "circulation",
            label: "Circulation (Issues)",
            href: "#",
            icon: Repeat,
          },
        ],
      },

      {
        id: "hostel",
        label: "Hostel",
        href: "#",
        icon: Building,
      },

      {
        id: "transport",
        label: "Transport",
        href: "#",
        icon: Van,
        badge: "3",
        children: [
          {
            id: "drivers",
            label: "Drivers",
            href: "#",
            icon: UserRound,
          },
          {
            id: "vehicle",
            label: "Vehicle",
            href: "#",
            icon: Bus,
          },
          {
            id: "routes",
            label: "Routes",
            href: "#",
            icon: Route,
          },
        ],
      },
    ],
  },
  {
    id: "communication",
    label: "Communication",
    items: [
      {
        id: "logs-history",
        label: "Logs & History",
        href: "#",
        icon: History,
      },

      {
        id: "compose-mail-sms",
        label: "Compose Mail/SMS",
        href: "#",
        icon: Send,
      },
    ],
  },
  {
    id: "inventory",
    label: "Inventory",
    items: [
      {
        id: "inventory",
        label: "Inventory",
        href: "#",
        icon: Package,
        badge: "7",
        children: [
          {
            id: "inventory-dashboard",
            label: "Dashboard",
            href: "#",
            icon: LayoutDashboard,
          },
          {
            id: "stock-ledger",
            label: "Stock Ledger",
            href: "#",
            icon: BookOpenText,
          },
          {
            id: "items",
            label: "Items",
            href: "#",
            icon: Boxes,
          },
          {
            id: "categories",
            label: "Categories",
            href: "#",
            icon: Tags,
          },
          {
            id: "vendors",
            label: "Vendors",
            href: "#",
            icon: Store,
          },
          {
            id: "purchases",
            label: "Purchases",
            href: "#",
            icon: ShoppingCart,
          },
          {
            id: "sales",
            label: "Sales",
            href: "#",
            icon: BadgeIndianRupee,
          },
        ],
      },
    ],
  },

  {
    id: "reports",
    label: "Reports",
    items: [
      {
        id: "report",
        label: "Report",
        href: "#",
        icon: FileBarChart,
      },
    ],
  },
  {
    id: "e-learning",
    label: "E-Learning",
    items: [
      {
        id: "e-learning",
        label: "E-Learning",
        href: "#",
        icon: MonitorPlay,
      },
    ],
  },
  {
    id: "competitions",
    label: "Competitions",
    items: [
      {
        id: "competitions",
        label: "Competitions",
        href: "#",
        icon: Trophy,
      },
    ],
  },
  {
    id: "settings",
    label: "Settings",
    items: [
      {
        id: "academic-year-settings",
        label: "Academic Year Settings",
        href: "#",
        icon: CalendarCog,
        badge: "1",
        children: [
          {
            id: "academic-year-setting",
            label: "Academic Year Settings",
            href: "#",
            icon: CalendarCog,
          },
        ],
      },

      {
        id: "houses-activities",
        label: "Houses & Activities",
        href: "#",
        icon: Trophy,
        badge: "2",
        children: [
          {
            id: "house",
            label: "House",
            href: "#",
            icon: ShieldCheck,
          },
          {
            id: "additional-activities",
            label: "Additional Activities",
            href: "#",
            icon: Activity,
          },
        ],
      },

      {
        id: "school-base-settings",
        label: "School Base Settings",
        href: "#",
        icon: School,
        badge: "1",
        children: [
          {
            id: "general-settings",
            label: "General Settings",
            href: "#",
            icon: Settings,
          },
        ],
      },

      {
        id: "roles-permissions",
        label: "Roles & Permissions",
        href: "#",
        icon: ShieldCheck,
        badge: "1",
        children: [
          {
            id: "roles-permissions-management",
            label: "Roles & Permissions",
            href: "#",
            icon: KeyRound,
          },
        ],
      },
    ],
  },
  {
    id: "user-management",
    label: "User Management",
    items: [
      {
        id: "student-settings",
        label: "Student Settings",
        href: "/user-management/student-settting",
        icon: UserRoundCog,
      },

      {
        id: "school-admin-roles",
        label: "School Admin Roles",
        href: "/user-management/school-admin-roles",
        icon: ShieldCheck,
      },

      {
        id: "admin-password-reset",
        label: "Admin Password Reset",
        href: "/user-management/admin-password-reset",
        icon: KeyRound,
      },
    ],
  },
];
