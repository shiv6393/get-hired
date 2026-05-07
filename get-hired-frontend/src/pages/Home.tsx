import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  Radar,
  Sparkles,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function Home() {
  return (
    <div className="space-y-24 pb-10">
      <section className="relative overflow-hidden rounded-[2.5rem] border border-white/60 bg-[linear-gradient(135deg,rgba(14,165,233,0.12),rgba(245,158,11,0.14),rgba(255,255,255,0.86))] px-6 py-20 shadow-[0_30px_80px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(14,165,233,0.14),rgba(245,158,11,0.1),rgba(15,23,42,0.92))]">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/75 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/8 dark:text-slate-100"
            >
              <Sparkles size={16} className="text-amber-500" />
              Hiring momentum for candidates and recruiters
            </motion.div>

            <div className="space-y-5">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl text-5xl font-semibold tracking-tight md:text-7xl"
              >
                Turn every job search into a cleaner, faster, smarter pipeline.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="max-w-2xl text-base leading-8 text-muted-foreground md:text-lg"
              >
                GetHired brings elegant candidate journeys, recruiter-friendly
                workflows, and sharp operational visibility into one modern job
                platform.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <Link to="/jobs">
                <Button
                  size="lg"
                  className="w-full rounded-full bg-[linear-gradient(135deg,#0ea5e9,#0284c7)] text-white shadow-xl shadow-sky-500/25 sm:w-auto"
                >
                  Browse Jobs
                  <ArrowRight size={16} />
                </Button>
              </Link>

              <Link to="/register">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full rounded-full border-white/70 bg-white/80 sm:w-auto dark:border-white/10 dark:bg-white/5"
                >
                  Create Your Profile
                </Button>
              </Link>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { label: "Live opportunities", value: "500+" },
                { label: "Hiring teams", value: "120+" },
                { label: "Successful matches", value: "1.2k+" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-3xl border border-white/60 bg-white/75 p-5 shadow-sm dark:border-white/10 dark:bg-white/5"
                >
                  <p className="text-3xl font-semibold">{stat.value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="grid gap-5">
              <motion.div
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15, duration: 0.55 }}
                className="rounded-[2rem] border border-white/60 bg-white/85 p-6 shadow-[0_20px_60px_rgba(2,6,23,0.1)] dark:border-white/10 dark:bg-slate-950/55"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.28em] text-muted-foreground">
                      Recruiter pulse
                    </p>
                    <p className="mt-3 text-2xl font-semibold">18 active roles</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Shortlist candidates, review applicants, and post faster with
                      one dashboard.
                    </p>
                  </div>
                  <span className="rounded-2xl bg-sky-100 p-3 text-sky-700 dark:bg-sky-400/10 dark:text-sky-200">
                    <Radar size={20} />
                  </span>
                </div>
              </motion.div>

              <div className="grid gap-5 sm:grid-cols-2">
                {[
                  {
                    icon: Building2,
                    title: "Cleaner recruiting",
                    desc: "Role-based flows designed for hiring teams.",
                  },
                  {
                    icon: BadgeCheck,
                    title: "Confidence for candidates",
                    desc: "Apply, track progress, and stay organized.",
                  },
                ].map((item) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.55 }}
                    className="rounded-[2rem] border border-white/60 bg-white/75 p-5 shadow-sm dark:border-white/10 dark:bg-white/5"
                  >
                    <span className="mb-4 inline-flex rounded-2xl bg-amber-100 p-3 text-amber-700 dark:bg-amber-400/10 dark:text-amber-200">
                      <item.icon size={18} />
                    </span>
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="pointer-events-none absolute -right-16 top-0 h-40 w-40 rounded-full bg-amber-300/30 blur-3xl dark:bg-amber-400/15" />
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {[
          {
            icon: BriefcaseBusiness,
            title: "For job seekers",
            desc: "Build momentum with a streamlined apply-and-track experience.",
          },
          {
            icon: Building2,
            title: "For recruiters",
            desc: "Post roles, review applications, and keep hiring organized.",
          },
          {
            icon: Radar,
            title: "For operators",
            desc: "Stay close to performance with role-aware workflows and data.",
          },
        ].map((feature) => (
          <div
            key={feature.title}
            className="rounded-[2rem] border border-white/60 bg-white/80 p-7 shadow-sm transition-transform hover:-translate-y-1 dark:border-white/10 dark:bg-white/5"
          >
            <span className="mb-5 inline-flex rounded-2xl bg-slate-950 p-3 text-white dark:bg-white dark:text-slate-950">
              <feature.icon size={20} />
            </span>
            <h3 className="text-2xl font-semibold">{feature.title}</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              {feature.desc}
            </p>
          </div>
        ))}
      </section>

      <section className="max-w-6xl mx-auto px-2">
        <h2 className="text-center text-4xl font-semibold">
          Trusted by professionals who need less friction
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
          A calmer workflow for applying, posting, and reviewing.
        </p>

        <Carousel
          plugins={[
            Autoplay({
              delay: 3000,
            }),
          ]}
          className="mt-10 w-full"
        >
          <CarouselContent>
            {[
              {
                name: "Rahul Sharma",
                role: "Frontend Developer",
                quote:
                  "GetHired helped me land interviews within a week. The flow feels clean and focused.",
              },
              {
                name: "Anita Verma",
                role: "HR Manager",
                quote:
                  "Posting roles and managing candidates feels much lighter than our old stack.",
              },
              {
                name: "Karan Singh",
                role: "Backend Engineer",
                quote:
                  "Application tracking is simple, practical, and easy to trust day to day.",
              },
            ].map((item, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="h-full rounded-[2rem] border border-white/60 bg-white/80 p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
                  <p className="text-base leading-7 text-muted-foreground">
                    "{item.quote}"
                  </p>

                  <div className="mt-6">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.role}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      <section className="rounded-[2.5rem] border border-white/60 bg-[linear-gradient(135deg,rgba(15,23,42,0.96),rgba(14,116,144,0.95))] px-6 py-14 text-white shadow-[0_30px_80px_rgba(2,6,23,0.18)] dark:border-white/10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <h2 className="text-4xl font-semibold">
              Ready to make your hiring experience feel premium?
            </h2>
            <p className="text-sm leading-7 text-slate-200/85">
              Create an account, explore opportunities, and start using the
              platform with a cleaner, more confident workflow.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link to="/register">
              <Button
                size="lg"
                className="w-full rounded-full bg-white text-slate-950 hover:bg-slate-100 sm:w-auto"
              >
                Create Free Account
              </Button>
            </Link>
            <Link to="/jobs">
              <Button
                size="lg"
                variant="outline"
                className="w-full rounded-full border-white/30 bg-transparent text-white hover:bg-white/10 sm:w-auto"
              >
                Explore Jobs
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
