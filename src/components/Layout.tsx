import React from "react";
import styled from "styled-components";
import Container from "@material-ui/core/Container";

const StyledContainer = styled(Container)({
  paddingTop: 56,
});

interface Props {
  children: JSX.Element[] | JSX.Element;
}

export default ({ children }: Props) => {
  return <StyledContainer maxWidth={"md"}>{children}</StyledContainer>;
};
