import { AppBar, Avatar, Box, Tab, Tabs, Toolbar, Typography } from "@mui/material"
import avatarFake from "assets/avatar-fake.png"
import { useMatch, useNavigate } from "react-router-dom"


export const NavUser = () => {

  const match = useMatch("/:tab/*")
  const tab = match?.params.tab || "groups"

  const navigate = useNavigate();

  return (
    <Box pb="104px">
      <AppBar
        position="fixed"
        color="default"
        elevation={10}
      >
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
        <Toolbar sx={{ minHeight: "auto !important", justifyContent: "center" }}>
          <Tabs
            value={tab}
            onChange={(_e, v) => {
              navigate(`/${v}`)
            }}
          >
            <Tab value="groups" label="Groupos" />
            <Tab value="expenses" label="Dividas" />
          </Tabs>
        </Toolbar>
      </AppBar>
    </Box>
  )
}