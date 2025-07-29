export const formatDate = (date: string | Date) => {
  if (!date) {
    return "";
  }

  const formattedDate = typeof date === "string" ? new Date(date) : date;

  return formattedDate.toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
};

export const formatInputDate = (date: string | Date) => {
  if (!date) {
    return "";
  }

  const formattedDate = typeof date === "string" ? new Date(date) : date;

  return formattedDate.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
