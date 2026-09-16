import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Dialog, DialogTitle, DialogContent } from '@mui/material'
import { useState } from 'react'

import Form from '../components/Form'

export default function TableComponent({ titles, rows }: { titles: string[], rows: string[][] }) {
  const [openForm, setOpenForm] = useState<boolean>(false)
  const [row, setRow] = useState<string[]>([])

  const handleRowClick = (row: string[]) => {
    setRow(row)
    setOpenForm(true)
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{  }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>{titles[0]}</TableCell>
            {titles.slice(1).map((title) => (<TableCell key={title} align="right">{title}</TableCell>))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row[0]}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              onClick={ () => handleRowClick(row)}
            >
              <TableCell component="th" scope="row">{row[1]}</TableCell>
              {row.slice(2).map((item) => (<TableCell key={item} align="right">{item}</TableCell>))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={openForm}>
        <DialogTitle>Edit row:</DialogTitle>
        <DialogContent>
          <Form titles={titles} row={row}></Form>
        </DialogContent>
      </Dialog>
    </TableContainer>
  );
}