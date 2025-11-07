"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
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
  ChevronRight,
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Switch } from "@/components/ui/switch";
import { useGetUserBusinessesQuery } from "@/lib/store/api/businessApi";
import { ROUTES } from "@/lib/constants/routes";
import { useTheme } from "next-themes";
import { useAuth } from "@clerk/nextjs";

const monitoringItems = [
  { label: "Dashboard", icon: Grid3x3, href: ROUTES.DASHBOARD_ROUTE },
  { label: "Optimizer", icon: Pencil, href: ROUTES.MONITORING.OPTIMIZER },
  { label: "Notifications", icon: Bell, href: ROUTES.MONITORING.NOTIFICATIONS },
];

const campaignItems = [
  { label: "New Campaign", icon: Plus, href: ROUTES.CAMPAIGNS.NEW },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { isLoaded: authLoaded, userId } = useAuth();
  const {
    data: businessesData,
    error,
    isLoading,
  } = useGetUserBusinessesQuery(undefined, {
    skip: !authLoaded || !userId, // Skip query until auth is loaded and user is authenticated
  });

  // Debug: Log query state
  useEffect(() => {
    if (error) {
      console.error("Businesses query error:", error);
    }
    if (isLoading) {
      console.log("Loading businesses...", { authLoaded, userId });
    }
  }, [error, isLoading, authLoaded, userId]);

  const businesses = businessesData?.businesses || [];
  const currentBusiness = businesses[0]; // For now, use first business
  // Handle both id and _id from backend (backend uses _id, frontend expects id)
  const businessId =
    currentBusiness?.id || (currentBusiness as any)?._id || undefined;

  // Debug: Log to console
  useEffect(() => {
    console.log("Businesses Data:", businessesData);
    console.log("Current Business:", currentBusiness);
    console.log("Business ID:", businessId);
  }, [businessesData, currentBusiness, businessId]);

  // State for collapsible sections
  const billingPath = businessId ? ROUTES.BILLING.BASE(businessId) : "";
  const assetsPath = businessId ? ROUTES.ASSETS.BASE(businessId) : "";
  const settingsPath = businessId ? ROUTES.SETTINGS.BASE(businessId) : "";

  const [billingOpen, setBillingOpen] = useState(
    pathname?.includes("/settings/billing") || false,
  );
  const [assetsOpen, setAssetsOpen] = useState(
    pathname?.includes("/assets") || false,
  );
  const [settingsOpen, setSettingsOpen] = useState(
    (pathname?.includes("/settings") &&
      !pathname?.includes("/settings/billing")) ||
      false,
  );

  const isActive = (href?: string) => {
    if (!href || !pathname) return false;
    // For root path, only match exactly
    if (href === ROUTES.DASHBOARD) {
      return pathname === ROUTES.DASHBOARD;
    }
    // For dashboard route, only match exactly
    if (href === ROUTES.DASHBOARD_ROUTE) {
      return pathname === ROUTES.DASHBOARD_ROUTE;
    }
    // For other paths, check exact match or starts with the path followed by /
    return pathname === href || pathname.startsWith(href + "/");
  };

  const isSubmenuActive = (basePath: string) => {
    if (!pathname) return false;
    // For billing, check if pathname includes /settings/billing
    if (basePath.includes("/settings/billing")) {
      return pathname.includes("/settings/billing");
    }
    // For settings, check if pathname includes /settings but exclude /settings/billing
    if (
      basePath.includes("/settings") &&
      !basePath.includes("/settings/billing")
    ) {
      return (
        pathname.includes("/settings") &&
        !pathname.includes("/settings/billing")
      );
    }
    // For assets, check if pathname includes /assets
    if (basePath.includes("/assets")) {
      return pathname.includes("/assets");
    }
    return pathname.includes(basePath);
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
              <Button variant="ghost" className="w-full justify-between px-2">
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
        <nav className="space-y-1">
          {/* Getting Started */}
          <Link
            href={ROUTES.TIMELINE}
            className={cn(
              "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              isActive(ROUTES.TIMELINE)
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
            )}
          >
            <Zap className="h-4 w-4" />
            Getting started • 1/6
          </Link>

          {/* Monitoring Section */}
          <div className="pt-2">
            <div className="mb-2 px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
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
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Billing Section with Expandable Submenus */}
          <Collapsible open={billingOpen} onOpenChange={setBillingOpen}>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-between px-3 py-2 text-sm",
                  isSubmenuActive(billingPath)
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                )}
                onClick={(e) => {
                  if (businessId && !billingOpen) {
                    e.preventDefault();
                    router.push(ROUTES.BILLING.CREDIT(businessId));
                    setBillingOpen(true);
                  }
                }}
              >
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  <span>Billing • ₹0</span>
                </div>
                {billingOpen ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-1 pl-4">
              {businessId ? (
                <>
                  <Link
                    href={ROUTES.BILLING.CREDIT(businessId)}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                      isActive(ROUTES.BILLING.CREDIT(businessId))
                        ? "bg-accent text-accent-foreground font-medium"
                        : "text-foreground hover:bg-accent hover:text-accent-foreground",
                    )}
                  >
                    Credit
                  </Link>
                  <Link
                    href={ROUTES.BILLING.SUBSCRIPTIONS(businessId)}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                      isActive(ROUTES.BILLING.SUBSCRIPTIONS(businessId))
                        ? "bg-accent text-accent-foreground font-medium"
                        : "text-foreground hover:bg-accent hover:text-accent-foreground",
                    )}
                  >
                    Subscriptions
                  </Link>
                  <Link
                    href={ROUTES.BILLING.PAYMENTS(businessId)}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                      isActive(ROUTES.BILLING.PAYMENTS(businessId))
                        ? "bg-accent text-accent-foreground font-medium"
                        : "text-foreground hover:bg-accent hover:text-accent-foreground",
                    )}
                  >
                    Payments
                  </Link>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground opacity-50 cursor-not-allowed">
                    Credit
                  </div>
                  <div className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground opacity-50 cursor-not-allowed">
                    Subscriptions
                  </div>
                  <div className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground opacity-50 cursor-not-allowed">
                    Payments
                  </div>
                </>
              )}
            </CollapsibleContent>
          </Collapsible>

          {/* Assets Section with Expandable Submenus */}
          <Collapsible open={assetsOpen} onOpenChange={setAssetsOpen}>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-between px-3 py-2 text-sm",
                  isSubmenuActive(assetsPath)
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                )}
                onClick={(e) => {
                  if (businessId && !assetsOpen) {
                    e.preventDefault();
                    router.push(ROUTES.ASSETS.MEDIA_GALLERY(businessId));
                    setAssetsOpen(true);
                  }
                }}
              >
                <div className="flex items-center gap-2">
                  <Gem className="h-4 w-4" />
                  <span>Assets</span>
                </div>
                {assetsOpen ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-1 pl-4">
              {businessId ? (
                <>
                  <Link
                    href={ROUTES.ASSETS.MEDIA_GALLERY(businessId)}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                      isActive(ROUTES.ASSETS.MEDIA_GALLERY(businessId))
                        ? "bg-accent text-accent-foreground font-medium"
                        : "text-foreground hover:bg-accent hover:text-accent-foreground",
                    )}
                  >
                    Media Gallery
                  </Link>
                  <Link
                    href={ROUTES.ASSETS.COPYWRITING(businessId)}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                      isActive(ROUTES.ASSETS.COPYWRITING(businessId))
                        ? "bg-accent text-accent-foreground font-medium"
                        : "text-foreground hover:bg-accent hover:text-accent-foreground",
                    )}
                  >
                    Copywriting
                  </Link>
                  <Link
                    href={ROUTES.ASSETS.CUSTOMER_DATA(businessId)}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                      isActive(ROUTES.ASSETS.CUSTOMER_DATA(businessId))
                        ? "bg-accent text-accent-foreground font-medium"
                        : "text-foreground hover:bg-accent hover:text-accent-foreground",
                    )}
                  >
                    Customer Lists
                  </Link>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground opacity-50 cursor-not-allowed">
                    Media Gallery
                  </div>
                  <div className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground opacity-50 cursor-not-allowed">
                    Copywriting
                  </div>
                  <div className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground opacity-50 cursor-not-allowed">
                    Customer Lists
                  </div>
                </>
              )}
            </CollapsibleContent>
          </Collapsible>

          {/* Settings Section with Expandable Submenus */}
          <Collapsible open={settingsOpen} onOpenChange={setSettingsOpen}>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-between px-3 py-2 text-sm",
                  isSubmenuActive(settingsPath)
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                )}
                onClick={(e) => {
                  if (businessId && !settingsOpen) {
                    e.preventDefault();
                    router.push(ROUTES.SETTINGS.GENERAL(businessId));
                    setSettingsOpen(true);
                  }
                }}
              >
                <div className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </div>
                {settingsOpen ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-1 pl-4">
              {businessId ? (
                <>
                  <Link
                    href={ROUTES.SETTINGS.GENERAL(businessId)}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                      isActive(ROUTES.SETTINGS.GENERAL(businessId))
                        ? "bg-accent text-accent-foreground font-medium"
                        : "text-foreground hover:bg-accent hover:text-accent-foreground",
                    )}
                  >
                    General
                  </Link>
                  <Link
                    href={ROUTES.SETTINGS.INTEGRATIONS(businessId)}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                      isActive(ROUTES.SETTINGS.INTEGRATIONS(businessId))
                        ? "bg-accent text-accent-foreground font-medium"
                        : "text-foreground hover:bg-accent hover:text-accent-foreground",
                    )}
                  >
                    Integrations
                  </Link>
                  <Link
                    href={ROUTES.SETTINGS.TEAM_MEMBERS(businessId)}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                      isActive(ROUTES.SETTINGS.TEAM_MEMBERS(businessId))
                        ? "bg-accent text-accent-foreground font-medium"
                        : "text-foreground hover:bg-accent hover:text-accent-foreground",
                    )}
                  >
                    Team Members
                  </Link>
                  <Link
                    href={ROUTES.SETTINGS.CONVERSIONS(businessId)}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                      isActive(ROUTES.SETTINGS.CONVERSIONS(businessId))
                        ? "bg-accent text-accent-foreground font-medium"
                        : "text-foreground hover:bg-accent hover:text-accent-foreground",
                    )}
                  >
                    Conversions
                  </Link>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground opacity-50 cursor-not-allowed">
                    General
                  </div>
                  <div className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground opacity-50 cursor-not-allowed">
                    Integrations
                  </div>
                  <div className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground opacity-50 cursor-not-allowed">
                    Team Members
                  </div>
                  <div className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground opacity-50 cursor-not-allowed">
                    Conversions
                  </div>
                </>
              )}
            </CollapsibleContent>
          </Collapsible>

          {/* Ad Campaigns */}
          <div className="pt-2">
            <div className="mb-2 px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
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
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
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
