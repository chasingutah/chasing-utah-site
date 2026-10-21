// pulse.js — safe shell for the Caelos Pulse feed.
// Set window.CAELOS_PULSE_FEED_URL before this script runs when a real JSON feed is ready.
const pulseDiv = document.getElementById("pulse-data");
const feedUrl = window.CAELOS_PULSE_FEED_URL || "";

function showFeedNotConnected() {
  pulseDiv.innerHTML = `
    <div class="card">
      <h3>Site status</h3>
      <p>The dashboard shell is online.</p>
      <p>Live metrics are not connected yet.</p>
    </div>
  `;
}

async function loadPulse() {
  if (!feedUrl) {
    showFeedNotConnected();
    return;
  }

  try {
    const res = await fetch(feedUrl, { cache: "no-store" });
    if (!res.ok) throw new Error(`Feed request failed: ${res.status}`);

    const data = await res.json();
    const metrics = Array.isArray(data?.metrics) ? data.metrics : [];

    if (!metrics.length) {
      showFeedNotConnected();
      return;
    }

    pulseDiv.innerHTML = metrics
      .map(
        (m) => `
        <div class="card">
          <h3>${String(m.name ?? "Metric")}</h3>
          <p style="font-size:2rem;font-weight:bold;">${String(m.value ?? "—")}</p>
        </div>`
      )
      .join("");
  } catch (err) {
    pulseDiv.innerHTML = `
      <div class="card">
        <h3>Metrics temporarily unavailable</h3>
        <p>The site is online, but the live feed could not be loaded.</p>
      </div>
    `;
    console.error(err);
  }
}

loadPulse();
