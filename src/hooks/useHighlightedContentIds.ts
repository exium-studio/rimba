import { useSearchParams } from "next/navigation";

export function useHighlightedContentIds() {
  const searchParams = useSearchParams();

  const value = searchParams.get("highlighted-content-ids");

  return value ? value.split(",") : [];
}
