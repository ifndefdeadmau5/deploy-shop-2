import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Add from "@material-ui/icons/Add";
import { Link } from "react-router-dom";
import ProductThumbnail from "../components/ProductThumbnail";
import CreateProductDialog from "../components/CreateProductDialog";
import { useProductsQuery } from "../types";
import {
  Fab,
  makeStyles,
  Theme,
  FormControlLabel,
  Checkbox,
  Chip,
} from "@material-ui/core";

interface Props {
  products?: any[];
}

const FILTER_LABELS: Record<string, string> = {
  checkedA: "10000원 이하",
  checkedB: "50000원 이하",
};

const useStlyes = makeStyles((theme: Theme) => ({
  fab: {
    position: "fixed",
    bottom: 16,
    right: 16,
  },
}));

export default () => {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState<any[]>([]);
  const [state, setState] = React.useState<Record<string, boolean>>({
    checkedA: true,
    checkedB: true,
  });

  const classes = useStlyes();
  const { data, loading, error } = useProductsQuery({
    onError: (e) => {
      console.log(e);
    },
  });

  useEffect(() => {
    const newFilters: any[] = [];
    Object.entries(state).forEach(([key, value]) => {
      if (value) {
        newFilters.push(key);
      }
    });
    setFilters(
      newFilters.map((key) => ({
        key,
        label: key,
      }))
    );
  }, [state]);

  if (loading) return <CircularProgress />;
  if (error) return <div>error</div>;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleDelete = (key: string) => () => {
    setState((v) => ({
      ...v,
      [key]: !v[key],
    }));
  };

  return (
    <>
      <FormControlLabel
        control={
          <Checkbox
            checked={state.checkedA}
            onChange={handleChange}
            name="checkedA"
          />
        }
        label="10000 이하"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={state.checkedB}
            onChange={handleChange}
            name="checkedB"
          />
        }
        label="50000 이하"
      />
      {filters.map(({ label, key }) => (
        <Chip label={FILTER_LABELS[label]} onDelete={handleDelete(key)} />
      ))}
      <Grid container spacing={6}>
        {data?.products
          ?.filter((product) => {
            const price = product?.price ?? 0;
            if (!state.checkedA && !state.checkedB) return true;
            if (state.checkedA && price <= 10000) return true;
            if (state.checkedB && price <= 50000) return true;
            return false;
          })
          .map((props, i: number) => (
            <Grid item xs={4} key={i}>
              <Link
                to={{ pathname: "/product", state: { productId: props?.id } }}
              >
                <ProductThumbnail {...props} />
              </Link>
            </Grid>
          ))}
      </Grid>
      <CreateProductDialog open={open} onClose={() => setOpen(false)} />
      <Fab className={classes.fab} onClick={() => setOpen(true)}>
        <Add />
      </Fab>
    </>
  );
};
