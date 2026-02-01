// Helper: Generate a random hex colour
function getRandomHex() {
    const hex = Math.floor(Math.random() * 0xffffff).toString(16);
    return "#" + hex.padStart(6, "0");
}

// CHILL
function getFundHex(range, mode = "blue") {
    if (!Number.isFinite(range) || range <= 0) return "#000000";

    const dec = range / 10 ** Math.ceil(Math.log10(range + 1));
    const base = Math.floor(dec * 200);
    const jitter = () => Math.floor(Math.random() * 1000);

    let r, g, b;

    switch (mode) {
        case "red":
            r = Math.min(220 + jitter(), base + 60);
            g = Math.min(60  + jitter(), base * 0.4);
            b = Math.min(40  + jitter(), base * 0.3);
            break;

        case "green":
            r = Math.min(50  + jitter(), base * 0.35);
            g = Math.min(220 + jitter(), base + 80);
            b = Math.min(50  + jitter(), base * 0.35);
            break;

        case "purple":
            r = Math.min(180 + jitter(), base + 60);
            g = Math.min(40  + jitter(), base * 0.25);
            b = Math.min(200 + jitter(), base + 80);
            break;
            
        case "yellow":
            r = Math.min(220 + jitter(), base + 80);
            g = Math.min(220 + jitter(), base + 80);
            b = Math.min(40  + jitter(), base * 0.2);
            break;

        case "orange":
            r = Math.min(220 + jitter(), base + 80);
            g = Math.min(140 + jitter(), base + 30);
            b = Math.min(30  + jitter(), base * 0.2);
            break;
            
            
        case "pink":
            r = Math.min(220 + jitter(), base + 80);
            g = Math.min(120 + jitter(), base * 0.7);
            b = Math.min(140 + jitter(), base * 0.8);
            break;

        case "teal":
            r = Math.min(40  + jitter(), base * 0.3);
            g = Math.min(180 + jitter(), base + 60);
            b = Math.min(180 + jitter(), base + 60);
            break;
        
        case "blue":
        default:
            r = Math.min(40  + jitter(), base * 0.3);
            g = Math.min(80  + jitter(), base * 0.6);
            b = Math.min(220 + jitter(), base + 80);
            break;
    }

    const hex =
        ((r << 16) | (g << 8) | b)
            .toString(16)
            .padStart(6, "0");

    return `#${hex}`;
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
function generatePalette(mode = "blue") {
    const paletteContainer = document.getElementById("palette");
    paletteContainer.innerHTML = "";

    for (let i = 0; i < 5; i++) {
        const range = Math.floor(Math.random() * 100000);
        const hex = getFundHex(range, mode);
        const rgb = hexToRgb(hex);
        const hsl = hexToHsl(hex);

        const block = document.createElement("div");
        block.classList.add("color-block");
        block.style.backgroundColor = hex;

        const code = document.createElement("div");
        code.classList.add("color-code");
        code.textContent = `${hex}\n${rgb}\n${hsl}`;

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
document.getElementById("generateBtn").addEventListener("click", () => generatePalette("teal"));

// INITIAL INVOCATION
generatePalette();
