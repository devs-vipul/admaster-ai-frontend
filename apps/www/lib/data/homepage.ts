import {
  Zap,
  BarChart3,
  Target,
  TrendingUp,
  Users,
  Shield,
  Brain,
  Sparkles,
  LineChart,
  Rocket,
  Layers,
  Building2,
  Globe,
} from "lucide-react";

// Platform Integrations Data
export const platforms = [
  {
    name: "Google Ads",
    color: "from-blue-500 to-blue-600",
    logo: "🔵",
    description: "Connect your Google Ads account",
  },
  {
    name: "Meta Ads",
    color: "from-blue-400 to-blue-500",
    logo: "📘",
    description: "Facebook & Instagram campaigns",
  },
  {
    name: "LinkedIn",
    color: "from-blue-600 to-blue-700",
    logo: "💼",
    description: "Professional B2B advertising",
  },
  {
    name: "Microsoft Ads",
    color: "from-orange-500 to-orange-600",
    logo: "🪟",
    description: "Bing & Microsoft network",
  },
];

// Features Data
export const features = [
  {
    icon: Zap,
    title: "AI-Powered Generation",
    description:
      "Generate high-performing ad copy and creatives instantly using advanced AI.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Optimization",
    description:
      "Automatically optimize campaigns based on live performance data.",
  },
  {
    icon: Target,
    title: "Multi-Platform Management",
    description:
      "Manage Google Ads, Meta, LinkedIn, and Microsoft from one dashboard.",
  },
  {
    icon: TrendingUp,
    title: "Performance Analytics",
    description:
      "Deep insights with advanced analytics and beautiful reporting.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Seamless workflows with built-in collaboration tools.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-level security and compliance for your peace of mind.",
  },
];

// How It Works Data
export const howItWorks = [
  {
    step: "01",
    icon: Brain,
    title: "AI Analyzes Your Brand",
    description:
      "Our crawler automatically extracts your brand identity, colors, tone, and messaging from your website.",
  },
  {
    step: "02",
    icon: Sparkles,
    title: "Generate Ad Creatives",
    description:
      "AI creates high-performing ad copy and creatives tailored to your brand voice and target audience.",
  },
  {
    step: "03",
    icon: LineChart,
    title: "Optimize & Scale",
    description:
      "Automatically optimize campaigns across all platforms and scale what works best.",
  },
];

// Stats Data
export const stats = [
  { value: 10000, suffix: "+", label: "Active Users" },
  { value: 50000000, suffix: "+", label: "Ads Generated" },
  { value: 247, suffix: "%", label: "Avg ROI" },
  { value: 99.9, suffix: "%", label: "Uptime" },
];

// Use Cases Data
export const useCases = [
  {
    icon: Rocket,
    title: "Startups & SMBs",
    description:
      "Launch your first campaigns quickly without hiring a full marketing team. Get professional results from day one.",
    features: ["Quick setup", "Budget-friendly", "AI-powered"],
  },
  {
    icon: Layers,
    title: "Agencies",
    description:
      "Manage multiple client campaigns from one dashboard. Scale your agency without scaling your team.",
    features: ["Multi-client", "White-label", "Advanced analytics"],
  },
  {
    icon: Building2,
    title: "Enterprise",
    description:
      "Enterprise-grade security and compliance. Integrate with your existing marketing stack seamlessly.",
    features: ["SSO", "API access", "Dedicated support"],
  },
  {
    icon: Users,
    title: "Marketing Teams",
    description:
      "Collaborate with your team, automate repetitive tasks, and focus on strategy instead of execution.",
    features: ["Team collaboration", "Workflows", "Approval process"],
  },
];

// Testimonials Data
export const testimonials = [
  {
    name: "Sarah Chen",
    role: "CMO, TechStart Inc.",
    content:
      "AdMaster AI transformed our ad strategy. We've seen a 3x increase in ROI while saving 20+ hours per week.",
    rating: 5,
    avatar: "👩‍💼",
  },
  {
    name: "Michael Rodriguez",
    role: "Marketing Director, GrowthCo",
    content:
      "The AI understands our brand perfectly. Generated ads that actually convert better than our manual ones.",
    rating: 5,
    avatar: "👨‍💼",
  },
  {
    name: "Emily Johnson",
    role: "Founder, StartupXYZ",
    content:
      "As a small team, we couldn't afford a full marketing department. AdMaster AI is like having one for a fraction of the cost.",
    rating: 5,
    avatar: "👩‍💻",
  },
  {
    name: "David Kim",
    role: "VP Marketing, ScaleUp",
    content:
      "The multi-platform management is a game-changer. We manage all our campaigns from one place now.",
    rating: 5,
    avatar: "👨‍💻",
  },
  {
    name: "Lisa Anderson",
    role: "Marketing Manager, InnovateCo",
    content:
      "Real-time optimization has increased our conversion rates by 89%. The AI never sleeps!",
    rating: 5,
    avatar: "👩‍🎓",
  },
  {
    name: "James Wilson",
    role: "CEO, GrowthAgency",
    content:
      "We use AdMaster AI for all our clients. It's like having an expert marketer on every account.",
    rating: 5,
    avatar: "👨‍🎓",
  },
];

// Benefits Data
export const benefits = [
  {
    title: "Save 20+ hours per week",
    description: "Automate repetitive tasks and focus on strategy.",
  },
  {
    title: "Increase ROI by 3x",
    description: "AI continuously optimizes for maximum returns.",
  },
  {
    title: "Scale without limits",
    description: "Manage thousands of campaigns effortlessly.",
  },
  {
    title: "Stay ahead of trends",
    description: "Adapt faster than your competitors with AI insights.",
  },
];

// Dashboard Preview Stats
export const dashboardStats = [
  { label: "Active Campaigns", value: "247", trend: "+12%" },
  { label: "Total Spend", value: "$45.2K", trend: "+8%" },
  { label: "ROI", value: "247%", trend: "+15%" },
];

// Dashboard Integrations
export const dashboardIntegrations = [
  { name: "Google", icon: "🔵", active: true },
  { name: "Meta", icon: "📘", active: true },
  { name: "LinkedIn", icon: "💼", active: true },
  { name: "Microsoft", icon: "🪟", active: false },
];
