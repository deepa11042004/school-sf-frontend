# Design System & Architecture Guide

This document outlines the standardized design system, component specifications, and architectural patterns used across the Next.js admin dashboards, forms, and data-heavy interfaces.

## 1. Tech Stack
- **Framework:** Next.js (App Router, utilizing `'use client'` for interactive components)
- **UI Library:** React, shadcn/ui (Card, Button, Input, Select, Table, Popover, Calendar, Dialog, Tabs, Badges, Checkbox, Label)
- **Styling:** Tailwind CSS (with dark mode support)
- **Icons:** lucide-react
- **Utilities:** date-fns (for date formatting), `cn` (clsx + tailwind-merge)
- **Database/Storage:** MySQL (Images stored as binary BLOBs to reduce infrastructure costs)

---

## 2. Color Palette
- **Primary:** Indigo (`indigo-600`, `indigo-700`, `indigo-100`, `indigo-800`)
- **Text & Borders:** Slate (`slate-50`, `slate-100`, `slate-400`, `slate-500`, `slate-600`, `slate-900`)
- **Dark Mode Overrides:** Neutral (`neutral-800`, `neutral-900`) or Gray (`gray-300`)
- **Status Colors:**
  - **Success/Active:** Green (`green-100`, `green-600`, `green-800`)
  - **Warning/Pending:** Yellow/Amber (`yellow-50`, `yellow-600`, `amber-100`)
  - **Error/Danger:** Red (`red-50`, `red-500`, `red-600`, `red-800`)
  - **Info:** Blue/Cyan (`blue-50`, `cyan-100`)

---

## 3. Component Specifications

### Buttons
- **Primary (Add/Create/Submit):** `bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm`
- **Secondary/Filter:** `bg-indigo-100 text-indigo-700 hover:bg-indigo-200 border-0`
- **Outline/Print:** `border-0 hover:bg-gray-300 dark:hover:bg-neutral-900`
- **Action (Edit/Icon):** `variant="ghost" size="sm" border border-black/20 dark:border-white/20` (or specific icon colors like `text-indigo-600 hover:bg-indigo-50`)
- **Pagination Active:** `bg-indigo-600 text-white hover:bg-indigo-700`
- **Pagination Inactive:** `hover:bg-slate-100/20`

### Inputs & Search
- **Search Input:** `focus-visible:ring-indigo-500`, Search icon `text-slate-400`
- **Calendar Icon:** `text-slate-500`
- **General Inputs:** Standard shadcn styling with indigo focus rings.

### Tables
- **Container:** `Card` with `shadow-sm`, `CardContent` with `p-0`.
- **Headers:** `bg-slate-50/10 hover:bg-slate-50/10`, `text-xs font-semibold text-slate-500 uppercase tracking-wider py-3`
- **Rows:** `border-b last:border-b-0 hover:bg-gray-300 dark:hover:bg-neutral-800 transition-colors`
- **Sticky Columns:** Used for complex reports (e.g., `sticky left-0 z-10 bg-white group-hover:bg-gray-50`).

### Badges & Tags
- **Standard:** `bg-indigo-100 text-indigo-800` (often with `rounded-full text-xs font-medium px-2.5 py-0.5`)
- **Status:** Contextual colors (e.g., `bg-green-100 text-green-800` for Active).

### Pagination
- **Active Page:** `bg-indigo-600 text-white hover:bg-indigo-700`
- **Inactive Page:** `hover:bg-slate-100/20`
- **Ellipsis:** `text-slate-400`
- **Info Text (Showing entries):** `text-sm text-slate-600`

### Empty & Loading States
- **Loading Spinner:** `border-b-2 border-indigo-600` (animated spin)
- **No Data:** `bg-slate-100` container with `FileText` (`text-slate-400`) and text `text-slate-500`.
- **Error/No Results:** `bg-red-50` container with `AlertCircle` (`text-red-500`) and text `text-slate-500`.

### Dialogs & Modals
- **Print/Export Dialog Icons:** PDF `text-red-500`, Excel/CSV `text-green-600`.
- **Structure:** `DialogContent` with `DialogHeader`, `DialogTitle`, `DialogDescription`, and `DialogFooter`.

---

## 4. Layout & Page Structure

### Standard Admin Page Layout
1. **Wrapper:** `min-h-screen p-4 md:p-6 lg:p-8`
2. **Container:** `max-w-7xl mx-auto space-y-6` (or `max-w-[100rem]` for wide tables/reports).
3. **Header Section:**
   - Breadcrumbs: `flex text-sm text-slate-500 mb-2` (Dashboard / Page Name)
   - Title: `text-2xl sm:text-3xl font-bold tracking-tight`
   - Actions (Right aligned): Primary/Outline buttons.
4. **Filter/Search Section:**
   - Wrapped in a `Card` with `shadow-sm`.
   - Grid layout (`grid gap-4 md:grid-cols-4` or `5`).
   - Uses `Label`, `Input`, `Select`, `Popover` (for calendars).
5. **Data Table Section:**
   - Wrapped in a `Card` with `shadow-sm`, `p-0`.
   - **Top Controls:** "Show X entries" dropdown, Search bar, "Showing X to Y of Z entries" text.
   - **Table:** Standard shadcn Table.
   - **Pagination:** Bottom aligned, centered or space-between with info text.

### Buttons

* **Primary (Add/Create/Submit):** `bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm`
* **Secondary/Filter:** `bg-indigo-100 text-indigo-700 hover:bg-indigo-200 border-0`
* **Outline/Print:** `border-0 hover:bg-gray-300 dark:hover:bg-neutral-900`

#### Action Buttons

**Edit Button**

```tsx
<Button
  variant="ghost"
  size="sm"
  className="border border-black/20 dark:border-white/20"
>
  Edit
</Button>
```

**Delete Button**

```tsx
<Button
  variant="ghost"
  size="sm"
  className="border border-red-600 dark:border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
>
  Delete
</Button>
```

**Guidelines**

* Use **Edit** for update/modify actions.

* Use **Delete** for destructive actions.

* Maintain consistent sizing with `size="sm"` in tables and action columns.

* Prefer `variant="ghost"` for row-level actions to reduce visual clutter.

* Delete actions should always use red accents to indicate destructive behavior.

### Pagination

#### Styles

* **Active Page:** `bg-indigo-600 text-white hover:bg-indigo-700`
* **Inactive Page:** `hover:bg-slate-100/20`
* **Ellipsis:** `text-slate-400`
* **Navigation Buttons:** `variant="outline" size="sm" className="h-8 w-8 p-0"`
* **Container:** `p-4 sm:p-6 border-t border-slate-100`
* **Layout:** `flex flex-col sm:flex-row items-center justify-between gap-4`

#### Standard Pagination Component

```tsx id="w06yq8"
{/* Pagination */}
{totalPages > 0 && (
  <div className="p-4 sm:p-6 border-t border-slate-100">
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            setCurrentPage((prev) => Math.max(1, prev - 1))
          }
          disabled={currentPage === 1}
          className="h-8 w-8 p-0"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex items-center gap-1">
          {getPageNumbers().map((page, index) => {
            if (page === "...") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="px-3 py-1 text-slate-400"
                >
                  ...
                </span>
              );
            }

            return (
              <Button
                key={page}
                variant={
                  currentPage === page ? "default" : "outline"
                }
                size="sm"
                onClick={() => setCurrentPage(page as number)}
                className={`h-8 w-8 p-0 ${
                  currentPage === page
                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                    : "hover:bg-slate-100/20"
                }`}
              >
                {page}
              </Button>
            );
          })}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            setCurrentPage((prev) =>
              Math.min(totalPages, prev + 1)
            )
          }
          disabled={currentPage === totalPages}
          className="h-8 w-8 p-0"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  </div>
)}
```

#### Guidelines

* Show pagination only when `totalPages > 0`.
* Use numbered page buttons with ellipsis for large datasets.
* Previous and Next buttons must be disabled at boundary pages.
* Active page must use the Indigo primary color.
* Pagination should appear below tables inside the Card container.
* Maintain consistent sizing using `h-8 w-8 p-0`.
* Use `ChevronLeft` and `ChevronRight` icons from `lucide-react`.

### Dashboard / Stats Layout
- Grid-based stat dashboards (`grid gap-4 md:grid-cols-3`).
- Cards with left border accents (`border-l-4 border-l-indigo-600`) for stats.
- Config-driven UI for toggling sections.

### Forms / Settings Layout
- `max-w-3xl` or `max-w-5xl` container.
- Grouped into `Card` components by category (e.g., "School Information", "Address Information").
- Footer actions aligned to the end (`flex justify-end`).

---

## 6. ERP Form Standards

### Standard Create/Edit Form Layout

All create and edit pages should follow:

```tsx
<div className="space-y-6 p-4 md:p-6">
```

Form Container:

```tsx
<Card>
  <CardHeader>
    <CardTitle>Section Title</CardTitle>
  </CardHeader>

  <CardContent>
    <form className="space-y-6">
      ...
    </form>
  </CardContent>
</Card>
```

### Required Fields

Always use:

```tsx
<Label>
  Field Name <span className="text-destructive">*</span>
</Label>
```

Never hardcode `*` inside field text.

### Form Grids

Two Columns:

```tsx
<div className="grid gap-6 md:grid-cols-2">
```

Three Columns:

```tsx
<div className="grid gap-6 md:grid-cols-3">
```

Four Columns:

```tsx
<div className="grid gap-6 lg:grid-cols-4">
```

### Footer Actions

Standard form footer:

```tsx
<div className="flex flex-wrap gap-3">
  <Button type="submit">
    Save Changes
  </Button>

  <Button variant="outline">
    Cancel
  </Button>
</div>
```

---

## 7. Selection Card Pattern

Used For:

* Subjects
* Classes
* Teachers
* Permissions
* Months
* Students
* Question Selection
* Exam Selection

Container:

```tsx
<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
```

Selectable Card:

```tsx
<button
  type="button"
  className={cn(
    "flex items-center gap-3 rounded-lg border p-3 text-left transition-all",
    checked
      ? "border-indigo-500 bg-indigo-50"
      : "hover:bg-muted/50"
  )}
>
```

Checkbox:

```tsx
<input
  type="checkbox"
  checked={checked}
  readOnly
  className="h-4 w-4"
/>
```

---

## 8. Popup Multi-Select Pattern

Used For:

* Teachers
* Subjects
* Classes
* Permissions

Structure:

```tsx
<Dialog>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Select Items</DialogTitle>
    </DialogHeader>

    <div className="max-h-72 overflow-y-auto">
      ...
    </div>
  </DialogContent>
</Dialog>
```

Trigger:

```tsx
<Button
  variant="outline"
  className="w-full justify-between"
>
```

---

## 9. Calendar & Date Standards

Never use:

```tsx
<Input type="date" />
```

Use Shadcn Calendar.

Standard Pattern:

```tsx
<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">
      <CalendarIcon />
    </Button>
  </PopoverTrigger>

  <PopoverContent>
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
    />
  </PopoverContent>
</Popover>
```

Date-Time Fields:

```tsx
Date = Shadcn Calendar
Time = Input type="time"
```

---

## 10. Notice Box System

### Information Notice

```tsx
<div className="rounded-lg border border-indigo-200 bg-indigo-50 p-4">
```

### Warning Notice

```tsx
<div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
```

### Danger Notice

```tsx
<div className="rounded-lg border border-red-200 bg-red-50 p-4">
```

### Success Notice

```tsx
<div className="rounded-lg border border-green-200 bg-green-50 p-4">
```

Text Style:

```tsx
<p className="text-sm">
```

---

## 11. Danger Zone Pattern

Used For:

* Student Deletion
* Factory Reset
* Data Cleanup
* Permanent Actions

Danger Card:

```tsx
<Card className="border-red-700">
```

Danger Header:

```tsx
<CardHeader className="bg-red-700">
```

Selected Danger Action:

```tsx
bg-red-600
text-white
hover:bg-red-700
```

Inactive Action:

```tsx
bg-white
text-red-700
border-red-200
hover:bg-red-50
```

Confirmation Checkbox:

```tsx
<div className="flex items-start space-x-3 rounded-lg border p-4">
```

---

## 12. Accordion Management Modules

Used For:

* Roles & Permissions
* Front Office Setup
* Category Masters

Container:

```tsx
<Accordion
  type="multiple"
  className="grid gap-4"
>
```

Card Style:

```tsx
<AccordionItem
  className="overflow-hidden rounded-xl border bg-card"
>
```

Header:

```tsx
<AccordionTrigger>
```

---


### Filter & Reset Buttons

#### Filter Toggle Button

Used when filter section is collapsible or hidden by default:

```tsx
<Button variant="outline" className="w-full">
  <Filter className="mr-2 h-4 w-4" />
  Filters
</Button>


## 13. Dashboard Stat Cards

Used For:

* Cashflow
* Reports
* Attendance
* Academic Dashboard

Grid:

```tsx
<div className="grid gap-4 md:grid-cols-3">
```

Card Style:

```tsx
<Card className="border-l-4 border-l-indigo-600">
```

Metric:

```tsx
<p className="text-3xl font-bold">
```

Label:

```tsx
<p className="text-sm text-muted-foreground">
```

---

## 14. File Upload Standards

Used For:

* Homework
* Assignments
* Study Materials
* Expenses
* Documents

Upload Area:

```tsx
<label
  className="
    flex
    cursor-pointer
    flex-col
    items-center
    justify-center
    rounded-lg
    border-2
    border-dashed
    p-8
  "
>
```

Upload Icon:

```tsx
<Upload className="h-8 w-8" />
```

Allowed Types:

```tsx
<p className="text-sm text-muted-foreground">
```

---

## 15. Timetable Standards

Workflow:

1. Select Class
2. Select Section
3. Click Load Timetable
4. Show Timetable Below

Never show timetable before loading.

Header Information:

```tsx
Class: NC | Section: A

Class Teacher: PUJA
```

Periods:

```tsx
Period 1
Period 2
...
Period 8
```

Each Period Contains:

* Subject
* Teacher
* From Time
* To Time

---

## 16. ERP UX Rules

### Always Use

✅ Cards

✅ Section Titles

✅ Required Field Indicators

✅ Responsive Grids

✅ Calendar Components

✅ Selection Cards

✅ Notice Boxes

✅ Confirmation Checkboxes

✅ Dialog-Based Multi Selection

✅ Color-Coded Status Indicators

### Avoid

❌ Browser Date Inputs

❌ Long Forms Without Sections

❌ Plain HTML Layouts

❌ White Empty Screens

❌ Multiple Correct Answers For MCQ

❌ Using Destructive Variant For ERP Actions

Instead use custom red theme:

```tsx
bg-red-600 hover:bg-red-700 text-white
```

for permanent operations.

---

## 17. School ERP Module Consistency

All modules must follow the same visual language:

* Front Office
* Students
* Staff
* Attendance
* Fees
* Accounts
* Academic
* Examinations
* Competitions
* Library
* Hostel
* Transport
* Inventory
* Communication
* Reports
* Settings

This ensures a consistent user experience across the entire ERP system.




## 5. Code Architecture & Patterns

### Component Structure
- Always start with `"use client";` for interactive pages.
- Import shadcn components from `@/components/ui/...`.
- Import icons from `lucide-react`.
- Define TypeScript interfaces for data structures (e.g., `interface Student { id: string; name: string; ... }`).
- Use dummy data arrays for initial rendering/mockups.

### State Management
- Use `useState` for local component state (filters, pagination, search terms, dialog visibility).
- **Pagination Logic:**
  ```typescript
  const [entriesPerPage, setEntriesPerPage] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / parseInt(entriesPerPage));
  const startIndex = (currentPage - 1) * parseInt(entriesPerPage);
  const currentData = data.slice(startIndex, startIndex + parseInt(entriesPerPage));