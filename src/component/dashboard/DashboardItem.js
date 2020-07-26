import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Card, Image, Button, Grid, Icon } from "semantic-ui-react";
import DashboardItemDetail from "./DashboardItemDetail";
import { getVideo } from "../../actions/dashboard";
import { getVideoOfIngrdients } from "../../actions/search";
import { connect } from "react-redux";

const DashboardItem = ({
  result: { id, title, image, servings },
  getVideo,
  dashboard: { video },
}) => {
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
    getVideo(title);
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
            sendCurrentId(id);
            handleVideoPart(title);
          }}
        >
          <img src={image} alt="" className="food-image" />
          <div className="food-info">
            <p className="food-title">{title}</p>
          </div>
          <div className="food-rating">
            <Icon.Group size="large">
              <Icon name="star" color="yellow" />{" "}
              {(4 + Math.random()).toFixed(1)}
            </Icon.Group>
          </div>
        </div>
        {/* <Card.Group>
          <Card raised>
            <Card.Content>
              <Image floated="right" size="large" src={image} />
              <Card.Header textAlign="center">{title}</Card.Header>
              <div className="spacing"></div>
              <Button
                fluid
                basic
                color="green"
                onClick={() => {
                  openModal();
                  sendCurrentId(id);
                }}
              >
                Read More
              </Button>
            </Card.Content>
          </Card>
        </Card.Group> */}
      </Grid.Column>
      {productId !== null ? (
        <DashboardItemDetail
          productId={productId}
          flag={flag}
          closeModal={closeModal}
        />
      ) : null}
    </Fragment>
  );
};

DashboardItem.propTypes = {};

const mapStateToProps = (state) => ({
  dashboard: state.dashboard,
});

export default connect(mapStateToProps, { getVideo })(DashboardItem);
