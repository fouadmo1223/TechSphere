import { Box, Container, Typography } from "@mui/material"
import { motion } from 'framer-motion';


export default function ArticleFeaturedSectio() {
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
  
    <Box className="py-12 bg-gray-100">
    <Container maxWidth="lg">
      <motion.div
        variants={itemVariants}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        style={{ marginBottom: "20px" }}
      >
        <Typography variant="h3" style={{ marginBottom: "20px" }} className="text-center  font-bold">
          Why This Matters
        </Typography>
        <Box className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Next.js 15 Features", content: "Explore the latest improvements in Next.js 15" },
            { title: "Performance Benefits", content: "How these changes improve your application performance" },
            { title: "Migration Guide", content: "How to upgrade from previous versions to Next.js 15" }
          ].map((item, index) => (
            <motion.div key={index} whileHover={{ y: -5 }} className="bg-white p-6 rounded-lg shadow-md">
              <Typography variant="h5" className="mb-3 font-semibold">{item.title}</Typography>
              <Typography variant="body1">{item.content}</Typography>
            </motion.div>
          ))}
        </Box>
      </motion.div>
    </Container>
  </Box>
  )
}
