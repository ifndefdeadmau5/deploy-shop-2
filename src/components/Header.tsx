import React from "react";
import {
  createStyles,
  makeStyles,
  Theme,
  withStyles,
} from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

const GET_LIST = gql`
  {
    list @client {
      name
      price
    }
  }
`;

const StyledBadge = withStyles((theme: Theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}))(Badge);

export default () => {
  const classes = useStyles();
  const { data, loading, error } = useQuery(GET_LIST);

  if (loading) return <div>loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Link to="/">Home</Link>
          </Typography>

          <Link to="/cart">
            <IconButton aria-label="cart">
              <StyledBadge badgeContent={data?.list.length} color="secondary">
                <ShoppingCartIcon />
              </StyledBadge>
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
};
