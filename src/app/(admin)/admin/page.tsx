'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Box, Typography } from '@mui/material';
import axios from 'axios';
import { Articlee, Activity, ChartData, Stats, SystemStatus as SystemStatusType, TeamMember, Task } from '@/utils/types';
import { StatsGrid } from '@/componnents/admin/dashboard/StatsGrid';
import { Section } from '@/componnents/admin/dashboard/Section';
import { ActivityChart } from '@/componnents/admin/dashboard/3. ActivityChart';
import RecentActivities from '@/componnents/admin/dashboard/RecentActivities';
import TopArticles from '@/componnents/admin/dashboard/TopArticles';
import SystemStatus from '@/componnents/admin/dashboard/SystemStatus';
import TeamMembers from '@/componnents/admin/dashboard/TeamMembers';
import TaskList from '@/componnents/admin/dashboard/TaskList';


export default function Admin() {
  const [stats, setStats] = useState<Stats>({
    articleCount: 0,
    commentCount: 0,
    userCount: 0
  });
  const [loading, setLoading] = useState<boolean>(true);

  // Chart data
  const chartData: ChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Articles',
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: '#1976d2',
        backgroundColor: 'rgba(25, 118, 210, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Comments',
        data: [28, 48, 40, 19, 86, 27, 90],
        borderColor: '#9c27b0',
        backgroundColor: 'rgba(156, 39, 176, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Users',
        data: [12, 19, 3, 5, 2, 3, 20],
        borderColor: '#2e7d32',
        backgroundColor: 'rgba(46, 125, 50, 0.1)',
        tension: 0.4,
      },
    ],
  };

  // Sample data
  const recentActivities: Activity[] = [
    { id: 1, action: 'New article published', user: 'John Doe', time: '2 hours ago' },
    { id: 2, action: 'User registered', user: 'Jane Smith', time: '4 hours ago' },
    { id: 3, action: 'Comment added', user: 'Robert Johnson', time: '5 hours ago' },
    { id: 4, action: 'Article updated', user: 'Emily Davis', time: '1 day ago' },
  ];

  const topArticles: Articlee[] = [
    { id: 1, title: 'Getting Started with React', views: 1245, comments: 32 },
    { id: 2, title: 'Advanced TypeScript Patterns', views: 987, comments: 28 },
    { id: 3, title: 'CSS Grid Complete Guide', views: 876, comments: 19 },
    { id: 4, title: 'State Management in 2023', views: 765, comments: 15 },
  ];

  const teamMembers: TeamMember[] = [
    { id: 1, name: 'John Doe', role: 'Frontend Developer', email: 'john@example.com', avatar: '/avatars/1.jpg' },
    { id: 2, name: 'Jane Smith', role: 'Backend Developer', email: 'jane@example.com', avatar: '/avatars/2.jpg' },
    { id: 3, name: 'Robert Johnson', role: 'UI/UX Designer', email: 'robert@example.com', avatar: '/avatars/3.jpg' },
    { id: 4, name: 'Emily Davis', role: 'Content Writer', email: 'emily@example.com', avatar: '/avatars/4.jpg' },
  ];

  const tasks: Task[] = [
    { id: 1, title: 'Implement new dashboard layout', assignee: 'John Doe', status: 'In Progress', dueDate: '2023-06-15' },
    { id: 2, title: 'Fix authentication bug', assignee: 'Jane Smith', status: 'Pending', dueDate: '2023-06-10' },
    { id: 3, title: 'Design new logo', assignee: 'Robert Johnson', status: 'Completed', dueDate: '2023-05-30' },
    { id: 4, title: 'Write blog post about new features', assignee: 'Emily Davis', status: 'In Progress', dueDate: '2023-06-20' },
  ];

  const userGrowthData: ChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'New Users',
        data: [50, 60, 70, 90, 120, 150],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const commentActivity: ChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Comments per day',
        data: [12, 19, 8, 15, 22, 10, 5],
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const systemStatus: SystemStatusType = {
    cpu: 45,
    memory: 78,
    storage: 34,
    uptime: '14 days 6 hours',
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [articlesRes, commentsRes, usersRes] = await Promise.all([
          axios.get<{ count: number }>('/api/articles/count'),
          axios.get<{ count: number }>('/api/comments/count'),
          axios.get<{ count: number }>('/api/user/count')
        ]);
        
        setStats({
          articleCount: articlesRes.data.count,
          commentCount: commentsRes.data.count,
          userCount: usersRes.data.count
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Dashboard
        </Typography>
      </motion.div>
      
      <StatsGrid stats={stats} loading={loading} />
      
      <Box sx={{ display: 'grid', gridTemplateColumns: { md: '1fr 1fr' }, gap: 3 }}>
        <Box>
          <Section title="Activity Overview" >
            <ActivityChart data={chartData} />
          </Section>
          
          <Section title="Recent Activities" >
            <RecentActivities activities={recentActivities} />
          </Section>
        </Box>
        
        <Box>
          <Section title="Team Members" >
            <TeamMembers members={teamMembers} />
          </Section>
          
          <Section title="Tasks" >
            <TaskList tasks={tasks} />
          </Section>
        </Box>
      </Box>
      
      <Section title="Top Performing Articles" delay={0.6}>
        <TopArticles articles={topArticles} />
      </Section>
      
      <Box sx={{ display: 'grid', gridTemplateColumns: { md: '1fr 1fr' }, gap: 3 }}>
       
        
        <Section title="User Growth" delay={0.8}>
          <ActivityChart data={userGrowthData} />
        </Section>
      </Box>
    </Box>
  );
}