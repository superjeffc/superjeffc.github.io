// Search Functionality
const searchInput = document.getElementById('search-input');
const cards = document.querySelectorAll('.recipe-card');
const noResults = document.getElementById('no-results');
const resultsHeader = document.getElementById('results-header');
const resultsCount = document.getElementById('results-count');

searchInput?.addEventListener('keyup', (e) => {
    const term = e.target.value.toLowerCase();
    let visibleCount = 0;

    cards.forEach(card => {
        const title = card.getAttribute('data-title').toLowerCase();
        if (title.includes(term)) {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });

    resultsHeader.textContent = term === '' ? "All Recipes" : `Search Results for "${e.target.value}"`;
    resultsCount.textContent = `${visibleCount} Found`;

    visibleCount === 0 ? noResults.classList.remove('hidden') : noResults.classList.add('hidden');
});

// Global Image Fallback (Removes the need for inline 'onerror')
document.addEventListener('error', (e) => {
    if (e.target.tagName.toLowerCase() === 'img') {
        const img = e.target;
        img.style.display = 'none';
        if (img.nextElementSibling) {
            img.nextElementSibling.style.display = 'flex';
        }
    }
}, true);

document.addEventListener('DOMContentLoaded', () => {
    // 1. Select all elements with the recipe-card class
    const recipes = document.querySelectorAll('.recipe-card');
    const count = recipes.length;

    // 2. Update the "Total" count in the Navbar
    const totalCountDisplay = document.getElementById('total-count');
    if (totalCountDisplay) {
        totalCountDisplay.textContent = count;
    }

    // 3. Update the "Results" count above the grid
    const resultsCountDisplay = document.getElementById('results-count');
    if (resultsCountDisplay) {
        resultsCountDisplay.textContent = `${count} Found`;
    }
});