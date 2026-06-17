import { z } from "zod";
import { defineTool } from "../utils/func-tool.js";

const YOUBIKE_API =
  "https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json";

function normalizeDistrict(district) {
  let area = String(district).trim().replace(/^台北市/, "");
  if (!area.endsWith("區")) {
    area = `${area}區`;
  }
  return area;
}

async function getYoubikeByDistrict(args) {
  const {
    district,
    available_amount = 1,
    limit = 10,
  } = args ?? {};

  if (!district) {
    return {
      error: "請提供台北市行政區名稱，例如大安區、信義區",
    };
  }
  const area = normalizeDistrict(district);
  if (area === "台北市" || area === "市區" || area === "區") {
    return {
      error: "請提供台北市行政區名稱，例如大安區、信義區（不要只傳「台北市」）",
    };
  }

  const res = await fetch(YOUBIKE_API);
  if (!res.ok) {
    return { error: "無法取得 YouBike 開放資料，請稍後再試" };
  }

  const data = await res.json();
  const stations = data
    .filter((s) => s.act === "1" && s.sarea === area)
    .filter((s) => Number(s.available_rent_bikes) >= available_amount)
    .map((s) => ({
      name: s.sna.replace(/^YouBike2\.0_/, ""),
      area: s.sarea,
      address: s.ar,
      available_rent: s.available_rent_bikes,
      available_return: s.available_return_bikes,
      total: s.Quantity,
    }))
    .slice(0, limit);

  if (stations.length === 0) {
    return {
      district: area,
      stations: [],
      message: `在 ${area} 找不到符合條件（可借至少 ${available_amount} 輛）的營運站點`,
    };
  }

  return { district: area, stations };
}

export const youbikeTool = defineTool({
  name: "get_youbike_by_district",
  description:
    "依台北市行政區名稱查詢可租借的 YouBike 站點（例如大安區、信義區）。不使用經緯度；不要只傳「台北市」。",
  fn: getYoubikeByDistrict,
  parameters: z.object({
    district: z
      .string()
      .describe("台北市行政區名稱，例如大安區、信義區"),
    available_amount: z
      .number()
      .default(1)
      .describe("至少可租借車輛數，預設 1"),
    limit: z.number().default(10).describe("回傳筆數上限，預設 10"),
  }),
});
