import { Stack } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { QueryOptionsAPI } from "infra/queries"
import { GroupCard } from "interface/components/group-card/group-card.component"

const loadingObj = {
  id: 0,
  title: "",
  debt: 0,
  dividend: 0,
}

const ListGroupPage = () => {

  const {
    data: groupsData,
    isLoading,
  } = useQuery(QueryOptionsAPI.groups)

  if (isLoading || !groupsData) {
    return (
      <Stack px={2.5} py={3} gap={2}>
        <GroupCard isWaiting {...loadingObj} />
        <GroupCard isWaiting {...loadingObj} />
        <GroupCard isWaiting {...loadingObj} />
        <GroupCard isWaiting {...loadingObj} />
        <GroupCard isWaiting {...loadingObj} />
        <GroupCard isWaiting {...loadingObj} />
      </Stack>
    )
  }

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