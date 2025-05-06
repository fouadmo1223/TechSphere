// components/comments/CommentsSection.tsx
"use client";

import { useState } from 'react';
import {
  Avatar,
  Box,
  Typography,
  IconButton,
  Divider,
  TextField,
  Button,
  Chip
} from '@mui/material';
import { 
  Edit as EditIcon, 
  Delete as DeleteIcon,
  Check as CheckIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { motion, AnimatePresence, scale } from 'framer-motion';

interface Comment {
  id: number;
  userId: number;
  userName: string;
  userAvatar: string;
  text: string;
  date: Date;
}

const CommentsSection = () => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      userId: 1,
      userName: 'John Doe',
      userAvatar: 'https://i.pravatar.cc/150?img=1',
      text: 'This article really helped me understand the new features in Next.js 15. Thanks for writing it!',
      date: new Date('2023-05-15')
    },
    {
      id: 2,
      userId: 2,
      userName: 'Jane Smith',
      userAvatar: 'https://i.pravatar.cc/150?img=2',
      text: 'I have a question about the migration process. Is there any breaking changes we should be aware of?',
      date: new Date('2023-05-16')
    },
    {
      id: 3,
      userId: 3,
      userName: 'Alex Johnson',
      userAvatar: 'https://i.pravatar.cc/150?img=3',
      text: 'The performance improvements are impressive. I saw a 40% reduction in load times after upgrading.',
      date: new Date('2023-05-17')
    }
  ]);

  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editedText, setEditedText] = useState('');
  const currentUserId = 1;

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const handleEdit = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditedText(comment.text);
  };

  const handleSaveEdit = () => {
    if (editingCommentId) {
      setComments(comments.map(comment => 
        comment.id === editingCommentId 
          ? { ...comment, text: editedText, date: new Date() } 
          : comment
      ));
      setEditingCommentId(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
  };

  const handleDelete = (commentId: number) => {
    setComments(comments.filter(comment => comment.id !== commentId));
  };

  // Animation variants
  const commentVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: { opacity: 0, x: -50, transition: { duration: 0.2 } }
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.1 } },
    tap: { scale: 0.95 }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" sx={{ 
        mb: 3, 
        fontWeight: 'bold',
        fontSize: '1.5rem',
        color: 'text.primary'
      }}>
        Comments ({comments.length})
      </Typography>
      
      <AnimatePresence>
        {comments.map((comment) => (
          <motion.div
            key={comment.id}
            variants={commentVariants}
            initial="hidden"
            whileInView="visible"
            whileTap={{scale: 0.95}}
            exit="exit"
            layout
          >
            <Box sx={{ 
              display: 'flex', 
              gap: 2, 
              mb: 3,
              p: 3,
              backgroundColor: 'background.paper',
              borderRadius: 3,
              boxShadow: '0px 2px 10px rgba(0,0,0,0.05)',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: '0px 4px 15px rgba(0,0,0,0.1)'
              }
            }}>
              <Avatar 
                src={comment.userAvatar} 
                alt={comment.userName}
                sx={{ 
                  width: 48, 
                  height: 48,
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              />
              
              <Box sx={{ flexGrow: 1 }}>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 1,
                  flexWrap: 'wrap',
                  gap: 1
                }}>
                  <Typography variant="subtitle1" fontWeight="600">
                    {comment.userName}
                  </Typography>
                  <Chip
                    label={formatDate(comment.date)}
                    size="small"
                    sx={{ 
                      backgroundColor: 'rgba(0,0,0,0.05)',
                      color: 'text.secondary',
                      fontSize: '0.75rem'
                    }}
                  />
                </Box>
                
                {editingCommentId === comment.id ? (
                  <Box sx={{ mb: 2 }}>
                    <TextField
                      fullWidth
                      multiline
                      minRows={3}
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                      variant="outlined"
                      size="small"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '12px',
                        }
                      }}
                    />
                    <Box sx={{ display: 'flex', gap: 1, mt: 1.5 }}>
                      <motion.div
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        <Button
                          size="small"
                          variant="contained"
                          color="primary"
                          startIcon={<CheckIcon />}
                          onClick={handleSaveEdit}
                          sx={{
                            borderRadius: '8px',
                            textTransform: 'none',
                            fontWeight: 500,
                            px: 2
                          }}
                        >
                          Save
                        </Button>
                      </motion.div>
                      <motion.div
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        <Button
                          size="small"
                          variant="outlined"
                          color="inherit"
                          startIcon={<CloseIcon />}
                          onClick={handleCancelEdit}
                          sx={{
                            borderRadius: '8px',
                            textTransform: 'none',
                            fontWeight: 500,
                            px: 2
                          }}
                        >
                          Cancel
                        </Button>
                      </motion.div>
                    </Box>
                  </Box>
                ) : (
                  <Typography variant="body1" sx={{ 
                    mb: 1,
                    lineHeight: 1.6,
                    color: 'text.primary'
                  }}>
                    {comment.text}
                  </Typography>
                )}
                
                {currentUserId === comment.userId && (
                  <Box sx={{ display: 'flex', gap: 1, mt: 1.5 }}>
                    <motion.div
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <IconButton
                        size="small"
                        onClick={() => handleEdit(comment)}
                        disabled={!!editingCommentId}
                        sx={{
                          backgroundColor: 'primary.light',
                          color: 'primary.main',
                          '&:hover': {
                            backgroundColor: 'primary.main',
                            color: 'white'
                          },
                          borderRadius: '8px',
                          p: 1
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </motion.div>
                    <motion.div
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(comment.id)}
                        disabled={!!editingCommentId}
                        sx={{
                          backgroundColor: 'error.light',
                          color: 'error.main',
                          '&:hover': {
                            backgroundColor: 'error.main',
                            color: 'white'
                          },
                          borderRadius: '8px',
                          p: 1
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </motion.div>
                  </Box>
                )}
              </Box>
            </Box>
            <Divider sx={{ my: 2, opacity: 0.5 }} />
          </motion.div>
        ))}
      </AnimatePresence>
    </Box>
  );
};

export default CommentsSection;