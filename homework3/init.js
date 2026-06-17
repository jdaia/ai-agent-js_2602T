import { embedBatch } from "../lib/embeddings.js";
import {
  HOMEWORK3_COLLECTION,
  assertQdrantConfig,
  ensureCollection,
  upsertKnowledge,
} from "../lib/qdrant.js";
import { KNOWLEDGE_ITEMS, itemToText } from "./knowledge.js";

assertQdrantConfig();

const texts = KNOWLEDGE_ITEMS.map(itemToText);
const vectors = await embedBatch(texts);

const points = KNOWLEDGE_ITEMS.map((item, idx) => ({
  id: item.id,
  vector: vectors[idx],
  payload: {
    tool: item.tool,
    title: item.title,
    content: item.content,
  },
}));

await ensureCollection();
await upsertKnowledge(points);

console.log(
  `已寫入 ${KNOWLEDGE_ITEMS.length} 筆知識至 Qdrant collection「${HOMEWORK3_COLLECTION}」。`,
);
