import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import AddCircleOutlineOutlinedIcon  from '@mui/icons-material/AddCircleOutlineOutlined';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import AddRecipeForm from '../AddRecipeForm';

function chooseForm(text) {
  switch (text) {
    case "Add A Recipe":
      return <OpenModalMenuItem itemText={text} modalComponent={<AddRecipeForm />} />
    default:
      return <ListItemText primary={text} onClick={() => alert("Feature Coming Soon!")}/>

  }
}

function AddButton({text}) {
  return (
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemIcon>
          <AddCircleOutlineOutlinedIcon />
        </ListItemIcon>
        {chooseForm(text)}
      </ListItemButton>
    </ListItem>
  )
}

export default AddButton
