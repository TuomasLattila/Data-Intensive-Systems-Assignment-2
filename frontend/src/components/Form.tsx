import { Box, TextField, Button } from '@mui/material'
import { useState, type ChangeEvent, } from 'react'

export default function FormComponent({ titles, row, onUpdate, onDelete }: { titles: string[], row: string[], onUpdate: (row: string[]) => Promise<void>, onDelete: (id: string) => Promise<void>} ) {
  const [values, setValues] = useState<string[]>(row)

  const updateTextField = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, i: number) => {
    const newValues = [...values]
    newValues[i] = e.target.value
    setValues(newValues)
  }

  return (
    <Box component="form" onSubmit={(e) => {e.preventDefault(); onUpdate(values)}}>
      <TextField
        label={titles[0]}
        value={values[1]}
        onChange={(e) => updateTextField(e, 1)}
        fullWidth
        margin="normal"
      />
      <TextField
        label={titles[1]}
        value={values[2]}
        onChange={(e) => updateTextField(e, 2)}
        fullWidth
        margin="normal"
      />
      <TextField
        label={titles[2]}
        type='date'
        value={values[3]}
        onChange={(e) => updateTextField(e, 3)}
        fullWidth
        margin="normal"
      />
      <TextField
        label={titles[3]}
        value={values[4]}
        onChange={(e) => updateTextField(e, 4)}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained">Save</Button>
      <Button sx={{ marginLeft: 1 }} color='warning' variant="contained" onClick={() => onDelete(values[0])}>Delete</Button>
    </Box>
  );
}