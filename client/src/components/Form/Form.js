import React, { useEffect, useState } from "react";
import { Paper, Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";

// Local Imports
import "./styles.css";
import InputFieldComponent from "../InputComponent/InputFieldComponent";
import { createNewMemory, updatePost } from "../../reducers/posts";

const initialState = {
  title: "",
  message: "",
  tags: "",
  selectedFile: "",
};

export default function Form(props) {
  const { currentId, setCurrentId } = props;

  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const dispatch = useDispatch();

  const data = useSelector((state) => state.memory.data);

  console.log("🚀 ~ file: Form.js ~ line 32 ~ Form ~ data", data);

  const user = JSON.parse(localStorage.getItem("profile"));

  const createdData = {
    ...postData,
    name: user?.result.name,
  };

  const selectedMemory = currentId
    ? data?.posts?.find((post) => post._id === currentId)
    : null;

  useEffect(() => {
    if (selectedMemory) {
      setPostData(selectedMemory);
    }
  }, [selectedMemory]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(updatePost({ currentId, createdData }));
      // try {
      //   const res = await axios.patch(
      //     `http://localhost:4000/posts/${currentId}`,
      //     postData
      //   );
      //   console.log(res.data);
      // } catch (e) {
      //   alert(e);
      // }
    } else {
      dispatch(createNewMemory(createdData));
    }
    onCLear();

    // e.preventDefault();
    // try {
    //   const res = await axios.post("http://localhost:4000/posts", postData);
    //   console.log(res.data);
    // } catch (e) {
    //   alert(e);
    // }
  };

  const onCLear = () => {
    setCurrentId(null);
    setPostData(initialState);
  };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setPostData({
  //     ...postData,
  //     [name]: value,
  //   });
  // };

  if (!user?.result.name) {
    return (
      <Paper className="paper" elevation={6}>
        <Typography variant="h6" align="center">
          Please Signin to Create Your Own Memories
        </Typography>
      </Paper>
    );
  } else {
    return (
      <Paper className="paper" elevation={6}>
        <form
          autoComplete="on"
          noValidate
          className="form"
          onSubmit={handleSubmit}
        >
          <Typography varient="h6">
            {currentId ? "Edit" : "Create"} Memory
          </Typography>
          {/* <InputFieldComponent
          name="creator"
          label="Creator"
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
        /> */}
          <InputFieldComponent
            name="title"
            label="Title"
            value={postData.title}
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
          />
          <InputFieldComponent
            name="message"
            label="Message"
            value={postData.message}
            multiline
            onChange={(e) =>
              setPostData({ ...postData, message: e.target.value })
            }
          />
          <InputFieldComponent
            name="tags"
            label="Tags"
            value={postData.tags}
            onChange={(e) =>
              setPostData({ ...postData, tags: e.target.value.split(",") })
            }
          />
          <div className="fileInput">
            <FileBase
              type="file"
              multiple={false}
              name="selectedFile"
              onDone={({ base64 }) =>
                setPostData({ ...postData, selectedFile: base64 })
              }
            />
          </div>
          <Button
            className="buttonSubmit"
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
          >
            Submit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            fullWidth
            onClick={onCLear}
          >
            Clear
          </Button>
        </form>
      </Paper>
    );
  }
}
