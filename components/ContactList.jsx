import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Image from "next/image";
import ListItemText from "@mui/material/ListItemText";
import { Typography } from "@mui/material";
import { useStateContext } from "../context/settingContext";

const ContactList = () => {
  const { contacts } = useStateContext();

  console.log(contacts);

  return (
    <List>
      {contacts &&
        contacts.map((item) => {
          const { name, image, formatedPhone, person_id } = item;

          return (
            <ListItem
              key={person_id}
              data-id={person_id}
              className="flex-wrap p-[5px]"
            >
              <ListItemAvatar className="w-[40px] mr-[10px] shrink-0 min-w-fit">
                <Avatar>
                  <Image
                    width={40}
                    height={40}
                    alt="contact image"
                    src={image}
                  />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={<h3>{name}</h3>}
                secondary={
                  <Typography fontSize={12} color="rgba(255, 255, 255, 0.56)">
                    +{formatedPhone}
                  </Typography>
                }
              />

              {/* SPEED DIal for actions */}
            </ListItem>
          );
        })}
    </List>
  );
};

export default ContactList;
