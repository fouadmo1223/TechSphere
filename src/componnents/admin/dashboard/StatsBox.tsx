'use client';

import { motion } from 'framer-motion';
import { Box, Paper, Typography, CircularProgress, useTheme } from '@mui/material';
import { ReactNode } from 'react';

interface StatsBoxProps {
  title: string;
  count: number | string;
  icon: ReactNode;
  loading: boolean;
  color: string;
}

export const StatsBox = ({ title, count, icon, loading, color }: StatsBoxProps) => {
  const theme = useTheme();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 0.95}}
    >
      <Paper
        elevation={3}
        sx={{
          p: 3,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 2,
          borderTop: `4px solid ${color}`,
          transition: 'transform 0.3s, box-shadow 0.3s',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: theme.shadows[6],
          }
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" color="text.secondary">
            {title}
          </Typography>
          <Box sx={{ 
            backgroundColor: `${color}20`, 
            p: 1, 
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {icon}
          </Box>
        </Box>
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
            <CircularProgress size={30} />
          </Box>
        ) : (
          <Typography variant="h3" component="div" fontWeight="bold">
            {count}
          </Typography>
        )}
      </Paper>
    </motion.div>
  );
};