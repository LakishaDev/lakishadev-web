"use client";

import { useEffect, useState } from "react";
import { Code2, Zap, GitBranch } from "lucide-react";

interface StatsData {
  commits: number;
  repos: number;
  languages: number;
}

export default function Stats() {
  const [stats, setStats] = useState<StatsData>({
    commits: 0,
    repos: 0,
    languages: 0,
  });

  useEffect(() => {
    // Animated counting effect
    const targetStats = {
      commits: 1200,
      repos: 25,
      languages: 8,
    };

    const duration = 2000; // 2 seconds
    const steps = 60;
    const interval = duration / steps;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setStats({
        commits: Math.floor(targetStats.commits * progress),
        repos: Math.floor(targetStats.repos * progress),
        languages: Math.floor(targetStats.languages * progress),
      });

      if (currentStep >= steps) {
        setStats(targetStats);
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="rounded-lg border border-text-secondary/20 bg-surface/50 p-6 text-center">
        <GitBranch className="mx-auto mb-3 text-accent" size={32} />
        <div className="mb-1 text-3xl font-bold text-text-primary">
          {stats.commits.toLocaleString()}+
        </div>
        <div className="text-sm text-text-secondary">Commits</div>
      </div>

      <div className="rounded-lg border border-text-secondary/20 bg-surface/50 p-6 text-center">
        <Code2 className="mx-auto mb-3 text-accent" size={32} />
        <div className="mb-1 text-3xl font-bold text-text-primary">
          {stats.repos}+
        </div>
        <div className="text-sm text-text-secondary">Public Repos</div>
      </div>

      <div className="rounded-lg border border-text-secondary/20 bg-surface/50 p-6 text-center">
        <Zap className="mx-auto mb-3 text-accent" size={32} />
        <div className="mb-1 text-3xl font-bold text-text-primary">
          {stats.languages}+
        </div>
        <div className="text-sm text-text-secondary">Languages</div>
      </div>
    </div>
  );
}
