import { Container, Paper, Typography, styled } from "@mui/material"

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "theme.grey.400",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function RecipeCard({recipe}) {
  return ( 
    <Container>
      <Item><Typography>{recipe.name}</Typography></Item>
    </Container>
  )
}

export default RecipeCard
