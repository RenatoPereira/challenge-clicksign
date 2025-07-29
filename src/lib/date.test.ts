import { formatDate, formatInputDate } from "./date";

describe("formatDate", () => {
  it("should return the formatted date", () => {
    const date = new Date("2025-07-26:12:00");
    expect(formatDate(date)).toBe("26 de julho de 2025");
  });

  it("should return the input formatted date", () => {
    const date = new Date("2025-07-26:12:00");
    expect(formatInputDate(date)).toBe("26/07/2025");
  });
});
