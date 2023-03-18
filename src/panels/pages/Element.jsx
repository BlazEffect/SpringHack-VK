import React from 'react';
import PropTypes from "prop-types";

const Element = () => (
  <div>
    Test element
  </div>
);

Element.propTypes = {
  id: PropTypes.string.isRequired
};

export default Element;