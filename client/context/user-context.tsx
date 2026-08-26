'use client';

import { CurrentUser } from '@/services/user-service';
import { createContext, PropsWithChildren, useContext } from 'react';

type CurrentUserContextValue = {
  currentUser: CurrentUser;
};

type Props = PropsWithChildren<CurrentUserContextValue>;

const CurrentUserContext = createContext<CurrentUserContextValue | null>(null);

export function CurrentUserProvider({ currentUser, children }: Props) {
  return (
    <CurrentUserContext.Provider value={{ currentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
}

export function useCurrentUser() {
  const context = useContext(CurrentUserContext);

  if (!context) {
    throw new Error('useCurrentUser must be used inside CurrentUserProvider');
  }
  return context;
}
