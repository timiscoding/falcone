import React, { createContext, useContext } from 'react';
import { useReducerAsync } from 'use-reducer-async';
import { asyncActionHandlers, initState, reducer } from './reducer';

const Mission = createContext();

const MissionProvider = ({ children }) => {
  const [state, dispatch] = useReducerAsync(reducer, initState, asyncActionHandlers);
  return <Mission.Provider value={{ state, dispatch }}>{children}</Mission.Provider>;
};

const useMission = () => {
  const context = useContext(Mission);
  if (!context) {
    throw new Error('useMission must be used inside MissionProvider');
  }
  return context;
};

export { MissionProvider, useMission };
