// /src/app/(admin)/admin/layout.tsx



// /src/app/(admin)/admin/components/AdminNavbar.tsx
'use client';
import { metadata } from '@/app/(admin)/admin/metadata';
export { metadata };
import { styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import { use, useEffect, useState } from 'react';
import Logout from '@mui/icons-material/Logout';
import Settings from '@mui/icons-material/Settings';
import Person from '@mui/icons-material/Person';
import { useAuth } from '@/app/context/UserContext';
import Swal from 'sweetalert2';
import { Loading } from 'notiflix';
import axios from 'axios';
import { HOST } from '@/utils/constants';
import { redirect, useRouter } from 'next/navigation';

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const drawerWidth = 240;

export default function AdminNavbar({ open, toggleDrawer }: { 
  open: boolean; 
  toggleDrawer: () => void 
}) {
  const router = useRouter()
  const {user,logout} = useAuth()
  const [firstLoading,setFirstLoading]=useState(true)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);



  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    handleClose();
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "LogOut!"
    }).then( async (result) => {
      if (result.isConfirmed) {

      try{
        Loading.hourglass({
          clickToClose: false,
          svgSize: '50px',
          });
        await axios.get(`${HOST}api/user/logout`).finally(()=>{
          Loading.remove();
        })
        logout();
         Swal.fire({
          title: "Logged Out successfully!",
          icon: "success"
        }).then(()=>{
          router.replace('/login')
        });
      }catch(e){
        Swal.fire({
          title: "Something Went wrong",
          icon: "error"
        });
      }

       
      }
    });
    
  };
  return (
    <AppBar position="absolute" open={open} elevation={1}>
      <Toolbar sx={{ pr: '24px' }}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            marginRight: '36px',
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1, fontWeight: 'bold', letterSpacing: '1px' }}
        >
          TechSphere
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="subtitle1" color="inherit">
            {user?.username}
          </Typography>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={menuOpen ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={menuOpen ? 'true' : undefined}
          >
            <Avatar alt={user?.username} src="/path-to-avatar.jpg" sx={{ width: 32, height: 32 }} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={menuOpen}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={()=>{
              handleClose();
              router.push('/profile');
            }}>
              <ListItemIcon>
                <Person fontSize="small" />
              </ListItemIcon>
              Profile
            </MenuItem>
            <MenuItem onClick={()=>{
              handleClose();
              router.push('/settings');
            }}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}