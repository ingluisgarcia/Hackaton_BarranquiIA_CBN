export function scrollToAnchor(
  id: string,
  behavior: ScrollBehavior = "smooth"
) {
  const target = document.getElementById(id);
  if (!target) return false;

  target.scrollIntoView({ behavior, block: "start" });

  const cleanUrl = window.location.pathname + window.location.search;
  window.history.replaceState(null, "", cleanUrl);

  return true;
}

export function clearUrlHash() {
  if (!window.location.hash) return;
  window.history.replaceState(
    null,
    "",
    window.location.pathname + window.location.search
  );
}
