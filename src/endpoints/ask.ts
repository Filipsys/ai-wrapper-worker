import { OpenAPIRoute } from "chanfana";
import { GoogleGenAI } from "@google/genai";
import { string, z } from "zod";
import { env } from "hono/adapter";

import type { AppContext } from "../types";

export class Ask extends OpenAPIRoute {
  method = "get";

  schema = {
    tags: ["Gemini"],
    summary: "Send a request to Gemini",
    request: {
      query: z.object({
        k: string({
          description: "Access key",
        }).optional(),
        q: string({
          description: "Question",
        }),
      }),
    },
    responses: {
      "200": {
        description: "Returns output from the LLM",
        content: {
          "application/text": {
            schema: string(),
          },
        },
      },
    },
  };

  async handle(c: AppContext) {
    const { ACCESS_KEY, GEMINI_API_KEY } = env(c);

    const queryData = (await this.getValidatedData()).query;

    if (ACCESS_KEY !== queryData.k || queryData.k === undefined)
      return new Response("Incorrect access key.");

    const ai = new GoogleGenAI({
      apiKey: GEMINI_API_KEY as string,
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: queryData.q,
      config: {
        systemInstruction:
          "Do not use markdown, do not use bold letters, do not use comments, do not explain your code. The response should only be returned as the output code snippet.",
      },
    });

    return new Response(response.text);
  }
}
