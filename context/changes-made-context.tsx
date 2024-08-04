'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type ChangesMadeContextType = {
  changesMade: boolean;
  setChangesMade: (changes: boolean) => void;
};

const ChangesMadeContext = createContext<ChangesMadeContextType | undefined>(
  undefined
);

export function ChangesMadeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [changesMade, setChangesMade] = useState<boolean>(false);

  // Optional: Persist the changes state in localStorage or other storage
  useEffect(() => {
    const storedChanges = localStorage.getItem('changesMade');
    if (storedChanges) {
      setChangesMade(JSON.parse(storedChanges));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('changesMade', JSON.stringify(changesMade));
  }, [changesMade]);

  return (
    <ChangesMadeContext.Provider value={{ changesMade, setChangesMade }}>
      {children}
    </ChangesMadeContext.Provider>
  );
}

export function useChangesMade() {
  const context = useContext(ChangesMadeContext);
  if (context === undefined) {
    throw new Error('useChangesMade must be used within a ChangesMadeProvider');
  }
  return context;
}
