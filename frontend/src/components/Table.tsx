import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Dialog, DialogTitle, DialogContent } from '@mui/material'
import { useState, useEffect } from 'react'

import Form from '../components/Form'

import { type ApiRespEvent } from '../types/Events'
import { type ApiRespActivity } from '../types/Activities'

export default function TableComponent({ tableType, titles, rows }: { tableType: string, titles: string[], rows: string[][] }) {
  const [allRows, setAllRows] = useState<string[][]>(rows)
  const [openForm, setOpenForm] = useState<boolean>(false)
  const [row, setRow] = useState<string[]>([])

  useEffect(() => {
    setAllRows(rows)
  }, [rows])

  const handleRowClick = (row: string[]) => {
    setRow(row)
    setOpenForm(true)
  }

  const updateEvent = async (row: string[]) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}events/update`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: row[0],
        event_name: row[1],
        description: row[2],
        event_date: row[3],
        finishing_placement: row[4]
      })
    })
    const data: ApiRespEvent = await res.json()
    const newRow: string[][] = data.data.map((e) => [e.id, e.event_name, e.description, e.event_date.slice(0, 10), e.finishing_placement]);
    const updatedRows = allRows.map((row) => {
      const match = newRow.find((r) => r[0] === row[0]);
      return match ? match : row;
    });
    setAllRows(updatedRows)
    setOpenForm(false)
  }

  const updateActivity = async (row: string[]) => {
    console.log('update activity...')
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
          {allRows.map((row) => (
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
        <DialogTitle sx={{ color: 'gray' }}>Edit row data:</DialogTitle>
        <DialogContent>
          <Form onUpdate={tableType === 'events'? updateEvent : updateActivity} titles={titles} row={row}></Form>
        </DialogContent>
      </Dialog>
    </TableContainer>
  );
}