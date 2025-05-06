// /src/app/(admin)/admin/layout.tsx
'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer, Bounce } from "react-toastify";
import AdminNavbar from '@/componnents/admin/AdminNavbar';
import AdminSidebar from '@/componnents/admin/AdminSidebar';
import Toolbar from '@mui/material/Toolbar';
import { AuthProvider } from '@/app/context/UserContext';



const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#9c27b0',
    },
    background: {
      default: '#fefefe',
      paper: '#ffffff',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.6)',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);


  const token = getCookie('token');
  useEffect(()=>{
    console.log('Token:', token);
  },[])
  
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <html lang="en">
     
      <AuthProvider>
        <body style={{ backgroundColor: '#fefefe' }}>
        <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
          <ThemeProvider theme={lightTheme}>
            <Box sx={{ display: 'flex', minHeight: '100vh' }}>
              <CssBaseline />
              <AdminNavbar open={open} toggleDrawer={toggleDrawer} />
              <AdminSidebar open={open} toggleDrawer={toggleDrawer} />
              <Box
                component="main"
                sx={{
                  backgroundColor: (theme) => theme.palette.background.default,
                  flexGrow: 1,
                  height: '100vh',
                  overflow: 'auto',
                }}
              >
                <Toolbar />
                <Box sx={{ p: 3 }}>
                  {children}
                </Box>
              </Box>
            </Box>
            <ToastContainer
              pauseOnFocusLoss
              closeOnClick
              pauseOnHover
              transition={Bounce}
              theme="light"
            />
          </ThemeProvider>
        </body>
      </AuthProvider>
    </html>
  );
}