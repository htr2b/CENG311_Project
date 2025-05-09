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

function handleRssData(data) {
  const list = document.getElementById('news-list');
  if (!data.items) {
    list.innerHTML = '<li>News could not be received.</li>';
    return;
  }
  list.innerHTML = data.items.slice(0, 5).map(item =>
    `<li><a href="${item.link}" target="_blank" rel="noopener">${item.title}</a></li>`
  ).join('');
}

function loadSecNewsJSONP() {
  const rssUrl = encodeURIComponent('https://feeds.feedburner.com/TheHackersNews');
  const callbackName = 'handleRssData';
  const script = document.createElement('script');
  script.src =
    `https://api.rss2json.com/v1/api.json?` +
    `rss_url=${rssUrl}&callback=${callbackName}`;
  script.onerror = () => {
    document.getElementById('news-list').innerHTML =
      '<li>News could not be loaded.</li>';
  };
  document.body.appendChild(script);
}

document.addEventListener('DOMContentLoaded', loadSecNewsJSONP);