import { assertQdrantConfig, searchKnowledge } from "../lib/qdrant.js";

const TEST_QUERIES = [
  "版本控制、commit 和 branch 要怎麼管理？",
  "把應用程式包成容器來部署",
  "送 HTTP 請求測試 REST API",
];

const limit = Number(process.argv[2]) || 3;

assertQdrantConfig();

for (const query of TEST_QUERIES) {
  console.log(`\n查詢：${query}`);
  console.log("-".repeat(50));
  const results = await searchKnowledge(query, limit);
  results.forEach((r, i) => {
    console.log(`${i + 1}. [${r.tool}] ${r.title}`);
    console.log(`   相似度：${r.score.toFixed(3)}`);
    console.log(`   摘要：${r.content.slice(0, 60)}…`);
  });
}

console.log("");
