import { render } from "@testing-library/react";
import { FormHeader } from "./header";

describe("FormHeader", () => {
  it("should render the header", () => {
    const { getByText } = render(<FormHeader title="Title" backHref="/" />);
    const header = getByText("Title");
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass("text-2xl font-bold text-primary");
  });

  it("should render the back button", () => {
    const { getByText } = render(<FormHeader title="Title" backHref="/" />);
    const back = getByText("Voltar");
    expect(back).toBeInTheDocument();
    expect(back).toHaveClass("flex items-center gap-2 text-accent");
  });
});
