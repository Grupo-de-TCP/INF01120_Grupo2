import { AppBar, Box, Tab, Tabs, Toolbar } from "@mui/material"
import { useMatch, useNavigate } from "react-router-dom"
import { ToolbarMain } from "../toolbar-main.component"


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
        <ToolbarMain />

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