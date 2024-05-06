import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { GridCellParams } from '@mui/x-data-grid';
import '../../style/LeadershipTable.css'; // Assuming a CSS file for styling


const columns = [
  { field: 'picture', headerName: '', width: 60, renderCell: (params: GridCellParams) => <img src={params.row.picture} alt={params.row.name} /> },
  { field: 'name', headerName: 'Name', width: 160 },
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'currentPosition', headerName: 'Current Position', width: 200 },
  { field: 'potential', headerName: 'Potential', width: 90 },
  { field: 'competancy', headerName: 'Competancy', width: 90 }
];

const rows = [
  { picture: '../icon/mg.jpg', name: 'Bruce Wayne', id: '215568A', currentPosition: 'Software Engineer', potential: '84%', competancy: '62%' },
  
];

export default function LeadershipTable() {
  return (
    <div style={{ height: 550, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10, 20]}
      />
    </div>
  );
}