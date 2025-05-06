'use client'
import React from 'react';
import { 
  Box, Typography, Paper, Divider, Switch, FormControlLabel, 
  Avatar, Chip, Slider, Select, MenuItem, InputLabel, FormControl 
} from '@mui/material';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const Settings = () => {
  // Refs for intersection observer
  const refs = Array(10).fill(0).map(() => useRef(null));
  const inView = refs.map(ref => useInView(ref, { once: true, margin: "-100px" }));

  // Modern animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        delay: i * 0.15,
        duration: 0.8,
        ease: [0.16, 0.77, 0.47, 0.97]
      }
    })
  };

  const cardVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 0.77, 0.47, 0.97]
      }
    }
  };

  // Modern sections data
  const sections = [
  
    {
      title: 'Notifications',
      icon: '🔔',
      content: (
        <>
          <FormControlLabel 
            control={<Switch color="secondary" defaultChecked />} 
            label="Push Notifications" 
          />
          <FormControlLabel 
            control={<Switch color="secondary" />} 
            label="Email Digest" 
            sx={{ my: 1 }}
          />
          <FormControlLabel 
            control={<Switch color="secondary" defaultChecked />} 
            label="Sound Alerts" 
          />
        </>
      )
    },
    {
      title: 'Security',
      icon: '🔒',
      content: (
        <>
          <FormControlLabel 
            control={<Switch color="secondary" />} 
            label="Two-Factor Authentication" 
          />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 2 }}>
            Last login: 2 hours ago from Chrome on Windows
          </Typography>
          <Chip label="Change Password" variant="outlined" clickable />
        </>
      )
    },
    {
      title: 'Privacy',
      icon: '👁️',
      content: (
        <>
          <FormControlLabel 
            control={<Switch color="secondary" defaultChecked />} 
            label="Public Profile" 
          />
          <FormControlLabel 
            control={<Switch color="secondary" />} 
            label="Data Sharing" 
            sx={{ my: 1 }}
          />
          <FormControlLabel 
            control={<Switch color="secondary" defaultChecked />} 
            label="Search Visibility" 
          />
        </>
      )
    },
    {
      title: 'Language',
      icon: '🌐',
      content: (
        <FormControl fullWidth sx={{ mt: 1 }}>
          <InputLabel>Interface Language</InputLabel>
          <Select
            label="Interface Language"
            defaultValue="en"
          >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="es">Español</MenuItem>
            <MenuItem value="fr">Français</MenuItem>
            <MenuItem value="de">Deutsch</MenuItem>
          </Select>
        </FormControl>
      )
    },
    {
      title: 'Accessibility',
      icon: '♿',
      content: (
        <>
          <FormControlLabel 
            control={<Switch color="secondary" />} 
            label="High Contrast Mode" 
          />
          <FormControlLabel 
            control={<Switch color="secondary" />} 
            label="Screen Reader Support" 
            sx={{ my: 1 }}
          />
          <FormControlLabel 
            control={<Switch color="secondary" />} 
            label="Reduced Motion" 
          />
        </>
      )
    },
    {
      title: 'Billing',
      icon: '💳',
      content: (
        <>
          <Typography variant="body1" sx={{ mb: 1 }}>Premium Plan - $9.99/month</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Next billing date: June 15, 2024
          </Typography>
          <Chip label="Update Payment Method" variant="outlined" clickable />
        </>
      )
    },
    {
      title: 'Data & Storage',
      icon: '💾',
      content: (
        <>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Storage used: 4.2 GB of 10 GB
          </Typography>
          <Slider defaultValue={42} disabled />
          <Chip label="Clear Cache" variant="outlined" clickable sx={{ mt: 2 }} />
        </>
      )
    },
    {
      title: 'Advanced',
      icon: '⚙️',
      content: (
        <>
          <FormControlLabel 
            control={<Switch color="secondary" />} 
            label="Developer Mode" 
          />
          <FormControlLabel 
            control={<Switch color="secondary" />} 
            label="Experimental Features" 
            sx={{ my: 1 }}
          />
          <Chip label="Reset All Settings" color="error" variant="outlined" clickable />
        </>
      )
    }
  ];

  return (
    <Box sx={{ 
      p: { xs: 2, md: 4 }, 
      maxWidth: 900, 
      mx: 'auto',
      background: 'linear-gradient(to bottom, #f9fafb, #ffffff)'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography variant="h4" sx={{ 
          mb: 4, 
          fontWeight: 700,
          background: 'linear-gradient(45deg, #6a5acd, #48dbfb)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Settings
        </Typography>
      </motion.div>

      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, 
        gap: 3 
      }}>
        {sections.map((section, index) => (
          <motion.div
            key={index}
            ref={refs[index]}
            initial="hidden"
            animate={inView[index] ? "visible" : "hidden"}
            variants={containerVariants}
            custom={index % 2}
          >
            <motion.div variants={cardVariants}>
              <Paper 
                elevation={0}
                sx={{ 
                  p: 3, 
                  height: '100%',
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'divider',
                  background: 'rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(10px)',
                  '&:hover': {
                    boxShadow: '0 10px 20px rgba(0,0,0,0.05)'
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" sx={{ 
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5
                  }}>
                    <span>{section.icon}</span>
                    {section.title}
                  </Typography>
                </Box>
                <Divider sx={{ mb: 2, opacity: 0.5 }} />
                {section.content}
              </Paper>
            </motion.div>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
};

export default Settings;