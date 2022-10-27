import {
  Card,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

// Local Imports
import Navbar from "../../components/NavBar";
import Post from "../../components/Posts/Post/Post";
import { getMemory, getPostBySearch } from "../../reducers/posts";
import useStyle from "./styles.js";

export default function PostDetails() {
  const classes = useStyle();
  const { id } = useParams();
  const navigate = useNavigate();
  const [postData, setPostData] = useState();

  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.memory);

  // console.log("🚀 ~ file: index.js ~ line 27 ~ PostDetails ~ data", data);

  const { post, posts } = data;
  // console.log("🚀 ~ file: index.js ~ line 33 ~ PostDetails ~ post", post);

  useEffect(() => {
    dispatch(getMemory(id));
  }, [id]);

  useEffect(() => {
    if (post) {
      setPostData(post);
      dispatch(
        getPostBySearch({ search: "none", tags: post?.tags?.join(",") })
      );
    }
  }, [post]);

  const recommendedPost = posts?.filter((posts) => posts._id !== postData?._id);

  // console.log(
  //   "🚀 ~ file: index.js ~ line 47 ~ PostDetails ~ recommendedPost",
  //   recommendedPost
  // );

  const openPost = (id) => {
    navigate(`/posts/${id}`);
  };

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
    <Container maxWidth="lg">
      <Navbar />
      <Paper elevation={6}>
        <div className={classes.card}>
          <div className={classes.section}>
            <Typography variant="h3" component="h2">
              {postData?.title}
            </Typography>
            <Typography
              gutterBottom
              variant="h6"
              color="textSecondary"
              component="h2"
            >
              {postData?.tags?.map((tag) => `#${tag} `)}
            </Typography>
            <Typography gutterBottom variant="body1" component="p">
              {postData?.message}
            </Typography>
            <Typography variant="h6">Created by: {postData?.name}</Typography>
            <Typography variant="body1">
              {moment(postData?.createdAt).fromNow()}
            </Typography>
            <Divider style={{ margin: "20px 0" }} />
            <Typography variant="body1">
              <strong>Realtime Chat - coming soon!</strong>
            </Typography>
            <Divider style={{ margin: "20px 0" }} />
            <Typography variant="body1">
              <strong>Comments - coming soon!</strong>
            </Typography>
            <Divider style={{ margin: "20px 0" }} />
          </div>
          <div className={classes.imageSection}>
            <img
              className={classes.media}
              src={
                postData?.selectedFile ||
                "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
              }
              alt={postData?.title}
            />
          </div>
        </div>
        {recommendedPost?.length && (
          <div className={classes.section}>
            <Typography gutterBottom variant="h5">
              You might also Like:
            </Typography>
            <Grid
              container
              className={classes.container}
              style={{ paddingBottom: 15 }}
              alignItems="strecth"
              spacing={3}
            >
              {recommendedPost?.map((item) => (
                <Grid item xs={12} sm={12} md={6} lg={3} key={item._id}>
                  <Post post={item} />
                </Grid>
              ))}
            </Grid>
          </div>
        )}
      </Paper>
    </Container>
  );
}
