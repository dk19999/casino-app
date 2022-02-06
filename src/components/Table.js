import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';

export default function Table({ rows, columns }) {
  const [rowsPerPage, setRowsPerPage] = useState(10);

  return (
    <>
      <div className='Table' style={{ height:'600px'}}>
      <DataGrid
        onPageSizeChange={({ pageSize }) => {
          setRowsPerPage(pageSize);
        }}
        pageSize={rowsPerPage}
        rowsPerPageOptions={[10, 20]}
        rows={rows}
        columns={columns}
      />
      </div>
    </>
  );
}
