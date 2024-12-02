import { AppBar, Box, IconButton, Tab, Tabs, Toolbar, Typography } from "@mui/material"
import { useMatch, useNavigate } from "react-router-dom"
import { ToolbarMain } from "../toolbar-main.component"
import { FAIcon } from "interface/components/fa-icon"


export const NavGroup = () => {

  const match = useMatch("/group/:id/*")
  const tab = match?.params['*'] || "groups"

  const navigate = useNavigate();

  return (
    <Box pb="144px">
      <AppBar
        position="fixed"
        color="default"
        elevation={10}
      >
        <ToolbarMain />
        <Toolbar sx={{ minHeight: "auto !important" }} disableGutters>
          <IconButton
            color="primary"
          >
            <FAIcon
              icon="chevron-left"
            />
          </IconButton>
          <Typography variant="subtitle1">
            Group Name
          </Typography>
        </Toolbar>

        <Toolbar sx={{ minHeight: "auto !important", justifyContent: "center" }}>
          <Tabs
            value={tab}
            onChange={(_e, v) => {
              navigate(`/group/${match?.params.id}/${v}`)
            }}
          >
            <Tab value="users" label="Participantes" />
            <Tab value="debts" label="Despesas" />
          </Tabs>
        </Toolbar>
      </AppBar>
    </Box>
  )
}