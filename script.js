// Helper: Generate a random hex colour
function getRandomHex() {
    const hex = Math.floor(Math.random() * 0xffffff).toString(16);
    return "#" + hex.padStart(6, "0");
}

// Helper: Convert HEX to RGB
function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
}

// Helper: Convert HEX to HSL
function hexToHsl(hex) {
    let r = parseInt(hex.slice(1, 3), 16) / 255;
    let g = parseInt(hex.slice(3, 5), 16) / 255;
    let b = parseInt(hex.slice(5, 7), 16) / 255;

    let max = Math.max(r, g, b),
    min = Math.min(r, g, b);
    let h,
    s,
    l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min): d / (max + min);
        switch (max) {
            case r:
                h = ((g - b) / d + (g < b ? 6: 0));
                break;
            case g:
                h = ((b - r) / d + 2);
                break;
            case b:
                h = ((r - g) / d + 4);
                break;
        }
        h /= 6;
    }

    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);

    return `hsl(${h}, ${s}%, ${l}%)`;
}

// MAIN FUNCTION
function generatePalette() {
    const paletteContainer = document.getElementById("palette");
    paletteContainer.innerHTML = "";

    for (let i = 0; i < 5; i++) {
        const hex = getRandomHex();
        const rgb = hexToRgb(hex);
        const hsl = hexToHsl(hex);

        const block = document.createElement("div");
        block.classList.add("color-block");
        block.style.backgroundColor = hex;

        const code = document.createElement("div");
        code.classList.add("color-code");
        code.textContent = `${hex}\n${rgb}\n${hsl}`;

        // Copy to clipboard on click
        block.addEventListener("click", () => {
            navigator.clipboard.writeText(hex).then(() => {
                alert(`Copied ${hex} to clipboard!`);
            });
    });

    block.appendChild(code);
    paletteContainer.appendChild(block);
}
}

// BUTTON LISTENER
document.getElementById("generateBtn").addEventListener("click", generatePalette);

// INITIAL INVOCATION
generatePalette();