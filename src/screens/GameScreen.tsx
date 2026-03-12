import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, Share2, Settings, Undo, Eraser, Edit2, Lightbulb, Trophy } from 'lucide-react';
import { generateSudoku, getBoxDimensions, Difficulty } from '../utils/sudoku';

export default function GameScreen({ difficulty, onBack }: { difficulty: Difficulty, onBack: () => void }) {
  const [puzzle, setPuzzle] = useState<number[][]>([]);
  const [solution, setSolution] = useState<number[][]>([]);
  const [grid, setGrid] = useState<number[][]>([]);
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const [time, setTime] = useState(0);
  const [history, setHistory] = useState<number[][][]>([]);
  const [notes, setNotes] = useState<Set<number>[][]>([]);
  const [isNotesMode, setIsNotesMode] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    // Initialize game
    const emptyCount = difficulty === 4 ? 6 : difficulty === 6 ? 15 : 40;
    const { puzzle: p, solution: s } = generateSudoku(difficulty, emptyCount);
    setPuzzle(p);
    setSolution(s);
    setGrid(p.map(row => [...row]));
    setNotes(Array(difficulty).fill(null).map(() => Array(difficulty).fill(null).map(() => new Set())));
    setMistakes(0);
    setTime(0);
    setHistory([p.map(row => [...row])]);
  }, [difficulty]);

  useEffect(() => {
    if (isWon || isGameOver) return;
    const timer = setInterval(() => setTime(t => t + 1), 1000);
    return () => clearInterval(timer);
  }, [isWon, isGameOver]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleCellClick = (r: number, c: number) => {
    setSelectedCell([r, c]);
  };

  const handleNumberInput = useCallback((num: number) => {
    if (!selectedCell) return;
    const [r, c] = selectedCell;
    if (puzzle[r][c] !== 0) return; // Cannot edit initial numbers

    if (isNotesMode) {
      const newNotes = [...notes];
      const cellNotes = new Set(newNotes[r][c]);
      if (cellNotes.has(num)) cellNotes.delete(num);
      else cellNotes.add(num);
      newNotes[r][c] = cellNotes;
      setNotes(newNotes);
      return;
    }

    if (grid[r][c] === num) return;

    const newGrid = grid.map(row => [...row]);
    newGrid[r][c] = num;
    setGrid(newGrid);
    setHistory([...history, newGrid]);

    if (num !== 0 && num !== solution[r][c]) {
      setMistakes(m => {
        const newM = m + 1;
        if (newM >= 3) setIsGameOver(true);
        return newM;
      });
    }

    let complete = true;
    for (let i = 0; i < difficulty; i++) {
      for (let j = 0; j < difficulty; j++) {
        if (newGrid[i][j] !== solution[i][j]) {
          complete = false;
          break;
        }
      }
      if (!complete) break;
    }
    if (complete) {
      setIsWon(true);
    }
  }, [selectedCell, puzzle, grid, solution, history, isNotesMode, notes, difficulty]);

  const handleUndo = () => {
    if (history.length > 1) {
      const newHistory = history.slice(0, -1);
      setHistory(newHistory);
      setGrid(newHistory[newHistory.length - 1].map(row => [...row]));
    }
  };

  const handleErase = () => {
    if (!selectedCell) return;
    const [r, c] = selectedCell;
    if (puzzle[r][c] !== 0) return;
    const newGrid = grid.map(row => [...row]);
    newGrid[r][c] = 0;
    setGrid(newGrid);
    setHistory([...history, newGrid]);
  };

  const handleHint = () => {
    if (!selectedCell) return;
    const [r, c] = selectedCell;
    if (grid[r][c] !== solution[r][c]) {
      handleNumberInput(solution[r][c]);
    }
  };

  const { rows: boxRows, cols: boxCols } = getBoxDimensions(difficulty);

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-100">
        <button onClick={onBack} className="p-2 -ml-2"><ChevronLeft size={24} className="text-gray-700" /></button>
        <span className="font-bold text-lg text-gray-800">每日数独</span>
        <div className="flex gap-2">
          <button className="p-2"><Share2 size={20} className="text-gray-700" /></button>
          <button className="p-2 -mr-2"><Settings size={20} className="text-gray-700" /></button>
        </div>
      </div>

      {/* Info Bar */}
      <div className="flex justify-between items-center px-6 py-3">
        <div className="flex items-center gap-2">
          <div className="bg-green-100 text-green-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
            {difficulty}x{difficulty}
          </div>
          <div className="text-sm font-medium text-gray-600">
            {formatTime(time)}
          </div>
        </div>
        <div className="text-sm font-medium text-red-500">
          错误 {mistakes}/3
        </div>
      </div>

      {/* Board */}
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div 
          className="grid border-2 border-gray-800 bg-gray-800 gap-px w-full aspect-square max-w-[360px] rounded-sm overflow-hidden"
          style={{
            gridTemplateColumns: `repeat(${difficulty}, minmax(0, 1fr))`
          }}
        >
          {grid.map((row, r) => (
            row.map((cell, c) => {
              const isSelected = selectedCell?.[0] === r && selectedCell?.[1] === c;
              const isInitial = puzzle[r]?.[c] !== 0;
              const isError = cell !== 0 && cell !== solution[r]?.[c];
              const isSameNumber = selectedCell && grid[selectedCell[0]][selectedCell[1]] === cell && cell !== 0;
              const isRelated = selectedCell && (selectedCell[0] === r || selectedCell[1] === c || 
                (Math.floor(selectedCell[0] / boxRows) === Math.floor(r / boxRows) && Math.floor(selectedCell[1] / boxCols) === Math.floor(c / boxCols)));

              let bgColor = 'bg-white';
              if (isSelected) bgColor = 'bg-green-200';
              else if (isSameNumber) bgColor = 'bg-green-100';
              else if (isRelated) bgColor = 'bg-green-50';

              let textColor = 'text-gray-800';
              if (!isInitial) {
                textColor = isError ? 'text-red-500' : 'text-green-500';
              }

              // Calculate borders for boxes
              const borderRight = (c + 1) % boxCols === 0 && c !== difficulty - 1 ? 'border-r-2 border-r-gray-800' : '';
              const borderBottom = (r + 1) % boxRows === 0 && r !== difficulty - 1 ? 'border-b-2 border-b-gray-800' : '';

              return (
                <div 
                  key={`${r}-${c}`}
                  onClick={() => handleCellClick(r, c)}
                  className={`flex items-center justify-center text-2xl font-medium cursor-pointer select-none transition-colors
                    ${bgColor} ${textColor} ${borderRight} ${borderBottom}`}
                >
                  {cell !== 0 ? cell : (
                    <div className="grid grid-cols-3 gap-0.5 p-0.5 w-full h-full">
                      {Array.from(notes[r]?.[c] || []).map(n => (
                        <span key={n} className="text-[8px] text-gray-400 leading-none flex items-center justify-center">{n}</span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-around px-6 py-4">
        <ActionButton icon={Undo} label="撤销" onClick={handleUndo} disabled={history.length <= 1} />
        <ActionButton icon={Eraser} label="擦除" onClick={handleErase} />
        <ActionButton 
          icon={Edit2} 
          label="笔记" 
          onClick={() => setIsNotesMode(!isNotesMode)} 
          active={isNotesMode} 
        />
        <ActionButton icon={Lightbulb} label="提示" onClick={handleHint} />
      </div>

      {/* Number Pad */}
      <div className="flex flex-wrap justify-center gap-3 px-4 pb-8">
        {Array.from({ length: difficulty }, (_, i) => i + 1).map(num => (
          <button
            key={num}
            onClick={() => handleNumberInput(num)}
            className="w-12 h-12 rounded-full flex items-center justify-center text-2xl font-medium text-green-600 bg-green-50 active:bg-green-100 transition-colors shadow-sm"
          >
            {num}
          </button>
        ))}
      </div>

      {/* Win Modal */}
      {isWon && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-3xl flex flex-col items-center shadow-xl mx-8 w-full max-w-[320px] animate-in zoom-in duration-300">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Trophy size={40} className="text-yellow-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">太棒了！</h2>
            <p className="text-gray-600 text-center mb-6">
              你用时 <span className="font-bold text-green-500">{formatTime(time)}</span> 完成了 {difficulty}x{difficulty} 数独！
            </p>
            <button
              onClick={onBack}
              className="w-full py-3 bg-green-500 text-white rounded-2xl font-bold text-lg active:scale-95 transition-transform shadow-md"
            >
              返回首页
            </button>
          </div>
        </div>
      )}

      {/* Game Over Modal */}
      {isGameOver && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-3xl flex flex-col items-center shadow-xl mx-8 w-full max-w-[320px] animate-in zoom-in duration-300">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-4xl">😿</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">挑战失败</h2>
            <p className="text-gray-600 text-center mb-6">
              错误次数达到 3 次，小猫咪累了~
            </p>
            <button
              onClick={onBack}
              className="w-full py-3 bg-red-500 text-white rounded-2xl font-bold text-lg active:scale-95 transition-transform shadow-md"
            >
              返回首页
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ActionButton({ icon: Icon, label, onClick, disabled, active }: any) {
  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={`flex flex-col items-center gap-1 ${disabled ? 'opacity-50' : ''}`}
    >
      <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${active ? 'bg-green-500 text-white shadow-md' : 'bg-gray-50 text-gray-600 shadow-sm'}`}>
        <Icon size={20} />
      </div>
      <span className="text-xs text-gray-500 font-medium">{label}</span>
    </button>
  );
}
