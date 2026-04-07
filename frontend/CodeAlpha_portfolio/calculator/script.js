const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.value;

        if (value === "AC") {
            display.value = ""; 
        } else if (value === "DEL") {
            display.value = display.value.slice(0, -1); // Remove last char
        } else if (value === "=") {
            try {
                display.value = eval(display.value);
            } catch {
                display.value = "Error";
            }
        } else {
            display.value += value;
        }
    });
});