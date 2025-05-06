import { Box, Card, CardActions, CardContent, Skeleton } from "@mui/material"


const ArticleSkelton = () => {
  return (
    <Box sx={{ py: 3 }}>
    {/* Articles Skeleton */}
    {[1, 2, 3].map((item) => (
      <Card key={item} sx={{ mb: 3 }}>
        <CardContent>
          <Skeleton variant="text" width="60%" height={40} sx={{ mb: 2 }} />
          <Skeleton variant="text" width="40%" height={20} sx={{ mb: 2 }} />
          <Skeleton variant="text" height={20} sx={{ mb: 1 }} />
          <Skeleton variant="text" height={20} sx={{ mb: 1 }} />
          <Skeleton variant="text" height={20} width="80%" />
        </CardContent>
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="circular" width={40} height={40} />
        </CardActions>
      </Card>
    ))}
  </Box>
  )
}

export default ArticleSkelton
