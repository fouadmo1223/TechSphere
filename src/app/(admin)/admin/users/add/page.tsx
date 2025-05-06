'use client';
import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  Typography,
  CircularProgress,
  InputAdornment
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  HowToReg as SubmitIcon,
  AdminPanelSettings as AdminIcon,
  Person as UserIcon
} from '@mui/icons-material';
import axios from 'axios';
import { HOST } from '@/utils/constants';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { Loading } from 'notiflix';

const AddUserPage = () => {
    const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    isAdmin: false
  });
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const handleChange = (e: { target: { name: any; value: any; checked: any; }; }) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'isAdmin' ? checked : value
    });
  };

  const validateEmail = (email: string) => {
    // Standard email regex validation
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password: string) => {
    // Strong password requirements
    const re = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(password);
  };

  const handleBlur = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    if (name === 'email' && value && !validateEmail(value)) {
      setErrors({
        ...errors,
        email: 'Please enter a valid email address'
      });
    } else if (name === 'password' && value && !validatePassword(value)) {
      setErrors({
        ...errors,
        password: 'Password must contain: 8+ chars, 1 uppercase, 1 number, 1 special char'
      });
    } else {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleSubmit =async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    
    
    // Validate form
    const emailValid = validateEmail(formData.email);
    const passwordValid = validatePassword(formData.password);
    
    if (!emailValid  || !passwordValid) {
      setErrors({
        email: !emailValid ? 'Please enter a valid email address' : '',
        password: !passwordValid ? 'Password must meet requirements' : ''
      });
      setIsSubmitting(false);
      return;
    }
    
    try{
        setIsSubmitting(true)
        Loading.pulse({
            svgSize:"40px",
            title:"Creating User",
            titleColor:"green",
            titleSize:"14px",
            titleFontFamily:"Roboto",
            clickToClose:false,
        })
        const data = await axios.post(`${HOST}api/user`,formData)
        toast.success('User created successfully')
        setFormData({
          username: '',
          email: '',
          password: '',
          isAdmin: false
        });
        setErrors({
          email: '',
          password: ''
        });
       setTimeout(()=>{
        router.push("/admin/users");
       },500)
        
    }catch (error) {
        console.error('Error creating user:', error);
        
        if (error.response) {
          // Handle 400 Validation Errors
          if (error.response.status === 400) {
            const apiErrors = error.response.data?.errors;
            
            if (apiErrors) {
              // Set password errors
              if (apiErrors.password) {
                setErrors(prev => ({
                  ...prev,
                  password: apiErrors.password.join(' ')
                }));
              }
              
              // Set email errors
              if (apiErrors.email) {
                setErrors(prev => ({
                  ...prev,
                  email: apiErrors.email.join(' ')
                }));
                toast.error(apiErrors.email.join(' '));
              }
            }
            toast.error("Failed to create user");
          }
          
          // Handle 409 Conflict (Email exists)
          else if (error.response.status === 409) {
            setErrors(prev => ({
              ...prev,
              email: "Email already exists"
            }));
            toast.error('User with this email already exists');
          }
          
          // Handle other errors
          else {
            toast.error(error.response.data?.message || 'Failed to create user');
          }
        } else {
          toast.error('Network error - please try again later');
        }
      }finally{
        setIsSubmitting(false)
        Loading.remove()
    }
  
  };

  return (
    <Box
      component={motion.div}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      sx={{
        maxWidth: 800,
        mx: 'auto',
        mt: 1,
        p: 2,
        boxShadow: 3,
        borderRadius: 2,
        bgcolor: 'background.paper'
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, textAlign: 'center' }}>
        Add New User
      </Typography>
      
      <form onSubmit={handleSubmit}>
        <motion.div variants={itemVariants}>
          <TextField
            fullWidth
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon color="action" />
                </InputAdornment>
              ),
            }}
            component={motion.div}
            whileHover={{ scale: 1.01 }}
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            margin="normal"
            variant="outlined"
            required
            error={!!errors.email}
            helperText={errors.email}
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color="action" />
                </InputAdornment>
              ),
            }}
            component={motion.div}
            whileHover={{ scale: 1.01 }}
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            margin="normal"
            variant="outlined"
            required
            error={!!errors.password}
            helperText={errors.password}
            sx={{ mb: 3 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="action" />
                </InputAdornment>
              ),
            }}
            component={motion.div}
            whileHover={{ scale: 1.01 }}
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <FormControlLabel
            control={
              <Switch
                checked={formData.isAdmin}
                onChange={handleChange}
                name="isAdmin"
                color="primary"
                size="medium"
                sx={{
                  width: 60,
                  height: 34,
                  padding: 1,
                  '& .MuiSwitch-switchBase': {
                    padding: 1,
                    '&.Mui-checked': {
                      transform: 'translateX(26px)',
                    },
                  },
                  '& .MuiSwitch-thumb': {
                    width: 24,
                    height: 24,
                  },
                }}
                icon={<UserIcon sx={{ fontSize: 18, color: 'text.secondary' }} />}
                checkedIcon={<AdminIcon sx={{ fontSize: 18, color: 'primary.main' }} />}
              />
            }
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
                {formData.isAdmin ? (
                  <>
                    <AdminIcon color="primary" sx={{ mr: 1 }} />
                    <Typography color="primary">Admin</Typography>
                  </>
                ) : (
                  <>
                    <UserIcon color="action" sx={{ mr: 1 }} />
                    <Typography color="text.secondary">User</Typography>
                  </>
                )}
              </Box>
            }
            sx={{ mb: 3 }}
            component={motion.div}
            whileHover={{ scale: 1.01 }}
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            disabled={isSubmitting}
            sx={{ height: 48 }}
            startIcon={
              isSubmitting ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <SubmitIcon />
              )
            }
            component={motion.button}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitting ? 'Adding User...' : 'Add User'}
          </Button>
        </motion.div>
      </form>
    </Box>
  );
};

export default AddUserPage;