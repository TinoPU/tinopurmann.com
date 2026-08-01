import { Client } from "@notionhq/client";

type QueryArgs = Parameters<Client["databases"]["query"]>[0];
type QueryResult = Awaited<ReturnType<Client["databases"]["query"]>>;

/**
 * Notion queries must not crash `next build` when the token is missing/expired.
 * Returns an empty result set so pages can still generate.
 */
export async function safeNotionQuery(args: QueryArgs): Promise<QueryResult> {
  try {
    const notion = new Client({ auth: process.env.NOTION_TOKEN });
    return await notion.databases.query(args);
  } catch (error) {
    console.error("Notion query failed:", error);
    return {
      object: "list",
      results: [],
      next_cursor: null,
      has_more: false,
      type: "page_or_database",
      page_or_database: {},
    } as QueryResult;
  }
}
