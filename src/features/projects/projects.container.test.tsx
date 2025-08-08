import { render } from "@testing-library/react";
import { ProjectsView } from "./projects.container";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("ProjectsView", () => {
  it("should render the projects view", () => {
    const { getByText } = render(<ProjectsView />);

    const projectsView = getByText("Projetos");
    expect(projectsView).toBeInTheDocument();

    const projectsCount = getByText("(0)");
    expect(projectsCount).toBeInTheDocument();

    const filterFavorites = getByText("Apenas Favoritos");
    expect(filterFavorites).toBeInTheDocument();

    const button = getByText("Novo projeto");
    expect(button).toBeInTheDocument();
  });

  it("should render the projects view with projects", () => {
    const { getByText } = render(
      <ProjectsView
        projects={[
          {
            id: "1",
            projectName: "Project 1",
            client: "Client 1",
            startDate: new Date("2022-01-01T12:00:00"),
            endDate: new Date("2022-01-01T12:00:00"),
            projectCover: "",
            favorited: false,
          },
        ]}
      />
    );

    const projectsView = getByText("Projetos");
    expect(projectsView).toBeInTheDocument();

    const projectsCount = getByText("(1)");
    expect(projectsCount).toBeInTheDocument();

    const filterFavorites = getByText("Apenas Favoritos");
    expect(filterFavorites).toBeInTheDocument();

    const projectCard = getByText("Project 1");
    expect(projectCard).toBeInTheDocument();
  });
});
