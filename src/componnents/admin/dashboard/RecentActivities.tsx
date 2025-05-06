import { Box, Typography } from '@mui/material';

interface Activity {
  id: number;
  action: string;
  user: string;
  time: string;
}

interface RecentActivitiesProps {
  activities: Activity[];
}

export default function RecentActivities({ activities }: RecentActivitiesProps) {
  return (
    <Box sx={{ p: 2, backgroundColor: 'background.paper', borderRadius: 1 }}>
      {activities.map((activity) => (
        <Box key={activity.id} sx={{ mb: 2, p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Typography variant="subtitle1">{activity.action}</Typography>
          <Typography variant="body2" color="text.secondary">
            By {activity.user} • {activity.time}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}