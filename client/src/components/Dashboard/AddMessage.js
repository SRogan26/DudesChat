import TextField from "@mui/material/TextField";
import Box from '@mui/material/Box';
import { useState } from "react";
import { POST_MESSAGE } from "../../utils/mutations";
import { useMutation } from '@apollo/client';

export default function AddMessage({activeThread}) {
  const [messageBody, setMessageBody] = useState("");

  const [addMessage, { error, data }] = useMutation(POST_MESSAGE);

  const handleChange = (event) => {
    const { value } = event.target;
    setMessageBody(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(!messageBody) return
    try {
      const { data } = await addMessage({
        variables: { threadId: activeThread, messageBody },
      });
      console.log(data)
      setMessageBody('');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '100%', justifySelf: 'flex-end' },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
    <TextField
      fullWidth
      label="Add A Message"
      id="add-message"
      value={messageBody}
      name="messageBody"
      onChange={handleChange}
    />
    </Box>
  );
}
