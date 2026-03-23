import { useEffect } from "react";
import { useMatches } from "react-router-dom";

interface RouteTitleHandle {
  title?: string;
}

const APP_TITLE = "Publish Template";
const TITLE_SEPARATOR = " | ";

export function RouteTitleSync() {
  const matches = useMatches();

  useEffect(() => {
    const titleSegments = matches
      .map((match) => (match.handle as RouteTitleHandle | undefined)?.title)
      .filter((title): title is string => Boolean(title));

    document.title = titleSegments.length
      ? `${titleSegments.join(TITLE_SEPARATOR)}${TITLE_SEPARATOR}${APP_TITLE}`
      : APP_TITLE;
  }, [matches]);

  return null;
}
