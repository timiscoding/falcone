import ResultMessage from 'components/ResultMessage';
import { useMission } from 'context';
import React from 'react';
import { Redirect, useLocation } from 'wouter';

const SearchResult = () => {
  const { state, dispatch } = useMission();
  const setLocation = useLocation()[1];

  const { status, totalTime, planet } = state.search.result;

  if (!state.search.result) {
    return <Redirect to="/" />;
  }

  const onClickReset = () => {
    dispatch({ type: 'reset_search' });
    setLocation('/');
  };

  return (
    <div>
      Search Result
      <ResultMessage status={status} stats={{ totalTime, planet }} onClickReset={onClickReset} />
    </div>
  );
};

export default SearchResult;
