import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function DateContextProvider(props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {props.children}
    </LocalizationProvider>
  )
} 