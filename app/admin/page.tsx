"use client";

import React, { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/admin-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Calendar,
  BookOpen,
  Users,
  Zap,
  TrendingUp,
  Activity,
} from "lucide-react";

const COLORS = ["#8B5A96", "#40E0D0", "#FFD700", "#A569BD"];

interface StatCard {
  title: string;
  value: number;
  change: number;
  icon: React.ReactNode;
  color: string;
}

const STATS: StatCard[] = [
  {
    title: "Total Events",
    value: 12,
    change: 3,
    icon: <Calendar className="w-6 h-6" />,
    color: "from-jengacode-purple to-purple-600",
  },
  {
    title: "Blog Posts",
    value: 24,
    change: 5,
    icon: <BookOpen className="w-6 h-6" />,
    color: "from-jengacode-cyan to-cyan-600",
  },
  {
    title: "Active Users",
    value: 342,
    change: 12,
    icon: <Users className="w-6 h-6" />,
    color: "from-jengacode-yellow to-yellow-600",
  },
  {
    title: "Challenges Created",
    value: 18,
    change: 2,
    icon: <Zap className="w-6 h-6" />,
    color: "from-purple-500 to-pink-500",
  },
];

const CHART_DATA = [
  { month: "Jan", events: 4, attendees: 240, posts: 5 },
  { month: "Feb", events: 3, attendees: 220, posts: 8 },
  { month: "Mar", events: 5, attendees: 350, posts: 6 },
  { month: "Apr", events: 4, attendees: 290, posts: 7 },
  { month: "May", events: 6, attendees: 410, posts: 9 },
  { month: "Jun", events: 7, attendees: 480, posts: 11 },
];

const PIE_DATA = [
  { name: "Completed", value: 45 },
  { name: "In Progress", value: 30 },
  { name: "Pending", value: 25 },
];

export default function AdminDashboard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat) => (
            <Card key={stat.title} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color} text-white`}>
                    {stat.icon}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-600">
                    +{stat.change} this month
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Activity Overview</CardTitle>
            </CardHeader>
            <CardContent>
              {mounted && (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={CHART_DATA}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Bar dataKey="events" fill="#8B5A96" />
                    <Bar dataKey="posts" fill="#40E0D0" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Event Status</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              {mounted && (
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={PIE_DATA}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {PIE_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Attendee Trends</CardTitle>
          </CardHeader>
          <CardContent>
            {mounted && (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={CHART_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="attendees"
                    stroke="#8B5A96"
                    strokeWidth={2}
                    dot={{ fill: "#8B5A96", r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
              <Activity className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78%</div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                +5% from last month
              </p>
              <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-jengacode-purple to-jengacode-cyan h-2 rounded-full"
                  style={{ width: "78%" }}
                ></div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <TrendingUp className="w-4 h-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42%</div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                +8% from last month
              </p>
              <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full"
                  style={{ width: "42%" }}
                ></div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Audience Growth</CardTitle>
              <TrendingUp className="w-4 h-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+24%</div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                +12% from last month
              </p>
              <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
                  style={{ width: "24%" }}
                ></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
