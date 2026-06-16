"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Package,
  Users,
  TrendingUp,
  ShoppingCart,
  ArrowRight,
  Activity,
  FileText,
HeartPlus ,
  Plus,
  ClipboardList,
  Layers3,
  Grid2x2,
} from "lucide-react";

const actions = [
  {
    label: "New Sale",
    href: "/inventory/sales/create",
    icon: Plus,
    className: "bg-indigo-500 hover:bg-indigo-600 text-white",
  },
  {
    label: "New Purchase",
    href: "/inventory/purchases/create",
    icon: ShoppingCart,
    className: "bg-blue-600 hover:bg-blue-700 text-white",
  },
  {
    label: "Add Item",
    href: "/inventory/items/create",
    icon: Plus,
    className: "bg-slate-800 hover:bg-slate-900 text-white",
  },
  {
    label: "View Stock Summary",
    href: "/inventory/stocks/summary",
    icon: ClipboardList,
    className: "bg-zinc-700 hover:bg-zinc-800 text-white",
  },
  {
    label: "Stock Ledger",
    href: "/inventory/stocks/ledger",
    icon: Layers3,
    className: "bg-cyan-400 hover:bg-cyan-500 text-white",
  },
  {
    label: "Manage Categories",
    href: "/inventory/categories",
    icon: Grid2x2,
    className:
      "border border-indigo-500 bg-white text-indigo-600 hover:bg-indigo-50",
  },
];

const InventoryAnalysis = [
  {
    title: "Stock Movement",
    href: "/inventory/stocks/ledger",
    description: "Track item inflow and outflow.",
    icon: Activity,
    cta: "Open Ledger",
    className:
      "border border-indigo-500 bg-white text-indigo-600 hover:bg-indigo-50",
  },
  {
    title: "Current Stock",
    href: "/inventory/stocks/summary",
    description: "See available inventory summary.",
    icon: Package,
    cta: "Stock Summary",
    className:
      "border border-indigo-500 bg-white text-indigo-600 hover:bg-indigo-50",
  },
  {
    title: "Inventory Health",
    href: "/inventory/stocks/ledger",
    description: "Use this to spot low stock items quickly.",
    icon: HeartPlus ,
    cta: "Open Ledger",
    className: "border border-red-500 bg-white text-red-600 hover:bg-red-50",
  },
];

export default function InventoryDashboard() {
  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8 bg-slate-50/50 dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
              Inventory Dashboard
            </h1>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Total Items",
              value: "0",
              icon: Package,
              color: "border-l-indigo-600",
              iconColor: "text-indigo-600",
              bgIcon: "bg-indigo-50 dark:bg-indigo-950",
              delay: "delay-100",
            },
            {
              title: "Total Vendors",
              value: "0",
              icon: Users,
              color: "border-l-blue-600",
              iconColor: "text-blue-600",
              bgIcon: "bg-blue-50 dark:bg-blue-950",
              delay: "delay-200",
            },
            {
              title: "Total Sales",
              value: "0",
              icon: TrendingUp,
              color: "border-l-green-600",
              iconColor: "text-green-600",
              bgIcon: "bg-green-50 dark:bg-green-950",
              delay: "delay-300",
            },
            {
              title: "Total Purchases",
              value: "0",
              icon: ShoppingCart,
              color: "border-l-amber-600",
              iconColor: "text-amber-600",
              bgIcon: "bg-amber-50 dark:bg-amber-950",
              delay: "delay-400",
            },
          ].map((stat, index) => (
            <Card
              key={index}
              className={`border-l-4 ${stat.color} shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md animate-in fade-in-0 slide-in-from-bottom-4 fill-mode-forwards ${stat.delay}`}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-slate-50 mt-1">
                      {stat.value}
                    </p>
                  </div>
                  <div
                    className={`p-3 rounded-full ${stat.bgIcon} ${stat.iconColor} transition-transform duration-300 group-hover:scale-110`}
                  >
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Quick Actions</h2>

          <div className="flex flex-wrap gap-4">
            {actions.map((action) => {
              const Icon = action.icon;

              return (
                <Link
                  key={action.label}
                  href={action.href}
                  className={`
                inline-flex items-center gap-2 rounded-md px-5 py-3
                text-sm font-medium transition-colors
                ${action.className}
              `}
                >
                  <Icon className="h-4 w-4" />
                  {action.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Inventory Analysis */}
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Inventory Analysis</CardTitle>
            </div>

            <Button asChild variant="outline">
              <Link href="/inventory/stock-ledger">
                View Ledger
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>

          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {InventoryAnalysis.map((item) => (
                <Card
                  key={item.title}
                  className="h-full transition-all hover:border-indigo-200 hover:shadow-md"
                >
                  <CardContent className="flex h-full flex-col p-6">
                    <item.icon className="mb-3 h-8 w-8 text-indigo-500" />

                    <h3 className="font-semibold">{item.title}</h3>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.description}
                    </p>

                    <div className="mt-auto pt-4  flex items-center justify-center ">
                      <Button
                        asChild
                        variant="ghost"
                        className="group px-0 text-white w-full  border border-white/20"
                      >
                        <Link href={item.href}>
                          {item.cta}
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:-rotate-45" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Tables Section */}
        <div className="grid gap-6 lg:grid-cols-2 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-700 fill-mode-forwards">
          {/* Recent Sales */}
          <Card className="shadow-sm border border-slate-200 dark:border-neutral-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-semibold">
                Recent Sales
              </CardTitle>
              <Button variant="ghost" size="sm" className="text-indigo-600">
                View All
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50/50 dark:bg-neutral-900/50 hover:bg-slate-50/50">
                      <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                        Sale No
                      </TableHead>
                      <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                        Date
                      </TableHead>
                      <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider text-right py-3">
                        Amount
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={3} className="h-40 text-center">
                        <div className="flex flex-col items-center justify-center gap-2 text-slate-400">
                          <div className="p-3 rounded-full bg-slate-100 dark:bg-neutral-800">
                            <FileText className="h-6 w-6 text-slate-400" />
                          </div>
                          <p className="text-sm font-medium text-slate-500">
                            No sales found
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Recent Purchases */}
          <Card className="shadow-sm border border-slate-200 dark:border-neutral-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-semibold">
                Recent Purchases
              </CardTitle>
              <Button variant="ghost" size="sm" className="text-indigo-600">
                View All
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50/50 dark:bg-neutral-900/50 hover:bg-slate-50/50">
                      <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                        PO No
                      </TableHead>
                      <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                        Vendor
                      </TableHead>
                      <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider text-right py-3">
                        Amount
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={3} className="h-40 text-center">
                        <div className="flex flex-col items-center justify-center gap-2 text-slate-400">
                          <div className="p-3 rounded-full bg-slate-100 dark:bg-neutral-800">
                            <FileText className="h-6 w-6 text-slate-400" />
                          </div>
                          <p className="text-sm font-medium text-slate-500">
                            No purchases found
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
