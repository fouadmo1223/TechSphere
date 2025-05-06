"use client"
import { useEffect, useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  IconButton, 
  InputAdornment, 
  Typography, 
  Divider,
  Grid,
  Link,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff,
  Email,
  Person,
  GitHub,
  Google
} from '@mui/icons-material';
import { motion } from "framer-motion";
import axios from 'axios';
import { HOST } from '@/utils/constants';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { useAuth } from '@/app/context/UserContext';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const {user, login } = useAuth();

  useEffect(() => {
    // Only proceed if user exists and is truthy
    if (user) {
      router.replace('/');
    }
  }, [user, router]); // Add both user and router to dependencies

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear errors when user types
    setErrors(prev => ({
      ...prev,
      [name]: ''
    }));
  };

  const validateForm = () => {
    const newErrors = {
      username: formData.username.length < 3 ? 'Username must be at least 3 characters' : '',
      email: !/\S+@\S+\.\S+/.test(formData.email) ? 'Please enter a valid email' : '',
      password: formData.password.length < 6 ? 'Password must be at least 6 characters' : '',
      confirmPassword: formData.password !== formData.confirmPassword ? 'Passwords do not match' : ''
    };
    
    setErrors(newErrors);
    
    return !newErrors.username && 
           !newErrors.email && 
           !newErrors.password && 
           !newErrors.confirmPassword;
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }
    
    if (!termsAccepted) {
      toast.error('You must accept the terms and conditions');
      return;
    }

    try {
      setIsSubmitting(true);
      const { data } = await axios.post(`${HOST}api/user/register`, {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });

      await Swal.fire({
        position: "center",
        icon: "success",
        title: "Registration Successful!",
        text: "You have successfully created an account",
        showConfirmButton: false,
        timer: 1500
      });

      toast.success('Registration successful! Redirecting to login...');
      router.push('/login');
    } catch (error: any) {
      let errorMessage = 'Registration failed';
      if (error.response) {
        if (error.response.data.errors) {
          // Handle validation errors from server
          const serverErrors = error.response.data.errors;
          let passwordErrorMsg = '';
          if (serverErrors.password) {
            passwordErrorMsg = serverErrors.password.join(' | ');
          }
          setErrors({
            username: serverErrors.username ? serverErrors.username[0] : '',
            email: serverErrors.email ? serverErrors.email[0] : '',
            password: passwordErrorMsg,
            confirmPassword: ''
          });
          errorMessage = 'Please fix the form errors';
        } else {
          errorMessage = error.response.data.message || errorMessage;
        }
      }
      
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
        backgroundColor: 'background.paper',
        borderRadius: 2,
        boxShadow: 3,
        maxWidth: 400,
        mx: 'auto',
        my: 2
      }}
    >
      <Typography variant="h5" component="h1" gutterBottom>
        Create Account
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
            onClick={() => toast.info('GitHub login coming soon')}
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
            onClick={() => toast.info('Google login coming soon')}
          >
            Continue with Google
          </Button>
        </motion.div>
      </Box>

      <Divider sx={{ width: '100%', mb: 3 }}>OR</Divider>
      
      <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          error={!!errors.username}
          helperText={errors.username}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person color="action" />
              </InputAdornment>
            ),
          }}
          placeholder="Choose a username"
        />
        
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
          helperText={errors.email}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email color="action" />
              </InputAdornment>
            ),
          }}
          placeholder="Enter your email"
        />
        
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
          helperText={errors.password}
          InputProps={{
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
          placeholder="Create a password (min 6 characters)"
        />
        
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          label="Confirm Password"
          name="confirmPassword"
          type='password'
          value={formData.confirmPassword}
          onChange={handleChange}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
         
          placeholder="Confirm your password"
        />
        
        <FormControlLabel
          control={
            <Checkbox 
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              color="primary"
            />
          }
          label={
            <Typography variant="body2">
              I agree to the <Link href="#" onClick={(e) => {
                e.preventDefault();
                Swal.fire({
                  title: 'Terms and Conditions',
                  html: 'Please read our terms and conditions carefully...',
                  confirmButtonText: 'I Understand'
                });
              }}>Terms and Conditions</Link>
            </Typography>
          }
          sx={{ mt: 1 }}
        />
        
        <Button
          fullWidth
          variant="contained"
          type="submit"
          disabled={!termsAccepted || isSubmitting}
          sx={{ mt: 2, mb: 2, py: 1.5 }}
        >
          {isSubmitting ? 'Registering...' : 'Register'}
        </Button>
        
        <Grid container justifyContent="center">
          <Grid item>
            <Typography variant="body2">
              Already have an account? <Link href="/login" underline="hover">Login</Link>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}