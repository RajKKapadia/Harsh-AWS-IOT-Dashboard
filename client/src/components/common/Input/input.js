import { TextField } from "@mui/material"
import { useTheme } from "@mui/styles"

const Input = ({label,onChange,value}) =>{
  const theme = useTheme()
  return (
    <TextField
      fullWidth
      label={label}
      value={value}
      id='fullWidth'
      InputLabelProps={{
        style: {
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          width: '100%',
          color: theme.palette.primary.main,
        },
      }}
      onChange={(e)=>onChange(e.target.value)}
    />
  )
}

export default Input