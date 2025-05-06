import { Skeleton } from "@mui/material"


const HeaderSkelton = () => {
  return (
   
    
    <div className="flex flex-col items-center mb-8">
      <Skeleton variant="circular" width={120} height={120} sx={{ mb: 2 }} />
      <Skeleton variant="text" width={200} height={40} sx={{ mb: 1 }} />
      <Skeleton variant="text" width={180} height={30} sx={{ mb: 1 }} />
      <Skeleton variant="text" width={220} height={20} sx={{ mb: 2 }} />
      <Skeleton variant="text" width={300} height={60} sx={{ mb: 3 }} />
      <Skeleton variant="rectangular" width={150} height={40} />
    </div>
  )
}

export default HeaderSkelton
