import chalk from "chalk";
import { Inventory } from ".";

export function processStockAdd(value: string, inventory: Inventory) {
  if (!value.startsWith("add-stock")) {
    console.log(chalk.red("Invalid add-stock entry"));
    process.exit(1);
  }

  const stockPairs = value.split(" ").slice(1);

  for (let i = 0; i < stockPairs.length; i += 2) {
    const pair = stockPairs[i] + " " + stockPairs[i + 1]; // only work in pairs
    const [key, value] = pair.split(" ");

    inventory[key] = inventory[key]
      ? inventory[key] + parseInt(value)
      : parseInt(value);
  }

  return inventory;
}
