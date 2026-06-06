import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Users, Award } from "lucide-react";
interface StatCardProps {
  title: string;
  value: number;
  active: number;
  inactive: number;
  icon: React.ReactNode;
  bgColor: string;
}

 

const StatCard = ({
  title,
  value,
  active,
  inactive,
  icon,
  bgColor,
}: StatCardProps) => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <div className="flex items-center gap-3 min-w-0">
        <div className={`p-3 rounded-full ${bgColor} shrink-0`}>{icon}</div>
        <div className="min-w-0">
          <CardTitle className="text-2xl font-bold truncate">{value}</CardTitle>
          <p className="text-sm text-muted-foreground truncate">{title}</p>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <div className="flex justify-between text-sm pt-2 border-t gap-2">
        <span className="text-muted-foreground flex items-center gap-1 min-w-0">
          Active:{" "}
          <Badge variant="secondary" className="ml-1 shrink-0">
            {active}
          </Badge>
        </span>
        <span className="text-muted-foreground flex items-center gap-1 min-w-0 justify-end">
          Inactive:{" "}
          <Badge variant="outline" className="ml-1 shrink-0">
            {inactive}
          </Badge>
        </span>
      </div>
    </CardContent>
  </Card>
);

const TopStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      <StatCard
        title="Total Students"
        value={0}
        active={0}
        inactive={0}
        icon={<GraduationCap className="h-6 w-6 text-pink-600" />}
        bgColor="bg-pink-100 dark:bg-pink-900/30"
      />
      <StatCard
        title="Total Teachers"
        value={0}
        active={0}
        inactive={0}
        icon={<Users className="h-6 w-6 text-cyan-600" />}
        bgColor="bg-cyan-100 dark:bg-cyan-900/30"
      />
      <StatCard
        title="Total Classes"
        value={0}
        active={0}
        inactive={0}
        icon={<Award className="h-6 w-6 text-yellow-600" />}
        bgColor="bg-yellow-100 dark:bg-yellow-900/30"
      />
    </div>
  );
};

export default TopStats;
