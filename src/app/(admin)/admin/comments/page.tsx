'use client'
import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,

    IconButton,
    Tooltip,
    Chip,
    Typography,
    Box,
 
    MenuItem,
    Select,

} from '@mui/material';
import { Delete, Visibility } from '@mui/icons-material';
import { HOST } from '@/utils/constants';


import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { Loading } from 'notiflix';
import { toast } from 'react-toastify';
import TableSkeleton from '@/componnents/admin/dashboard/TableSkeleton';
import { CommentWithUserAndArticle } from '@/utils/types';

const Comment= () => {

    const cols = [
      "id",
      "Body",
      "UserName",
      "Article Title",
      "Status",
      "Created",
      "Updated",
      "Actions",
    ];

    const router = useRouter()
    const [comments, setComments] = useState<CommentWithUserAndArticle[]>([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({
        page: 0,
        limit: 6,
        totalCount: 0,
        totalPages: 0,
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchComments();
    }, [pagination.page, pagination.limit]);

    const fetchComments = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                `${HOST}api/comments?page=${pagination.page + 1}&limit=${pagination.limit}`
            );
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to fetch comments');
            }

            setComments(data.data);
            setPagination(prev => ({
                ...prev,
                totalCount: data.pagination.totalCount,
                totalPages: data.pagination.totalPages,
            }));
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleChangePage = (event: null, newPage: number) => {
        setPagination(prev => ({ ...prev, page: newPage }));
    };

    const handleChangeRowsPerPage = (event: { target: { value: string; }; }) => {
        const newLimit = parseInt(event.target.value, 10);
        setPagination(prev => ({
            ...prev,
            limit: newLimit,
            page: 0 // Reset to first page when changing page size
        }));
    };

    const handleDelete = async (id: any) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                Loading.pulse({
                    svgSize: "50px",
                    clickToClose: false,
                    svgColor: 'blue'
                })
                try {
                    const response = await fetch(`${HOST}api/comments/${id}`, {
                        method: 'DELETE'
                    });
                    fetchComments()
                    Swal.fire({
                        title: "Deleted!",
                        text: "Article  has been deleted.",
                        icon: "success"
                    }).then(() => {
                        toast.success("Article Deleted")
                    });


                } catch (err) {
                    Swal.fire({
                        title: "Error!",
                        text: "Something Went Wrong try again later ",
                        icon: "error"
                    });
                    setError(err.message);
                } finally {
                    Loading.remove()
                }



            }
        });

    };

    const formatDate = (dateString: string | number | Date) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    return (
      <>
        <Paper
          sx={{
            width: "100%",
            overflow: "hidden",
            borderRadius: 2,
            boxShadow: 3,
            display: "flex",
            flexDirection: "column",
            minHeight: "400px",
          }}
        >
          <TableContainer sx={{ flex: 1 }}>
            {loading ? (
              <>
                <TableSkeleton />
                <TableSkeleton />
                <TableSkeleton />
              </>
            ) : (
              <Table stickyHeader aria-label="articles table">
                <TableHead>
                  <TableRow>
                    {cols.map((col) => (
                      <TableCell sx={{ fontWeight: "bold" }}>{col}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {comments.map((comment, index) => (
                    <TableRow
                      key={comment.id}
                      hover
                      sx={{
                        "&:hover": {
                          backgroundColor: "action.hover",
                          cursor: "pointer",
                        },
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell>
                        <Typography fontWeight="medium">{index + 1}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography fontWeight="medium">
                          {comment.body}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography noWrap sx={{ maxWidth: 200 }}>
                          {comment.creator.username}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography noWrap sx={{ maxWidth: 200 }}>
                          {comment.article.title}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label="Published"
                          color="success"
                          size="small"
                          sx={{ borderRadius: 1 }}
                        />
                      </TableCell>
                      <TableCell className='hidden md:inline-block'>{formatDate(comment.createdAt)}</TableCell>
                      <TableCell className='hidden md:inline-block'>{formatDate(comment.updatedAt)}</TableCell>
                      <TableCell>
                        <Box display="flex" gap={1}>
                          <Tooltip title="View">
                            <IconButton
                              color="primary"
                              aria-label="view"
                              size="small"
                              onClick={() =>
                                router.push("/articles/" + comment.articleId)
                              }
                            >
                              <Visibility fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton
                              color="error"
                              aria-label="delete"
                              size="small"
                              onClick={() => handleDelete(comment.id)}
                            >
                              <Delete fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TableContainer>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 2,
              borderTop: "1px solid",
              borderColor: "divider",
              backgroundColor: "background.paper",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Rows per page:
              </Typography>
              <Select
                value={pagination.limit}
                onChange={handleChangeRowsPerPage}
                size="small"
                sx={{
                  "& .MuiSelect-select": {
                    py: 1,
                    px: 1.5,
                  },
                }}
              >
                {[6, 10, 25, 50].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </Box>

            <Typography variant="body2" color="text.secondary">
              {`${pagination.page * pagination.limit + 1}-${Math.min(
                (pagination.page + 1) * pagination.limit,
                pagination.totalCount
              )} of ${pagination.totalCount}`}
            </Typography>

            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton
                onClick={() => handleChangePage(null, pagination.page - 1)}
                disabled={pagination.page === 0}
                size="small"
              >
                <Typography variant="body2">Previous</Typography>
              </IconButton>
              <IconButton
                onClick={() => handleChangePage(null, pagination.page + 1)}
                disabled={
                  pagination.page >=
                  Math.ceil(pagination.totalCount / pagination.limit) - 1
                }
                size="small"
              >
                <Typography variant="body2">Next</Typography>
              </IconButton>
            </Box>
          </Box>
        </Paper>
      </>
    );
};

export default Comment;