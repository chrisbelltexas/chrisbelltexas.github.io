// 2026-01-18: added county search function
document.addEventListener("DOMContentLoaded", async () => {
  const input = document.getElementById("county-search");
  const results = document.getElementById("results");

  let counties = [];

  try {
    const res = await fetch('counties.json');
    if (!res.ok) throw new Error('Failed to load counties.json');
    counties = await res.json();
  } catch (err) {
    console.error(err);
    return;
  }

  input.addEventListener("input", () => {
    const query = input.value.toLowerCase().trim();
    results.innerHTML = "";

    if (!query) return;

    counties
      .filter(c => c.county.toLowerCase().includes(query))
      .forEach(c => {
        const li = document.createElement("li");
        li.textContent = c.county;
        li.style.cursor = "pointer";
        li.onclick = () => window.location.href = c.url;
        results.appendChild(li);
      });
  });
});

