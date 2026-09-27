import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, type UIMessage } from "ai";
import { z } from "zod";

import { createChatResponsesCall } from "@/lib/chat.server";

const bodySchema = z.object({
  threadId: z.string().min(1),
  messages: z.array(z.unknown()).min(1),
});

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: "Invalid request body" }, { status: 400 });
        }

        const parsed = bodySchema.safeParse(body);
        if (!parsed.success) {
          return Response.json({ error: "Missing threadId or messages" }, { status: 400 });
        }

        try {
          const modelMessages = await convertToModelMessages(parsed.data.messages as UIMessage[]);
          const { response } = createChatResponsesCall(request, modelMessages);
          return response();
        } catch (error) {
          console.error("Chat error:", error);
          return Response.json(
            { error: "The AI guide is unavailable right now. Please try again in a moment." },
            { status: 500 },
          );
        }
      },
    },
  },
});
