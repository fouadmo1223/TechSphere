import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';

const AddButton = ({name}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`${window.location.pathname}/add`);
  };

  const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[2],
    padding: theme.spacing(1, 2),
    textTransform: 'none',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
      boxShadow: theme.shadows[4],
    },
  }));

  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      style={{marginBottom:"20px"}}
    >
      <StyledButton
        onClick={handleClick}
        startIcon={<AddIcon />}
        variant="contained"
      >
        Add {name}
      </StyledButton>
    </motion.div>
  );
};

export default AddButton;