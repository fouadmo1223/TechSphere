import { Box, Typography, Chip, List, ListItem, ListItemText } from '@mui/material';
import { Task } from '@/utils/types';

const statusColors = {
  Pending: 'warning',
  'In Progress': 'info',
  Completed: 'success',
} as const;

export default function TaskList({ tasks }: { tasks: Task[] }) {
  return (
    <Box>
      <List>
        {tasks.map((task) => (
          <ListItem key={task.id} divider>
            <ListItemText
              primary={task.title}
              secondary={
                <>
                  <Typography component="span" display="block">
                    Assigned to: {task.assignee}
                  </Typography>
                  <Typography component="span" variant="body2">
                    Due: {task.dueDate}
                  </Typography>
                </>
              }
            />
            <Chip 
              label={task.status} 
              color={statusColors[task.status]} 
              size="small" 
              sx={{ ml: 2 }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}