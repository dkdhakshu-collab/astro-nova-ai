import { ClientOnly, Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { MessageSquarePlus, Trash2 } from "lucide-react";
import { useSyncExternalStore } from "react";

import { ChatWindow } from "@/components/chat/ChatWindow";
import {
  createThread,
  deleteThread,
  getThread,
  loadThreads,
  subscribeThreads,
} from "@/lib/chat-store";
import saturn from "@/assets/planets/saturn.jpg";

export const Route = createFileRoute("/chat/$threadId")({
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
  component: ChatThreadPage,
});

function useThreads() {
  return useSyncExternalStore(subscribeThreads, loadThreads, () => []);
}

function ChatThreadPage() {
  const { threadId } = Route.useParams();
  const navigate = useNavigate();
  const threads = useThreads();
  const thread = threads.find((item) => item.id === threadId);

  const handleNewThread = () => {
    const created = createThread();
    void navigate({ to: "/chat/$threadId", params: { threadId: created.id } });
  };

  const handleDelete = (id: string) => {
    deleteThread(id);
    if (id === threadId) {
      const remaining = loadThreads()[0];
      if (remaining) {
        void navigate({ to: "/chat/$threadId", params: { threadId: remaining.id }, replace: true });
      }
    }
  };

  return (
    <ClientOnly
      fallback={
        <div className="flex min-h-screen items-center justify-center pt-14 text-sm text-muted-foreground">
          Loading your conversations…
        </div>
      }
    >
      <main className="flex h-screen flex-col pt-14">
        <div className="flex min-h-0 flex-1">
          {/* Thread sidebar */}
          <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-card/40 md:flex">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <div className="flex items-center gap-2">
                <img src={saturn} alt="" className="size-6 rounded-full object-cover" />
                <span className="font-display text-sm font-semibold">Nova</span>
              </div>
              <button
                type="button"
                onClick={handleNewThread}
                aria-label="New conversation"
                className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <MessageSquarePlus className="size-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-2">
              {threads.map((item) => (
                <div
                  key={item.id}
                  className={`group mb-1 flex items-center rounded-lg text-sm transition-colors ${
                    item.id === threadId
                      ? "bg-accent text-foreground"
                      : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                  }`}
                >
                  <Link
                    to="/chat/$threadId"
                    params={{ threadId: item.id }}
                    className="min-w-0 flex-1 truncate px-3 py-2"
                  >
                    {item.title}
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    aria-label={`Delete ${item.title}`}
                    className="mr-1 hidden rounded p-1 text-muted-foreground hover:text-destructive group-hover:block"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </aside>

          {/* Chat area */}
          <div className="flex min-w-0 flex-1 flex-col">
            {/* Mobile thread bar */}
            <div className="flex items-center justify-between border-b border-border px-4 py-2 md:hidden">
              <span className="truncate text-sm text-muted-foreground">
                {thread?.title ?? "New conversation"}
              </span>
              <button
                type="button"
                onClick={handleNewThread}
                className="rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"
                aria-label="New conversation"
              >
                <MessageSquarePlus className="size-4" />
              </button>
            </div>

            {thread ? (
              <ChatWindow key={threadId} threadId={threadId} initialMessages={thread.messages} />
            ) : (
              <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
                This conversation doesn't exist anymore.
              </div>
            )}
          </div>
        </div>
      </main>
    </ClientOnly>
  );
}

// Referenced so TS keeps the import used in handleDelete flow
void getThread;
