import React from "react";
import axios from "axios";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { AppBar, Tabs, Tab, Typography, Box } from "@material-ui/core";
import { People, Category, ShoppingBasket,MenuBook } from "@material-ui/icons";
import { getUserFavorites } from "../store/favorites";
import AdminProducts from "../components/AdminProducts"
import AdminUsers from "../components/AdminUsers"
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Hidden,
  Container,
} from "@material-ui/core";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    paddingTop: 64,
    backgroundColor: theme.palette.background.paper,
  },
  container: {
    marginBottom: theme.spacing(10),
    backgroundColor: "#fff",
    width: "90%",
    border: 2,
  },
  card: {
    marginTop: 10,
  },
}));

export default function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users)

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    console.log(user.id);
    dispatch(getUserFavorites(user.id));
  }, [user.id]);

  return (
    <div className={classes.root}>
      <Container maxWidth="lg" className={classes.container}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            <Tab label="Productos" icon={<MenuBook />} {...a11yProps(0)} />
            <Tab label="Ordenes" icon={<ShoppingBasket />} {...a11yProps(1)} />
            <Tab label="Categorias" icon={<Category />} {...a11yProps(2)} />
            <Tab label="Usuarios" icon={<People />} {...a11yProps(3)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <AdminProducts/>
        </TabPanel>

        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
        <TabPanel value={value} index={2}>
        <AdminUsers/>
        </TabPanel>
      </Container>
    </div>
  );
}