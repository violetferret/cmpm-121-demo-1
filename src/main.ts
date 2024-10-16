import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Shrimp Savings";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// create button
const symbol: string = "🦐";
const shrimpButton = document.createElement("button");
shrimpButton.innerHTML = symbol;
app.append(shrimpButton);

// add counter display
let counter: number = 0;
const counterDisplay = document.createElement("h2");
counterDisplay.innerHTML = `You have saved ${counter.toFixed(0)} shrimps`;
app.append(counterDisplay);

// create button clicking event
shrimpButton.addEventListener("click", function () {
  counter++;
  counterDisplay.innerHTML = `You have saved ${counter.toFixed(0)} shrimps`;
});

// create upgrade buttons
interface upgrade {
  name: string;
  cost: number;
  rateIncrease: number;
  amountPurchased: number;
  button?: HTMLButtonElement;
  description: string;
}

const upgradeButtons: upgrade[] = [
  {
    name: "Open a Shrimp Savings Account",
    cost: 10,
    rateIncrease: 0.1,
    amountPurchased: 0,
    description: "Start gaining interest on your shrimps!",
  },
  {
    name: "Start a Shrimp Roth IRA",
    cost: 100,
    rateIncrease: 2,
    amountPurchased: 0,
    description: "In ~40 years, your shrimps will be tax-free!",
  },
  {
    name: "Invest in the Shrimp Stock Market",
    cost: 1000,
    rateIncrease: 50,
    amountPurchased: 0,
    description: "Sink your money into some promising shrimp shares!",
  },
  {
    name: "Diversify your Shrimp Stock Portfolio",
    cost: 10000,
    rateIncrease: 100,
    amountPurchased: 0,
    description: "Time to start looking at other lucrative shrimp stocks...",
  },
  {
    name: "Start a Shrimp Venture Capital Fund",
    cost: 100000,
    rateIncrease: 250,
    amountPurchased: 0,
    description: "Invest in the next generation of shrimp industry!",
  },
];

// set initial growth rate
let growthRate: number = 1;

const growthRateDisplay = document.createElement("h3");
growthRateDisplay.innerHTML = `${growthRate.toFixed(1)} shrimps per second`;
app.append(growthRateDisplay);

// set up html elements of upgrade buttons
for (const upgrade of upgradeButtons) {
  const button = document.createElement("button");
  button.innerHTML =
    upgrade.name +
    `<small><br>${upgrade.cost.toFixed(2)} shrimps<br>${upgrade.amountPurchased} purchased<br><i>` +
    upgrade.description +
    `</i></small>`;
  app.append(button);
  upgrade.button = button;
  button.disabled = true;

  // increase growth rate/decrease currency with upgrades
  button.addEventListener("click", function () {
    counter -= upgrade.cost;
    upgrade.cost *= 1.15;
    growthRate += upgrade.rateIncrease;
    growthRateDisplay.innerHTML = `${growthRate.toFixed(1)} shrimps per second`;
    upgrade.amountPurchased++;
    button.innerHTML =
      upgrade.name +
      `<small><br>${upgrade.cost.toFixed(2)} shrimps<br>${upgrade.amountPurchased} purchased<br><i>` +
      upgrade.description +
      `</i></small>`;
  });
}

// increment shrimps every second on top of user-genegrowthRated ones
// function outline taken from mozilla developer docs: https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame#examples
let start: number;

function step(timestamp: number) {
  if (start === undefined) {
    start = timestamp;
  }

  const elapsed = timestamp - start;

  if ((elapsed / 1000) * growthRate >= 1) {
    counter++;
    counterDisplay.innerHTML = `You have saved ${counter.toFixed(0)} shrimps`;
    start = timestamp;
  }

  // check for the counter value each frame
  // to enable upgrade button
  for (const upgrade of upgradeButtons) {
    if (upgrade.button) {
      if (counter >= upgrade.cost) {
        upgrade.button.disabled = false;
      } else {
        upgrade.button.disabled = true;
      }
    }
  }

  requestAnimationFrame(step);
}

requestAnimationFrame(step);
