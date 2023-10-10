import { expect, test } from "bun:test";
import { processSetStock } from "./stock-set";
import { processStockAdd } from "./stock-add";
import { processStockOrders } from "./stock-orders";

test("setStock", async () => {
  const input = "set-stock AB-6 100 CD-3 200 DE-1 200 FG-4 300";
  const output = processSetStock(input);

  expect(output).toEqual({
    "AB-6": 100,
    "CD-3": 200,
    "DE-1": 200,
    "FG-4": 300,
  });
});

test("addStock basic", async () => {
  const input = "add-stock AB-6 20";
  const output = processStockAdd(input, {});

  expect(output).toEqual({
    "AB-6": 20,
  });
});

test("addStock complex", async () => {
  const input = "add-stock AB-6 20 CD-3 10 DE-1 10";
  const inventory = {
    "AB-6": 22,
    "CD-3": 18,
    "DE-1": 56,
    "FG-4": 300,
  };
  const output = processStockAdd(input, inventory);

  expect(output).toEqual({
    "AB-6": 42,
    "CD-3": 28,
    "DE-1": 66,
    "FG-4": 300,
  });
});

test("order", async () => {
  const input = "order ON-123 AB-6 2";
  const output = processStockOrders(input, { "AB-6": 20 });

  expect(output).toEqual({
    "AB-6": 18,
  });
});
