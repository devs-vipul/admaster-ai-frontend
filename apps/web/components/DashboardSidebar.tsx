"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth, UserButton } from "@clerk/nextjs";
import {
  LayoutDashboard,
  Zap,
  Grid3x3,
  Pencil,
  Bell,
  Building2,
  Gem,
  Settings,
  Plus,
  User,
  HelpCircle,
  LogOut,
  Moon,
  Sun,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useGetUserBusinessesQuery } from "@/lib/store/api/businessApi";
import { ROUTES } from "@/lib/constants/routes";
import { useTheme } from "next-themes";

interface SidebarItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  badge?: string;
  children?: SidebarItem[];
}

const monitoringItems: SidebarItem[] = [
  { label: "Dashboard", icon: Grid3x3, href: ROUTES.MONITORING.DASHBOARD },
  { label: "Optimizer", icon: Pencil, href: ROUTES.MONITORING.OPTIMIZER },
  { label: "Notifications", icon: Bell, href: ROUTES.MONITORING.NOTIFICATIONS },
  { label: "Billing • ₹0", icon: Building2, href: ROUTES.MONITORING.BILLING },
  { label: "Assets", icon: Gem, href: ROUTES.MONITORING.ASSETS },
];

const campaignItems: SidebarItem[] = [
  { label: "New Campaign", icon: Plus, href: ROUTES.CAMPAIGNS.NEW },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { data: businessesData } = useGetUserBusinessesQuery(undefined, {
    skip: false,
  });

  const businesses = businessesData?.businesses || [];
  const currentBusiness = businesses[0]; // For now, use first business

  const isActive = (href?: string) => {
    if (!href) return false;
    return pathname === href || pathname?.startsWith(href);
  };

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-background">
      {/* Organization Dropdown (Top) */}
      <div className="border-b p-4">
        <div className="mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Organization
        </div>
        {currentBusiness ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-between px-2"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded bg-primary/10 text-primary">
                    <span className="text-xs font-semibold">
                      {currentBusiness.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="font-medium">{currentBusiness.name}</span>
                </div>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>My Business</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {businesses.map((business, index) => (
                <DropdownMenuItem
                  key={business.id || `business-${index}`}
                  onClick={() => router.push(ROUTES.DASHBOARD)}
                >
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded bg-primary/10 text-primary">
                      <span className="text-xs">
                        {business.name?.charAt(0).toUpperCase() || "?"}
                      </span>
                    </div>
                    <span>{business.name || "Unnamed Business"}</span>
                  </div>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => router.push(ROUTES.BUSINESS_CREATION.SETTINGS)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Create business
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button
            variant="outline"
            className="w-full"
            onClick={() => router.push(ROUTES.BUSINESS_CREATION.SETTINGS)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Create business
          </Button>
        )}
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto p-4">
        <nav className="space-y-6">
          {/* Getting Started */}
          <div>
            <Link
              href={ROUTES.DASHBOARD}
              className={cn(
                "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive(ROUTES.DASHBOARD)
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Zap className="h-4 w-4" />
              Getting started • 1/6
            </Link>
          </div>

          {/* Monitoring Section */}
          <div>
            <div className="mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Monitoring
            </div>
            <div className="space-y-1">
              {monitoringItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href || "#"}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                    isActive(item.href)
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Settings */}
          <div>
            <Link
              href={
                currentBusiness
                  ? ROUTES.BUSINESS.SETTINGS(currentBusiness.id)
                  : "#"
              }
              className={cn(
                "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                isActive(
                  currentBusiness
                    ? ROUTES.BUSINESS.SETTINGS(currentBusiness.id)
                    : undefined
                )
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </div>

          {/* Ad Campaigns */}
          <div>
            <div className="mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Ad Campaigns
            </div>
            <div className="space-y-1">
              {campaignItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href || "#"}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                    isActive(item.href)
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </div>

      {/* Account Dropdown (Bottom) */}
      <div className="border-t p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-between px-2">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="font-medium">Account</span>
              </div>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="flex items-center justify-between px-2 py-1.5">
              <div className="flex items-center gap-2">
                {theme === "dark" ? (
                  <Moon className="h-4 w-4" />
                ) : (
                  <Sun className="h-4 w-4" />
                )}
                <span className="text-sm">Dark Mode</span>
              </div>
              <Switch
                checked={theme === "dark"}
                onCheckedChange={(checked) =>
                  setTheme(checked ? "dark" : "light")
                }
              />
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              My account
            </DropdownMenuItem>
            <DropdownMenuItem>
              <HelpCircle className="mr-2 h-4 w-4" />
              Support
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

