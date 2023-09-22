import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { GET_MESSAGES } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import { useUserContext } from "../../utils/userContext";
import { useEffect } from "react";
import stringAvatar from "../../utils/avatarStyle";
import { MESSAGE_POSTED } from "../../utils/subscriptions";

function Messages({ data, subscribeToNewMessages, activeThread }) {

  const results = data.messagesByThread

  

  useEffect(() => {
    
    const unsubscribe = subscribeToNewMessages({
      document: MESSAGE_POSTED,
      variables: { threadId: activeThread},
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newFeedItem = subscriptionData.data.messagePosted;
        return Object.assign({}, prev, {
          messagesByThread: [...prev.messagesByThread, newFeedItem ],
        })
      }
    })
    
    return () => unsubscribe()
  }
  , [activeThread]);
  
  
  return (
    <List sx={{ width: "100%"}}>
      {results.map((message) => (
        <div key={message._id}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar {...stringAvatar(message.authorId.username)} />
            </ListItemAvatar>
            <ListItemText
              primary={
                message.authorId.username +
                " @ " +
                new Date(message.updatedAt).toLocaleString()
              }
              secondary={
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body1"
                  color="text.primary"
                >
                  {message.messageBody}
                </Typography>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </div>
      ))}
      {/* End Messages Area */}
    </List>
  );
}

export default function MessagesWithData({ activeThread }) {
  const { setUserLogged } = useUserContext();

  useEffect(() => {
    if (!localStorage.getItem("auth_token")) {
      console.log("begone from this place fiend");
      setUserLogged(false);
    }
  });

  const { subscribeToMore, loading, error, data } = useQuery(GET_MESSAGES, {
    variables: { threadId: activeThread },
    options:{
      fetchPolicy: 'network-only'
    }
  });
  if (loading) {
    console.log("loading");
    return;
  }
  if (error) {
    if (error.graphQLErrors[0].extensions.code === 'UNAUTHENTICATED') {
      localStorage.removeItem("auth_token");
    }
    console.log({...error});
    return;
  }

  return (
    <Messages
      activeThread={activeThread}
      data = {data}
      subscribeToNewMessages={
        subscribeToMore
      }
    />
  );
}
