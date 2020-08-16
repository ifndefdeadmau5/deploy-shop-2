// @ts-nocheck
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Delete from "@material-ui/icons/Delete";
import CardMedia from "@material-ui/core/CardMedia";
import {
  Info,
  InfoCaption,
  InfoSubtitle,
  InfoTitle,
} from "@mui-treasury/components/info";
import { useGalaxyInfoStyles } from "@mui-treasury/styles/info/galaxy";
import { useCoverCardMediaStyles } from "@mui-treasury/styles/cardMedia/cover";
import { IconButton } from "@material-ui/core";
import { useDeleteProductMutation, Product } from "../types";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const useStyles = makeStyles(() => ({
  card: {
    borderRadius: "1rem",
    boxShadow: "none",
    position: "relative",
    minWidth: 200,
    minHeight: 360,
    "&:after": {
      content: '""',
      display: "block",
      position: "absolute",
      width: "100%",
      height: "64%",
      bottom: 0,
      zIndex: 1,
      background: "linear-gradient(to top, #000, rgba(0,0,0,0))",
    },
    cursor: "pointer",
  },
  content: {
    position: "absolute",
    zIndex: 2,
    bottom: 0,
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
}));

interface Props extends Product {}

export const GalaxyCardDemo = React.memo(function GalaxyCard({
  id,
  name,
  price,
  imgUrl,
  ...props
}: Props) {
  const mediaStyles = useCoverCardMediaStyles({ bgPosition: "top" });
  const styles = useStyles();
  const [deleteProduct] = useDeleteProductMutation({
    refetchQueries: ["Products"],
  });

  const handleDelete = (e) => {
    e.stopPropagation();
    deleteProduct({ variables: { id } });
  };

  return (
    <Card className={styles.card} {...props}>
      <CardMedia classes={mediaStyles} image={imgUrl} />
      <Box py={3} px={2} className={styles.content}>
        <Info useStyles={useGalaxyInfoStyles}>
          <InfoSubtitle>{numberWithCommas(price)}₩</InfoSubtitle>
          <InfoTitle>{name}</InfoTitle>
        </Info>
        <IconButton color="secondary" onClick={handleDelete}>
          <Delete />
        </IconButton>
      </Box>
    </Card>
  );
});
export default GalaxyCardDemo;
