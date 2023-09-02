import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_DMTHREAD } from "../../../utils/mutations";


export default function DMForm() {
  const [userToDm, setUserToDm] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const [addThread, { error, data }] = useMutation(CREATE_DMTHREAD);

  const handleChange = (event) => {
    const { value } = event.target;
    setUserToDm(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!userToDm) return;
    try {
      const { data } = await addThread({
        variables: { title: userToDm, memberNames: [userToDm], isDm: true },
      });
      console.log(data);
      setUserToDm("");
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
        error={errorMessage ? true : false}
        helperText={error ? errorMessage : "Who Do You Want to DudeMessage?"}
        id="add-message"
        value={userToDm}
        name="userToDm"
        onChange={handleChange}
      />
    </Box>
  );
}
