async function loadAdvice() {
  try {
    const res = await fetch('https://api.adviceslip.com/advice');
    const data = await res.json();
    document.getElementById('advice-text').textContent = data.slip.advice;
  } catch (err) {
    console.error('Error while uploading:', err);
    document.getElementById('advice-text').textContent = 'Error.';
  }
}
document.addEventListener('DOMContentLoaded', loadAdvice);

async function loadSecNewsWithoutKey() {
  const rssUrl = encodeURIComponent('https://feeds.feedburner.com/TheHackersNews');
  const proxy = 'https://api.allorigins.win/get?url=';

  try {
    const res = await fetch(proxy + rssUrl);
    if (!res.ok) throw new Error(`Proxy hatası: HTTP ${res.status}`);
    const { contents } = await res.json();

    const parser = new DOMParser();
    const xml = parser.parseFromString(contents, 'application/xml');
    const items = Array.from(xml.querySelectorAll('item')).slice(0, 5);

    const list = document.getElementById('news-list');
    list.innerHTML = items.map(item => {
      const title = item.querySelector('title').textContent;
      const link = item.querySelector('link').textContent;
      return `<li><a href="${link}" target="_blank" rel="noopener">${title}</a></li>`;
    }).join('');
  } catch (err) {
    console.error('RSS haber yükleme hatası:', err);
    document.getElementById('news-list').innerHTML =
      `<li>Haberler alınamadı: ${err.message}</li>`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadSecNewsWithoutKey();
});
