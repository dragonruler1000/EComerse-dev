async function buildNav(jsonPath = "pages.json") {
  const nav = document.querySelector("header nav");
  if (!nav) {
    console.error("No <nav> found inside <header>");
    return;
  }

  try {
    const response = await fetch(jsonPath);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();

    for (const page of data.page) {
      const link = document.createElement("a");
      link.href = page.url;
      link.textContent = page.name;

      // Mark the current page
      const current = location.pathname.split("/").pop() || "index.html";
      if (page.url === current) {
        link.setAttribute("aria-current", "page");
      }

      nav.appendChild(link);
    }
  } catch (err) {
    console.error("Failed to load nav data:", err);
  }
}

document.addEventListener("DOMContentLoaded", () => buildNav());