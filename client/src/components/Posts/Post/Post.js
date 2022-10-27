import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
} from "@mui/material";
import moment from "moment";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import Delete from "@mui/icons-material/Delete";
import ThumbUpAlt from "@mui/icons-material/ThumbUpAlt";
import ThumbUpAltOutlined from "@mui/icons-material/ThumbUpAltOutlined";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import useStyles from "./styles";
import { deleteMemory, likeMemoryPost } from "../../../reducers/posts";

export default function Post(props) {
  const {
    message,
    selectedFile,
    tags,
    title,
    createdAt,
    _id,
    name,
    likes,
    creator,
  } = props.post;
  const { setCurrentId } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("profile"));

  const onDeleteMemory = () => {
    dispatch(deleteMemory(_id));
  };

  const onClickLike = () => {
    dispatch(likeMemoryPost(_id));
  };

  const openPost = () => {
    navigate(`/posts/${_id}`);
  };

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find(
        (like) => like === (user?.result.googleId || user?.result._id)
      ) ? (
        <>
          <ThumbUpAlt fontSize="small" />
          &nbsp;
          {likes.length > 2
            ? `You  and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{likes.length} {likes.length === 1 ? "like" : "likes"}
        </>
      );
    }
    return (
      <>
        <ThumbUpAltOutlined fontSize="small" /> &nbsp; Like
      </>
    );
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase
        component="span"
        className={classes.cardActions}
        onClick={openPost}
      >
        <CardMedia
          className={classes.media}
          component="img"
          image={selectedFile}
          title={title}
        />
        <div className={classes.overlay}>
          <Typography variant="h6">{name}</Typography>
          <Typography variant="body2">{moment(createdAt).fromNow()}</Typography>
        </div>
        <div className={classes.overlay2}>
          {(user?.result?.googleId === creator ||
            user?.result?._id === creator) && (
            // <Button
            //   style={{ color: "white" }}
            //   size="large"
            //   onClick={() => setCurrentId(_id)}
            // >
            <MoreHoriz
              fontSize="default"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentId(_id);
              }}
              size="large"
              style={{ color: "white" }}
            />
            // </Button>
          )}
        </div>
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary">
            {tags.map((tag) => ` #${tag}`)}
          </Typography>
        </div>
        <Typography variant="h5" className={classes.title} gutterBottom>
          {title}
        </Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {message}
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.buttonContainer}>
        <Button
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={onClickLike}
        >
          <Likes />
        </Button>
        {(user?.result?.googleId === creator ||
          user?.result?._id === creator) && (
          <Button size="small" color="primary" onClick={onDeleteMemory}>
            <Delete fontSize="small" /> Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
