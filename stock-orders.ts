import chalk from "chalk";
import { Inventory } from ".";

export function processStockOrders(value: string, inventory: Inventory) {
  if (!value.startsWith("order")) {
    console.log(chalk.red("Invalid order entry"));
    process.exit(1);
  }

  const orderPairs = value.split(" ").slice(2); // we dont care about the order ref

  for (let i = 0; i < orderPairs.length; i += 2) {
    const pair = orderPairs[i] + " " + orderPairs[i + 1]; // only work in pairs
    const [key, value] = pair.split(" ");

    if (!inventory[key]) {
      console.log(chalk.red("Tried to remove stock that does not exist"));
      process.exit(1);
    }

    inventory[key] = inventory[key] - parseInt(value);
  }

  return inventory;
}
