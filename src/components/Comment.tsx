import React from "react";
import { Box, Avatar, Typography } from "@material-ui/core";
import format from "date-fns/format";
import { Rating } from "@material-ui/lab";
import { Comment } from "../types";

interface Props {
  data?: Comment;
}

export default ({ data }: Props) => {
  if (!data) return null;
  const { content, score, createdAt } = data;

  return (
    <Box display="flex" padding={2}>
      <Avatar src="https://picsum.photos/48" />
      <Box display="flex" flexDirection="column" ml={2}>
        <Rating value={score} readOnly precision={0.5} />
        <Typography>{content}</Typography>
      </Box>
      <Typography>{format(new Date(), "yyyy/MM/dd")}</Typography>
    </Box>
  );
};
