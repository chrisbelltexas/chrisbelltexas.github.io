// 2026-01-18: added custom county search function
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

    const matches = counties
      .filter(c => c.county.toLowerCase().includes(query))
      .slice(0, 5); // <-- cap to first 5 matches

    matches.forEach(c => {
      const li = document.createElement("li");
      li.textContent = c.county;
      li.style.cursor = "pointer";
	  li.onclick = () => {
	    const targetUrl = c.url && c.url.trim() ? c.url : c.fallback;
	    window.open(targetUrl, "_blank","noopener,noreferrer"); 
	  };
      results.appendChild(li);
    });
  });
});