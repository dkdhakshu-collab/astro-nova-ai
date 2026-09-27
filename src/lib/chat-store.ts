import type { UIMessage } from "ai";

export interface ChatThread {
  id: string;
  title: string;
  updatedAt: number;
  messages: UIMessage[];
}

const STORAGE_KEY = "cosmic-atlas-threads";

let cache: ChatThread[] | null = null;
const listeners = new Set<() => void>();

function persist() {
  if (typeof window === "undefined" || !cache) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
  } catch {
    // storage full or unavailable — keep in-memory copy
  }
  listeners.forEach((listener) => listener());
}

function makeThread(): ChatThread {
  return {
    id: crypto.randomUUID(),
    title: "New conversation",
    updatedAt: Date.now(),
    messages: [],
  };
}

/** Idempotent, StrictMode-safe bootstrap: creates the default thread exactly once. */
export function loadThreads(): ChatThread[] {
  if (cache) return cache;
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    cache = raw ? (JSON.parse(raw) as ChatThread[]) : [];
  } catch {
    cache = [];
  }
  if (cache.length === 0) {
    cache = [makeThread()];
    persist();
  }
  return cache;
}

export function subscribeThreads(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getThread(threadId: string): ChatThread | undefined {
  return loadThreads().find((thread) => thread.id === threadId);
}

export function createThread(): ChatThread {
  const thread = makeThread();
  cache = [thread, ...loadThreads()];
  persist();
  return thread;
}

export function deleteThread(threadId: string) {
  cache = loadThreads().filter((thread) => thread.id !== threadId);
  if (cache.length === 0) {
    cache = [makeThread()];
  }
  persist();
}

export function saveThreadMessages(threadId: string, messages: UIMessage[]) {
  const threads = loadThreads();
  const thread = threads.find((item) => item.id === threadId);
  if (!thread) return;

  const firstUserText = messages
    .find((message) => message.role === "user")
    ?.parts.find((part) => part.type === "text");
  const title =
    firstUserText && firstUserText.type === "text"
      ? firstUserText.text.trim().slice(0, 48) || thread.title
      : thread.title;

  cache = threads.map((item) =>
    item.id === threadId
      ? { ...item, messages, title, updatedAt: Date.now() }
      : item,
  );
  persist();
}
