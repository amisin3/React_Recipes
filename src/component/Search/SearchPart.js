import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getRecipesByIngredient } from "../../actions/search";
import SearchItem from "./SearchItem";
import {
  Grid,
  Container,
  Search,
  Form,
  Button,
  Header,
  Menu,
  Icon,
} from "semantic-ui-react";
import { Link } from "react-router-dom";

const SearchPart = ({ getRecipesByIngredient, search: { data, error } }) => {
  const [formData, setFormData] = useState({
    ingridient1: "",
    // ingridient2: "",
    // ingridient3: "",
  });

  const { ingridient1 } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    getRecipesByIngredient({ ingridient1 });
  };

  const [element, setData] = useState({
    activeItem: "ingredientname",
  });

  const handleClick = (e) => {
    setData({
      activeItem: e.target.name,
    });
  };

  const { activeItem } = element;

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
                  placeholder="Enter Ingredients by comma separated"
                  value={ingridient1}
                  name="ingridient1"
                  onChange={(e) => onChange(e)}
                />
              </Form.Field>
              {/* <Form.Field width="5" className="search-section">
                <input
                  className="search-section"
                  placeholder="Ingredient 2"
                  value={ingridient2}
                  name="ingridient2"
                  onChange={(e) => onChange(e)}
                />
              </Form.Field>
              <Form.Field width="5" className="search-section">
                <input
                  className="search-section"
                  placeholder="Ingredient 3"
                  value={ingridient3}
                  name="ingridient3"
                  onChange={(e) => onChange(e)}
                />
              </Form.Field> */}
              <Button icon basic className="search-btn" color="brown">
                <Icon name="search" />
              </Button>
            </Form>
          </div>
          <div className="results pc-site">
            <Container className="searching">
              <Grid divided="vertically">
                <Grid.Row columns={3}>
                  {data &&
                    data.map((result) => (
                      <SearchItem
                        key={result.id}
                        result={result}
                        error={error}
                      />
                    ))}
                </Grid.Row>
              </Grid>
            </Container>
          </div>
          <div className="results mob-site">
            <Container className="searching">
              <Grid divided="vertically">
                <Grid.Row columns={1}>
                  {data &&
                    data.map((result) => (
                      <SearchItem
                        key={result.id}
                        result={result}
                        error={error}
                      />
                    ))}
                </Grid.Row>
              </Grid>
            </Container>
          </div>
        </div>
      </Container>
    </Fragment>
  );
};

Search.propTypes = {
  getRecipesByIngredient: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  search: state.search,
});

export default connect(mapStateToProps, { getRecipesByIngredient })(SearchPart);
