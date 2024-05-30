const colorPicker = document.getElementById("color-picker");
const generatedColorEl = document.getElementById("generated-colors");
const generatedHexEl = document.getElementById("generated-hexes");
const modeSelectionEL = document.getElementById("mode-selection");
const numberOfColorsSelection = document.getElementById("number-of-colors-selections");

document.getElementById("generate-button").addEventListener("click", (e) => {
    generatedColorEl.innerHTML = ``
    generatedHexEl.innerHTML = ``
    getColor(numberOfColorsSelection.value);
    document.getElementById("default-text").style.display = "none"
});

const getColor = (numOfColors) => {
    for (let i = 0; i < numOfColors; i++){
        try {
            fetch(`https://www.thecolorapi.com/scheme?hex=${colorPicker.value.substr(1)}&mode=${modeSelectionEL.value}`)
                .then(res => res.json())
                .then(data  => {
                    renderColors(data.colors[i].hex)
                    renderHex(data.colors[i].hex)
                    })
        } catch (err) {
            console.log(err)
        }
    }
}

const renderColors = (currentColor) => {
    generatedColorEl.innerHTML +=`
    <p class="generated-color" onclick="copyToClipboard('${currentColor.value}')" style="background-color:${currentColor.value};">${currentColor.value}</p>
    `;
}

const renderHex = (currentColor) => {
    generatedHexEl.innerHTML +=`
    <p class="generated-hex" onclick="copyToClipboard('${currentColor.value}')"> ${currentColor.value}</p>
    `
}

const copyToClipboard = (hexToCopy) => {
    navigator.clipboard.writeText(hexToCopy);
    alert(`Copied ${hexToCopy} to clipboard`);
}