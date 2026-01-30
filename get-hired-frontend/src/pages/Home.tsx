import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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
    <div className="space-y-24">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-28 text-center space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold tracking-tight"
          >
            Find Your Dream Job <br />
            <span className="text-blue-600">GetHired Faster</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            A modern job portal for candidates, recruiters, and admins — built
            for speed, simplicity, and scale.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center gap-4"
          >
            <Link to="/jobs">
              <Button size="lg">Browse Jobs</Button>
            </Link>

            <Link to="/register">
              <Button size="lg" variant="outline">
                Get Started
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { label: "Active Jobs", value: "500+" },
            { label: "Companies", value: "120+" },
            { label: "Candidates Hired", value: "1,200+" },
          ].map((stat) => (
            <div key={stat.label} className="border rounded-xl p-6 text-center">
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
      {/* ================= CAROUSEL ================= */}
      <section className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10">
          Trusted by Professionals
        </h2>

        <Carousel
          plugins={[
            Autoplay({
              delay: 3000,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent>
            {[
              {
                name: "Rahul Sharma",
                role: "Frontend Developer",
                quote:
                  "GetHired helped me land interviews within a week. The UI is smooth and easy to use.",
              },
              {
                name: "Anita Verma",
                role: "HR Manager",
                quote:
                  "Posting jobs and managing candidates is incredibly simple. Love the admin tools.",
              },
              {
                name: "Karan Singh",
                role: "Backend Engineer",
                quote:
                  "The application tracking feature is very helpful. Everything is well organized.",
              },
            ].map((item, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="border rounded-xl p-6 h-full flex flex-col justify-between">
                  <p className="text-muted-foreground italic">“{item.quote}”</p>

                  <div className="mt-4">
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

      {/* ================= FEATURES ================= */}
      <section className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose GetHired?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "For Job Seekers",
              desc: "Apply, track applications, and get hired faster.",
            },
            {
              title: "For Recruiters",
              desc: "Post jobs, manage candidates, and hire efficiently.",
            },
            {
              title: "For Admins",
              desc: "Monitor platform activity with full control.",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="border rounded-xl p-6 space-y-2"
            >
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-muted/40 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-3xl font-bold">Ready to take the next step?</h2>
          <p className="text-muted-foreground">
            Join GetHired today and unlock opportunities.
          </p>
          <Link to="/register">
            <Button size="lg">Create Free Account</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
