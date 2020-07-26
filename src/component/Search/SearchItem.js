import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Card, Image, Button, Grid, Icon, IconGroup } from "semantic-ui-react";
import { getVideoOfIngrdients } from "../../actions/search";
import SearchItemDetail from "./SearchItemDetail";
import { connect } from "react-redux";

const SearchItem = ({ dashboard: { video }, result, getVideoOfIngrdients }) => {
  const [modal, setModal] = useState({
    flag: false,
  });

  const openModal = () => {
    setModal({
      flag: true,
    });
  };

  const closeModal = () => {
    setModal({
      flag: false,
    });
  };

  const [currentId, getCurrentId] = useState({
    productId: null,
  });

  const sendCurrentId = (id) => {
    getCurrentId({
      productId: id,
    });
  };

  const handleVideoPart = (title) => {
    console.log(title);
    console.log("hello i am at start");

    getVideoOfIngrdients(title);

    console.log("Hello i am at end");
  };

  const { productId } = currentId;
  const { flag } = modal;

  return (
    <Fragment>
      <Grid.Column>
        <div
          className="card-group"
          onClick={() => {
            openModal();
            sendCurrentId(result.id);
            handleVideoPart(result.title);
          }}
        >
          <img src={result.image} alt="" className="food-image" />
          <div className="food-info">
            <p className="food-title">{result.title}</p>
          </div>
          <div className="food-rating">
            <Icon.Group size="large">
              <Icon name="star" color="yellow" />{" "}
              {(4 + Math.random()).toFixed(1)}
            </Icon.Group>
          </div>
        </div>
        {/* <Card.Group>
          <Card>
            <Card.Content>
              <Image floated="right" size="large" src={result.image} />
              <Card.Header>
                {result.title.length < 20
                  ? `${result.title}`
                  : `${result.title.substring(0, 25)}...`}
              </Card.Header>
              <Card.Description>
                <strong>UsedIngredients:</strong>{" "}
                <em>
                  {result.usedIngredients.length > 0 &&
                  result.usedIngredients.length < 2
                    ? result.usedIngredients.map(
                        (usedIngredient) => usedIngredient.name
                      )
                    : result.usedIngredients.length > 0
                    ? result.usedIngredients[0].name + "..."
                    : 0}
                </em>
                <br />
                <strong>MissedIngredients:</strong>{" "}
                <em>
                  {result.missedIngredients.length > 0 &&
                  result.missedIngredients.length < 2
                    ? result.missedIngredients.map(
                        (missedIngredient) => missedIngredient.name
                      )
                    : result.missedIngredients.length > 0
                    ? result.missedIngredients[0].name + "..."
                    : 0}
                </em>
                <br />
                <strong>UnusedIngredients:</strong>{" "}
                <em>
                  {result.unusedIngredients.length > 0 &&
                  result.unusedIngredients.length < 2
                    ? result.unusedIngredients.map(
                        (unusedIngredient) => unusedIngredient.name
                      )
                    : result.unusedIngredients.length > 0
                    ? result.unusedIngredients[0].name + "..."
                    : 0}
                </em>
              </Card.Description>
              <br />
              <Card.Content textAlign="center">
                <Button
                  fluid
                  basic
                  color="green"
                  onClick={() => {
                    openModal();
                    sendCurrentId(result.id);
                  }}
                >
                  Read More
                </Button>
              </Card.Content>
            </Card.Content>
          </Card>
        </Card.Group> */}
      </Grid.Column>
      {productId !== null ? (
        <SearchItemDetail flag={flag} id={productId} closeModal={closeModal} />
      ) : null}
    </Fragment>
  );
};

SearchItem.propTypes = {};

const mapStateToProps = (state) => ({
  dashboard: state.dashboard,
  search: state.search,
});

export default connect(mapStateToProps, { getVideoOfIngrdients })(SearchItem);
