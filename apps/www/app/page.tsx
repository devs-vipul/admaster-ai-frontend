"use client";

import { CounterAnimation } from "@/components/CounterAnimation";
import { PlatformLogo } from "@/components/PlatformLogo";
import { PlatformCard } from "@/components/PlatformCard";
import { FeatureCard } from "@/components/FeatureCard";
import { UseCaseCard } from "@/components/UseCaseCard";
import { BenefitItem } from "@/components/BenefitItem";
import { HowItWorksItem } from "@/components/HowItWorksItem";
import { StatItem } from "@/components/StatItem";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  benefits,
  dashboardIntegrations,
  dashboardStats,
  features,
  howItWorks,
  platforms,
  stats,
  testimonials,
  useCases,
} from "@/lib/data/homepage";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Rocket,
  Sparkles,
  Star,
  TrendingUp,
  Zap,
} from "lucide-react";
export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "4s" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "6s", animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "5s", animationDelay: "2s" }}
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="relative">
                <Zap className="h-7 w-7 text-purple-400 transition-transform group-hover:scale-110 group-hover:rotate-12" />
                <div className="absolute inset-0 bg-purple-400 blur-xl opacity-0 group-hover:opacity-50 transition-opacity" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                AdMaster AI
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                className="text-white hover:bg-white/10 hover:text-purple-400 transition-all"
              >
                Sign In
              </Button>
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 transition-all hover:scale-105">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl text-center">
            {/* Floating Badge */}
            <div
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-6 py-3 backdrop-blur-sm animate-fade-in"
              style={{ animation: "fadeInUp 0.6s ease-out" }}
            >
              <Sparkles className="h-5 w-5 text-purple-400 animate-pulse" />
              <span className="text-sm font-medium bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                AI that thinks like a marketer
              </span>
              <Badge className="ml-2 bg-purple-500/20 text-purple-300 border-purple-500/30">
                New
              </Badge>
            </div>

            {/* Hero Title */}
            <h1
              className="mb-8 text-5xl font-black tracking-tight sm:text-7xl lg:text-8xl"
              style={{ animation: "fadeInUp 0.6s ease-out 0.2s both" }}
            >
              Generate, manage,
              <br />
              <span className="relative inline-block mt-2">
                <span className="relative z-10 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
                  optimize ads
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 blur-2xl opacity-30" />
              </span>
              <br />
              <span className="text-gray-300">automatically</span>
          </h1>

            <p
              className="mb-10 text-xl text-gray-400 sm:text-2xl max-w-3xl mx-auto leading-relaxed"
              style={{ animation: "fadeInUp 0.6s ease-out 0.4s both" }}
            >
              Power your marketing across{" "}
              <span className="text-purple-400 font-semibold">
                Google, Meta, LinkedIn,
              </span>{" "}
              and{" "}
              <span className="text-pink-400 font-semibold">Microsoft Ads</span>{" "}
              with AI that understands your brand
            </p>

            {/* CTA Buttons */}
            <div
              className="flex flex-col items-center justify-center gap-4 sm:flex-row"
              style={{ animation: "fadeInUp 0.6s ease-out 0.6s both" }}
            >
              <Button
                size="lg"
                className="group relative overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 transition-all hover:scale-105 w-full sm:w-auto px-8 py-6 text-lg"
              >
                <span className="relative z-10 flex items-center">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="group border-purple-500/30 bg-purple-500/10 text-purple-300 hover:bg-purple-500/20 hover:border-purple-500/50 backdrop-blur-sm w-full sm:w-auto px-8 py-6 text-lg transition-all hover:scale-105"
              >
                Watch Demo
                <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>

            {/* Trust Indicators */}
            <div
              className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400"
              style={{ animation: "fadeInUp 0.6s ease-out 0.8s both" }}
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-400" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <span>4.9/5 from 10,000+ users</span>
              </div>
              <div className="flex items-center gap-2">
                <Rocket className="h-4 w-4 text-purple-400" />
                <span>Start in 2 minutes</span>
              </div>
            </div>
          </div>

          {/* Hero Visual - Dashboard Preview */}
          <div
            className="mt-20 mx-auto max-w-6xl"
            style={{ animation: "fadeInUp 0.8s ease-out 1s both" }}
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-3xl opacity-20 group-hover:opacity-30 transition-opacity" />
              <Card className="relative border-purple-500/20 bg-slate-900/50 backdrop-blur-xl overflow-hidden">
                <CardContent className="p-0">
                  {/* Dashboard Header */}
                  <div className="border-b border-purple-500/20 bg-slate-900/80 p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full bg-red-500/50" />
                      <div className="h-3 w-3 rounded-full bg-yellow-500/50" />
                      <div className="h-3 w-3 rounded-full bg-green-500/50" />
                      <span className="ml-4 text-sm text-gray-400">
                        dashboard.admaster.ai
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-purple-400 animate-pulse" />
                      <span className="text-xs text-purple-400">Live</span>
                    </div>
                  </div>

                  {/* Dashboard Content */}
                  <div className="p-6 space-y-6">
                    {/* Stats Row */}
                    <div className="grid grid-cols-3 gap-4">
                      {dashboardStats.map((stat, i) => (
                        <div
                          key={i}
                          className="p-4 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20"
                        >
                          <div className="text-xs text-gray-400 mb-1">
                            {stat.label}
                          </div>
                          <div className="text-2xl font-bold text-white mb-1">
                            {stat.value}
                          </div>
                          <div className="text-xs text-green-400 flex items-center gap-1">
                            <TrendingUp className="h-3 w-3" />
                            {stat.trend}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Chart Preview */}
                    <div className="h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg relative overflow-hidden">
                      <div className="absolute inset-0 flex items-end justify-around p-4 gap-2">
                        {[40, 65, 45, 80, 60, 75, 90].map((height, i) => (
                          <div
                            key={i}
                            className="w-8 rounded-t bg-gradient-to-t from-purple-500 to-pink-500 opacity-80"
                            style={{ height: `${height}%` }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Platform Integrations */}
                    <div className="pt-4 border-t border-purple-500/20">
                      <div className="mb-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Connected Platforms
                      </div>
                      <div className="flex items-center justify-start gap-4 flex-wrap">
                        {dashboardIntegrations.map((integration, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1, duration: 0.3 }}
                            className="flex items-center gap-2 group cursor-pointer"
                          >
                            <div
                              className={`h-10 w-10 rounded-lg bg-gradient-to-br ${
                                integration.active
                                  ? "from-purple-500/20 to-pink-500/20"
                                  : "from-gray-500/10 to-gray-500/10"
                              } flex items-center justify-center group-hover:scale-110 transition-transform border ${
                                integration.active
                                  ? "border-purple-500/30"
                                  : "border-gray-500/20"
                              }`}
                            >
                              <PlatformLogo
                                name={integration.name}
                                className={`h-6 w-6 ${
                                  integration.active
                                    ? "opacity-100"
                                    : "opacity-40"
                                }`}
                              />
                            </div>
                            <div className="flex flex-col">
                              <span
                                className={`text-xs font-medium ${
                                  integration.active
                                    ? "text-gray-300 group-hover:text-purple-400"
                                    : "text-gray-500"
                                } transition-colors`}
                              >
                                {integration.name}
                              </span>
                              {integration.active && (
                                <span className="text-[10px] text-green-400">
                                  Active
                                </span>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Integrations Section */}
      <section className="py-20 sm:py-32 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center mb-16">
            <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30">
              Integrations
            </Badge>
            <h2 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl text-white">
              Connect with all your ad platforms
            </h2>
            <p className="text-lg text-gray-400">
              Seamlessly integrate with the platforms you already use
            </p>
          </div>
          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {platforms.map((platform, i) => (
                <PlatformCard key={i} platform={platform} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 sm:py-32 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30">
              Features
            </Badge>
            <h2 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Everything you need to scale
            </h2>
            <p className="text-lg text-gray-400">
              Powerful features that work together seamlessly
            </p>
          </div>

          <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 sm:py-32 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center mb-16">
            <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30">
              How It Works
            </Badge>
            <h2 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl text-white">
              Get started in minutes
            </h2>
            <p className="text-lg text-gray-400">
              Simple steps to transform your ad campaigns
            </p>
          </div>
          <div className="mx-auto max-w-6xl">
            <div className="grid md:grid-cols-3 gap-12 relative">
              {howItWorks.map((item, i) => (
                <HowItWorksItem
                  key={i}
                  item={item}
                  index={i}
                  isLast={i === howItWorks.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <Card className="border-purple-500/20 bg-gradient-to-br from-slate-900/80 to-slate-950/80 backdrop-blur-xl overflow-hidden">
              <CardContent className="p-12">
                <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
                  {stats.map((stat, index) => (
                    <StatItem key={index} stat={stat} index={index} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 sm:py-32 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center mb-16">
            <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30">
              Use Cases
            </Badge>
            <h2 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl text-white">
              Perfect for every marketing team
            </h2>
            <p className="text-lg text-gray-400">
              Whether you&apos;re a startup or enterprise, we&apos;ve got you
              covered
            </p>
          </div>
          <div className="mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-6">
              {useCases.map((useCase, i) => (
                <UseCaseCard key={i} useCase={useCase} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 sm:py-32 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center mb-16">
            <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30">
              Testimonials
            </Badge>
            <h2 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl text-white">
              Loved by marketers worldwide
            </h2>
            <p className="text-lg text-gray-400">
              See what our customers are saying
            </p>
          </div>
          <div className="mx-auto max-w-7xl">
            <div className="overflow-hidden">
              <motion.div
                className="flex gap-6 pb-4"
                animate={{
                  x: [0, -(testimonials.length * 320)],
                }}
                transition={{
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                }}
              >
                {/* Duplicate testimonials for seamless loop */}
                {[...testimonials, ...testimonials].map((testimonial, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 w-full md:w-[calc(33.333%-1rem)] min-w-[300px]"
                  >
                    <Card className="relative border-purple-500/20 bg-slate-900/50 backdrop-blur-sm hover:border-purple-500/40 transition-all duration-300 h-full">
                      <CardContent className="p-6">
                        <div className="mb-4 flex gap-1">
                          {[...Array(testimonial.rating)].map((_, j) => (
                            <Star
                              key={j}
                              className="h-4 w-4 text-yellow-400 fill-yellow-400"
                            />
                          ))}
                        </div>
                        <p className="text-gray-300 mb-4 leading-relaxed">
                          &ldquo;{testimonial.content}&rdquo;
                        </p>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-xl">
                            {testimonial.avatar}
                          </div>
                          <div>
                            <div className="font-semibold text-white text-sm">
                              {testimonial.name}
                            </div>
                            <div className="text-xs text-gray-400">
                              {testimonial.role}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 sm:py-32 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30">
                  Why Choose Us
                </Badge>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl text-white"
              >
                Built for modern marketing teams
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-8 text-lg text-gray-400 leading-relaxed"
              >
                Simple, powerful, and designed to scale with your ambitions
              </motion.p>
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <BenefitItem key={index} benefit={benefit} index={index} />
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center justify-center"
            >
              <div className="relative w-full max-w-md">
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.3, 0.4, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 blur-3xl"
                />
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="relative border-purple-500/20 bg-slate-900/80 backdrop-blur-xl shadow-2xl">
                    <CardContent className="p-8">
                      <div className="space-y-6">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5 }}
                          className="flex items-center justify-between"
                        >
                          <span className="text-sm text-gray-400 font-medium">
                            Campaign Performance
                          </span>
                          <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              repeatDelay: 3,
                            }}
                          >
                            <TrendingUp className="h-6 w-6 text-green-400" />
                          </motion.div>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 0.2 }}
                        >
                          <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="text-5xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent"
                          >
                            +247%
                          </motion.div>
                          <p className="text-sm text-gray-400 mt-2">
                            Average ROI increase for customers
                          </p>
                        </motion.div>
                        <div className="pt-4 space-y-4">
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                          >
                            <div className="mb-2 flex items-center justify-between text-sm">
                              <span className="text-gray-300">
                                Conversion Rate
                              </span>
                              <motion.span
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{
                                  duration: 0.5,
                                  delay: 0.8,
                                  type: "spring",
                                }}
                                className="font-semibold text-purple-400"
                              >
                                +89%
                              </motion.span>
                            </div>
                            <div className="h-3 overflow-hidden rounded-full bg-slate-800">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: "89%" }}
                                viewport={{ once: true }}
                                transition={{
                                  duration: 1.5,
                                  delay: 0.6,
                                  ease: "easeOut",
                                }}
                                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                              />
                            </div>
                          </motion.div>
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                          >
                            <div className="mb-2 flex items-center justify-between text-sm">
                              <span className="text-gray-300">
                                Click-Through Rate
                              </span>
                              <motion.span
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{
                                  duration: 0.5,
                                  delay: 1,
                                  type: "spring",
                                }}
                                className="font-semibold text-blue-400"
                              >
                                +156%
                              </motion.span>
                            </div>
                            <div className="h-3 overflow-hidden rounded-full bg-slate-800">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: "95%" }}
                                viewport={{ once: true }}
                                transition={{
                                  duration: 1.5,
                                  delay: 0.8,
                                  ease: "easeOut",
                                }}
                                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                              />
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <Card className="relative overflow-hidden border-purple-500/20 bg-gradient-to-br from-slate-900/80 to-slate-950/80 backdrop-blur-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10" />
              <CardContent className="relative p-12 text-center">
                <Badge className="mb-6 bg-purple-500/20 text-purple-300 border-purple-500/30">
                  Limited Time Offer
                </Badge>
                <h2 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl text-white">
                  Ready to transform your campaigns?
                </h2>
                <p className="mb-8 text-xl text-gray-400 max-w-2xl mx-auto">
                  Join{" "}
                  <span className="text-purple-400 font-semibold">
                    10,000+ marketers
                  </span>{" "}
                  scaling their ads with AI
                </p>
                <Button
                  size="lg"
                  className="group bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 transition-all hover:scale-105 px-8 py-6 text-lg"
                >
                  <span className="flex items-center">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Button>
                <p className="mt-6 text-sm text-gray-500">
                  No credit card required • Free forever plan • Cancel anytime
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-slate-950/50 backdrop-blur-xl py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <Zap className="h-6 w-6 text-purple-400" />
                <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  AdMaster AI
                </span>
              </div>
              <p className="text-sm text-gray-400">
                AI-powered marketing automation for modern teams.
              </p>
            </div>
            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "Integrations"],
              },
              { title: "Company", links: ["About", "Blog", "Careers"] },
              {
                title: "Support",
                links: ["Documentation", "Help Center", "Contact"],
              },
            ].map((column, i) => (
              <div key={i}>
                <h3 className="mb-4 font-semibold text-white">
                  {column.title}
                </h3>
                <ul className="space-y-2">
                  {column.links.map((link, j) => (
                    <li key={j}>
                      <a
                        href="#"
                        className="text-sm text-gray-400 hover:text-purple-400 transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-sm text-gray-500">
            <p>© 2024 AdMaster AI. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
}
