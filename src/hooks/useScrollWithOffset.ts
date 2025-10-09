export function useScrollWithOffset() {
  function scrollTo(
    ref: React.RefObject<HTMLElement | null>,
    offset: number = 0
  ) {
    if (ref.current) {
      const topPos =
        ref.current.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: topPos, behavior: "smooth" });
    }
  }

  return scrollTo;
}
