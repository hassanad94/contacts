import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Image from "next/image";
import ListItemText from "@mui/material/ListItemText";
import { Typography } from "@mui/material";
import ContactSettingsButton from "./ContactSettingsButton";

const ContactList = ({ list }) => {
  return (
    <List className="w-[100%] p-[3%] max-w-[770px]">
      {list &&
        list.map((item) => {
          const { name, image, formatedPhone, person_id } = item;

          return (
            <ListItem
              key={person_id}
              data-id={person_id}
              className="p-[5px_0px]"
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

              <ContactSettingsButton personID={person_id} />
            </ListItem>
          );
        })}
    </List>
  );
};

export default ContactList;
