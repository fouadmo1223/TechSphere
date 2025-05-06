import { Box, Container, Typography, Button } from '@mui/material'
import React from 'react'
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function ArticlesSimilar({similarArticles}: {similarArticles: Array<{id: string; title: string; date: Date; body: string}>}) {
    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });
      };
    const itemVariants = {
        hidden: { y: 10, opacity: 0 },
        visible: {
          y: 0,
          opacity: 1,
          transition: {
            type: "spring",
            stiffness: 100,
            damping: 10
          }
        }
      };
  return (
    <Container maxWidth="lg" className="py-12">
      <motion.div
        variants={itemVariants}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        <Typography 
          variant="h4" 
          component="h2" 
          fontWeight={700} 
          mb={4} 
          sx={{
            fontSize: { xs: '1.75rem', md: '2.125rem' },
            textAlign: 'center'
          }}
        >
          More About Next.js 15
        </Typography>

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ 
            clickable: true,
            dynamicBullets: true
          }}
          breakpoints={{
            600: { slidesPerView: 2 },
            900: { slidesPerView: 3 }
          }}
          style={{
            paddingBottom: '2.5rem',
            paddingTop: '1rem'
          }}
        >
          {similarArticles.map((item) => (
            <SwiperSlide key={item.id}>
              <motion.div 
                whileHover={{ y: -5 }} 
                className="h-full"
              >
                <Box 
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    backgroundColor: 'background.paper',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: 2,
                    transition: 'box-shadow 0.3s ease',
                    '&:hover': {
                      boxShadow: 4
                    }
                  }}
                >
                  <Box sx={{ p: 3, flexGrow: 1 }}>
                    <Typography 
                      variant="h6" 
                      component="h3" 
                      fontWeight={600} 
                      mb={1.5}
                      sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      mb={2}
                    >
                      {formatDate(item.date)}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      color="text.secondary"
                      sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        mb: 2
                      }}
                    >
                      {item.body}
                    </Typography>
                  </Box>
                  <Box 
                    sx={{ 
                      px: 3, 
                      pb: 3,
                      pt: 1
                    }}
                  >
                    <Link href={`/articles/${item.id}`} passHref>
                      <Button
                        variant="outlined"
                        color="primary"
                        fullWidth
                        sx={{
                          textTransform: 'none',
                          fontWeight: 500,
                          borderRadius: '8px'
                        }}
                      >
                        Read More
                      </Button>
                    </Link>
                  </Box>
                </Box>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </Container>
  )
}