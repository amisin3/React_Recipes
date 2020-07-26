import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getRecipesDetail, toggleLoading } from "../../actions/dashboard";
import { connect } from "react-redux";
import axios from "axios";
import {
  Modal,
  Image,
  Header,
  Container,
  List,
  Icon,
  Grid,
  Button,
  Embed,
} from "semantic-ui-react";
import IngredientInstruction from "./IngredientInstruction";
import RecipeIngredient from "./RecipeIngredient";
import Spinner from "../../component/Search/Spinner";
import RecipeVideoList from "./RecipeVideoList";

const DashboardItemDetail = ({
  dashboard: { singleRecipe, loading, video },
  productId,
  closeModal,
  flag,
  getRecipesDetail,
  toggleLoading,
}) => {
  useEffect(() => {
    getRecipesDetail(productId);

    // if (singleRecipe && singleRecipe.title) {
    //   updateTitle(singleRecipe.title);
    // }
  }, [getRecipesDetail, productId]);

  const toggle_loading = () => {
    toggleLoading();
  };

  const instructions_split =
    singleRecipe && singleRecipe.instructions
      ? singleRecipe.instructions.split(".")
      : null;

  if (instructions_split && instructions_split.length > 0) {
    for (let index = 0; index < instructions_split.length; index++) {
      instructions_split[index] = instructions_split[index].replace("<ol>", "");
      instructions_split[index] = instructions_split[index].replace("<li>", "");
      instructions_split[index] = instructions_split[index].replace(
        "</ol>",
        ""
      );
      instructions_split[index] = instructions_split[index].replace(
        "</li>",
        ""
      );
    }
  }

  const [title, setTitle] = useState("");

  return loading ? (
    <Modal open={flag} onClose={closeModal} className="modal-details">
      <Spinner />
    </Modal>
  ) : (
    <Fragment>
      <div className="pc-site">
        <Modal open={flag} onClose={closeModal} className="modal-details">
          <Modal.Content>
            {singleRecipe && singleRecipe.vegetarian ? (
              <div>
                <Icon name="circle thin" bordered color="green" /> VEG
              </div>
            ) : (
              <div>
                <Icon name="circle thin" bordered color="red" /> NON-VEG
              </div>
            )}
            <Image
              src={singleRecipe && singleRecipe.image}
              size="medium"
              centered
              circular
            />
          </Modal.Content>

          {singleRecipe && singleRecipe.vegetarian ? (
            <div className="recipe-type-veg">
              <Grid columns={2} divided>
                <Grid.Row stretched>
                  <Grid.Column className="recipe-title">
                    {singleRecipe && singleRecipe.title}
                  </Grid.Column>
                  <Grid.Column className="recipe-readyInMinutes">
                    <div>
                      <Icon name="clock outline" />
                      {singleRecipe && singleRecipe.readyInMinutes} minutes
                    </div>
                  </Grid.Column>
                  <Grid.Column className="recipe-food-weight">
                    <div>
                      <Icon name="food" color="yellow" />
                      {singleRecipe && singleRecipe.servings} servings
                      {"  "}
                      <Icon name="weight" color="yellow" />
                      {singleRecipe && singleRecipe.healthScore} % healthy
                    </div>
                  </Grid.Column>
                  <Grid.Column className="recipe-dishTypes">
                    {singleRecipe && singleRecipe.dishTypes.length > 0
                      ? "DishTypes: " +
                        singleRecipe.dishTypes.map((dishType) => dishType)
                      : null}
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </div>
          ) : (
            <div className="recipe-type-non-veg">
              <Grid columns={2} divided>
                <Grid.Row stretched>
                  <Grid.Column className="recipe-title">
                    {singleRecipe && singleRecipe.title}
                  </Grid.Column>
                  <Grid.Column className="recipe-readyInMinutes">
                    <div>
                      <Icon name="clock outline" />
                      {singleRecipe && singleRecipe.readyInMinutes} minutes
                    </div>
                  </Grid.Column>
                  <Grid.Column className="recipe-food-weight">
                    <div>
                      <Icon name="food" color="yellow" />
                      {singleRecipe && singleRecipe.servings} servings
                      {"  "}
                      <Icon name="weight" color="yellow" />
                      {singleRecipe && singleRecipe.healthScore} % healthy
                    </div>
                  </Grid.Column>
                  <Grid.Column className="recipe-dishTypes">
                    {singleRecipe && singleRecipe.dishTypes.length > 0
                      ? "DishTypes: " +
                        singleRecipe.dishTypes.map((dishType) => dishType)
                      : null}
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </div>
          )}
          <Modal.Description className="pc-site">
            <Container>
              <Grid columns={2} divided>
                <Grid.Row stretched>
                  <Grid.Column width={5}>
                    <div className="ingredients-header">
                      <Icon name="leaf" color="red" />
                      <Header as="huge" color="red">
                        Ingredients
                      </Header>
                      <div className="recipe-ingredients">
                        <List>
                          {singleRecipe &&
                          singleRecipe.extendedIngredients.length > 0
                            ? singleRecipe.extendedIngredients.map(
                                (ingredient) => (
                                  <RecipeIngredient ingredient={ingredient} />
                                )
                              )
                            : ""}
                        </List>
                      </div>
                    </div>
                  </Grid.Column>
                  <Grid.Column width={10}>
                    <div className="instructions-header">
                      <Icon name="utensil spoon" color="red" />
                      <Header as="huge" color="red">
                        How To Make {singleRecipe && singleRecipe.title}
                      </Header>
                    </div>
                    <div className="recipe-instructions">
                      <List>
                        {singleRecipe &&
                        instructions_split !== null &&
                        instructions_split.length > 0 ? (
                          instructions_split.map((instruction) => (
                            <IngredientInstruction instruction={instruction} />
                          ))
                        ) : (
                          <Header>
                            Sorry we don't have any instructions for{" "}
                            {singleRecipe && singleRecipe.title}
                          </Header>
                        )}
                      </List>
                    </div>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Container>
            <Embed
              className="food_video"
              id={video && video.id && video.id.videoId}
              placeholder={
                video &&
                video.snippet &&
                video.snippet.thumbnails &&
                video.snippet.thumbnails.high &&
                video.snippet.thumbnails.high.url
              }
              source="youtube"
              aspectRatio="21:9"
            />
          </Modal.Description>
          <Modal.Actions>
            <Button
              color="orange"
              inverted
              onClick={() => {
                closeModal();
                toggle_loading();
              }}
            >
              <Icon name="arrow alternate circle left outline" /> Go Back
            </Button>
          </Modal.Actions>
        </Modal>
      </div>

      <div className="mob-site">
        <Modal open={flag} onClose={closeModal} className="modal-details">
          <Modal.Content>
            {singleRecipe && singleRecipe.vegetarian ? (
              <div class="veg">
                <Icon name="circle thin" bordered color="green" /> VEG
              </div>
            ) : (
              <div class="non-veg">
                <Icon name="circle thin" bordered color="red" /> NON-VEG
              </div>
            )}
            <Image
              src={singleRecipe && singleRecipe.image}
              size="medium"
              centered
            />
          </Modal.Content>

          {singleRecipe && singleRecipe.vegetarian ? (
            <div className="recipe-type-veg">
              <Grid columns={1} divided>
                <Grid.Row stretched>
                  <Grid.Column className="recipe-title">
                    {singleRecipe && singleRecipe.title}
                  </Grid.Column>
                  {/* <Grid.Column className="recipe-readyInMinutes">
                    <div>
                      <Icon name="clock outline" />
                      {singleRecipe && singleRecipe.readyInMinutes} minutes
                    </div>
                  </Grid.Column> */}
                  <Grid.Column className="recipe-food-weight">
                    <div className="sub-part">
                      <Icon name="clock outline" />
                      {singleRecipe && singleRecipe.readyInMinutes} minutes
                      <Icon name="food" color="yellow" />
                      {singleRecipe && singleRecipe.servings} servings
                      {"  "}
                      <Icon name="weight" color="yellow" />
                      {singleRecipe && singleRecipe.healthScore} % healthy
                    </div>
                  </Grid.Column>
                  {/* <Grid.Column className="recipe-dishTypes">
                    {singleRecipe && singleRecipe.dishTypes.length > 0
                      ? "DishTypes: " +
                        singleRecipe.dishTypes.map((dishType) => dishType)
                      : null}
                  </Grid.Column> */}
                </Grid.Row>
              </Grid>
            </div>
          ) : (
            <div className="recipe-type-non-veg">
              <Grid columns={1} divided>
                <Grid.Row stretched>
                  <Grid.Column className="recipe-title">
                    {singleRecipe && singleRecipe.title}
                  </Grid.Column>
                  {/* <Grid.Column className="recipe-readyInMinutes">
                    <div>
                      <Icon name="clock outline" />
                      {singleRecipe && singleRecipe.readyInMinutes} minutes
                    </div>
                  </Grid.Column> */}
                  <Grid.Column className="recipe-food-weight">
                    <div className="sub-part">
                      <Icon name="clock outline" />
                      {singleRecipe && singleRecipe.readyInMinutes} minutes{" "}
                      <Icon name="food" color="yellow" />
                      {singleRecipe && singleRecipe.servings} servings
                      {"  "}
                      <Icon name="weight" color="yellow" />
                      {singleRecipe && singleRecipe.healthScore} % healthy
                    </div>
                  </Grid.Column>
                  {/* <Grid.Column className="recipe-dishTypes">
                    {singleRecipe && singleRecipe.dishTypes.length > 0
                      ? "DishTypes: " +
                        singleRecipe.dishTypes.map((dishType) => dishType)
                      : null}
                  </Grid.Column> */}
                </Grid.Row>
              </Grid>
            </div>
          )}
          <Modal.Description>
            <Container>
              <Grid columns={1} divided>
                <Grid.Row stretched>
                  {/* <Grid.Column width={5}>
                    <div className="ingredients-header">
                      <Icon name="leaf" color="red" />
                      <Header as="huge" color="red">
                        Ingredients
                      </Header>
                      <div className="recipe-ingredients">
                        <List>
                          {singleRecipe &&
                          singleRecipe.extendedIngredients.length > 0
                            ? singleRecipe.extendedIngredients.map(
                                (ingredient) => (
                                  <RecipeIngredient ingredient={ingredient} />
                                )
                              )
                            : ""}
                        </List>
                      </div>
                    </div>
                  </Grid.Column> */}
                  <Grid.Column>
                    <div className="instructions-header">
                      <Icon name="utensil spoon" color="red" />
                      <Header as="huge" color="red">
                        How To Make {singleRecipe && singleRecipe.title}
                      </Header>
                    </div>
                    <div className="recipe-instructions">
                      <List>
                        {singleRecipe &&
                        instructions_split !== null &&
                        instructions_split.length > 0 ? (
                          instructions_split.map((instruction) => (
                            <IngredientInstruction instruction={instruction} />
                          ))
                        ) : (
                          <Header>
                            Sorry we don't have any instructions for{" "}
                            {singleRecipe && singleRecipe.title}
                          </Header>
                        )}
                      </List>
                    </div>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Container>
            <Embed
              className="food_video"
              id={video && video.id && video.id.videoId}
              placeholder={
                video &&
                video.snippet &&
                video.snippet.thumbnails &&
                video.snippet.thumbnails.high &&
                video.snippet.thumbnails.high.url
              }
              source="youtube"
              aspectRatio="21:9"
            />
          </Modal.Description>
          <Modal.Actions>
            <Button
              color="orange"
              inverted
              onClick={() => {
                closeModal();
                toggle_loading();
              }}
            >
              <Icon name="arrow alternate circle left outline" /> Go Back
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    </Fragment>
  );
};

DashboardItemDetail.propTypes = {
  getRecipesDetail: PropTypes.func.isRequired,
  dashboard: PropTypes.object.isRequired,
  getVideo: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  dashboard: state.dashboard,
});

export default connect(mapStateToProps, {
  getRecipesDetail,
  toggleLoading,
})(DashboardItemDetail);