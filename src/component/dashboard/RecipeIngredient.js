import React from "react";
import PropTypes from "prop-types";
import { List } from "semantic-ui-react";

const RecipeIngredient = ({ ingredient }) => {
  return (
    <List.Item>
      <div>
        <List.Icon name="leaf" color="yellow" />
        {ingredient.name}.
      </div>
      <div className="spacing"></div>
    </List.Item>
  );
};

RecipeIngredient.propTypes = {};

export default RecipeIngredient;
