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