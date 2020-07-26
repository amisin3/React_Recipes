import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getRandomRecipes } from "../../actions/dashboard";
import DashboardItem from "./DashboardItem";
import { Header } from "semantic-ui-react";
import { Grid, Container, Menu, Form, Button, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import MyDocument from "./MyDocument";

const Dashboard = ({
  dashboard: {
    allRecipe: { results },
  },
  getRandomRecipes,
}) => {
  // useEffect(() => {
  //   getRandomRecipes();
  // }, [getRandomRecipes]);

  const [element, setData] = useState({
    activeItem: "recipename",
  });

  const [productData, setProductData] = useState({
    productname: "",
  });

  const handleClick = (e) => {
    setData({
      activeItem: e.target.name,
    });
  };

  const onChange = (e) => {
    setProductData({
      ...productData,
      productname: e.target.value,
    });
  };

  const { activeItem } = element;
  const { productname } = productData;

  const onSubmit = (e) => {
    e.preventDefault();
    getRandomRecipes(productname);
  };

  return (
    <Fragment>
      <Container className="main">
        <div className="sub-main">
          <div className="navbar">
            <Menu secondary size="large">
              <Link to="/">
                <Menu.Item
                  name="recipename"
                  active={activeItem === "recipename"}
                  onClick={handleClick}
                >
                  Recipe Search
                </Menu.Item>
              </Link>
              <Link to="/search">
                <Menu.Item
                  name="ingredientname"
                  active={activeItem === "ingredientname"}
                  onClick={handleClick}
                >
                  Ingredient Search
                </Menu.Item>
              </Link>
            </Menu>
          </div>
          <div className="formPart">
            <Form className="inputField" onSubmit={(e) => onSubmit(e)}>
              <Form.Field width="12" className="search-section">
                <input
                  className="searchField"
                  placeholder="Search Using Recipe Name"
                  value={productname}
                  name="productname"
                  onChange={(e) => onChange(e)}
                />
              </Form.Field>
              <Button icon basic className="search-btn" color="brown">
                <Icon name="search" />
              </Button>
            </Form>
          </div>
          <div className="results pc-site">
            <Container className="searching">
              <Grid divided="vertically">
                <Grid.Row columns={3}>
                  {results &&
                    results.map((result) => (
                      <DashboardItem key={result.id} result={result} />
                    ))}
                </Grid.Row>
              </Grid>
            </Container>
          </div>
          <div className="results mob-site">
            <Container className="searching">
              <Grid divided="vertically" className="mob-grid">
                <Grid.Row columns={1} className="mob-row">
                  {results &&
                    results.map((result) => (
                      <DashboardItem key={result.id} result={result} />
                    ))}
                </Grid.Row>
              </Grid>
            </Container>
          </div>
        </div>
      </Container>
      {/* <div>
        <PDFDownloadLink document={<MyDocument />} fileName="somename.pdf">
          {({ loading }) => (loading ? "Loading document..." : "Download now!")}
        </PDFDownloadLink>
      </div> */}
    </Fragment>
  );
};

Dashboard.propTypes = {
  dashboard: PropTypes.object.isRequired,
  getRandomRecipes: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  dashboard: state.dashboard,
});

export default connect(mapStateToProps, { getRandomRecipes })(Dashboard);
