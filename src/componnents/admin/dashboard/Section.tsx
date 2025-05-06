'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, Typography } from '@mui/material';
import { ReactNode } from 'react';

interface SectionProps {
  title: string;
  children: ReactNode;
  delay?: number;
}

export const Section = ({ title, children}: SectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100}}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 1,  }}
     
    >
      <Card sx={{ mb: 3, borderRadius: 2, overflow: 'hidden', transition: 'transform 0.3s' }}>
        <CardContent>
          <Typography  variant="h6" gutterBottom sx={{ mb: 2 }}>
            {title}
          </Typography>
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );
};