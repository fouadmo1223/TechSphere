import { Box, Typography, Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { TeamMember } from '@/utils/types';

interface TeamMembersProps {
  members: TeamMember[];
}

export default function TeamMembers({ members }: TeamMembersProps) {
  return (
    <Box>
      <List>
        {members.map((member) => (
          <ListItem key={member.id}>
            <ListItemAvatar>
              <Avatar alt={member.name} src={member.avatar} />
            </ListItemAvatar>
            <ListItemText
              primary={member.name}
              secondary={
                <>
                  <Typography component="span" display="block">{member.role}</Typography>
                  <Typography component="span" variant="body2" color="text.secondary">
                    {member.email}
                  </Typography>
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}