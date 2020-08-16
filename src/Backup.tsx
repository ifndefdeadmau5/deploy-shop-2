import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
      display: "flex",
      flexDirection: "column",
    },
  })
);

const comments = [
  {
    id: "1",
    text: "comment 1",
    parentId: null,
  },
  {
    id: "2",
    text: "comment 2",
    parentId: "1",
  },
  {
    id: "3",
    text: "comment 3",
    parentId: null,
  },
  {
    id: "4",
    text: "comment 4",
    parentId: "2",
  },
];

export default function SimpleList() {
  const data = comments;
  const classes = useStyles();

  const renderList: any = (comment: any, initialDepth: number = 0) => {
    const children = data.filter((v) => v.parentId === comment.id);
    return (
      <>
        <div style={{ marginLeft: initialDepth * 10 }}>{comment.text}</div>
        {children.length
          ? children.map((child) => renderList(child, initialDepth + 1))
          : null}
      </>
    );
  };
  return (
    <div className={classes.root}>
      {data
        .filter((v) => !v.parentId)
        .map((comment: any) => renderList(comment))}
    </div>
  );
}
