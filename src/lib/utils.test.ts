import { normalizeSearch } from "./utils";

describe("normalizeSearch", () => {
  it("should return the normalized search", () => {
    const search = "Project 1";
    expect(normalizeSearch(search)).toBe("project 1");
  });

  it("should return the normalized search with diacritics", () => {
    const search = "Projéct 1";
    expect(normalizeSearch(search)).toBe("project 1");
  });

  it("should return the normalized search with spaces", () => {
    const search = " Projéct 1 ";
    expect(normalizeSearch(search)).toBe("project 1");
  });
});
