import { Stack } from "@mui/material"
import groupsData from "fake-data/groups"
import { GroupCard } from "interface/components/group-card/group-card.component"



const ListGroupPage = () => {
  return (
    <Stack px={2.5} py={3} gap={2}>
      {groupsData.map(gp => (
        <GroupCard
          key={gp.id}
          id={gp.id}
          title={gp.title}
          debt={gp.debt}
          dividend={gp.dividend}
        />
      ))}
    </Stack>
  )
}

export default ListGroupPage