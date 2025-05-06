'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  Avatar,
  Divider,
  Box,
  CircularProgress,
  Card,
  CardContent,
  Typography
} from '@mui/material';
import { Close, PostAdd, Article } from '@mui/icons-material';
import { useAuth } from '@/app/context/UserContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { HOST } from '@/utils/constants';
import { useRouter } from 'next/navigation';

const CreateArticleButtonWithModal = () => {
    const router = useRouter()
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    title: '',
    body: ''
  });
  const [article, setArticle] = useState({
    title: '',
    body: ''
  });
  const { user } = useAuth();

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      title: '',
      body: ''
    };

    if (article.title.trim().length < 2) {
      newErrors.title = 'Title must be at least 2 characters';
      isValid = false;
    } else if (article.title.trim().length > 20) {
      newErrors.title = 'Title must be less than 20 characters';
      isValid = false;
    }

    if (article.body.trim().length < 10) {
      newErrors.body = 'Content must be at least 10 characters';
      isValid = false;
    } else if (article.body.trim().length > 200) {
      newErrors.body = 'Content must be less than 200 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setArticle(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        const response = await axios.post(`${HOST}api/articles`, {
          title: article.title,
          body: article.body,
          creatorId: user?.id
        });
        
        toast.success("Article created successfully!");
        setArticle({ title: '', body: '' });
        setOpen(false);
        router.refresh();
      } catch (error: any) {
        console.error(error);
        toast.error(error.response?.data?.message || "Failed to create article");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <>
      {/* Enhanced trigger component */}
      <motion.div whileTap={{ scale: 0.98 }}>
        <Card
          sx={{
            mb: 3,
            cursor: 'pointer',
            height: 120,
            display: 'flex',
            alignItems: 'center',
            borderRadius: 3,
            boxShadow: 2,
            background: 'linear-gradient(145deg, #f5f5f5, #e0e0e0)',
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:active': {
              transform: 'scale(0.99)'
            }
          }}
          onClick={() => setOpen(true)}
        >
          <CardContent sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            width: '100%',
            padding: 3
          }}>
            <Avatar 
              alt={user?.username} 
              src="/path-to-avatar.jpg" 
              sx={{ 
                width: 48, 
                height: 48,
                mr: 2,
                border: '2px solid',
                borderColor: 'primary.main'
              }} 
            />
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" color="text.primary" sx={{ fontWeight: 500 }}>
                Share your thoughts
              </Typography>
              <Typography variant="body1" color="text.secondary">
                What's on your mind, {user?.username}?
              </Typography>
            </Box>
            <Article 
              color="primary" 
              sx={{ 
                fontSize: 40,
                opacity: 0.8,
                p: 1,
                bgcolor: 'primary.light',
                borderRadius: '50%'
              }} 
            />
          </CardContent>
        </Card>
      </motion.div>
      
      {/* The dialog modal */}
      <AnimatePresence>
        {open && (
          <Dialog
            open={open}
            onClose={() => !isSubmitting && setOpen(false)}
            fullWidth
            maxWidth="sm"
            PaperProps={{
              component: motion.div,
              initial: { opacity: 0, scale: 0.9 },
              animate: { opacity: 1, scale: 1 },
              exit: { opacity: 0, scale: 0.9 },
              transition: { type: 'spring', damping: 20, stiffness: 300 }
            }}
          >
            <DialogTitle sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              backgroundColor: 'primary.main',
              color: 'white',
              py: 2,
              px: 3
            }}>
              <Typography variant="h6">Create New Article</Typography>
              <IconButton 
                onClick={() => !isSubmitting && setOpen(false)}
                disabled={isSubmitting}
                color="inherit"
              >
                <Close />
              </IconButton>
            </DialogTitle>
            
            <Divider />
            
            <DialogContent sx={{ pt: 3, px: 3, pb: 3 }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mb: 3,
                p: 2,
                bgcolor: 'action.hover',
                borderRadius: 1
              }}>
                <Avatar 
                  src={user?.avatar} 
                  sx={{ 
                    width: 48, 
                    height: 48, 
                    mr: 2,
                    border: '2px solid',
                    borderColor: 'primary.main'
                  }} 
                />
                <Typography variant="subtitle1" fontWeight="medium">
                  {user?.username}
                </Typography>
              </Box>
              
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Title"
                  name="title"
                  value={article.title}
                  onChange={handleInputChange}
                  error={!!errors.title}
                  helperText={errors.title}
                  sx={{ mb: 2 }}
                  inputProps={{ maxLength: 20 }}
                  variant="outlined"
                  size="medium"
                />
                
                <TextField
                  fullWidth
                  multiline
                  rows={6}
                  label="What's on your mind?"
                  name="body"
                  value={article.body}
                  onChange={handleInputChange}
                  error={!!errors.body}
                  helperText={errors.body}
                  sx={{ mb: 3 }}
                  inputProps={{ maxLength: 200 }}
                  variant="outlined"
                  size="medium"
                />
                
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                    size="large"
                    sx={{
                      px: 4,
                      py: 1,
                      borderRadius: 2,
                      fontSize: '1rem'
                    }}
                    startIcon={
                      isSubmitting ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : (
                        <PostAdd />
                      )
                    }
                  >
                    {isSubmitting ? 'Posting...' : 'Post Article'}
                  </Button>
                </Box>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
};

export default CreateArticleButtonWithModal;