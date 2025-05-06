import { Box, Skeleton } from "@mui/material"


const TableSkeleton = () => {
  return (
    <Box display="flex" padding={'20px'} justifyContent="center" width={'100%'} alignItems="center" minHeight="80px">
    <Skeleton variant="rectangular" width={"100%"} height={100} />
  </Box>
  )
}

export default TableSkeleton
