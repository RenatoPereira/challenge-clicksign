import { act, renderHook, waitFor } from "@testing-library/react";
import { useProjects } from "./projects.hook";
import { useFilterStore } from "../stores/filter.store";
import { useOrderStore } from "../stores/order.store";

describe("useProjects", () => {
  it("should return the projects", () => {
    const projects = [
      {
        id: "1",
        projectName: "Project 1",
        client: "Client 1",
        startDate: new Date("2022-01-01"),
        endDate: new Date("2022-01-01"),
        projectCover: "",
        favorited: false,
      },
    ];

    const { result } = renderHook(() => useProjects({ projects }));

    const { visibleProjects } = result.current;

    expect(visibleProjects).toEqual(projects);
  });

  it("should return the projects ordered by name", () => {
    const projects = [
      {
        id: "1",
        projectName: "Project 1",
        client: "Client 1",
        startDate: new Date("2022-01-01"),
        endDate: new Date("2022-01-01"),
        projectCover: "",
        favorited: false,
      },
      {
        id: "2",
        projectName: "A Project 1",
        client: "Client 1",
        startDate: new Date("2022-01-01"),
        endDate: new Date("2022-01-05"),
        projectCover: "",
        favorited: false,
      },
    ];

    const { result } = renderHook(() => useProjects({ projects }));

    const { visibleProjects } = result.current;

    expect(visibleProjects).toEqual([
      {
        id: "2",
        projectName: "A Project 1",
        client: "Client 1",
        startDate: new Date("2022-01-01"),
        endDate: new Date("2022-01-05"),
        projectCover: "",
        favorited: false,
      },
      {
        id: "1",
        projectName: "Project 1",
        client: "Client 1",
        startDate: new Date("2022-01-01"),
        endDate: new Date("2022-01-01"),
        projectCover: "",
        favorited: false,
      },
    ]);
  });

  it("should return the projects filtered by favorites", async () => {
    const projects = [
      {
        id: "1",
        projectName: "Project 1",
        client: "Client 1",
        startDate: new Date("2022-01-01"),
        endDate: new Date("2022-01-01"),
        projectCover: "",
        favorited: false,
      },
      {
        id: "2",
        projectName: "A Project 1",
        client: "Client 1",
        startDate: new Date("2022-01-01"),
        endDate: new Date("2022-01-05"),
        projectCover: "",
        favorited: true,
      },
    ];

    const { result } = renderHook(() => useProjects({ projects }));
    const { result: filterBy } = renderHook(() =>
      useFilterStore((state) => state.filterBy)
    );

    act(() => {
      filterBy.current("favorites");
    });

    const { visibleProjects } = result.current;

    await waitFor(() =>
      expect(visibleProjects).toEqual([
        {
          id: "2",
          projectName: "A Project 1",
          client: "Client 1",
          startDate: new Date("2022-01-01"),
          endDate: new Date("2022-01-05"),
          projectCover: "",
          favorited: true,
        },
      ])
    );

    act(() => {
      filterBy.current(null);
    });
  });

  it("should return the projects ordered by started recently", async () => {
    const projects = [
      {
        id: "1",
        projectName: "Project 1",
        client: "Client 1",
        startDate: new Date("2025-07-26"),
        endDate: new Date("2025-08-08"),
        projectCover: "",
        favorited: false,
      },
      {
        id: "2",
        projectName: "A Project 1",
        client: "Client 1",
        startDate: new Date("2025-07-28"),
        endDate: new Date("2025-08-05"),
        projectCover: "",
        favorited: false,
      },
    ];

    const { result } = renderHook(() => useProjects({ projects }));
    const { result: orderBy } = renderHook(() =>
      useOrderStore((state) => state.orderBy)
    );

    act(() => {
      orderBy.current("started_recently");
    });

    const { visibleProjects } = result.current;

    await waitFor(() =>
      expect(visibleProjects).toEqual([
        {
          id: "2",
          projectName: "A Project 1",
          client: "Client 1",
          startDate: new Date("2025-07-28"),
          endDate: new Date("2025-08-05"),
          projectCover: "",
          favorited: false,
        },
        {
          id: "1",
          projectName: "Project 1",
          client: "Client 1",
          startDate: new Date("2025-07-26"),
          endDate: new Date("2025-08-08"),
          projectCover: "",
          favorited: false,
        },
      ])
    );
  });

  it("should return the projects ordered by next to end", async () => {
    const projects = [
      {
        id: "1",
        projectName: "Project 1",
        client: "Client 1",
        startDate: new Date("2025-07-26"),
        endDate: new Date("2025-08-08"),
        projectCover: "",
        favorited: false,
      },
      {
        id: "2",
        projectName: "A Project 1",
        client: "Client 1",
        startDate: new Date("2025-07-28"),
        endDate: new Date("2025-08-05"),
        projectCover: "",
        favorited: false,
      },
    ];

    const { result } = renderHook(() => useProjects({ projects }));
    const { result: orderBy } = renderHook(() =>
      useOrderStore((state) => state.orderBy)
    );

    act(() => {
      orderBy.current("next_to_end");
    });

    const { visibleProjects } = result.current;

    await waitFor(() =>
      expect(visibleProjects).toEqual([
        {
          id: "2",
          projectName: "A Project 1",
          client: "Client 1",
          startDate: new Date("2025-07-28"),
          endDate: new Date("2025-08-05"),
          projectCover: "",
          favorited: false,
        },
        {
          id: "1",
          projectName: "Project 1",
          client: "Client 1",
          startDate: new Date("2025-07-26"),
          endDate: new Date("2025-08-08"),
          projectCover: "",
          favorited: false,
        },
      ])
    );
  });
});
