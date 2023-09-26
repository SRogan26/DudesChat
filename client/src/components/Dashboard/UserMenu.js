import { useState } from "react";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Menu from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Check from "@mui/icons-material/Check";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

function ThemeItem({ name, current, onClick }) {
  return (
    <MenuItem onClick={onClick}>
      <ListItemText>{name}</ListItemText>
      {current && (
        <ListItemIcon>
          <Check />
        </ListItemIcon>
      )}
    </MenuItem>
  );
}

function ThemeMenuItem({ themeList, chooseTheme, currentTheme }) {
  const [anchor, setAnchor] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchor(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchor(null);
  };

  const listOpen = Boolean(anchor);

  return (
    <MenuItem
      aria-owns={listOpen ? "mouse-over-popover" : undefined}
      aria-haspopup="true"
      onClick={listOpen ? handlePopoverClose : handlePopoverOpen}
    >
      <Typography>{`Themes ${listOpen ? "-" : "+"}`}</Typography>
      <Popover
        id="mouse-over-popover"
        open={listOpen}
        anchorEl={anchor}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <div style={{ backgroundColor: "#FFFAF0" }}>
          <Paper sx={{ width: "fit-conent" }}>
            <Menu>
              {themeList.map((name, index) => {
                return (
                  <ThemeItem
                    key={index}
                    name={name}
                    current={index === parseInt(currentTheme)}
                    onClick={() => chooseTheme(index)}
                  />
                );
              })}
            </Menu>
          </Paper>
        </div>
      </Popover>
    </MenuItem>
  );
}

export default function UserMenu({
  userName,
  themeNames,
  currentTheme,
  chooseTheme,
  handleLogOut,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.target);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        variant="contained"
        id="basic-button"
        aria-controls={menuOpen ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={menuOpen ? "true" : undefined}
        onClick={handleClick}
      >
        {userName || "Who???"}
      </Button>
      <Popover
        id="basic-menu"
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div style={{ backgroundColor: "#FFFAF0" }}>
          <Paper sx={{ width: "fit-conent" }}>
            <Menu id="basic-menu">
              <ThemeMenuItem
                themeList={themeNames}
                currentTheme={currentTheme}
                chooseTheme={chooseTheme}
              />
              <Divider />
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleLogOut}>Logout</MenuItem>
            </Menu>
          </Paper>
        </div>
      </Popover>
    </div>
  );
}
