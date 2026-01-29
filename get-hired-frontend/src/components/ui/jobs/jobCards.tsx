import type { Job } from "@/types/job";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="hover:shadow-lg transition-shadow h-full">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">{job.title}</CardTitle>

            <Badge variant="secondary">{job.type}</Badge>
          </div>

          <p className="text-sm text-muted-foreground">{job.company}</p>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">📍 {job.location}</p>

          <Link to={`/jobs/${job.id}`}>
            <Button size="sm" className="w-full">
              View Details
            </Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
}
