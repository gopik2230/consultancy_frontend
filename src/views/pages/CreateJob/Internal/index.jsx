// material-ui
import {Box, Typography, Button, Table, TableRow, TableHead,TableBody, TableCell} from '@mui/material';
import { useState } from 'react';
import AnimateButton from 'ui-component/extended/AnimateButton';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// ==============================|| SAMPLE PAGE ||============================== //

const InternalJobList = () => {
  const [jobList, setJobList] = useState([])

  return(
  <MainCard>
    <Box sx={{display:"flex", justifyContent:"flex-end", width:"100%", mb:2}}>
      <AnimateButton>
        <Button disableElevation  fullWidth size="large" type="submit" variant="contained" color="secondary">
          Add Job
        </Button>
      </AnimateButton>
    </Box>
    <Table>
        <TableHead>
            <TableRow>
                <TableCell>Job</TableCell>
                <TableCell>Posted</TableCell>
                <TableCell>Status</TableCell>
            </TableRow>
        </TableHead>
    </Table>
  </MainCard>
);
}

export default InternalJobList;
