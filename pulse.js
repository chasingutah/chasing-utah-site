// pulse.js — fetches live data from your published sheet or JSON feed
const pulseDiv = document.getElementById("pulse-data");

async function loadPulse() {
  try {
    // 🔗 Replace this URL with your real data feed later
    const url = "https://example.com/caelos-pulse.json";
    const res = await fetch(url);
    const data = await res.json();

    pulseDiv.innerHTML = data.metrics
      .map(
        (m) => `
        <div class="card">
          <h3>${m.name}</h3>
          <p style="font-size:2rem;font-weight:bold;">${m.value}</p>
        </div>`
      )
      .join("");
  } catch (err) {
    pulseDiv.innerHTML =
      "<p style='color:#f66;'>Error loading data. Check the feed URL.</p>";
    console.error(err);
  }
}

loadPulse();
