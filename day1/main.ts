const IS_TEST = false;

async function parseInput() {
  const input = Bun.file(
    [import.meta.dir, IS_TEST ? "test_input.txt" : "input.txt"].join("/"),
  );
  const text = await input.text();
  return text
    .split("\n")
    .filter(Boolean)
    .map((line) => line && line.split("   ").map(Number)) as [number, number][];
}

const input = await parseInput();
const { left, right, rightOccurances } = getLists(input);

function getLists(pairs: [number, number][]) {
  const left: number[] = [];
  const right: number[] = [];
  const rightOccurances: Map<number, number> = new Map();

  pairs.forEach(([a, b]) => {
    left.push(a);
    right.push(b);
    const occ = rightOccurances.get(b);
    if (occ) rightOccurances.set(b, occ + 1);
    else rightOccurances.set(b, 1);
  });
  left.sort();
  right.sort();

  return { left, right, rightOccurances };
}

function getDistances(left: number[], right: number[]) {
  return left.map((a, index) => {
    const b = right[index];
    return Math.abs(b - a);
  });
}
const distances = getDistances(left, right);

function getSimilarityScore(left: number[], right: Map<number, number>) {
  let total = 0;
  for (const item of left) {
    const occ = right.get(item);
    if (occ) total += occ * item;
  }
  return total;
}

function part1Result(distances: number[]) {
  return distances.reduce((acc, curr) => acc + curr, 0);
}

console.log("Part 1:", part1Result(distances));
console.log("Part 2:", getSimilarityScore(left, rightOccurances));
