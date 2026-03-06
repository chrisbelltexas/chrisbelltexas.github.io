document.addEventListener("DOMContentLoaded", async () => {
	const GLOBAL_FALLBACK = "https://vrrequest.sos.texas.gov/VoterApplication/ConfirmStatusEN";
	const input = document.getElementById("var1-county-search");
	const results = document.getElementById("var1-county-results");
	let counties = [];
	if (!input || !results) return;
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
		const matches = counties.filter(c => c.county.toLowerCase().includes(query)).slice(0, 5); // <-- 5 matches max
		matches.forEach(c => {
			const li = document.createElement("li");
			li.textContent = c.county;
			li.style.cursor = "pointer";
			li.onclick = () => {
			    const targetUrl = c.url && c.url.trim() ? c.url : GLOBAL_FALLBACK;
			    gtag('event', 'l1_county_link_clicked', {
			        'event_label': c.county
			    });
			    window.open(targetUrl, "_blank", "noopener,noreferrer");
			};
			results.appendChild(li);
		});
	});
});