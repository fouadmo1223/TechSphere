'use client';

import { Grid } from '@mui/material';
import { StatsBox } from './StatsBox';
import ArticleIcon from '@mui/icons-material/Article';
import CommentIcon from '@mui/icons-material/Comment';
import PersonIcon from '@mui/icons-material/Person';

interface StatsGridProps {
  stats: {
    articleCount: number;
    commentCount: number;
    userCount: number;
  };
  loading: boolean;
}

export const StatsGrid = ({ stats, loading }: StatsGridProps) => {
  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      <Grid item xs={12} sm={6} md={4}>
        <StatsBox 
          title="Total Articles" 
          count={stats.articleCount} 
          icon={<ArticleIcon sx={{ color: '#1976d2' }} />} 
          loading={loading}
          color="#1976d2"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <StatsBox 
          title="Total Comments" 
          count={stats.commentCount} 
          icon={<CommentIcon sx={{ color: '#9c27b0' }} />} 
          loading={loading}
          color="#9c27b0"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <StatsBox 
          title="Total Users" 
          count={stats.userCount} 
          icon={<PersonIcon sx={{ color: '#2e7d32' }} />} 
          loading={loading}
          color="#2e7d32"
        />
      </Grid>
    </Grid>
  );
};