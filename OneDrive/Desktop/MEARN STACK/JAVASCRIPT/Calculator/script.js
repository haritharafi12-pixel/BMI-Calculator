let screen = document.getElementById("screen");

function appendValue(value) {
    if (screen.innerText === "0") {
        screen.innerText = value;
    } else {
        screen.innerText += value;
    }
}

function clearScreen() {
    screen.innerText = "0";
}

function calculate() {
    try {
        screen.innerText = eval(screen.innerText);
    } catch {
        screen.innerText = "Error";
    }
}

