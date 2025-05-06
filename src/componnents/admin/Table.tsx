// components/Table.tsx
import { 
    Table as MuiTable,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography
  } from '@mui/material';
  
  interface Column {
    key: string;
    title: string;
    render?: (row: any) => React.ReactNode;
  }
  
  interface TableProps {
    data: any[];
    columns: Column[];
    title?: string;
  }
  
  export default function Table({ data, columns, title }: TableProps) {
    if (!data || data.length === 0) {
      return <Typography variant="body1">No data available</Typography>;
    }
  
    return (
      <TableContainer component={Paper} elevation={3}>
        {title && <Typography variant="h6" sx={{ p: 2 }}>{title}</Typography>}
        <MuiTable>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.key} sx={{ fontWeight: 'bold' }}>
                  {column.title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell key={`${column.key}-${index}`}>
                    {column.render ? column.render(row) : row[column.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>
    );
  }