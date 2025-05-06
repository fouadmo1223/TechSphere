import { Box, TextField, Button, CircularProgress, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import React from 'react';
import { styled, keyframes } from '@mui/system';

// Animation for the button when clicked
const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const AnimatedButton = styled(Button)(({ isloading }) => ({
  animation: isloading ? `${pulse} 1s infinite` : 'none',
  transition: 'all 0.3s ease',
}));

const AddArticleComment = () => {
  const [comment, setComment] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log("Comment submitted:", comment);
      setIsSubmitted(true);
      setComment("");
      
      // Reset submission status after a delay
      setTimeout(() => setIsSubmitted(false), 2000);
    } catch (error) {
      console.error("Error submitting comment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 2,
        p: 2,
        backgroundColor: 'background.paper',
        
        
      }}
    >
      <TextField
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        sx={{ 
          flexGrow: 1,
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
          }
        }}
        id="outlined-basic"
        label="Add your comment..."
        variant="outlined"
        multiline
        maxRows={4}
        disabled={isLoading}
      />
      <AnimatedButton
        type="submit"
        variant="contained"
        color={isSubmitted ? "success" : "primary"}
        disabled={!comment.trim() || isLoading}
        isloading={isLoading ? "true" : undefined}
        sx={{
          minWidth: 120,
          height: 56,
          borderRadius: 4,
          px: 3,
        }}
        startIcon={
          isLoading ? (
            <CircularProgress size={20} color="inherit" />
          ) : isSubmitted ? (
            <SendIcon color="inherit" />
          ) : (
            <SendIcon color="inherit" />
          )
        }
      >
        {isLoading ? 'Commenting...' : isSubmitted ? 'Commented!' : 'Post'}
      </AnimatedButton>
    </Box>
  );
};


export default AddArticleComment
