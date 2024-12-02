const IS_TEST = 0;

type Level = number[];

async function parseInput() {
  const input = Bun.file(
    [import.meta.dir, IS_TEST ? "test_input.txt" : "input.txt"].join("/"),
  );
  const text = await input.text();

  return text
    .split("\n")
    .filter(Boolean)
    .map((line) => line && line.split(" ").map(Number)) as Level[];
}

const input = await parseInput();

function isLevelSafe1(level: Level) {
  const isAsc = level[0] > level[1];
  let result = true;

  for (let i = 1; i < level.length; i++) {
    const prev = level[i - 1];
    const curr = level[i];
    if ((isAsc && prev > curr) || (!isAsc && prev < curr)) {
      const diff = Math.abs(prev - curr);
      if (diff > 3 || diff < 1) {
        result = false;
        break;
      }
    } else {
      result = false;
      break;
    }
  }

  if (result) console.log(level, result);
  return result;
}

function isLevelSafe(level: Level) {
  const isAsc = level[0] < level[1];
  let result = true;

  for (let i = 0; i < level.length - 1; i++) {
    const curr = level[i];
    const next = level[i + 1];
    const diff = Math.abs(next - curr);
    if (
      ((isAsc && curr < next) || (!isAsc && curr > next)) &&
      diff >= 1 &&
      diff <= 3
    ) {
      continue;
    } else {
      result = false;
      break;
    }
  }

  if (result) console.log(level, result);
  return result;
}

function isLevelSafe2(level: Level) {
  if (isLevelSafe(level)) {
    return true;
  }
  return isSubLevelSafe(level);
}

function isSubLevelSafe(level: Level) {
  for (let i = 0; i < level.length; i++) {
    const modLevel = level.toSpliced(i, 1);
    if (isLevelSafe(modLevel)) return true;
  }
  return false;
}

// console.log("Part 1:", input.filter(isLevelSafe1).length);
console.log("Part 2:", input.filter(isLevelSafe2).length);
