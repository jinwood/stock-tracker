# stock-tracker

## Requirements

A stock update feed will be provided in an input file with the following format rules:

● Each new line of the file will represent a separate instruction

● The possible instructions are:

○ set-stock <sku-id> <stock-level> <sku-id> <stock-level> .. - For each SKU, the stock level should be set to the level specified.

○ add-stock <sku-id> <stock-amount> <sku-id> <stock-amount> .. - For each SKU, the stock level should be increased by the additional amount specified.

○ order <order-ref> <sku-id> <quantity> <sku-id> <quantity> .. - For each SKU in the order, deducts the quantity ordered from the stock level.

Your code should take a filename as an input parameter, process the file, and print a list of stock levels to the console, sorted alphabetically by SKU (see below for example output).

Example

```
Input file: stock.txt
set-stock AB-6 100 CD-3 200 DE-1 200 FG-4 300
add-stock AB-6 20
add-stock CD-3 10 DE-1 10
order ON-123 AB-6 2
order ON-234 CD-3 1 DE-1 1
add-stock CD-3 5
```

If your program was provided with stock.txt as an argument, it would print the following output to the console:
AB-6 118 CD-3 214 DE-1 209 FG-4 300

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

To run tests:

```bash
bun test
```

This project was created using `bun init` in bun v1.0.0. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
