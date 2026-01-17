import { NextRequest, NextResponse } from "next/server";

const GITHUB_USERNAME = process.env.GITHUB_USERNAME || "yourusername";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

interface GitHubEvent {
  id: string;
  type: string;
  created_at: string;
  repo: {
    name: string;
    url: string;
  };
  payload: any;
}

export async function GET(request: NextRequest) {
  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github+json",
    };

    if (GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${GITHUB_TOKEN}`;
    }

    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=10`,
      {
        headers,
        next: { revalidate: 3600 }, // Cache for 1 hour
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch GitHub activity");
    }

    const events: GitHubEvent[] = await response.json();

    // Filter and format relevant events
    const formattedEvents = events
      .filter((event) =>
        ["PushEvent", "CreateEvent", "PullRequestEvent"].includes(event.type),
      )
      .slice(0, 5)
      .map((event) => ({
        id: event.id,
        type: event.type,
        repo: event.repo.name,
        repoUrl: `https://github.com/${event.repo.name}`,
        date: event.created_at,
        message: getEventMessage(event),
      }));

    return NextResponse.json(formattedEvents, { status: 200 });
  } catch (error) {
    console.error("GitHub API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch GitHub activity" },
      { status: 500 },
    );
  }
}

function getEventMessage(event: GitHubEvent): string {
  switch (event.type) {
    case "PushEvent":
      const commitCount = event.payload.commits?.length || 0;
      return `Pushed ${commitCount} commit${commitCount !== 1 ? "s" : ""}`;
    case "CreateEvent":
      return `Created ${event.payload.ref_type}`;
    case "PullRequestEvent":
      return `${event.payload.action} pull request`;
    default:
      return event.type;
  }
}
