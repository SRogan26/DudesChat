import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_DMTHREAD } from "../../../utils/mutations";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";


export default function DGForm() {
  const [usersToDg, setUsersToDg] = useState([]);
  const [userToAdd, setUserToAdd] = useState("");
  const [title, setTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    console.log(title);
    console.log(usersToDg);
  }, [usersToDg]);

  const [addThread, { error, data }] = useMutation(CREATE_DMTHREAD);

  const handleTitleChange = (event) => {
    const { value } = event.target;
    setTitle(value);
  };

  const handleAdd = (event) => {
    event.preventDefault();
    if (userToAdd.length >= 6) {
      setUsersToDg([...usersToDg, userToAdd]);
      setUserToAdd("");
    }
  };

  const handleRemove = (userToRemove) => {
    setUsersToDg(usersToDg.filter((user) => user !== userToRemove));
  };

  const handleUserChange = (event) => {
    const { value } = event.target;
    setUserToAdd(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (title.length < 6) return;
    if (usersToDg.length === 0) return;
    try {
      const { data } = await addThread({
        variables: { title, memberNames: usersToDg, isDm: false },
      });
      console.log(data);
      if (errorMessage) setErrorMessage(null);
      setUsersToDg([]);
      setTitle("")
    } catch (err) {
      if (err.graphQLErrors[0].extensions.code === "UNAUTHENTICATED") {
        localStorage.removeItem("auth_token");
      }
      setErrorMessage(err.message);
    }
  };
  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "60%",
        minHeight: "fit-content",
        border: "2px solid #000",
        boxShadow: 24,
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        bgcolor: "background.paper",
        m: 1,
        justifyContent: "space-between",
        "& .MuiTextField-root": {
          p: 2,
        },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        fullWidth
        helperText={
          (title.length < 6 && title.length > 0)
            ? "Title should be at least 6 characters long"
            : "What is the Title of This DudeGroup?"
        }
        id="add-thread-title"
        value={title}
        name="title"
        onChange={handleTitleChange}
      />
      <Box
        component="span"
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <TextField
          fullWidth
          error={errorMessage ? true : false}
          helperText={
            error ? errorMessage : "Who Do You Want to Add This DudeGroup?"
          }
          id="add-user-to-list"
          value={userToAdd}
          name="userToAdd"
          onChange={handleUserChange}
        />
        <IconButton
          sx={{
            bgcolor: "aqua",
            height: 32,
            width: 32,
            marginRight: 2,
            marginBottom: 2,
          }}
          aria-label="add-to-list"
          onClick={handleAdd}
        >
          <AddIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          height: "90%",
          minHeight: 400,
          width: "90%",
          border: "1px solid #000",
          m: 2,
        }}
      >
        Members To Add:
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {usersToDg.map((user, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <Chip label={user} onDelete={() => handleRemove(user)} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Create DudeGroup
      </Button>
    </Box>
  );
}
