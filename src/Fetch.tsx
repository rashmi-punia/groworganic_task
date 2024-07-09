
import { Box, Container } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface Data {
  useId: number;
  id: number;
  title: string;
  body: string;
}

interface FetchProps{
  posts:Data[]
}


const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 90,
  },
  {
    field: "userId",
    headerName: "User ID",
    width: 150,
  },
  {
    field: "title",
    headerName: "Title",
    width: 250,
  },
  {
    field: "body",
    headerName: "Body",
    width: 400,
  },
];

const Fetch: React.FC<FetchProps> = ({ posts }) => {
  return (
  

    <Box sx={{ height: 600, flexGrow: 1,boxShadow:2,backgroundColor:'ghostwhite' }}>
      <DataGrid
        rows={posts}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10, 20, 50]}
        checkboxSelection
        disableRowSelectionOnClick
        />
    </Box>
  );
};

export default Fetch;
