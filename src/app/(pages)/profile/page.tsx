'use client';
import { format } from 'date-fns';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Avatar, 
  Typography, 
  Tabs, 
  Tab, 
  Box, 
  IconButton, 
  Card, 
  CardContent,
  CardActions,
  Divider,
  Chip,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  Autocomplete
} from '@mui/material';
import { 
  Edit, 
  Delete, 
  Article, 
  Comment, 
  Save, 
  Cancel, 
  CameraAlt,
  LinkedIn,
  GitHub,
  Twitter,
  Code,
  Settings,
  Public,
  Work,
  School
} from '@mui/icons-material';
import { HOST } from '@/utils/constants';
import { useAuth } from '@/app/context/UserContext';
import {
  Article as ArticleType,

  
} from "@/generated/prisma";
import { CommentWithArticle } from '@/utils/types';
import HeaderSkelton from '@/componnents/profile/HeaderSkelton';
import ArticleSkelton from '@/componnents/profile/ArticleSkelton';
import CreateArticleModal from '@/componnents/profile/CreateArticleModal ';

const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'articles' | 'comments'>('articles');
  const [editMode, setEditMode] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogTab, setDialogTab] = useState<'basic' | 'social' | 'skills' | 'preferences'>('basic');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [comments, setComments] = useState<CommentWithArticle[]>([]);
  const {user : userFROMContext} =useAuth()
  // User data with state
  const [user, setUser] = useState({
 
    username:"Fouad Mohamed",
    email: "fm0850020@gmail.com",
    avatar: "/default-avatar.jpg",
    bio: "Software developer and content creator passionate about web technologies.",
    jobTitle: "Junior Frontend Developer",
    education: "Bachelor of Computer Science",
    location: "Mansoura, EG",
  });

  const [tempUser, setTempUser] = useState({ ...user });
  
  // Social links
  const [socialLinks, setSocialLinks] = useState({
    linkedin: 'linkedin.com/in/FouadMohamed2000',
    github: 'github.com/fouadMohamed',
    twitter: 'twitter.com/Fouad',
    website: ''
  });

  useEffect(() => {
    if (!userFROMContext?.id) return; // Don't fetch if no user ID
    
    const fetchData = async () => {
      
      try {
        const response = await fetch(`${HOST}/api/user/profile/${userFROMContext.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }
        const data = await response.json();
       setUser((prev)=>({...prev,...data}))
       console.log("data", data);
       setArticles(data.articles);
       setComments(data.comments);
        // Update state with the data
      } catch (error) {
        console.error('Error fetching profile:', error);
      }finally {
        setLoading(false); // Set loading to false after fetching
      }
    };
  
    fetchData();
  }, [userFROMContext?.id]); // Only re-run if userFROMContext.id changes

  // Skills
  const [skills, setSkills] = useState<string[]>(['React', 'TypeScript', 'Next.js', 'Laravel']);
  const allSkills = ['React', 'TypeScript', 'Next.js', 'Laravel', 'PHP', 'SQL', 'Docker', 'MUI'];

  // Preferences
  const [preferences, setPreferences] = useState({
    theme: 'light',
    notifications: true,
    language: 'English'
  });


  const handleTabChange = (event: React.SyntheticEvent, newValue: 'articles' | 'comments') => {
    setActiveTab(newValue);
  };
  
  const handleEditProfile = () => {
    setTempUser({ ...user });
    setEditMode(true);
    setOpenDialog(true);
  };

  const handleDialogTabChange = (event: React.SyntheticEvent, newValue: 'basic' | 'social' | 'skills' | 'preferences') => {
    setDialogTab(newValue);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setOpenDialog(false);
  };

  const handleSaveProfile = () => {
    setUser({ ...tempUser });
    setEditMode(false);
    setOpenDialog(false);
    console.log('Profile updated:', { 
      user: tempUser, 
      socialLinks, 
      skills, 
      preferences 
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTempUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSocialLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSocialLinks(prev => ({ ...prev, [name]: value }));
  };

  const handlePreferenceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setPreferences(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setTempUser(prev => ({ ...prev, avatar: event.target!.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="max-w-4xl mx-auto p-4 md:p-6"
    >
      {/* Profile Header */}
      {loading ?<HeaderSkelton /> :(
         <motion.div 
         className="flex flex-col items-center mb-8"
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ delay: 0.2 }}
       >
         <Box sx={{ position: 'relative', mb: 2 }}>
           <Avatar
             src={user.avatar}
             sx={{ 
               width: 120, 
               height: 120,
               border: '4px solid #3f51b5'
             }}
           />
         </Box>
         
         <Typography variant="h4" component="h1" gutterBottom>
           {user.username}
         </Typography>
         <Typography variant="subtitle1" color="text.secondary">
           {user.jobTitle}
         </Typography>
         <Typography variant="body1" color="text.secondary" gutterBottom>
           {user.email}
         </Typography>
         <Typography variant="body2" className="max-w-md text-center mt-2">
           {user.bio}
         </Typography>
         
         <Button
           variant="contained"
           startIcon={<Edit />}
           sx={{ mt: 3 }}
           onClick={handleEditProfile}
         >
           Edit Profile
         </Button>
       </motion.div>
      )}
     
     <CreateArticleModal />
      <Divider sx={{ my: 4 }} />
      
      {/*  Edit Profile Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={handleCancelEdit}
        maxWidth="md"
        fullWidth
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <DialogTitle sx={{ 
            backgroundColor: 'primary.main',
            color: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Typography variant="h6">Edit Your Profile</Typography>
            <Tabs
              value={dialogTab}
              onChange={handleDialogTabChange}
              textColor="inherit"
              indicatorColor="secondary"
              sx={{ 
                minHeight: 'auto',
                '& .MuiTab-root': { 
                  minHeight: 'auto',
                  padding: '8px 16px',
                  color: 'rgba(255,255,255,0.7)',
                  '&.Mui-selected': {
                    color: 'white'
                  }
                }
              }}
            >
              <Tab value="basic" label="Basic" icon={<Settings fontSize="small" />} iconPosition="start" />
              <Tab value="social" label="Social" icon={<Public fontSize="small" />} iconPosition="start" />
              <Tab value="skills" label="Skills" icon={<Code fontSize="small" />} iconPosition="start" />
              <Tab value="preferences" label="Preferences" icon={<Settings fontSize="small" />} iconPosition="start" />
            </Tabs>
          </DialogTitle>
          
          <DialogContent dividers sx={{ pt: 3, minHeight: '400px' }}>
            <AnimatePresence mode="wait">
              {dialogTab === 'basic' && (
                <motion.div
                  key="basic"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                      <Avatar
                        src={tempUser.avatar}
                        sx={{ 
                          width: 120, 
                          height: 120,
                          cursor: 'pointer'
                        }}
                        onClick={triggerFileInput}
                      />
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleAvatarChange}
                        accept="image/*"
                        style={{ display: 'none' }}
                      />
                    </Box>
                    
                    <TextField
                      label="Full Name"
                      name="name"
                      value={tempUser.username}
                      onChange={handleInputChange}
                      fullWidth
                      variant="outlined"
                    />
                    
                    <TextField
                      label="Email"
                      name="email"
                      value={tempUser.email}
                      onChange={handleInputChange}
                      fullWidth
                    />
                    
                    <TextField
                      label="Job Title"
                      name="jobTitle"
                      value={tempUser.jobTitle}
                      onChange={handleInputChange}
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Work />
                          </InputAdornment>
                        ),
                      }}
                    />
                    
                    <TextField
                      label="Education"
                      name="education"
                      value={tempUser.education}
                      onChange={handleInputChange}
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <School />
                          </InputAdornment>
                        ),
                      }}
                    />
                    
                    <TextField
                      label="Location"
                      name="location"
                      value={tempUser.location}
                      onChange={handleInputChange}
                      fullWidth
                    />
                    
                    <TextField
                      label="Bio"
                      name="bio"
                      value={tempUser.bio}
                      onChange={handleInputChange}
                      multiline
                      rows={4}
                      fullWidth
                    />
                  </Box>
                </motion.div>
              )}
              
              {dialogTab === 'social' && (
                <motion.div
                  key="social"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <TextField
                      label="LinkedIn"
                      name="linkedin"
                      value={socialLinks.linkedin}
                      onChange={handleSocialLinkChange}
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LinkedIn color="primary" />
                          </InputAdornment>
                        ),
                      }}
                    />
                    
                    <TextField
                      label="GitHub"
                      name="github"
                      value={socialLinks.github}
                      onChange={handleSocialLinkChange}
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <GitHub />
                          </InputAdornment>
                        ),
                      }}
                    />
                    
                    <TextField
                      label="Twitter"
                      name="twitter"
                      value={socialLinks.twitter}
                      onChange={handleSocialLinkChange}
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Twitter color="info" />
                          </InputAdornment>
                        ),
                      }}
                    />
                    
                    <TextField
                      label="Personal Website"
                      name="website"
                      value={socialLinks.website}
                      onChange={handleSocialLinkChange}
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Public />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                </motion.div>
              )}
              
              {dialogTab === 'skills' && (
                <motion.div
                  key="skills"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Autocomplete
                      multiple
                      options={allSkills}
                      value={skills}
                      onChange={(event, newValue) => {
                        setSkills(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Skills"
                          placeholder="Add your skills"
                        />
                      )}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip
                            label={option}
                            {...getTagProps({ index })}
                            key={option}
                          />
                        ))
                      }
                    />
                    
                    <Box>
                      <Typography variant="subtitle2" gutterBottom>
                        Your Skills:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {skills.map((skill) => (
                          <Chip 
                            key={skill} 
                            label={skill} 
                            onDelete={() => {
                              setSkills(skills.filter(s => s !== skill));
                            }}
                          />
                        ))}
                      </Box>
                    </Box>
                  </Box>
                </motion.div>
              )}
              
              {dialogTab === 'preferences' && (
                <motion.div
                  key="preferences"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <TextField
                      select
                      label="Theme"
                      name="theme"
                      value={preferences.theme}
                      onChange={handlePreferenceChange}
                      fullWidth
                      SelectProps={{
                        native: true,
                      }}
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="system">System Default</option>
                    </TextField>
                    
                    <TextField
                      select
                      label="Language"
                      name="language"
                      value={preferences.language}
                      onChange={handlePreferenceChange}
                      fullWidth
                      SelectProps={{
                        native: true,
                      }}
                    >
                      <option value="English">English</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                      <option value="German">German</option>
                    </TextField>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="body1" sx={{ mr: 2 }}>
                        Email Notifications:
                      </Typography>
                      <input
                        type="checkbox"
                        name="notifications"
                        checked={preferences.notifications}
                        onChange={handlePreferenceChange}
                        style={{ transform: 'scale(1.5)' }}
                      />
                    </Box>
                  </Box>
                </motion.div>
              )}
            </AnimatePresence>
          </DialogContent>
          
          <DialogActions sx={{ justifyContent: 'space-between', p: 2 }}>
            <Button 
              onClick={handleCancelEdit} 
              startIcon={<Cancel />}
              color="error"
              variant="outlined"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSaveProfile} 
              color="primary" 
              variant="contained"
              startIcon={<Save />}
              sx={{ minWidth: '120px' }}
            >
              Save Changes
            </Button>
          </DialogActions>
        </motion.div>
      </Dialog>
      
      {/* Content Sections */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Box sx={{ width: '100%' }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange}
            variant="fullWidth"
            indicatorColor="secondary"
            textColor="inherit"
          >
            <Tab 
              value="articles" 
              label="Articles" 
              icon={<Article />} 
              iconPosition="start" 
            />
            <Tab 
              value="comments" 
              label="Comments" 
              icon={<Comment />} 
              iconPosition="start" 
            />
          </Tabs>
        </Box>
        
        {loading ? <ArticleSkelton /> :(
           <Box sx={{ py: 3 }}>
           <AnimatePresence mode="wait">
             {activeTab === 'articles' && (
               <motion.div
                 key="articles"
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -10 }}
                 transition={{ duration: 0.3 }}
               >
                 {articles.map((article) => (
                   <Card key={article.id} sx={{ mb: 3 }}>
                     <CardContent>
                       <Typography variant="h5" component="h2" gutterBottom>
                         {article.title}
                       </Typography>
                       <Typography variant="body2" color="text.secondary" gutterBottom>
                         {format(new Date(article.updatedAt), 'MMMM d, yyyy h:mm a')}
                       </Typography>
                       <Typography variant="body1" paragraph>
                         {article.body}
                       </Typography>
                       
                     </CardContent>
                     <CardActions sx={{ justifyContent: 'flex-end' }}>
                       <IconButton aria-label="edit article">
                         <Edit />
                       </IconButton>
                       <IconButton aria-label="delete article">
                         <Delete />
                       </IconButton>
                     </CardActions>
                   </Card>
                 ))}
               </motion.div>
             )}
             
             {activeTab === 'comments' && (
               <motion.div
                 key="comments"
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -10 }}
                 transition={{ duration: 0.3 }}
               >
                 {comments.map((comment) => (
                   <Card key={comment.id} sx={{ mb: 3 }}>
                     <CardContent>
                       <Typography variant="subtitle1" component="h3" gutterBottom>
                         On: {comment.article.title}
                       </Typography>
                       <Typography variant="body2" color="text.secondary" gutterBottom>
                         {format(new Date(comment.updatedAt), 'MMMM d, yyyy h:mm a')}
                       </Typography>
                       <Typography variant="body1" paragraph>
                         {comment.body}
                       </Typography>
                     </CardContent>
                     <CardActions sx={{ justifyContent: 'flex-end' }}>
                       <IconButton aria-label="edit comment">
                         <Edit />
                       </IconButton>
                       <IconButton aria-label="delete comment">
                         <Delete />
                       </IconButton>
                     </CardActions>
                   </Card>
                 ))}
               </motion.div>
             )}
           </AnimatePresence>
         </Box>
        )

         }
        
       
      </motion.div>
    </motion.div>
  );
};

export default ProfilePage;