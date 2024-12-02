import { Avatar, Box, Toolbar, Typography } from "@mui/material"
import avatarFake from "assets/avatar-fake.png"


export const ToolbarMain = () => {

  return (
    <Toolbar sx={{ minHeight: "56px !important" }}>
      <Typography variant="h5">
        Split&Conquer
      </Typography>
      <Box flexGrow={1} />
      <Avatar
        src={avatarFake}
        sx={{
          width: 40,
          height: 40,
        }}
      />
    </Toolbar>


  )
}