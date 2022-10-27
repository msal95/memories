import React, { useEffect } from "react";
import { Pagination, PaginationItem } from "@mui/material";
import useStyle from "./styles";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllMemories } from "../../reducers/posts";

const PaginationComp = (props) => {
  const { page } = props;

  const classes = useStyle();

  const dispatch = useDispatch();

  const { data } = useSelector((state) => state.memory);
  const { numberOfPage } = data;

  useEffect(() => {
    if (page) {
      dispatch(getAllMemories(page));
    }
  }, [page]);

  return (
    <Pagination
      classes={{
        ul: classes.ul,
      }}
      count={numberOfPage}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={`/posts?page=${item.page}`}
        />
      )}
    />
  );
};

export default PaginationComp;
