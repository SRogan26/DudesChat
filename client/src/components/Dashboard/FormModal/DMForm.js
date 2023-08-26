import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_DMTHREAD } from "../../../utils/mutations";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export default function DMForm() {
  const [userToDm, setUserToDm] = useState("");

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
        variables: { title: userToDm, memberNames: [userToDm], isDm:true },
      });
      console.log(data);
      setUserToDm("");
    } catch (err) {
      if (err.graphQLErrors[0].extensions.code === "UNAUTHENTICATED") {
        localStorage.removeItem("auth_token");
      }
      console.log(err);
    }
  };
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": {
          m: 1,
          width: "75%",
          minWidth:"50%",
          minHeight:"50%",
          position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    display: 'flex',
    justifyContent:'center'
        },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        fullWidth
        helperText="Who Do You Want to DudeMessage?"
        id="add-message"
        value={userToDm}
        name="userToDm"
        onChange={handleChange}
      />
    </Box>
  );
}
