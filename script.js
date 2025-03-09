const canvas = document.getElementById("giraffe-canvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score");

let score = 0;
let neckHeight = 80; // Default neck height
let maxNeckHeight = 200; // Maximum neck height before turning horizontal
let horizontalNeckLength = 0; // To track how much the neck has grown horizontally

// Adjust canvas size based on the viewport height (minus any fixed header/footer if applicable)
canvas.height = window.innerHeight;  // Adjust height based on the window's height
canvas.width = window.innerWidth;    // Adjust width based on the window's width

// Redraw giraffe
function drawGiraffe() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set starting position for the giraffe's body and neck
    let bodyBaseY = canvas.height - 50; // Make sure the body stays near the bottom of the canvas

    // Body
    ctx.fillStyle = "#c78b36";
    ctx.fillRect(60, bodyBaseY - 100, 80, 100);
    
    // Legs
    ctx.fillStyle = "#704214";
    ctx.fillRect(60, bodyBaseY, 20, 50);
    ctx.fillRect(120, bodyBaseY, 20, 50);
    
    // Neck (Grows with Score)
    ctx.fillStyle = "#c78b36";
    
    // Draw the vertical neck part
    ctx.fillRect(90, bodyBaseY - 100 - neckHeight, 20, neckHeight);

    // Once the neck reaches max height, start growing it horizontally
    if (neckHeight >= maxNeckHeight) {
        // Draw the vertical neck part
        ctx.fillRect(90, bodyBaseY - 100 - maxNeckHeight, 20, maxNeckHeight); // Vertical neck part

        // Draw the horizontal neck part
        ctx.fillRect(90 + 20, bodyBaseY - 100 - maxNeckHeight, horizontalNeckLength, 20); // Horizontal neck part
    }
    
    // Head stays attached at the end of the neck
    let headX = 80; // Default head X position (aligned with vertical neck)
    let headY = bodyBaseY - 100 - neckHeight - 30; // Default head Y position (vertical neck)
    
    if (neckHeight >= maxNeckHeight) {
        // If the neck is horizontal, the head will follow the end of the horizontal neck
        headX = 90 + 20 + horizontalNeckLength; // Adjust headX to center it at the end of the horizontal neck
        headY = bodyBaseY - 100 - maxNeckHeight - 5; // Keep head's Y position fixed
    }
    
    // Draw the head
    ctx.fillStyle = "#d6a858";
    ctx.fillRect(headX, headY, 40, 30); // Head stays at the end of the neck
}

// Increase Score (Grow Neck)
function increaseScore() {
    score += 10;
    if (neckHeight < maxNeckHeight) {
        neckHeight += 10; // Increase neck height vertically
    } else {
        horizontalNeckLength += 10; // Once max height is reached, grow the neck horizontally
    }
    updateGame();
}

// Decrease Score (Shrink Neck)
function decreaseScore() {
    if (score > 0) {
        score -= 10;
        if (horizontalNeckLength > 0) {
            horizontalNeckLength -= 10; // Shrink the horizontal neck
        } else if (neckHeight > 0) {
            neckHeight -= 10; // Shrink the vertical neck
        }
    }
    updateGame();
}

// Update game visuals
function updateGame() {
    scoreDisplay.innerText = score;
    drawGiraffe();
}

// Re-adjust canvas size if the window is resized
window.addEventListener("resize", () => {
    canvas.height = window.innerHeight;  // Adjust height on resize
    canvas.width = window.innerWidth;    // Adjust width on resize
    drawGiraffe();  // Redraw the giraffe to keep it visible
});

// Initial draw
drawGiraffe();