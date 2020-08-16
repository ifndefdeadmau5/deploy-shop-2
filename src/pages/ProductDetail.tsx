import React, { useState } from "react";
import styled from "styled-components";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { useParams, useLocation } from "react-router-dom";
import {
  makeStyles,
  Theme,
  Box,
  Typography,
  Paper,
  Divider,
  Button,
  LinearProgress,
} from "@material-ui/core";
import { useGetProductQuery, useAddCommentMutation, Maybe } from "../types";
import Comment from "../components/Comment";
import { Rating } from "@material-ui/lab";

interface Props {
  products?: any[];
}

const StyledImage = styled.img({
  width: "100%",
  maxWidth: 500,
});

const Root = styled.div({
  display: "flex",
  flexDirection: "column",
});

const Detail = styled.div({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  padding: 16,
});

export default () => {
  const { state } = useLocation();
  const id = state?.productId;
  const [content, setContent] = useState("");
  const [score, setScore] = useState<number | null>(0);
  const { loading, data, error } = useGetProductQuery({
    variables: {
      id,
    },
  });
  const [addComment, { loading: addCommentLoading }] = useAddCommentMutation({
    refetchQueries: ["GetProduct"],
  });

  if (error) return <div>ERROR</div>;

  const handleSubmit = () => {
    addComment({
      variables: {
        content,
        score,
        productId: id,
      },
    });

    setContent("");
    setScore(0);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleScoreChange = (event: any, newValue: Maybe<number>) => {
    setScore(newValue);
  };

  return (
    <Root>
      <Box display="flex" mb={4}>
        <StyledImage src={data?.getProduct?.imgUrl ?? ""} alt="" />
        <Detail>
          <Typography variant="h5">상품 상세 설명</Typography>
          가격
        </Detail>
      </Box>
      <Paper elevation={2}>
        {(loading || addCommentLoading) && <LinearProgress />}
        {data?.getProduct?.comments?.map((v, i) => (
          <>
            <Comment data={v ?? undefined} />
            {data.getProduct?.comments?.length !== i && (
              <Divider variant="middle" />
            )}
          </>
        ))}
      </Paper>
      <Box padding={2} display="flex" flexDirection="column">
        <Rating value={score} onChange={handleScoreChange} precision={0.5} />
        <TextareaAutosize onChange={handleChange} value={content} />
        <Button
          color="primary"
          variant="contained"
          disableElevation
          onClick={handleSubmit}
        >
          제출
        </Button>
      </Box>
    </Root>
  );
};
