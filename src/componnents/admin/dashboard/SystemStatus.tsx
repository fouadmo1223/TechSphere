import { Box, Grid, Typography } from '@mui/material';

interface SystemStatus {
  cpu: number;
  memory: number;
  storage: number;
  uptime: string;
}

interface SystemStatusProps {
  status: SystemStatus;
}

export default function SystemStatus({ status }: SystemStatusProps) {
  return (
    <Box sx={{ p: 2, backgroundColor: 'background.paper', borderRadius: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">CPU Usage</Typography>
            <Typography variant="h4" color={status.cpu > 80 ? 'error.main' : 'primary.main'}>
              {status.cpu}%
            </Typography>
          </Box>
        </Grid>
        {/* Other status items... */}
      </Grid>
    </Box>
  );
}