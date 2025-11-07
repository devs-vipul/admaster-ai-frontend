import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ROUTES } from "@/lib/constants/routes";
import {
  Zap,
  BarChart3,
  Target,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Users,
  Shield,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">AdMaster AI</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href={ROUTES.SIGN_IN}>
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href={ROUTES.SIGN_UP}>
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b bg-gradient-to-br from-primary/5 via-background to-primary/5 py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background/50 px-4 py-2 text-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>AI that thinks like a marketer</span>
            </div>
            <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Generate, manage, and optimize ads{" "}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                automatically
              </span>
            </h1>
            <p className="mb-8 text-xl text-muted-foreground sm:text-2xl">
              Power your marketing across Google, Meta, LinkedIn, and Microsoft
              Ads with AI that understands your brand and optimizes for results.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href={ROUTES.SIGN_UP}>
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#features">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Learn More
                </Button>
              </Link>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              ✨ No credit card required • Start creating in minutes
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need to scale your ads
            </h2>
            <p className="text-lg text-muted-foreground">
              Powerful features that work together to automate your marketing
              workflow
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group rounded-lg border bg-card p-6 transition-all hover:shadow-lg"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="border-t bg-muted/50 py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
                Why choose AdMaster AI?
              </h2>
              <p className="mb-8 text-lg text-muted-foreground">
                We&apos;ve built the platform that marketing teams actually want
                to use. Simple, powerful, and designed for scale.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 blur-3xl" />
                <div className="relative rounded-lg border bg-card p-8 shadow-lg">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Campaign Performance
                      </span>
                      <TrendingUp className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-3xl font-bold">+247%</div>
                    <p className="text-sm text-muted-foreground">
                      Average ROI increase for our customers
                    </p>
                    <div className="pt-4">
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span>Conversion Rate</span>
                        <span className="font-semibold">+89%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-muted">
                        <div className="h-full w-[89%] bg-primary" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="mb-2 text-4xl font-bold text-primary">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t bg-gradient-to-br from-primary/10 via-background to-primary/10 py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to transform your ad campaigns?
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Join thousands of marketers who are already using AdMaster AI to
              scale their advertising efforts.
            </p>
            <Link href={ROUTES.SIGN_UP}>
              <Button size="lg" className="w-full sm:w-auto">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              No credit card required • Free trial • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                <span className="text-lg font-bold">AdMaster AI</span>
              </div>
              <p className="text-sm text-muted-foreground">
                AI-powered marketing automation for modern teams.
              </p>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#features" className="hover:text-foreground">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="hover:text-foreground">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#integrations" className="hover:text-foreground">
                    Integrations
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#about" className="hover:text-foreground">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#blog" className="hover:text-foreground">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#careers" className="hover:text-foreground">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#docs" className="hover:text-foreground">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#support" className="hover:text-foreground">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="hover:text-foreground">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            <p>
              © {new Date().getFullYear()} AdMaster AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    icon: Zap,
    title: "AI-Powered Generation",
    description:
      "Generate high-performing ad copy and creatives in seconds using advanced AI that understands your brand voice.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Optimization",
    description:
      "Automatically optimize your campaigns based on performance data across all platforms in real-time.",
  },
  {
    icon: Target,
    title: "Multi-Platform Management",
    description:
      "Manage campaigns across Google Ads, Meta, LinkedIn, and Microsoft Ads from one unified dashboard.",
  },
  {
    icon: TrendingUp,
    title: "Performance Analytics",
    description:
      "Get deep insights into your campaign performance with advanced analytics and reporting tools.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Work together seamlessly with your team using built-in collaboration and approval workflows.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Bank-level security and compliance to keep your data safe and your campaigns protected.",
  },
];

const benefits = [
  {
    title: "Save 20+ hours per week",
    description:
      "Automate repetitive tasks and focus on strategy instead of manual work.",
  },
  {
    title: "Increase ROI by 3x",
    description:
      "Our AI optimizes your campaigns continuously to maximize your return on ad spend.",
  },
  {
    title: "Scale without limits",
    description:
      "Manage thousands of campaigns across multiple platforms without breaking a sweat.",
  },
  {
    title: "Stay ahead of trends",
    description:
      "AI-powered insights help you adapt to market changes faster than your competitors.",
  },
];

const stats = [
  { value: "10K+", label: "Active Users" },
  { value: "50M+", label: "Ads Generated" },
  { value: "247%", label: "Avg ROI Increase" },
  { value: "99.9%", label: "Uptime" },
];
