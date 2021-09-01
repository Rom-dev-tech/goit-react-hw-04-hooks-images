import React from 'react';
import PropTypes from 'prop-types';
import '../Button/Button.scss';

const Button = ({ page }) => {
  return (
    <>
      <button type="button" className="button" onClick={page}>
        Load more
      </button>
    </>
  );
};

Button.propTypes = {
  page: PropTypes.func,
};

export default Button;
