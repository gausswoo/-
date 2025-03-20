// Initialize the grid with 30 slots (5 rows × 6 columns)
// Each slot has two states: bigCrown (0 = incomplete, 1 = complete) and smallCrown (0 = incomplete, 1 = complete)
const initialProgress = Array(30).fill().map(() => ({
    bigCrown: 0, // All crowns start as empty (incomplete)
    smallCrown: 0
}));

const excludedIndices = [15, 18, 19, 29];

// Load progress from localStorage, or use initialProgress if none exists
let progress = JSON.parse(localStorage.getItem("progress")) || initialProgress;

// Get DOM elements
const grid = document.getElementById("grid");
const resetBtn = document.getElementById("reset-btn");

// URLs for the crown images (replace these with the actual URLs after hosting)
const bigCrownEmptyUrl = "images/empty_big_clown.png"; // Replace with actual URL
const bigCrownFilledUrl = "images/filled_big_clown.png"; // Replace with actual URL
const smallCrownEmptyUrl = "images/empty_small_clown.png"; // Replace with actual URL
const smallCrownFilledUrl = "images/filled_small_clown.png"; // Replace with actual URL

// Function to render the grid
function renderGrid() {
    grid.innerHTML = ""; // Clear the grid
    progress.forEach((state, index) => {
        const slot = document.createElement("div");
        slot.classList.add("slot");

        // Add monster image
        const monster = document.createElement("img");
        monster.classList.add("monster");
        monster.src =  `monsters/monster-${index}.png`;
        // For index 29, wrap the monster image in an <a> tag
        if (index === 29) {
            const link = document.createElement("a");
            link.href = "https://x.com/kochamhw";
            link.target = "_blank";
            link.appendChild(monster);
            slot.appendChild(link);
        } else {
            slot.appendChild(monster);
        }
	

        

        // Skip rendering buttons for excluded indices
        if (excludedIndices.includes(index)) {
            grid.appendChild(slot);
            return;
        }

        // Create buttons container
        const buttons = document.createElement("div");
        buttons.classList.add("buttons");

       

        // Small crown button
        const smallCrownBtn = document.createElement("button");
        smallCrownBtn.classList.add("small-crown-btn");
        smallCrownBtn.style.backgroundImage = state.smallCrown === 1 ? `url('${smallCrownFilledUrl}')` : `url('${smallCrownEmptyUrl}')`;
        smallCrownBtn.addEventListener("click", () => handleSmallCrownClick(index));
        buttons.appendChild(smallCrownBtn);
	 // Big crown button
        const bigCrownBtn = document.createElement("button");
        bigCrownBtn.classList.add("big-crown-btn");
        bigCrownBtn.style.backgroundImage = state.bigCrown === 1 ? `url('${bigCrownFilledUrl}')` : `url('${bigCrownEmptyUrl}')`;
        bigCrownBtn.addEventListener("click", () => handleBigCrownClick(index));
        buttons.appendChild(bigCrownBtn);

        // Append buttons to the slot
        slot.appendChild(buttons);
        grid.appendChild(slot);
    });
}

// Function to handle big crown button clicks
function handleBigCrownClick(index) {
    progress[index].bigCrown = progress[index].bigCrown === 0 ? 1 : 0; // Toggle state
    saveProgress();
    renderGrid();
}

function handleSmallCrownClick(index) {
    progress[index].smallCrown = progress[index].smallCrown === 0 ? 1 : 0; // Toggle state
    saveProgress();
    renderGrid();
}

// Function to save progress to localStorage
function saveProgress() {
    localStorage.setItem("progress", JSON.stringify(progress));
}

// Function to reset progress
function resetProgress() {
    progress = initialProgress.map(item => ({ ...item })); // Deep copy to reset
    saveProgress();
    renderGrid();
}

// Add event listener for the reset button
resetBtn.addEventListener("click", resetProgress);

// Initial render
renderGrid();
