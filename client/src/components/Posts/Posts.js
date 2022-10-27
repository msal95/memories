import { CircularProgress, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMemories } from "../../reducers/posts";

import Post from "./Post/Post";
import useStyles from "./styles";

export default function Posts(props) {
  const { setCurrentId } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const memories = useSelector((state) => state.memory);

  const { loading, data } = memories;

  useEffect(() => {
    dispatch(getAllMemories());
  }, [dispatch]);

  // console.log("🚀 ~ file: Posts.js ~ line 24 ~ Posts ~ data", data);

  const { posts, curretPage, numberOfPages } = data;

  // console.log("🚀 ~ file: Posts.js ~ line 25 ~ Posts ~ posts", posts);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <CircularProgress />
        <h1>loading You'r Memories :)</h1>
      </div>
    );
  }
  return (
    <Grid
      container
      className={classes.container}
      alignItems="strecth"
      spacing={3}
    >
      {posts?.map((item) => (
        <Grid item xs={12} sm={12} md={6} lg={3} key={item._id}>
          <Post post={item} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
}
