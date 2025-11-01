
import React from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { Icons } from './Icons';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useAppContext();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Icons.Moon className="h-5 w-5" />
      ) : (
        <Icons.Sun className="h-5 w-5" />
      )}
    </button>
  );
};

export default ThemeToggle;
