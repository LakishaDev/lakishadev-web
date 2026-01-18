"use client";

import { useEffect, useState } from "react";
import { Github, GitCommit, Calendar, TrendingUp } from "lucide-react";

interface GitHubActivity {
  id: string;
  type: string;
  repo: string;
  repoUrl: string;
  date: string;
  message: string;
}

interface YearlyStats {
  totalCommits: number;
  activeRepos: number;
  activeDays: number;
  currentStreak: number;
}

export default function GitHubActivity() {
  const [activities, setActivities] = useState<GitHubActivity[]>([]);
  const [yearlyStats, setYearlyStats] = useState<YearlyStats>({
    totalCommits: 0,
    activeRepos: 0,
    activeDays: 0,
    currentStreak: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/github/activity")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setActivities(data);
          calculateYearlyStats(data);
        }
      })
      .catch((error) => console.error("Failed to load GitHub activity:", error))
      .finally(() => setLoading(false));
  }, []);

  const calculateYearlyStats = (activities: GitHubActivity[]) => {
    const now = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(now.getFullYear() - 1);

    const yearActivities = activities.filter((activity) => {
      const activityDate = new Date(activity.date);
      return activityDate >= oneYearAgo && activityDate <= now;
    });

    const uniqueRepos = new Set(yearActivities.map((a) => a.repo));
    const uniqueDays = new Set(
      yearActivities.map((a) => new Date(a.date).toDateString()),
    );

    // Calculate current streak
    const sortedDates = [...uniqueDays]
      .map((d) => new Date(d))
      .sort((a, b) => b.getTime() - a.getTime());

    let streak = 0;
    if (sortedDates.length > 0) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      let currentDate =
        sortedDates[0].toDateString() === today.toDateString()
          ? today
          : yesterday;

      for (const date of sortedDates) {
        if (date.toDateString() === currentDate.toDateString()) {
          streak++;
          currentDate.setDate(currentDate.getDate() - 1);
        } else {
          break;
        }
      }
    }

    setYearlyStats({
      totalCommits: yearActivities.length,
      activeRepos: uniqueRepos.size,
      activeDays: uniqueDays.size,
      currentStreak: streak,
    });
  };

  if (loading) {
    return (
      <div className="space-y-4 sm:space-y-6">
        <div className="rounded-lg border border-text-secondary/20 bg-surface/50 p-4 sm:p-6">
          <div className="flex items-center gap-2 sm:gap-3 mb-4">
            <Github className="text-accent" size={20} />
            <h3 className="text-lg font-semibold">
              GitHub Activity (Last 12 Months)
            </h3>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-text-secondary/10 rounded mb-2 w-20"></div>
                <div className="h-8 bg-text-secondary/10 rounded mb-1 w-16"></div>
                <div className="h-3 bg-text-secondary/10 rounded w-24"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (activities.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Yearly Statistics */}
      <div className="rounded-lg border border-text-secondary/20 bg-surface/50 p-4 sm:p-6">
        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          <Github className="text-accent" size={20} />
          <div>
            <h3 className="text-base sm:text-lg font-semibold">
              GitHub Activity
            </h3>
            <p className="text-[10px] sm:text-xs text-text-secondary">
              Last 12 months
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-accent/20 bg-accent/5 p-3 sm:p-4">
            <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
              <GitCommit className="text-accent" size={16} />
              <span className="text-xs sm:text-sm text-text-secondary">
                Commits
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-text-primary">
              {yearlyStats.totalCommits.toLocaleString()}
            </div>
            <p className="text-[10px] sm:text-xs text-text-secondary mt-1">
              This year
            </p>
          </div>

          <div className="rounded-lg border border-accent/20 bg-accent/5 p-3 sm:p-4">
            <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
              <Github className="text-accent" size={16} />
              <span className="text-xs sm:text-sm text-text-secondary">
                Active Repos
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-text-primary">
              {yearlyStats.activeRepos}
            </div>
            <p className="text-[10px] sm:text-xs text-text-secondary mt-1">
              Repositories
            </p>
          </div>

          <div className="rounded-lg border border-accent/20 bg-accent/5 p-3 sm:p-4">
            <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
              <Calendar className="text-accent" size={16} />
              <span className="text-xs sm:text-sm text-text-secondary">
                Active Days
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-text-primary">
              {yearlyStats.activeDays}
            </div>
            <p className="text-[10px] sm:text-xs text-text-secondary mt-1">
              {Math.round((yearlyStats.activeDays / 365) * 100)}% of the year
            </p>
          </div>

          <div className="rounded-lg border border-accent/20 bg-accent/5 p-3 sm:p-4">
            <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
              <TrendingUp className="text-accent" size={16} />
              <span className="text-xs sm:text-sm text-text-secondary">
                Current Streak
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-text-primary">
              {yearlyStats.currentStreak}
            </div>
            <p className="text-[10px] sm:text-xs text-text-secondary mt-1">
              {yearlyStats.currentStreak === 1 ? "Day" : "Days"}
            </p>
          </div>
        </div>
      </div>

      {/* Recent Activity Feed */}
      <div className="rounded-lg border border-text-secondary/20 bg-surface/50 p-4 sm:p-6">
        <h4 className="mb-3 sm:mb-4 text-xs sm:text-sm font-semibold text-text-secondary">
          Recent Commits
        </h4>
        <ul className="space-y-2 sm:space-y-3">
          {activities.slice(0, 5).map((activity) => (
            <li
              key={activity.id}
              className="border-l-2 border-accent/30 pl-3 sm:pl-4 text-xs sm:text-sm"
            >
              <a
                href={activity.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-accent hover:text-accent-alt transition-colors break-all"
              >
                {activity.repo}
              </a>
              <p className="text-text-secondary truncate">{activity.message}</p>
              <time className="text-[10px] sm:text-xs text-text-secondary/70">
                {new Date(activity.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
