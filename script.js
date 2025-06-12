// script.js

// Get references to display, live result, and all calculator buttons
const display = document.getElementById("display");
const liveResult = document.getElementById("liveResult");
const buttons = document.querySelectorAll(".btn");

// Store the current expression as a string
let expression = "";

// Add click event listener to each button
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent; // Get the button's text

    // Handle Backspace (⌫)
    if (value === "⌫") {
      expression = expression.slice(0, -1); // Remove last character
      display.value = expression;
      // Update live result
      try {
        const result = eval(expression
          .replace(/×/g, "*")
          .replace(/÷/g, "/")
          .replace(/%/g, "/100")
          .replace(/−/g, "-"));
        if (!isNaN(result) && expression) {
          liveResult.textContent = "= " + result;
        } else {
          liveResult.textContent = "";
        }
      } catch {
        liveResult.textContent = "";
      }
    }
    // If 'C' is pressed, clear everything
    else if (value === "C") {
      expression = "";
      display.value = "";
      liveResult.textContent = "";
      display.classList.remove("highlight");
    }
    // If '=' is pressed, evaluate the expression and show result
    else if (value === "=") {
      try {
        // Replace custom operators and evaluate
        const result = eval(expression
          .replace(/×/g, "*")
          .replace(/÷/g, "/")
          .replace(/%/g, "/100")
          .replace(/−/g, "-"));
        display.value = result;
        display.classList.add("highlight"); // Highlight result

        // Add to history
        if (expression) {
          const entry = `${expression} = ${result}`;
          historyData.push(entry);
          const li = document.createElement("li");
          li.textContent = entry;
          historyList.prepend(li); // Add to top
        }
      } catch {
        display.value = "Error"; // Show error if evaluation fails
      }
    }
    // For all other buttons (numbers/operators)
    else {
      // Prevent multiple decimals in a number
      if (value === ".") {
        // Only allow if last number doesn't already have a decimal
        const parts = expression.split(/[\+\-\×\÷]/);
        if (parts[parts.length - 1].includes(".")) return;
      }
      display.classList.remove("highlight"); // Remove highlight
      expression += value; // Append value to expression

      display.value = expression; // Update display

      // Try to show live result as user types
      try {
        const result = eval(expression
          .replace(/×/g, "*")
          .replace(/÷/g, "/")
          .replace(/%/g, "/100")
          .replace(/−/g, "-"));
        if (!isNaN(result)) {
          liveResult.textContent = "= " + result; // Show live result
        } else {
          liveResult.textContent = ""; // Clear if not a number
        }
      } catch {
        liveResult.textContent = ""; // Clear on error
      }
    }
  });
});

// Allow user input from keyboard
document.addEventListener("keydown", (event) => {
  let key = event.key;

  // Map keyboard keys to calculator buttons
  if (key === "Enter") key = "=";
  if (key === "Escape") key = "C";
  if (key === "*") key = "×";
  if (key === "/") key = "÷";
  if (key === "Backspace") key = "⌫";
  if (key === "%") key = "%";
  if (key === "-") key = "−"; 

  // Only process valid keys (numbers, operators, C, =, ., %, ⌫)
  if (
    /[0-9]/.test(key) ||
    ["+", "−", "×", "÷", ".", "C", "=", "%", "⌫"].includes(key)
  ) {
    // Simulate button click logic
    if (key === "⌫") {
      expression = expression.slice(0, -1);
      display.value = expression;
      try {
        const result = eval(expression
          .replace(/×/g, "*")
          .replace(/÷/g, "/")
          .replace(/%/g, "/100")
          .replace(/−/g, "-"));
        if (!isNaN(result) && expression) {
          liveResult.textContent = "= " + result;
        } else {
          liveResult.textContent = "";
        }
      } catch {
        liveResult.textContent = "";
      }
    } else if (key === "C") {
      expression = "";
      display.value = "";
      liveResult.textContent = "";
      display.classList.remove("highlight");
    } else if (key === "=") {
      try {
        display.value = eval(expression
          .replace(/×/g, "*")
          .replace(/÷/g, "/")
          .replace(/%/g, "/100")
          .replace(/−/g, "-"));
        display.classList.add("highlight");
      } catch {
        display.value = "Error";
      }
    } else {
      // Prevent multiple decimals in a number
      if (key === ".") {
        const parts = expression.split(/[\+\-\×\÷]/);
        if (parts[parts.length - 1].includes(".")) return;
      }
      display.classList.remove("highlight");
      expression += key;
      display.value = expression;
      try {
        const result = eval(expression
          .replace(/×/g, "*")
          .replace(/÷/g, "/")
          .replace(/%/g, "/100")
          .replace(/−/g, "-"));
        if (!isNaN(result)) {
          liveResult.textContent = "= " + result;
        } else {
          liveResult.textContent = "";
        }
      } catch {
        liveResult.textContent = "";
      }
    }
  }
});
// Theme toggle
const themeSwitcher = document.getElementById('themeSwitcher');

themeSwitcher.addEventListener('change', () => {
  document.body.classList.toggle('dark', themeSwitcher.checked);
});


window.addEventListener('DOMContentLoaded', () => {
  const darkMode = localStorage.getItem('darkMode') === 'true';
  document.body.classList.toggle('dark', darkMode);
  themeSwitcher.checked = darkMode;
});

themeSwitcher.addEventListener('change', () => {
  const isDark = themeSwitcher.checked;
  document.body.classList.toggle('dark', isDark);
  localStorage.setItem('darkMode', isDark);
});

const historyPanel = document.getElementById("historyPanel");
const historyToggle = document.getElementById("historyToggle");
const historyList = document.getElementById("historyList");

let historyData = [];

// Toggle panel visibility
historyToggle.addEventListener("click", () => {
  historyPanel.classList.toggle("show");
});




// Show current time in the timeDisplay input
function updateTime() {
  const timeInput = document.getElementById('timeDisplay');
  if (timeInput) {
    const now = new Date();
    const timeStr = now.toLocaleTimeString();
    timeInput.value = timeStr;
  }
}
setInterval(updateTime, 1000);
updateTime();
