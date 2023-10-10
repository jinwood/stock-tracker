import chalk from "chalk";
import { processSetStock } from "./stock-set";
import { processStockOrders } from "./stock-orders";
import { processStockAdd } from "./stock-add";

export interface Inventory {
  [key: string]: number;
}

function filterItemsByPrefix(items: string[], prefix: string): string[] {
  return items.filter((item) => item.startsWith(prefix));
}

function processItems(
  items: string[],
  processFunction: Function,
  inventory: Inventory,
) {
  for (const item of items) {
    inventory = processFunction(item, inventory);
  }
  return inventory;
}

async function main() {
  if (!process.argv[2]) {
    console.log(chalk.red("Please provide a filename"));
    process.exit(1);
  }

  const filename = process.argv[2];

  const file = Bun.file(filename);
  const exists = await file.exists();

  if (!exists) {
    console.log(chalk.red("File does not exist"));
    process.exit(1);
  }

  const content = await file.text();
  const items = content.split("\n");

  let inventory: Inventory = {};

  const setStocks = filterItemsByPrefix(items, "set-stock");
  const addStocks = filterItemsByPrefix(items, "add-stock");
  const orders = filterItemsByPrefix(items, "order");

  inventory = processItems(setStocks, processSetStock, inventory);
  inventory = processItems(addStocks, processStockAdd, inventory);
  inventory = processItems(orders, processStockOrders, inventory);

  const stockIds = Object.keys(inventory).sort();
  stockIds.forEach((stockId) => {
    console.log(chalk.green(stockId), chalk.yellow(inventory[stockId]));
  });
}

await main();
