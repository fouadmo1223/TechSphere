'use client'
import { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Paper, 
  Container 
} from '@mui/material';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { HOST } from '@/utils/constants';
import { useAuth } from '@/app/context/UserContext';
import SendIcon from '@mui/icons-material/Send';
import { Loading } from 'notiflix';
import { toast } from 'react-toastify';

const AddArticle = () => {
    const {user} = useAuth()
    const [isSubmitting,setIsSubmitting]=useState(false)
    const router = useRouter()
    const [article, setArticle] = useState({
        title: '',
        body: ''
    });
    const [errors, setErrors] = useState({
        title: '',
        body: ''
    });

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setArticle(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user types
        if (errors[name as keyof typeof errors] && value.trim()) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            title: '',
            body: ''
        };

        if (!article.title.trim()) {
            newErrors.title = 'Title is required';
            isValid = false;
        } else if (article.title.length < 2) {
            newErrors.title = 'Title must be at least 2 characters';
            isValid = false;
        }

        if (!article.body.trim()) {
            newErrors.body = 'Body is required';
            isValid = false;
        } else if (article.body.length < 10) {
            newErrors.body = 'Body must be at least 10 characters';
            isValid = false;
        }

        setErrors(newErrors);
        
        // Show toast for validation errors if any
        if (!isValid) {
            const errorMessages = Object.values(newErrors).filter(msg => msg !== '');
            if (errorMessages.length > 0) {
                toast.error(errorMessages.join('\n'));
            }
        }
        
        return isValid;
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        
        if (validateForm()) {
            setIsSubmitting(true);
            Loading.dots({
                svgSize: "50px",
                clickToClose: false
            });
            
            try {
                const addedArticle = await axios.post(`${HOST}api/articles`, {
                    body: article.body,
                    title: article.title,
                    creatorId: user?.id
                });
                
                console.log(addedArticle);
                
                // Show success toast
                toast.success("Article Added Successfully");
                
                // Reset form
                setArticle({
                    title: '',
                    body: ''
                });
                
                // Redirect after a short delay to allow toast to be seen
                setTimeout(() => {
                    router.replace('/admin/articles');
                }, 500);
                
            } catch (e: any) {
                console.log(e.response?.data);
                
                // Handle server-side validation errors
                if (e.response?.data?.errors) {
                    const serverErrors = e.response.data.errors;
                    const newErrors = {
                        title: serverErrors.title?.[0] || '',
                        body: serverErrors.body?.[0] || ''
                    };
                    setErrors(newErrors);
                    
                    // Show server errors in toast
                    const errorMessages = Object.values(newErrors).filter(msg => msg !== '');
                    if (errorMessages.length > 0) {
                        toast.error(errorMessages.join('\n'));
                    }
                } else {
                    toast.error(e.response?.data?.message || "Failed to add article");
                }
            } finally {
                setIsSubmitting(false);
                Loading.remove();
            }
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Paper elevation={3} sx={{ p: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
                        Add New Article
                    </Typography>
                    
                    <Box 
                        component="form" 
                        onSubmit={handleSubmit}
                        sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
                    >
                        <motion.div whileHover={{ scale: 1.01 }}>
                            <TextField
                                fullWidth
                                label="Title"
                                name="title"
                                value={article.title}
                                onChange={handleChange}
                                error={!!errors.title}
                                helperText={errors.title}
                                variant="outlined"
                                sx={{ mb: 2 }}
                            />
                        </motion.div>
                        
                        <motion.div whileHover={{ scale: 1.01 }}>
                            <TextField
                                fullWidth
                                label="Body"
                                name="body"
                                value={article.body}
                                onChange={handleChange}
                                error={!!errors.body}
                                helperText={errors.body}
                                variant="outlined"
                                multiline
                                rows={6}
                                sx={{ mb: 3 }}
                            />
                        </motion.div>
                        
                        <motion.div
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Button 
                                type="submit" 
                                variant="contained" 
                                size="large"
                                fullWidth
                                disabled={isSubmitting}
                                endIcon={<SendIcon />}
                                sx={{ 
                                    py: 1.5,
                                    bgcolor: 'primary.main',
                                    '&:hover': { bgcolor: 'primary.dark' }
                                }}
                            >
                                {isSubmitting ? 'Adding...' : 'Submit Article'}
                            </Button>
                        </motion.div>
                    </Box>
                </Paper>
            </motion.div>
        </Container>
    );
};

export default AddArticle;