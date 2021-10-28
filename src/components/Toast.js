import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const Toast = ({ message }) => {
  return (
    <div
      className={clsx(
        message ? 'inline-block' : 'hidden',
        'absolute top-2.5 left-1/2 p-3 bg-yellow-200 text-xl lg:text-2xl transform -translate-x-1/2'
      )}
    >
      {message}
    </div>
  );
};

Toast.propTypes = {
  /** notification message to show. Can be null if nothing to show */
  message: PropTypes.string,
};

export default Toast;
