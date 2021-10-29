import ResultMessage from 'components/resultMessage';
import { useMission } from 'context';
import React from 'react';
import { Redirect, useLocation } from 'wouter';

const SearchResult = () => {
  const { state, dispatch } = useMission();
  const setLocation = useLocation()[1];

  if (!state.search.result) {
    return <Redirect to="/" />;
  }

  const { status, totalTime, planet } = state.search.result;

  const onClickReset = () => {
    dispatch({ type: 'reset_search' });
    setLocation('/');
  };

  return (
    <div>
      <h1 className="text-center">Search Result</h1>
      <ResultMessage status={status} stats={{ totalTime, planet }} onClickReset={onClickReset} />
    </div>
  );
};

export default SearchResult;
