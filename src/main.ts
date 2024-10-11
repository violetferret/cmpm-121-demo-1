import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Shrimp Savings";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// create button
const symbol: string = "🦐";
const button = document.createElement("button");
button.innerHTML = symbol;
app.append(button);

// add counter display
let counter: number = 0;
const counterDisplay = document.createElement("h2");
counterDisplay.innerHTML = `You have saved ${counter} shrimps`;
app.append(counterDisplay);

// create button clicking event
button.addEventListener("click", function () {
  counter++;
  counterDisplay.innerHTML = `You have saved ${counter} shrimps`;
});

// create upgrade button
const upgradeButton = document.createElement("button");
upgradeButton.innerHTML = "Open a Shrimp Savings Account";
app.append(upgradeButton);
upgradeButton.disabled = true;
let growthRate: number = 1;

// increase
upgradeButton.addEventListener("click", function () {
  counter -= 10;
  growthRate++;
});

// increment shrimps every second on top of user-genegrowthRated ones
// function outline taken from mozilla developer docs: https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame#examples
let start: number;

function step(timestamp: number) {
  if (start === undefined) {
    start = timestamp;
  }

  const elapsed = timestamp - start;
  
  if (((elapsed / 1000) * growthRate) >= 1) {
    counter++;
    counterDisplay.innerHTML = `You have saved ${counter} shrimps`;
    start = timestamp;
  }

  // check for the counter value each frame
  // to enable upgrade button
  if (counter >= 10) {
    upgradeButton.disabled = false;
  } else {
    upgradeButton.disabled = true;
  }

  requestAnimationFrame(step);
}

requestAnimationFrame(step);
