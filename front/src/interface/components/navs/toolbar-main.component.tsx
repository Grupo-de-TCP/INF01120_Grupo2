import { Avatar, Box, IconButton, Toolbar, Typography } from "@mui/material"
import avatarFake from "assets/avatar-fake.png"
import { FAIcon } from "../fa-icon"
import { CreateExpenseService } from "../create-expense-modal/create-expense-modal.service"


export const ToolbarMain = () => {
  const handleOpen = CreateExpenseService.form.useStore((s) => s.onOpen)
  return (
    <Toolbar sx={{ minHeight: "56px !important" }}>
      <Typography variant="h5">
        Split&Conquer
      </Typography>
      <Box flexGrow={1} />
      <IconButton
        color="primary"
        onClick={() => {
          handleOpen()
        }}
      >
        <FAIcon
          fontSize="large"
          icon="circle-plus"
        />
      </IconButton>
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