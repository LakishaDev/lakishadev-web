"use client";

import { useEffect, useState } from "react";
import { Github } from "lucide-react";

interface GitHubActivity {
  id: string;
  type: string;
  repo: string;
  repoUrl: string;
  date: string;
  message: string;
}

export default function GitHubActivity() {
  const [activities, setActivities] = useState<GitHubActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/github/activity")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setActivities(data);
        }
      })
      .catch((error) => console.error("Failed to load GitHub activity:", error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="rounded-lg border border-text-secondary/20 bg-surface/50 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Github className="text-accent" size={24} />
          <h3 className="text-lg font-semibold">Recent GitHub Activity</h3>
        </div>
        <p className="text-sm text-text-secondary">Loading...</p>
      </div>
    );
  }

  if (activities.length === 0) {
    return null;
  }

  return (
    <div className="rounded-lg border border-text-secondary/20 bg-surface/50 p-6">
      <div className="flex items-center gap-3 mb-4">
        <Github className="text-accent" size={24} />
        <h3 className="text-lg font-semibold">Recent GitHub Activity</h3>
      </div>

      <ul className="space-y-3">
        {activities.map((activity) => (
          <li
            key={activity.id}
            className="border-l-2 border-accent/30 pl-4 text-sm"
          >
            <a
              href={activity.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-accent hover:text-accent-alt transition-colors"
            >
              {activity.repo}
            </a>
            <p className="text-text-secondary">{activity.message}</p>
            <time className="text-xs text-text-secondary/70">
              {new Date(activity.date).toLocaleDateString()}
            </time>
          </li>
        ))}
      </ul>
    </div>
  );
}
