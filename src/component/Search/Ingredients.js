import React from "react";
import PropTypes from "prop-types";
import { Image } from "semantic-ui-react";

const Ingredients = ({ ingredient: { amount, unit, name, image } }) => {
  return (
    <div>
      <Image src={image} size="small" avatar />
      <span className="ingredient-details">
        #{name}#{amount}-{unit}
      </span>
    </div>
  );
};

Ingredients.propTypes = {};

export default Ingredients;
