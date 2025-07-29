import { render } from "@testing-library/react";
import { HighlightText } from "./highlight-text";

describe("HighlightText", () => {
  it("should render the text", () => {
    const { getByText } = render(<HighlightText>Test</HighlightText>);

    const text = getByText("Test");
    expect(text).toBeInTheDocument();
  });

  it("should render the text with highlight", () => {
    const { getByText } = render(
      <HighlightText highlightText="st">Test</HighlightText>
    );

    const text = getByText("st");
    expect(text).toBeInTheDocument();
    expect(text).toHaveClass("bg-[#FFB23D] text-primary-foreground");
  });
});
