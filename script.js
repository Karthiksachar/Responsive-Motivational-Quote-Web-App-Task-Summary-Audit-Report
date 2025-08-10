/* script.js — dynamic quotes, nav toggle, auto-rotate, share, preloading images */

/* ===== Quote dataset =====
 * Each entry can have: text, author, image (url) */
const QUOTES = [
  { text: "Push yourself, because no one else is going to do it for you.", author: "william", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80&auto=format&fit=crop", srcset: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=480&q=80&auto=format&fit=crop 480w, https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80&auto=format&fit=crop 800w, https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80&auto=format&fit=crop 1200w" },
  { text: "Great things never come from comfort zones.", author: "Johny deep", image: "https://images.unsplash.com/photo-1517832207067-4db24a2ae47c?w=800&q=80&auto=format&fit=crop", srcset: "https://images.unsplash.com/photo-1517832207067-4db24a2ae47c?w=480&q=80&auto=format&fit=crop 480w, https://images.unsplash.com/photo-1517832207067-4db24a2ae47c?w=800&q=80&auto=format&fit=crop 800w, https://images.unsplash.com/photo-1517832207067-4db24a2ae47c?w=1200&q=80&auto=format&fit=crop 1200w" },
  { text: "Dream it. Wish it. Do it.", author: "Marko", image: "https://images.unsplash.com/photo-1493244040629-496f6d136cc3?w=800&q=80&auto=format&fit=crop", srcset: "https://images.unsplash.com/photo-1493244040629-496f6d136cc3?w=480&q=80&auto=format&fit=crop 480w, https://images.unsplash.com/photo-1493244040629-496f6d136cc3?w=800&q=80&auto=format&fit=crop 800w, https://images.unsplash.com/photo-1493244040629-496f6d136cc3?w=1200&q=80&auto=format&fit=crop 1200w" },
  { text: "Success doesn’t just find you. You have to go out and get it.", author: "shakes", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80&auto=format&fit=crop", srcset: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=480&q=80&auto=format&fit=crop 480w, https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80&auto=format&fit=crop 800w, https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80&auto=format&fit=crop 1200w" },
  { text: "The harder you work for something, the greater you’ll feel when you achieve it.", author: "rashtaa", image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80&auto=format&fit=crop", srcset: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=480&q=80&auto=format&fit=crop 480w, https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80&auto=format&fit=crop 800w, https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=80&auto=format&fit=crop 1200w" },
  { text: "Don’t stop when you’re tired. Stop when you’re done.", author: "Marquis", image: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=800&q=80&auto=format&fit=crop", srcset: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=480&q=80&auto=format&fit=crop 480w, https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=800&q=80&auto=format&fit=crop 800w, https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=1200&q=80&auto=format&fit=crop 1200w" },
  { text: "Little by little, a little becomes a lot.", author: "Tanzanian proverb", image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=80&auto=format&fit=crop", srcset: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=480&q=80&auto=format&fit=crop 480w, https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=80&auto=format&fit=crop 800w, https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80&auto=format&fit=crop 1200w" }
];

/* ===== Utility: random index (avoid same as previous) ===== */
function randomIndex(prevIndex) {
  if (QUOTES.length <= 1) return 0;
  let idx;
  do { idx = Math.floor(Math.random() * QUOTES.length); } while (idx === prevIndex);
  return idx;
}

/* ===== Cache DOM nodes ===== */
const imageEl = document.getElementById('quote-image');
const quoteTextEl = document.getElementById('quote-text');
const quoteAuthorEl = document.getElementById('quote-author');
const newBtn = document.getElementById('new-quote');
const shareBtn = document.getElementById('share-quote');
const autoRotateCheckbox = document.getElementById('auto-rotate');

const navToggle = document.getElementById('nav-toggle');
const primaryNav = document.getElementById('primary-nav');

let currentIndex = -1;
let autoRotateTimer = null;

/* ===== Preload images to avoid flashes (returns array of Image objects) ===== */
function preloadImages() {
  return QUOTES.map(q => {
    const img = new Image();
    img.src = q.image;
    return img;
  });
}

/* ===== Set quote with fade animation ===== */
function setQuote(index, { animate = true } = {}) {
  const q = QUOTES[index];
  if (!q) return;

  // animate out
  if (animate) {
    quoteTextEl.classList.add('fade-out');
    quoteAuthorEl.classList.add('fade-out');
    imageEl.classList.add('fade-out');
    // after short delay update content
    setTimeout(() => {
      // update content
      quoteTextEl.textContent = `"${q.text}"`;
      quoteAuthorEl.textContent = `— ${q.author}`;
      imageEl.src = q.image;
      imageEl.srcset = q.srcset || "";
      // animate back in
      quoteTextEl.classList.remove('fade-out'); quoteTextEl.classList.add('fade-in');
      quoteAuthorEl.classList.remove('fade-out'); quoteAuthorEl.classList.add('fade-in');
      imageEl.classList.remove('fade-out'); imageEl.classList.add('fade-in');

      // remove fade-in after animation to allow future animations
      setTimeout(() => {
        quoteTextEl.classList.remove('fade-in');
        quoteAuthorEl.classList.remove('fade-in');
        imageEl.classList.remove('fade-in');
      }, 500);
    }, 220);
  } else {
    quoteTextEl.textContent = `"${q.text}"`;
    quoteAuthorEl.textContent = `— ${q.author}`;
    imageEl.src = q.image;
    imageEl.srcset = q.srcset || "";
  }

  currentIndex = index;

  // persist last shown quote so refresh keeps it (nice UX)
  try { localStorage.setItem('lastQuoteIndex', String(index)); } catch (e) { /* ignore */ }
}

/* ===== Show next random quote ===== */
function showRandomQuote() {
  const idx = randomIndex(currentIndex);
  setQuote(idx, { animate: true });
}

/* ===== Auto rotate management ===== */
function startAutoRotate() {
  stopAutoRotate();
  autoRotateTimer = setInterval(showRandomQuote, 15000); // 15s
}
function stopAutoRotate() {
  if (autoRotateTimer) { clearInterval(autoRotateTimer); autoRotateTimer = null; }
}

/* ===== Share (copy to clipboard) ===== */
async function shareQuote() {
  const text = quoteTextEl.textContent + ' ' + quoteAuthorEl.textContent;
  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text);
      shareBtn.textContent = 'Copied!';
      setTimeout(() => { shareBtn.textContent = 'Share'; }, 1500);
    } catch (e) {
      alert('Could not copy — your browser may block clipboard access.');
    }
  } else {
    // fallback
    const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta);
    ta.select(); try { document.execCommand('copy'); shareBtn.textContent = 'Copied!'; } catch { alert('Copy failed'); }
    ta.remove();
    setTimeout(() => { shareBtn.textContent = 'Share'; }, 1500);
  }
}

/* ===== Nav toggle for small screens (accessible) ===== */
navToggle.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  if (primaryNav.style.display === 'block') {
    primaryNav.style.display = '';
    navToggle.setAttribute('aria-label', 'Open navigation');
    // animate hamburger back to normal
    navToggle.querySelector('.hamburger').style.transform = '';
  } else {
    primaryNav.style.display = 'block';
    navToggle.setAttribute('aria-label', 'Close navigation');
    navToggle.querySelector('.hamburger').style.transform = 'rotate(90deg)';
  }
});

/* Close nav if click outside on small screens */
document.addEventListener('click', (e) => {
  const withinNav = primaryNav.contains(e.target) || navToggle.contains(e.target);
  if (!withinNav && window.innerWidth < 720) {
    primaryNav.style.display = '';
    navToggle.setAttribute('aria-expanded', 'false');
  }
});

/* ===== Boot sequence ===== */
document.addEventListener('DOMContentLoaded', () => {
  // Preload images
  preloadImages();

  // Try to restore last shown quote
  let startIndex = 0;
  try {
    const saved = localStorage.getItem('lastQuoteIndex');
    if (saved !== null && Number(saved) >= 0 && Number(saved) < QUOTES.length) startIndex = Number(saved);
  } catch (e) { /* ignore */ }

  setQuote(startIndex, { animate:false });

  // wire up UI
  newBtn.addEventListener('click', showRandomQuote);
  shareBtn.addEventListener('click', shareQuote);

  autoRotateCheckbox.addEventListener('change', (e) => {
    if (e.target.checked) startAutoRotate(); else stopAutoRotate();
  });

  // start auto rotation if checked
  if (autoRotateCheckbox.checked) startAutoRotate();

  // keyboard shortcut: n => new quote
  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'n' || ev.key === 'N') showRandomQuote();
  });

  // Make sure nav visibility resets on resize
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 720) {
      primaryNav.style.display = 'block';
      navToggle.style.display = 'none';
      navToggle.setAttribute('aria-expanded', 'false');
    } else {
      primaryNav.style.display = '';
      navToggle.style.display = '';
    }
  });
});