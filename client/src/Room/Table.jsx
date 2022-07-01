import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

const columns = [
  { id: 'name', label: 'Player', minWidth: 0 },
  { id: 'points', label: 'Points', minWidth: 1 },

];

export default function StickyHeadTable({socket, users, showResults}) {
  return (
    <Paper sx={{ width: {xs: '100%',sm: '50%'}, overflow: 'hidden' , alignSelf: 'center', backgroundColor: 'inherit'}}>
      <TableContainer sx={{ maxHeight:{xs: 232, sm: 367}}}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  width= {column.minWidth}
                  sx={{backgroundColor: '#D0E0EF'}}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={user.id}>
                    <TableCell align='left' sx={{display:'flex', alignItems: 'center'}}>
                    {user.vote ? <CheckIcon sx={{color: 'rgb(54, 194, 54)'}}/>: null}
                        <Typography marginLeft='5px'>
                        {user.name} 
                        </Typography>                                                
                    </TableCell>
                    <TableCell align='center'>
                        {showResults || socket.id === user.id ? user.vote : null}
                    </TableCell>
                  </TableRow>                  
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
        
    </Paper>
    
  );
}
