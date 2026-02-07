import type { Job } from "@/types/job";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

type JobCardMode = "PUBLIC" | "RECRUITER";

interface JobCardProps {
  job: Job;
  mode?: JobCardMode;
  onDelete?: () => void;
}

export default function JobCard({
  job,
  mode = "PUBLIC",
  onDelete,
}: JobCardProps) {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="hover:shadow-lg transition-shadow h-full">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">{job.title}</CardTitle>

            {/* Backend-safe badge */}
            <Badge variant="secondary">{job.applicantsCount} applied</Badge>
          </div>

          <p className="text-sm text-muted-foreground">{job.company}</p>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">📍 {job.location}</p>

          {/* ================= PUBLIC MODE ================= */}
          {mode === "PUBLIC" && (
            <Link to={`/jobs/${job.id}`}>
              <Button size="sm" className="w-full">
                View Details
              </Button>
            </Link>
          )}

          {/* ================= RECRUITER MODE ================= */}
          {mode === "RECRUITER" && (
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="w-full"
                onClick={() => navigate(`/recruiter/jobs/${job.id}/edit`)}
              >
                Edit
              </Button>

              <Button
                size="sm"
                variant="destructive"
                className="w-full"
                onClick={onDelete}
              >
                Delete
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
