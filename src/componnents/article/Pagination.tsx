'use client';

import { Pagination as MuiPagination, PaginationItem, styled } from '@mui/material';
import { motion } from 'framer-motion';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const StyledPagination = styled(MuiPagination)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: theme.spacing(4),
  '& .MuiPaginationItem-root': {
    color: theme.palette.text.primary,
    fontSize: '1rem',
    margin: '0 4px',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  '& .MuiPaginationItem-page.Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  '& .MuiPaginationItem-previousNext': {
    borderRadius: '8px',
    padding: '8px 16px',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[1],
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      boxShadow: theme.shadows[2],
    },
    '&.Mui-disabled': {
      boxShadow: 'none',
      opacity: 0.5,
    },
  },
}));

interface PaginationProps {
  count: number;
  page: number;
  onChange: (page: number) => void;
  className?: string;
}

export const Pagination = ({
  count,
  page,
  onChange,
  className,
}: PaginationProps) => {
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    onChange(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={className}
    >
      <StyledPagination
        count={count}
        page={page}
        onChange={handleChange}
        variant="outlined"
        shape="rounded"
        size="large"
        renderItem={(item) => (
          <PaginationItem
            {...item}
            slots={{
              previous: ArrowBackIcon,
              next: ArrowForwardIcon,
            }}
            sx={{
              '&.Mui-selected': {
                fontWeight: 'bold',
              },
              '&.MuiPaginationItem-previousNext': {
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                backgroundColor: 'transparent',
                '& .MuiSvgIcon-root': {
                  fontSize: '1.2rem',
                },
              },
            }}
          />
        )}
      />
    </motion.div>
  );
};