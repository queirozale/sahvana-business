// imports the React Javascript Library
import React, { useEffect } from "react";
//Card
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";

import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";

import red from "@material-ui/core/colors/red";
import blue from "@material-ui/core/colors/blue";

import SearchIcon from "@material-ui/icons/Search";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

// Search
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import ReplayIcon from "@material-ui/icons/Replay";

import Button from '@material-ui/core/Button';

//Tabs
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 200,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  icon: {
    margin: theme.spacing(2)
  },
  iconHover: {
    margin: theme.spacing(2),
    "&:hover": {
      color: red[800]
    }
  },
  cardHeader: {
    textalign: "center",
    align: "center",
    backgroundColor: "white"
  },
  input: {
    display: "none"
  },
  title: {
    color: blue[800],
    fontWeight: "bold",
    fontFamily: "Montserrat",
    align: "center"
  },
  button: {
    color: blue[900],
    margin: 10,
  },
  secondaryButton: {
    color: "gray",
    margin: 10
  },
  typography: {
    margin: theme.spacing(2),
    backgroundColor: "default"
  },

  searchRoot: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400
  },
  searchInput: {
    marginLeft: 8,
    flex: 1,
  },
  searchIconButton: {
    padding: 10
  },
  searchDivider: {
    width: 1,
    height: 28,
    margin: 4
  }
});

class ImageUploadCard extends React.Component {
  // state = {
  //   mainState: "initial", // initial, search, gallery, uploaded
  //   imageUploaded: 0,
  //   selectedFile: null
  // };
  constructor(props) {
    super(props);
    if (props.selectedFile) {
      this.state = {
        mainState: "uploaded",
        imageUploaded: 1,
        selectedFile: props.selectedFile
      };
    } else {
      this.state = {
        mainState: "initial", // initial, search, gallery, uploaded
        imageUploaded: 0,
        selectedFile: null
      };
    }
  };
  

  handleUploadClick = event => {
    var file = event.target.files[0];
    const reader = new FileReader();
    var url = reader.readAsDataURL(file);

    reader.onloadend = function(e) {
      this.setState({
        selectedFile: [reader.result]
      });
    }.bind(this);

    this.setState({
      mainState: "uploaded",
      selectedFile: event.target.files[0],
      imageUploaded: 1
    });
  };

  handleSearchClick = event => {
    this.setState({
      mainState: "search"
    });
  };

  handleGalleryClick = event => {
    this.setState({
      mainState: "gallery"
    });
  };

  renderInitialState() {
    const { classes, theme } = this.props;
    const { value } = this.state;

    return (
      <React.Fragment>
          <Grid container justify="center" alignItems="center">
            <Button
              variant="contained"
              component="label"
              >
                <AddIcon />
              <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
                type="file"
                onChange={this.handleUploadClick} 
                hidden
              />
            </Button>
          </Grid>
      </React.Fragment>
    );
  }

  handleSearchURL = event => {
    console.log();
    var file = event.target.files[0];
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);

    reader.onloadend = function(e) {
      this.setState({
        selectedFile: [reader.result]
      });
    }.bind(this);
    console.log(url); // Would see a path?

    this.setState({
      selectedFile: event.target.files[0],
      imageUploaded: 1
    });
  };

  handleImageSearch(url) {
    var filename = url.substring(url.lastIndexOf("/") + 1);
    console.log(url);
    console.log(filename);
    this.setState({
      mainState: "uploaded",
      imageUploaded: true,
      selectedFile: url,
      fileReader: undefined,
      filename: filename
    });
    this.props.setImage(this.state.selectedFile[0]);
  }

  handleSeachClose = event => {
    this.setState({
      mainState: "initial"
    });
  };

  renderSearchState() {
    const { classes } = this.props;

    return (
      <Paper className={classes.searchRoot} elevation={0}>
        <InputBase className={classes.searchInput} placeholder="Image URL" />
        <IconButton
          className={classes.button}
          aria-label="Search"
          onClick={this.handleImageSearch}
        >
          <SearchIcon />
        </IconButton>
        <Divider className={classes.searchDivider} />
        <IconButton
          color="primary"
          className={classes.secondaryButton}
          aria-label="Close"
          onClick={this.handleSeachClose}
        >
          <CloseIcon />
        </IconButton>
      </Paper>
    );
  }

  handleAvatarClick(value) {
    var filename = value.url.substring(value.url.lastIndexOf("/") + 1);
    console.log(filename);
    this.setState({
      mainState: "uploaded",
      imageUploaded: true,
      selectedFile: value.url,
      fileReader: undefined,
      filename: filename
    });
  }

  renderGalleryState() {
    const { classes } = this.props;
    const listItems = this.props.imageGallery.map(url => (
      <div
        onClick={value => this.handleAvatarClick({ url })}
        style={{
          padding: "5px 5px 5px 5px",
          cursor: "pointer"
        }}
      >
        <Avatar src={url} />
      </div>
    ));

    return (
      <React.Fragment>
        <Grid>
          {listItems}
          <IconButton
            color="primary"
            className={classes.secondaryButton}
            aria-label="Close"
            onClick={this.handleSeachClose}
          >
            <ReplayIcon />
          </IconButton>
        </Grid>
      </React.Fragment>
    );
  }

  renderUploadedState() {
    const { classes, theme } = this.props;
    this.props.setImage(this.state.selectedFile);
    
    
    return (
      <React.Fragment>
        <CardActionArea onClick={this.imageResetHandler}>
          <img
            width="100%"
            className={classes.media}
            src={this.state.selectedFile}
          />
        </CardActionArea>
      </React.Fragment>
    );
  }

  imageResetHandler = event => {
    this.setState({
      mainState: "initial",
      selectedFile: null,
      imageUploaded: 0
    });
  };

  render() {
    const { classes, theme } = this.props;

    const createProduct = async event => {
      console.log(this.state.selectedFile[0]);
    };

    return (
      <React.Fragment>
        <div className={classes.root}>
          <Card className={this.props.cardName}>
            {(this.state.mainState == "initial" && this.renderInitialState()) ||
              (this.state.mainState == "search" && this.renderSearchState()) ||
              (this.state.mainState == "gallery" &&
                this.renderGalleryState()) ||
              (this.state.mainState == "uploaded" &&
                this.renderUploadedState())}
          </Card>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ImageUploadCard);
