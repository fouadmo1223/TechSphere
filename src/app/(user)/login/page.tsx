'use client';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import {  toast } from 'react-toastify';
import { 
  Box, 
  TextField, 
  Button, 
  IconButton, 
  InputAdornment, 
  Typography, 
  Divider,
  Grid,
  Link
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff,
  Email,
  GitHub,
  Google,
  Password
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import axios from 'axios';
import { HOST } from '@/utils/constants';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/UserContext';

export default function Login() {
  const router = useRouter();
  const {user, login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    email: false as boolean | string,
    password: false as boolean | string
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading,setLoading]  = useState(false)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Reset error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: false
      }));
    }

    // Basic validation
    if (name === 'email') {
      setErrors(prev => ({
        ...prev,
        email: !/\S+@\S+\.\S+/.test(value) ? 'Please enter a valid email' : false
      }));
    }
    if (name === 'password') {
      setErrors(prev => ({
        ...prev,
        password: value.length < 6 ? 'Password must be at least 6 characters' : false
      }));
    }
  };

useEffect(() => {
  // Only proceed if user exists and is truthy
  if (user) {
    router.replace('/');
  }
}, [user, router]); // Add both user and router to dependencies

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate before submission
    let hasErrors = false;
    const newErrors = {...errors};

    if (!formData.email) {
      newErrors.email = 'Email is required';
      hasErrors = true;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      hasErrors = true;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      hasErrors = true;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
      setIsSubmitting(false);
      toast.error('Please fix form errors');
      return;
    }

    try {
      setIsSubmitting(true)
      const  {data}  = await axios.post(`${HOST}api/user/login`, formData).finally(()=>{
        setIsSubmitting(false)
      });
      // Handle successful login (redirect, store token, etc.)
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your Have Logged in Successfully",
        showConfirmButton: false,
        timer: 1000
      }).then(()=>{
        login({
          id: data.user.id,
          username: data.user.username,
          email: data.user.email,
          image:data.user.image,
          isAdmin:data.user.isAdmin
        });
        toast.success('Login successful!');
        router.replace('/')
        console.log(data.data.user)
      });
      // Redirect or perform other actions here...
    } catch (e: any) {
      const errorMessage = e.response?.data?.message || 'Login failed';
      toast.error(errorMessage);
      
      // Set server error message to password field
      setErrors(prev => ({
        ...prev,
        password: errorMessage
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
    
      <Box 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: 4,
          backgroundColor: 'background.paper',
          borderRadius: 4,
          boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.1)',
          maxWidth: 450,
          mx: 'auto',
          my: 4,
          border: '1px solid rgba(255, 255, 255, 0.1)',
          background: 'linear-gradient(to bottom right, #ffffff, #f8f9fa)'
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom sx={{ 
          fontWeight: 700,
          mb: 3,
          background: 'linear-gradient(to right, #6366f1, #8b5cf6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Welcome Back
        </Typography>
        
        {/* Social Login Buttons */}
        <Box sx={{ width: '100%', mb: 3 }}>
          <motion.div 
            whileHover={{ scale: 1.02 }} 
            whileTap={{ scale: 0.98 }}
            style={{ width: '100%', marginBottom: '16px' }}
          >
            <Button
              fullWidth
              variant="outlined"
              startIcon={<GitHub />}
              sx={{ 
                py: 1.5,
                color: '#333',
                borderColor: '#333',
                '&:hover': { 
                  backgroundColor: '#333',
                  color: '#fff',
                  borderColor: '#333'
                },
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                transition: 'all 0.3s ease'
              }}
              onClick={() => console.log('GitHub login clicked')}
            >
              Continue with GitHub
            </Button>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.02 }} 
            whileTap={{ scale: 0.98 }}
            style={{ width: '100%' }}
          >
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Google />}
              sx={{ 
                py: 1.5,
                color: '#4285F4',
                borderColor: '#4285F4',
                '&:hover': { 
                  backgroundColor: '#4285F4',
                  color: '#fff',
                  borderColor: '#4285F4'
                },
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                transition: 'all 0.3s ease'
              }}
              onClick={() => console.log('Google login clicked')}
            >
              Continue with Google
            </Button>
          </motion.div>
        </Box>
        
        <Divider sx={{ my: 2, width: '100%', color: 'text.secondary' }}>
          <Typography variant="body2" sx={{ px: 2 }}>or continue with email</Typography>
        </Divider>
        
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', mt: 2 }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email || ''}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color="action" />
                  </InputAdornment>
                ),
              }}
              placeholder="Enter your email"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '& fieldset': {
                    borderColor: '#e2e8f0',
                  },
                  '&:hover fieldset': {
                    borderColor: '#6366f1',
                  },
                }
              }}
            />
          </motion.div>
          
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password || ''}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton edge="start" disabled>
                      <Password color="action" />
                    </IconButton>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={togglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              placeholder="Enter your password"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '& fieldset': {
                    borderColor: '#e2e8f0',
                  },
                  '&:hover fieldset': {
                    borderColor: '#6366f1',
                  },
                }
              }}
            />
          </motion.div>
          
          <Grid container justifyContent="flex-end" sx={{ mt: 1 }}>
            <Grid item>
              <Link href="#" variant="body2" sx={{ color: '#6366f1', fontWeight: 500 }}>
                Forgot password?
              </Link>
            </Grid>
          </Grid>
          
          <motion.div 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.90 }}
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.3 }}
          >
            <Button
              fullWidth
              variant="contained"
              type="submit"
              disabled={isSubmitting}
              sx={{ 
                mt: 3, 
                mb: 2, 
                py: 1.5,
                borderRadius: 2,
                background: 'linear-gradient(to right, #6366f1, #8b5cf6)',
                fontWeight: 600,
                fontSize: '1rem',
                '&:disabled': {
                  opacity: 0.7
                }
              }}
            >
              {isSubmitting ? 'Signing In...' : 'Sign In'}
            </Button>
          </motion.div>
        </Box>
        
        <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
          Don't have an account?{' '}
          <Link href="/register" sx={{ color: '#6366f1', fontWeight: 600 }}>
            Sign up
          </Link>
        </Typography>
      </Box>
    </motion.div>
  );
}