import { CircularProgress } from "@mui/material";

export const Loading = () => {
    return (
      <div className="flex justify-center items-center h-64">
        <CircularProgress color="primary" size={60} />
      </div>
    );
  };