import chalk from "chalk";

export function processSetStock(entry: string) {
  if (!entry.startsWith("set-stock")) {
    console.log(chalk.red("Invalid set-stock entry", entry));
    process.exit(1);
  }

  let key: string = "";
  let value: string = "";

  const stockPairs: { [key: string]: number } = entry.split(" ").reduce(
    (acc, item, i) => {
      if (i === 0) {
        return acc;
      }

      if (i % 2 !== 0) {
        key = item;
      } else {
        value = item;
      }

      if (key && value) {
        acc[key] = Number(value);
        key = "";
        value = "";
      }

      return acc;
    },
    {} as { [key: string]: number },
  );
  return stockPairs;
}
