import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="text-center space-y-6 px-4">
        <div className="space-y-2">
          <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
            AdMaster AI
          </h1>
          <p className="text-2xl text-muted-foreground">
            AI that thinks like a marketer
          </p>
        </div>

        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Generate, manage, and optimize ads across Google, Meta, LinkedIn, and
          Microsoft Ads — automatically powered by AI.
        </p>

        <div className="flex gap-4 justify-center">
          <Link href="/sign-up">
            <Button size="lg">Get Started Free</Button>
          </Link>
          <Link href="/sign-in">
            <Button variant="outline" size="lg">
              Sign In
            </Button>
          </Link>
        </div>

        <div className="pt-8">
          <p className="text-sm text-muted-foreground">
            ✨ No credit card required • Start creating in minutes
          </p>
        </div>
      </div>
    </div>
  );
}
