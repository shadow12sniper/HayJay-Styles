// Responsive Navbar Toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  if (navLinks.classList.contains('open')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});

// Close mobile nav on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function(e) {
    navLinks.classList.remove('open'); // Close nav
    document.body.style.overflow = '';
    const href = this.getAttribute('href');
    if (href.startsWith("#")) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Sticky Navbar: Hide on scroll up, show on scroll down
let lastScrollTop = 0;
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  let st = window.pageYOffset || document.documentElement.scrollTop;
  if (st > lastScrollTop && st > 80) {
    // Scrolling down
    navbar.style.top = "-80px";
  } else {
    // Scrolling up
    navbar.style.top = "0";
  }
  lastScrollTop = st <= 0 ? 0 : st;
});

// Collections Data
const collectionData = [
  {
    title: "The Timeless Classic",
    category: "classic",
    desc: "Elegant cuts and refined fabrics for a look that never ages.",
    img: "classic1.jpg"
  },
  {
    title: "Urban Refresh",
    category: "urban",
    desc: "Bold, vibrant, and street-ready. Urban style for trendsetters.",
    img: "urban1.jpg"
  },
  {
    title: "Golden Evenings",
    category: "evening",
    desc: "Glamorous eveningwear that shines through every event.",
    img: "evening1.jpg"
  },
  {
    title: "Youth Pop",
    category: "youth",
    desc: "Fun, colorful, and expressive—celebrate youthful energy.",
    img: "youth1.jpg"
  },
  {
    title: "Classic Royalty",
    category: "classic",
    desc: "Rich textures and timeless silhouettes for the distinguished.",
    img: "classic2.jpg"
  },
  {
    title: "City Lights",
    category: "urban",
    desc: "Sleek, modern essentials for everyday style in the city.",
    img: "urban2.jpg"
  },
  {
    title: "Midnight Muse",
    category: "evening",
    desc: "Satin, sequins, and drama—make a statement at night.",
    img: "evening2.jpg"
  },
  {
    title: "Young Originals",
    category: "youth",
    desc: "Original prints and cuts for the next generation of icons.",
    img: "youth2.jpg"
  }
];

// Render collection items
const collectionItemsContainer = document.getElementById('collectionItems');
function renderCollectionItems(filter) {
  collectionItemsContainer.innerHTML = '';
  const filtered = filter === 'all' ? collectionData : collectionData.filter(item => item.category === filter);
  if (filtered.length === 0) {
    collectionItemsContainer.innerHTML = '<p>No items available.</p>';
    return;
  }
  filtered.forEach(item => {
    const div = document.createElement('div');
    div.className = 'collection-card';
    div.innerHTML = `
      <img src="${item.img}" alt="${item.title}" class="collection-card-img">
      <div class="collection-card-content">
        <div class="collection-card-title">${item.title}</div>
        <div class="collection-card-category">${capitalize(item.category)}</div>
        <div class="collection-card-desc">${item.desc}</div>
      </div>
    `;
    collectionItemsContainer.appendChild(div);
  });
  addTabIndexToImages();
}
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
// Initial render
renderCollectionItems('all');

// Filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    renderCollectionItems(this.getAttribute('data-filter'));
  });
});

// IMAGE MODAL LOGIC
const imgModal = document.getElementById('imgModal');
const imgModalImg = document.getElementById('imgModalImg');
const imgModalClose = document.getElementById('imgModalClose');

// Delegate click for any .collection-card-img
collectionItemsContainer.addEventListener('click', function(e) {
  const target = e.target;
  if (target.classList.contains('collection-card-img')) {
    imgModalImg.src = target.src;
    imgModalImg.alt = target.alt;
    imgModal.classList.add('open');
    document.body.classList.add('modal-open');
  }
});
// For accessibility: keyboard focus
collectionItemsContainer.addEventListener('keydown', function(e) {
  if (
    e.target.classList.contains('collection-card-img') &&
    (e.key === "Enter" || e.key === " ")
  ) {
    imgModalImg.src = e.target.src;
    imgModalImg.alt = e.target.alt;
    imgModal.classList.add('open');
    document.body.classList.add('modal-open');
    e.preventDefault();
  }
});

// Close modal on click or close button
imgModal.addEventListener('click', function(e) {
  if (
    e.target === imgModal ||
    e.target === imgModalClose
  ) {
    imgModal.classList.remove('open');
    document.body.classList.remove('modal-open');
    imgModalImg.src = "";
  }
});

// Optional: ESC to close
document.addEventListener('keydown', function(e) {
  if (imgModal.classList.contains('open') && e.key === "Escape") {
    imgModal.classList.remove('open');
    document.body.classList.remove('modal-open');
    imgModalImg.src = "";
  }
});

// Add tabindex for accessibility
function addTabIndexToImages() {
  document.querySelectorAll('.collection-card-img').forEach(img => {
    img.setAttribute('tabindex', 0);
    img.setAttribute('role', 'button');
    img.setAttribute('aria-label', 'View full image');
  });
}