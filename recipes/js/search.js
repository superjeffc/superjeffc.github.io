// Define Elements on the page
const searchInput = document.getElementById('search-input');
const cards = document.querySelectorAll('.recipe-card');
const noResults = document.getElementById('no-results');
const resultsHeader = document.getElementById('results-header');
const resultsCount = document.getElementById('results-count');
const totalCountDisplay = document.getElementById('total-count');

// Updates counts and visibility
const updateUI = (term = '') => {
    let visibleCount = 0;
    const lowerTerm = term.toLowerCase();

    cards.forEach(card => {
        const title = (card.getAttribute('data-title') || "").toLowerCase();

        if (title.includes(lowerTerm)) {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });

    // Update Headers & Counters
    resultsCount.textContent = `${visibleCount} Found`;
    resultsHeader.textContent = term === '' ? "All Recipes" : `Search Results for "${term}"`;

    // Update Navbar total only when the search is empty (initial load/reset)
    if (term === '' && totalCountDisplay) {
        totalCountDisplay.textContent = visibleCount;
    }

    // Toggle Empty State
    if (visibleCount === 0) {
        noResults.classList.remove('hidden');
    } else {
        noResults.classList.add('hidden');
    }
};

// 3. Event Listeners
searchInput?.addEventListener('keyup', (e) => {
    updateUI(e.target.value);
});

// Count the actual cards in the HTML as soon as the script runs.
updateUI();

// 4. Global Image Fallback
document.addEventListener('error', (e) => {
    if (e.target.tagName.toLowerCase() === 'img') {
        const img = e.target;
        img.style.display = 'none';
        // Shows the placeholder SVG (next sibling) if the image fails
        if (img.nextElementSibling) {
            img.nextElementSibling.style.display = 'flex';
        }
    }
}, true);