import React, { useState } from 'react';
import HomeScreen from './screens/HomeScreen';
import GameScreen from './screens/GameScreen';
import ProfileScreen from './screens/ProfileScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';
import Navigation from './components/Navigation';
import { Difficulty } from './utils/sudoku';

export type Screen = 'home' | 'game' | 'profile' | 'leaderboard';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [difficulty, setDifficulty] = useState<Difficulty>(6);

  const startGame = (diff: Difficulty) => {
    setDifficulty(diff);
    setCurrentScreen('game');
  };

  return (
    <div className="flex justify-center bg-gray-100 min-h-screen font-sans">
      <div className="w-full max-w-md bg-white h-[100dvh] flex flex-col relative shadow-xl overflow-hidden">
        <div className="flex-1 overflow-y-auto pb-16">
          {currentScreen === 'home' && <HomeScreen onStartGame={startGame} />}
          {currentScreen === 'game' && <GameScreen difficulty={difficulty} onBack={() => setCurrentScreen('home')} />}
          {currentScreen === 'profile' && <ProfileScreen />}
          {currentScreen === 'leaderboard' && <LeaderboardScreen />}
        </div>
        
        {currentScreen !== 'game' && (
          <Navigation currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
        )}
      </div>
    </div>
  );
}
