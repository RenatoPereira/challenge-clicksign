import { normalizeSearch } from "@/lib/utils";
import { Fragment } from "react";

type Props = {
  children: string;
  highlightText?: string;
};

export const HighlightText = ({ children, highlightText = "" }: Props) => {
  const lowerCaseSearch = normalizeSearch(highlightText);

  if (highlightText.trim() === "") {
    return children;
  }

  const parts = children.split(new RegExp(`(${lowerCaseSearch})`, "gi"));

  return parts.map((part, index) => (
    <Fragment key={index}>
      {part.toLowerCase() === lowerCaseSearch.toLowerCase() ? (
        <span className="bg-[#FFB23D] text-primary-foreground">{part}</span>
      ) : (
        part
      )}
    </Fragment>
  ));
};
