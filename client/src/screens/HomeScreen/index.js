import {
  Container,
  Grid,
  Grow,
  Paper,
  AppBar,
  Button,
  TextField,
  Chip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { MuiChipsInput } from "mui-chips-input";

// Local Imports
import Form from "../../components/Form/Form";
import Navbar from "../../components/NavBar";
import PaginationComp from "../../components/Pagination";
import Posts from "../../components/Posts/Posts";
import { getAllMemories, getPostBySearch } from "../../reducers/posts";
import "./styles.css";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function HomeScreen() {
  const [currentId, setCurrentId] = useState(null);
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);

  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getAllMemories());
  // }, [currentId, dispatch]);

  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const handleAdd = (tag) => setTags([...tags, tag]);

  const handleDelete = (tagDeleted) => {
    setTags(tags.filter((tag) => tag !== tagDeleted));
  };

  const searchPost = () => {
    if (search.trim() || tags) {
      // console.log(
      //   "🚀 ~ file: index.js/Home Screen ~ line 58 ~ searchPost ~ search",
      //   search
      // );

      dispatch(getPostBySearch({ search, tags: tags.join(",") }));
      navigate(`/posts/search?searchQuery=${search || "none"}&tags=${tags}`);
    } else {
      navigate("/");
    }
  };

  return (
    <Container maxWidth="xl">
      <Navbar />
      <Grow in>
        <Grid
          container
          className="gridContainer"
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar className="appBarSearch" position="static" color="inherit">
              <TextField
                name="search"
                variant="outlined"
                label="Search Memories"
                fullWidth
                onKeyPress={handleKeyPress}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <MuiChipsInput
                style={{ marginTop: 15 }}
                value={tags}
                onAddChip={handleAdd}
                onDeleteChip={handleDelete}
                variant="outlined"
                label="Search Tags"
                fullWidth
                hideClearAll
              />
              <Button
                onClick={searchPost}
                className=""
                variant="contained"
                color="primary"
                style={{ marginTop: 15 }}
              >
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Paper elevation={6} style={{ marginTop: 15 }}>
              <PaginationComp page={page} />
            </Paper>
          </Grid>
        </Grid>
      </Grow>
    </Container>
  );
}
