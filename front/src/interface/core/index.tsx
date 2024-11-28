import { Card, Switch, Typography, useColorScheme } from "@mui/material"
import { ThemeService } from "theme/theme.service"

export const Layout = () => {

  const { setMode } = useColorScheme();

  const settings = ThemeService.useStore();

  return (
    <Card>
      <Typography variant="h1">Hello, world!</Typography>
      <Switch
        checked={ThemeService.useStore(e => e.themeMode === "dark")}
        onChange={() => {
          setMode(settings.themeMode === "dark" ? "light" : "dark");
          settings.onUpdate('themeMode', settings.themeMode === "dark" ? "light" : "dark");
        }}
      />
    </Card>
  )
}
