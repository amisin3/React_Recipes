import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { List, Icon } from "semantic-ui-react";

const IngredientInstruction = ({ instruction }) => {
  return (
    <div>
      {instruction.length > 0 ? (
        <Fragment>
          <List.Item>
            <Icon name="leaf" color="yellow" />
            {instruction}.
          </List.Item>
          <div className="spacing"></div>
        </Fragment>
      ) : null}
    </div>
  );
};

IngredientInstruction.propTypes = {};

export default IngredientInstruction;
