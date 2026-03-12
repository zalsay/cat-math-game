export type Difficulty = 4 | 6 | 9;

export function getBoxDimensions(size: Difficulty) {
  if (size === 4) return { rows: 2, cols: 2 };
  if (size === 6) return { rows: 2, cols: 3 };
  if (size === 9) return { rows: 3, cols: 3 };
  return { rows: 3, cols: 3 };
}

export function generateSudoku(size: Difficulty, emptyCount: number) {
  const grid = Array(size).fill(null).map(() => Array(size).fill(0));
  const { rows: boxRows, cols: boxCols } = getBoxDimensions(size);

  function isValid(grid: number[][], row: number, col: number, num: number) {
    for (let x = 0; x < size; x++) {
      if (grid[row][x] === num) return false;
    }
    for (let x = 0; x < size; x++) {
      if (grid[x][col] === num) return false;
    }
    const startRow = row - (row % boxRows);
    const startCol = col - (col % boxCols);
    for (let i = 0; i < boxRows; i++) {
      for (let j = 0; j < boxCols; j++) {
        if (grid[i + startRow][j + startCol] === num) return false;
      }
    }
    return true;
  }

  function fillGrid(grid: number[][], row = 0, col = 0): boolean {
    if (row === size) return true;
    
    let nextRow = col === size - 1 ? row + 1 : row;
    let nextCol = col === size - 1 ? 0 : col + 1;

    if (grid[row][col] !== 0) {
      return fillGrid(grid, nextRow, nextCol);
    }

    const nums = Array.from({ length: size }, (_, i) => i + 1);
    for (let i = nums.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [nums[i], nums[j]] = [nums[j], nums[i]];
    }

    for (let num of nums) {
      if (isValid(grid, row, col, num)) {
        grid[row][col] = num;
        if (fillGrid(grid, nextRow, nextCol)) return true;
        grid[row][col] = 0;
      }
    }
    return false;
  }

  fillGrid(grid);
  const solution = grid.map(row => [...row]);

  let count = emptyCount;
  let attempts = 0;
  while (count > 0 && attempts < 1000) {
    let cellId = Math.floor(Math.random() * size * size);
    let i = Math.floor(cellId / size);
    let j = cellId % size;
    if (grid[i][j] !== 0) {
      grid[i][j] = 0;
      count--;
    }
    attempts++;
  }

  return { puzzle: grid, solution };
}
