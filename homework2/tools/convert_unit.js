export const convertUnitTool = {
  type: "function",
  function: {
    name: "convert_unit",
    description: "進行單位換算",
    parameters: {
      type: "object",
      properties: {
        value: {
          type: "number",
          description: "要換算的數值，例如 25",
        },
        from_unit: {
          type: "string",
          description: "原始單位，例如 c、km、kg",
        },
        to_unit: {
          type: "string",
          description: "目標單位，例如 f、mile、lb",
        },
      },
      required: ["value", "from_unit", "to_unit"],
    },
  },
};

const ALIASES = {
  c: "celsius",
  "°c": "celsius",
  celsius: "celsius",
  攝氏: "celsius",
  攝氏度: "celsius",
  度c: "celsius",
  f: "fahrenheit",
  "°f": "fahrenheit",
  fahrenheit: "fahrenheit",
  華氏: "fahrenheit",
  華氏度: "fahrenheit",
  km: "km",
  公里: "km",
  kilometer: "km",
  kilometers: "km",
  mile: "mile",
  miles: "mile",
  英里: "mile",
  kg: "kg",
  公斤: "kg",
  千克: "kg",
  kilogram: "kg",
  kilograms: "kg",
  lb: "lb",
  lbs: "lb",
  pound: "lb",
  pounds: "lb",
  磅: "lb",
};

function normalizeUnit(unit) {
  const key = String(unit).trim().toLowerCase().replace(/\s+/g, "");
  return ALIASES[key] ?? null;
}

function convertPair(value, from, to) {
  if (from === "celsius" && to === "fahrenheit") {
    return value * (9 / 5) + 32;
  }
  if (from === "fahrenheit" && to === "celsius") {
    return (value - 32) * (5 / 9);
  }
  if (from === "km" && to === "mile") {
    return value * 0.621371;
  }
  if (from === "mile" && to === "km") {
    return value / 0.621371;
  }
  if (from === "kg" && to === "lb") {
    return value * 2.20462;
  }
  if (from === "lb" && to === "kg") {
    return value / 2.20462;
  }
  return null;
}

export function convertUnit({ value, from_unit, to_unit }) {
  const from = normalizeUnit(from_unit);
  const to = normalizeUnit(to_unit);

  if (from === null || to === null) {
    return {
      error: `不支援的單位組合：${from_unit} → ${to_unit}`,
    };
  }

  if (from === to) {
    return { value, from_unit, to_unit, result: value };
  }

  const result = convertPair(Number(value), from, to);
  if (result === null) {
    return {
      error: `不支援的單位組合：${from_unit} → ${to_unit}`,
    };
  }

  return {
    value: Number(value),
    from_unit,
    to_unit,
    result: Math.round(result * 1e6) / 1e6,
  };
}
