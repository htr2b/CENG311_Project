async function loadEvents() {
    try {
      const res = await fetch('data/events.json');
      const events = await res.json();
      const container = document.getElementById('events-container');
      container.innerHTML = events.map(evt => `
        <div class="card">
          <h3>${evt.title}</h3>
          <p>${evt.description}</p>
          <p>📅 ${new Date(evt.date).toLocaleString('tr-TR')}</p>
          <a href="${evt.url}" class="btn">Details</a>
        </div>
      `).join('');
    } catch (err) {
      console.error('Error loading event:', err);
    }
  }
document.addEventListener('DOMContentLoaded', loadEvents);