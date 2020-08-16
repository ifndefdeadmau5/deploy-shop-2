import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem, { ListItemProps } from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  })
);

const GET_SAVED_LIST = gql`
  {
    list @client {
      name
      price
    }
  }
`;

export default function SimpleList() {
  const classes = useStyles();
  const { data, loading, error } = useQuery(GET_SAVED_LIST);

  if (loading) return <div>loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="secondary mailbox folders">
        {data &&
          data?.list.map(({ name, price }: any) => (
            <ListItem button>
              <ListItemText primary={name} />
            </ListItem>
          ))}
      </List>
    </div>
  );
}
