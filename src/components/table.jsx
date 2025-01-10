import React, { useState, useMemo } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Paper,
  Toolbar,
  Typography,
  TextField,
} from '@mui/material';

function EnhancedTableHead({ order, orderBy, onRequestSort }) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const headCells = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
    { id: 'image', numeric: false, disablePadding: false, label: 'Image' },
    { id: 'current_price', numeric: true, disablePadding: false, label: 'Price ($)' },
    { id: 'symbol', numeric: true, disablePadding: false, label: 'Symbol' },
    { id: 'market_cap_rank', numeric: true, disablePadding: false, label: 'Market Cap Rank' },
  ];

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const DataTable = ({ data }) => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterText, setFilterText] = useState('');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredData = useMemo(() => {
    const priceFilter = parseFloat(filterText);
    return (data || []).filter((row) => {
      const matchesNameOrSymbol =
        row.name.toLowerCase().includes(filterText.toLowerCase()) ||
        row.symbol.toLowerCase().includes(filterText.toLowerCase());

      const matchesPrice =
        !isNaN(priceFilter) && row.current_price.toString().includes(priceFilter.toString());

      return matchesNameOrSymbol || matchesPrice;
    });
  }, [data, filterText]);

  const visibleRows = useMemo(() => {
    return filteredData
      .sort((a, b) => {
        const aValue = a[orderBy];
        const bValue = b[orderBy];

        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return order === 'asc' ? aValue - bValue : bValue - aValue;
        }

        const aStr = aValue?.toString() ?? '';
        const bStr = bValue?.toString() ?? '';
        return order === 'asc' ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr);
      })
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [filteredData, order, orderBy, page, rowsPerPage]);

  return (
    <Box sx={{ width: '100%' }}>
      <Box className='heading'>Data Table</Box>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Toolbar>
          <Typography sx={{ flex: '1 1 100%' }} variant="h6" component="div">
             
          </Typography>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            sx={{ ml: 2, width: 200 }}
          />
        </Toolbar>
        <TableContainer>
          <Table sx={{ minWidth: 750 }}>
            <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
            <TableBody>
              {visibleRows.map((row, index) => (
                <TableRow hover tabIndex={-1} key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell>
                    <img src={row.image} alt={row.name} style={{ width: '20px', height: '20px' }} />
                  </TableCell>
                  <TableCell align="right">${row.current_price}</TableCell>
                  <TableCell align="right">{row.symbol}</TableCell>
                  <TableCell align="right">{row.market_cap_rank}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default DataTable;


