import { QdrantClient } from "@qdrant/js-client-rest";
import { QDRANT_API_KEY, QDRANT_URL } from "../config.js";
import { EMBEDDING_DIM, embed } from "./embeddings.js";

export const HOMEWORK3_COLLECTION = "homework3_dev_tools";

function normalizeQdrantUrl(url) {
  const trimmed = url.replace(/\/$/, "");
  if (
    trimmed.includes("cloud.qdrant.io") &&
    !/:\d+$/.test(trimmed.replace(/^https?:\/\//, ""))
  ) {
    return `${trimmed}:6333`;
  }
  return trimmed;
}

export const qdrant = new QdrantClient({
  url: normalizeQdrantUrl(QDRANT_URL),
  ...(QDRANT_API_KEY && { apiKey: QDRANT_API_KEY }),
});

export function assertQdrantConfig() {
  if (!QDRANT_URL?.trim()) {
    console.error("請在專案根目錄 .env 設定 QDRANT_URL（Qdrant Cloud cluster URL）。");
    process.exit(1);
  }
}

export async function ensureCollection() {
  const collections = await qdrant.getCollections();
  const exists = collections.collections.some(
    (c) => c.name === HOMEWORK3_COLLECTION,
  );
  if (exists) {
    await qdrant.deleteCollection(HOMEWORK3_COLLECTION);
  }
  await qdrant.createCollection(HOMEWORK3_COLLECTION, {
    vectors: { size: EMBEDDING_DIM, distance: "Cosine" },
  });
}

export async function upsertKnowledge(points) {
  await qdrant.upsert(HOMEWORK3_COLLECTION, { wait: true, points });
}

export async function searchKnowledge(query, limit = 3) {
  const vector = await embed(query);
  const results = await qdrant.search(HOMEWORK3_COLLECTION, {
    vector,
    limit,
    with_payload: true,
  });
  return results.map((r) => ({
    score: r.score,
    tool: r.payload.tool,
    title: r.payload.title,
    content: r.payload.content,
  }));
}
