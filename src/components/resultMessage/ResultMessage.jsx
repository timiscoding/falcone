import React from 'react';
import PropTypes from 'prop-types';

const ResultMessage = ({ status, stats, onClickReset }) => {
  let message;
  if (status === 'success') {
    message = 'Success! Congratulations on finding Falcone. King Shan is mighty pleased.';
  } else {
    message = 'Mission failed. Queen Al Falcone might return home soon.';
  }
  return (
    <div className="flex flex-col items-center space-y-4">
      <p className="text-lg text-center">{message}</p>
      {status === 'success' && (
        <div className="inline-block">
          <p>Time taken: {stats.totalTime}</p>
          <p>Planet found: {stats.planet}</p>
        </div>
      )}
      <button onClick={onClickReset}>Start Again</button>
    </div>
  );
};

ResultMessage.propTypes = {
  /** status of search result */
  status: PropTypes.oneOf(['success', 'false']),
  /** search success info */
  stats: PropTypes.shape({
    totalTime: PropTypes.number,
    planet: PropTypes.string,
  }),
  /** reset search handler */
  onClickReset: PropTypes.func.isRequired,
};

export default ResultMessage;
