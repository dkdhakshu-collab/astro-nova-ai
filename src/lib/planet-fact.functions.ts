import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

import { createLovableAiGatewayRunIdFetch } from "./run-id.ts";

const GATEWAY_URL = "https://ai.gateway.lovable.dev/v1";
const MODEL = "openai/gpt-6-astra";

export const getPlanetFact = createServerFn({ method: "GET" })
  .inputValidator((data) => z.object({ planet: z.string(), name: z.string() }).parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const runIdFetch = createLovableAiGatewayRunIdFetch();
    const provider = createOpenAI({
      baseURL: GATEWAY_URL,
      apiKey,
      headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
      fetch: runIdFetch.fetch,
    });

    const result = streamText({
      model: provider.responses(MODEL),
      system:
        "You are Nova, the friendly AI guide of Cosmic Atlas, an educational space-exploration website. " +
        "You share accurate, surprising, and engaging astronomy facts for curious learners of all ages.",
      prompt: `Share one surprising, little-known, and accurate fun fact about the planet ${data.name}. ` +
        "Write 2-3 sentences in an enthusiastic but clear tone. Do not repeat basic statistics like diameter or distance. " +
        "Return only the fact text, no title or preamble.",
      providerOptions: {
        openai: {
          store: false,
          forceReasoning: true,
          reasoningEffort: "low",
          reasoningSummary: "auto",
          include: ["reasoning.encrypted_content"],
        },
      },
    });

    const fact = (await result.text).trim();
    return { planet: data.planet, fact };
  });
