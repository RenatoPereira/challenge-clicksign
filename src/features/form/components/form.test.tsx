import { act, render, waitFor } from "@testing-library/react";
import { ProjectForm } from "./form";

describe("ProjectForm", () => {
  it("should render the form", () => {
    const { getByText, getByPlaceholderText } = render(
      <ProjectForm onSubmit={() => {}} />
    );

    const projectName = getByText("Nome do projeto");
    expect(projectName).toBeInTheDocument();
    const projectNameInput = getByPlaceholderText("Nome do projeto");
    expect(projectNameInput).toHaveValue("");

    const client = getByText("Cliente");
    expect(client).toBeInTheDocument();
    const clientInput = getByPlaceholderText("Cliente");
    expect(clientInput).toHaveValue("");

    const startDate = getByText("Data de Início");
    expect(startDate).toBeInTheDocument();
    const startDateInput = getByPlaceholderText("Data de Início");
    expect(startDateInput).toHaveValue("");

    const endDate = getByText("Data Final");
    expect(endDate).toBeInTheDocument();
    const endDateInput = getByPlaceholderText("Data Final");
    expect(endDateInput).toHaveValue("");

    const projectCover = getByText("Capa do Projeto");
    expect(projectCover).toBeInTheDocument();

    const submitButton = getByText("Salvar projeto");
    expect(submitButton).toBeInTheDocument();
  });

  it("should render the form with project data", () => {
    const { getByText, getByPlaceholderText } = render(
      <ProjectForm
        onSubmit={() => {}}
        project={{
          id: "1",
          projectName: "Project 1",
          client: "Client 1",
          startDate: new Date("2022-01-01T12:00:00"),
          endDate: new Date("2022-01-01T12:00:00"),
          projectCover: "",
          favorited: false,
        }}
      />
    );

    const projectName = getByText("Nome do projeto");
    expect(projectName).toBeInTheDocument();
    const projectNameInput = getByPlaceholderText("Nome do projeto");
    expect(projectNameInput).toHaveValue("Project 1");

    const client = getByText("Cliente");
    expect(client).toBeInTheDocument();
    const clientInput = getByPlaceholderText("Cliente");
    expect(clientInput).toHaveValue("Client 1");

    const startDate = getByText("Data de Início");
    expect(startDate).toBeInTheDocument();
    const startDateInput = getByPlaceholderText("Data de Início");
    expect(startDateInput).toHaveValue("01/01/2022");

    const endDate = getByText("Data Final");
    expect(endDate).toBeInTheDocument();
    const endDateInput = getByPlaceholderText("Data Final");
    expect(endDateInput).toHaveValue("01/01/2022");

    const projectCover = getByText("Capa do Projeto");
    expect(projectCover).toBeInTheDocument();

    const submitButton = getByText("Salvar projeto");
    expect(submitButton).toBeInTheDocument();
  });

  it("should render the form with project data and submit", async () => {
    const onSubmit = jest.fn();

    const { getByText, getByPlaceholderText } = render(
      <ProjectForm
        onSubmit={onSubmit}
        project={{
          id: "1",
          projectName: "Project 1",
          client: "Client 1",
          startDate: new Date("2022-01-01T12:00:00"),
          endDate: new Date("2022-08-01T12:00:00"),
          projectCover: "",
          favorited: false,
        }}
      />
    );

    const projectName = getByText("Nome do projeto");
    expect(projectName).toBeInTheDocument();
    const projectNameInput = getByPlaceholderText("Nome do projeto");
    expect(projectNameInput).toHaveValue("Project 1");

    const client = getByText("Cliente");
    expect(client).toBeInTheDocument();
    const clientInput = getByPlaceholderText("Cliente");
    expect(clientInput).toHaveValue("Client 1");

    const startDate = getByText("Data de Início");
    expect(startDate).toBeInTheDocument();
    const startDateInput = getByPlaceholderText("Data de Início");
    expect(startDateInput).toHaveValue("01/01/2022");

    const endDate = getByText("Data Final");
    expect(endDate).toBeInTheDocument();
    const endDateInput = getByPlaceholderText("Data Final");
    expect(endDateInput).toHaveValue("01/08/2022");

    const projectCover = getByText("Capa do Projeto");
    expect(projectCover).toBeInTheDocument();

    const submitButton = getByText("Salvar projeto");
    expect(submitButton).toBeInTheDocument();

    act(() => {
      submitButton.click();
    });

    await waitFor(() => {
      expect(submitButton).toBeDisabled();
      expect(onSubmit).toHaveBeenCalled();
    });
  });
});
