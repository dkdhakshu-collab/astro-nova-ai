import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ClientOnly } from "@tanstack/react-router";
import { useEffect } from "react";

import { loadThreads } from "@/lib/chat-store";

export const Route = createFileRoute("/chat/")({
  head: () => ({
    meta: [
      { title: "Chat with Nova — Cosmic Atlas" },
      {
        name: "description",
        content: "Chat with Nova, the Cosmic Atlas AI guide, about planets, galaxies, astronauts, and space missions.",
      },
      { property: "og:title", content: "Chat with Nova — Cosmic Atlas" },
      {
        property: "og:description",
        content: "Chat with Nova, the Cosmic Atlas AI guide, about planets, galaxies, astronauts, and space missions.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ChatIndexPage,
});

function ChatIndexPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const threads = loadThreads();
    const latest = [...threads].sort((a, b) => b.updatedAt - a.updatedAt)[0];
    if (latest) {
      void navigate({ to: "/chat/$threadId", params: { threadId: latest.id }, replace: true });
    }
  }, [navigate]);

  return (
    <ClientOnly>
      <div className="flex min-h-screen items-center justify-center pt-14 text-sm text-muted-foreground">
        Opening your conversations…
      </div>
    </ClientOnly>
  );
}
