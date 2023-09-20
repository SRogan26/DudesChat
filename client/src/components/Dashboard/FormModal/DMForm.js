import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_DMTHREAD } from "../../../utils/mutations";

export default function DMForm({ formStyles }) {
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
        ...formStyles,
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
