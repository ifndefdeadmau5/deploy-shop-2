import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useAddProductMutation } from "../types";
import {
  Backdrop,
  CircularProgress,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core";

interface Props {
  open: boolean;
  onClose: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.modal + 1,
      color: "#fff",
    },
  })
);

export default function FormDialog({ open, onClose }: Props) {
  const classes = useStyles();
  const [addProduct, { loading, error }] = useAddProductMutation({
    refetchQueries: ["Products"],
    onCompleted: (result) => {
      onClose();
    },
  });

  const [state, setState] = useState({
    name: "",
    price: "",
    imgUrl: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("state");
    console.log(state);
    addProduct({
      variables: state,
    });
  };

  if (error) return <span>Error :(</span>;

  return (
    <div>
      <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <TextField
            name="name"
            label="상품명"
            fullWidth
            value={state.name}
            onChange={handleChange}
          />
          <TextField
            name="price"
            label="가격"
            fullWidth
            value={state.price}
            onChange={handleChange}
          />
          <TextField
            name="imgUrl"
            label="이미지 주소"
            fullWidth
            value={state.imgUrl}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            취소
          </Button>
          <Button onClick={handleSubmit} color="primary">
            등록
          </Button>
        </DialogActions>
      </Dialog>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
