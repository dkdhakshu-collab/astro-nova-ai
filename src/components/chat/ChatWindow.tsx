import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useEffect, useMemo, useRef } from "react";

import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { saveThreadMessages } from "@/lib/chat-store";
import saturn from "@/assets/planets/saturn.jpg";

interface ChatWindowProps {
  threadId: string;
  initialMessages: UIMessage[];
}

export function ChatWindow({ threadId, initialMessages }: ChatWindowProps) {
  const transport = useMemo(
    () => new DefaultChatTransport({ api: "/api/chat", body: { threadId } }),
    [threadId],
  );

  const { messages, sendMessage, status, stop, error } = useChat({
    id: threadId,
    transport,
    messages: initialMessages,
  });

  const busy = status === "submitted" || status === "streaming";
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Persist whenever a reply finishes (or the thread changes)
  useEffect(() => {
    if (status === "ready") {
      saveThreadMessages(threadId, messages);
    }
  }, [messages, status, threadId]);

  // Keep the composer focused during normal chat use
  useEffect(() => {
    if (!busy) {
      textareaRef.current?.focus();
    }
  }, [busy, threadId]);

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col">
      <Conversation className="flex-1">
        <ConversationContent className="mx-auto w-full max-w-3xl gap-6 px-4 py-6">
          {messages.length === 0 ? (
            <ConversationEmptyState
              icon={
                <img
                  src={saturn}
                  alt="Nova, your Cosmic Atlas guide"
                  className="size-16 rounded-full object-cover ring-2 ring-primary/40"
                />
              }
              title="Ask Nova anything about space"
              description="Planets, galaxies, astronauts, missions — your cosmic guide is listening."
            />
          ) : (
            messages.map((message) => (
              <Message key={message.id} from={message.role}>
                <MessageContent
                  className={
                    message.role === "user"
                      ? "rounded-2xl bg-primary px-4 py-2.5 text-primary-foreground"
                      : "px-1"
                  }
                >
                  {message.parts.map((part, index) => {
                    if (part.type === "text") {
                      return <MessageResponse key={index}>{part.text}</MessageResponse>;
                    }
                    return null;
                  })}
                </MessageContent>
              </Message>
            ))
          )}
          {status === "submitted" && (
            <Message from="assistant">
              <MessageContent className="px-1">
                <Shimmer>Consulting the star charts…</Shimmer>
              </MessageContent>
            </Message>
          )}
          {error && (
            <p className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-2 text-sm text-destructive">
              Nova couldn't answer that one. Please try sending your message again.
            </p>
          )}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <div className="mx-auto w-full max-w-3xl px-4 pb-4">
        <PromptInput
          onSubmit={({ text }) => {
            if (!text.trim() || busy) return;
            sendMessage({ text });
          }}
        >
          <PromptInputTextarea
            ref={textareaRef}
            placeholder="Ask about a planet, a mission, a galaxy…"
            disabled={busy}
          />
          <PromptInputFooter className="justify-end">
            <PromptInputSubmit status={status} onStop={stop} disabled={!busy && false} />
          </PromptInputFooter>
        </PromptInput>
      </div>
    </div>
  );
}
