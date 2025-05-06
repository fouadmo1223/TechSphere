'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Box, TextField, Button, Typography, Container, Paper, IconButton, InputAdornment } from '@mui/material';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { CheckCircle, Send, ErrorOutline, Close, Person, Email, Message } from '@mui/icons-material';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const ContactUs = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const controls = useAnimation();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    // Initial animation sequence
    const sequence = async () => {
      await controls.start({ opacity: 0, y: 20 });
      await controls.start({ opacity: 1, y: 0, transition: { duration: 0.6 } });
    };
    sequence();
  }, [controls]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Clear submit error when user starts typing
    if (submitError) {
      setSubmitError(null);
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      if (!formRef.current) return;
      
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string, 
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string,
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string
      );

      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      
      // Reset form after success
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      setIsSubmitting(false);
      setSubmitError('Failed to send message. Please try again later.');
      console.error('Failed to send message:', error);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        when: "beforeChildren",
        staggerChildren: 0.15
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: {
        duration: 0.4,
        ease: "easeIn"
      }
    }
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const successVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.4,
        ease: "easeIn"
      }
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom 
          align="center"
          sx={{ 
            fontWeight: 700, 
            mb: 4,
            background: 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.5px'
          }}
        >
          Get In Touch
        </Typography>
      </motion.div>
      
      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div
            key="form"
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            layout
          >
            <Paper 
              elevation={6} 
              component="form" 
              ref={formRef} 
              onSubmit={handleSubmit}
              sx={{ 
                p: 4, 
                borderRadius: 3,
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)'
              }}
            >
              {submitError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  style={{ marginBottom: '1rem' }}
                >
                  <Paper 
                    elevation={0} 
                    sx={{ 
                      p: 2, 
                      display: 'flex', 
                      alignItems: 'center',
                      backgroundColor: 'error.light',
                      color: 'error.contrastText',
                      borderRadius: 2
                    }}
                  >
                    <ErrorOutline sx={{ mr: 1 }} />
                    <Typography variant="body2" sx={{ flexGrow: 1 }}>
                      {submitError}
                    </Typography>
                    <IconButton size="small" onClick={() => setSubmitError(null)}>
                      <Close fontSize="small" />
                    </IconButton>
                  </Paper>
                </motion.div>
              )}
              
              <motion.div variants={fieldVariants}>
                <TextField
                  fullWidth
                  label="Your Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={!!errors.name}
                  helperText={errors.name}
                  margin="normal"
                  variant="outlined"
                  sx={{ mb: 2 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person color={errors.name ? 'error' : 'action'} />
                      </InputAdornment>
                    ),
                  }}
                />
              </motion.div>
              
              <motion.div variants={fieldVariants}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  margin="normal"
                  variant="outlined"
                  sx={{ mb: 2 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email color={errors.email ? 'error' : 'action'} />
                      </InputAdornment>
                    ),
                  }}
                />
              </motion.div>
              
              <motion.div variants={fieldVariants}>
                <TextField
                  fullWidth
                  label="Your Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  error={!!errors.message}
                  helperText={errors.message}
                  margin="normal"
                  variant="outlined"
                  multiline
                  rows={5}
                  sx={{ mb: 3 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1 }}>
                        <Message color={errors.message ? 'error' : 'action'} />
                      </InputAdornment>
                    ),
                  }}
                />
              </motion.div>
              
              <motion.div 
                variants={fieldVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={isSubmitting}
                  startIcon={isSubmitting ? null : <Send />}
                  sx={{
                    py: 1.8,
                    borderRadius: 2,
                    fontSize: '1rem',
                    fontWeight: 600,
                    letterSpacing: '0.5px',
                    background: 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    '&:hover': {
                      boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15)',
                    },
                    '&.Mui-disabled': {
                      background: 'rgba(0, 0, 0, 0.12)',
                    }
                  }}
                >
                  {isSubmitting ? (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        style={{ display: 'inline-block' }}
                      >
                        <Send />
                      </motion.span>
                      <span style={{ marginLeft: '8px' }}>Sending...</span>
                    </Box>
                  ) : (
                    'Send Message'
                  )}
                </Button>
              </motion.div>
            </Paper>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            variants={successVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            layout
          >
            <Paper 
              elevation={6} 
              sx={{ 
                p: 4, 
                borderRadius: 3,
                textAlign: 'center',
                background: 'linear-gradient(135deg, #4caf50 0%, #8bc34a 100%)',
                color: 'white',
                boxShadow: '0 8px 32px 0 rgba(31, 135, 65, 0.2)'
              }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.2
                }}
              >
                <CheckCircle sx={{ fontSize: 80, mb: 2 }} />
              </motion.div>
              
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                Message Sent Successfully!
              </Typography>
              
              <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
                Thank you for reaching out. We've received your message and will get back to you soon.
              </Typography>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={() => setIsSubmitted(false)}
                  startIcon={<Send />}
                  sx={{
                    mt: 1,
                    color: 'white',
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      borderColor: 'white'
                    }
                  }}
                >
                  Send Another Message
                </Button>
              </motion.div>
            </Paper>
          </motion.div>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default ContactUs;