import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useTheme } from '@mui/styles'
import { TextField } from '@mui/material'

const InputSelect = ({ value, onChange, OPTIONS,label='',disabled }) => {
  const theme = useTheme()
  return (
    <TextField
      labelId='demo-simple-select-label'
      id='demo-simple-select'
      value={value}
      label={label}
      onChange={onChange}
      InputLabelProps={{
        style: {
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          width: '100%',
          color: theme.palette.primary.main,
        },
      }}
      select
      disabled={disabled}
   >
      {OPTIONS?.map((item) => {
        return <MenuItem value={item?.value}>{item?.label}</MenuItem>
      })}
    </TextField>
  )
}

export default InputSelect
