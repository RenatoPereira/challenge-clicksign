import {
  act,
  getByText,
  queryByText,
  render,
  waitFor,
} from "@testing-library/react";
import { Search } from "./search";
import userEvent from "@testing-library/user-event";
import { renderHook } from "@testing-library/react";
import { useSearchStore } from "@/lib/stores/search.store";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Search", () => {
  it("should render the search component", () => {
    const { getByText } = render(<Search />);

    const search = getByText("Procurar");
    expect(search).toBeInTheDocument();
  });

  it("should render the search component with history", async () => {
    const { getByTestId, queryByPlaceholderText, queryByText } = render(
      <Search />
    );

    const searchButton = getByTestId("search-button");
    expect(searchButton).toBeInTheDocument();

    const user = userEvent.setup();

    await act(() => {
      user.click(searchButton);
    });

    await waitFor(() =>
      expect(
        queryByPlaceholderText("Digite o nome do projeto")
      ).toBeInTheDocument()
    );

    expect(queryByText("test")).not.toBeInTheDocument();
  });

  it("should render the search component with history", async () => {
    const { result: searchBy } = renderHook(() =>
      useSearchStore((state) => state.searchBy)
    );

    act(() => {
      searchBy.current("test");
    });

    const { getByTestId, queryByPlaceholderText, getByText } = render(
      <Search />
    );

    const searchButton = getByTestId("search-button");
    expect(searchButton).toBeInTheDocument();

    const user = userEvent.setup();

    await act(() => {
      user.click(searchButton);
    });

    await waitFor(() =>
      expect(
        queryByPlaceholderText("Digite o nome do projeto")
      ).toBeInTheDocument()
    );

    await waitFor(() => expect(getByText("test")).toBeInTheDocument());
  });
});
