import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { type EventTableProps } from '../types/Events'

export default function EventTable({ events }: EventTableProps) {

  return (
    <TableContainer component={Paper}>
      <Table sx={{  }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Event</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Placement</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {events.map((row) => (
            <TableRow
              key={row.event_name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{row.event_name}</TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">{row.event_date.slice(0, 10)}</TableCell>
              <TableCell align="right">{row.finishing_placement}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}