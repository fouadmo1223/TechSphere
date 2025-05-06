"use client";

import { use, useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Container,
  Divider,
  Typography,
  Skeleton,
  IconButton,
  TextField,
  Button
} from '@mui/material';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';

import { HOST } from '@/utils/constants';
import { Article } from '@/generated/prisma';
import ArticleFeaturedSectio from '@/componnents/article/ArticleFeaturedSectio';
import ArticlesSimilar from '@/componnents/article/ArticlesSimilar';
import { useAuth } from '@/app/context/UserContext';
import { SingleArticle } from '@/utils/types';
import Swal from 'sweetalert2';

interface SingleArticleProps {
  params: Promise<{ articleId: string }>;
}

interface Comment {
  id: string;
  body: string;
  createdAt: string;
  creatorId: string;
  creator: {
    id: string;
    username: string;
    image: string | null;
  };
}

const getRandomDate = () => {
  const start = new Date(2023, 0, 1);
  const end = new Date();
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const formatDate = (date?: string | Date) => {
  if (!date) return 'Unknown date';

  const d = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(d.getTime())) return 'Invalid date';

  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const similarArticles = [
  {
    id: 1,
    title: "Understanding Next.js 15",
    body: "Learn about the new features in Next.js 15 and how to use them effectively",
    userId: 1,
    date: getRandomDate()
  },
  {
    id: 2,
    title: "App Router Best Practices",
    body: "Essential patterns for building applications with Next.js App Router",
    userId: 2,
    date: getRandomDate()
  },
  {
    id: 3,
    title: "Server Components Deep Dive",
    body: "Master the new React Server Components architecture in Next.js",
    userId: 3,
    date: getRandomDate()
  },
  {
    id: 4,
    title: "Data Fetching Strategies",
    body: "Modern approaches to data fetching in Next.js applications",
    userId: 4,
    date: getRandomDate()
  },
  {
    id: 6,
    title: "Optimizing Next.js Performance",
    body: "Techniques to make your Next.js apps blazing fast",
    userId: 5,
    date: getRandomDate()
  }
];

const getArticle = async (articleId: string): Promise<SingleArticle> => {
  const res = await fetch(`${HOST}api/articles/${articleId}`);
  if (!res.ok) throw new Error("Failed to fetch article");
  return res.json();
};

export default function SingleArticlePage({ params }: SingleArticleProps) {
  const { articleId } = use(params);
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentLoading, setCommentLoading] = useState(false);
  const { user } = useAuth();
  const [currentEditComment, setCurrentEditComment] = useState<Comment | null>(null);
  const [editCommentText, setEditCommentText] = useState('');

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await getArticle(articleId);
        setArticle(data);
        setComments(data.comments || []);
      } catch (error) {
        toast.error("Failed to load article");
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [articleId]);

  const handleAddComment = async (commentText: string) => {
    setCommentLoading(true);
    try {
      const response = await fetch(`${HOST}api/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          articleId: Number(articleId),
          body: commentText
        }),
      });

      if (!response.ok) {
       if(Number(response.status) === 401){
        throw new Error('Unauthorized!! Login in first');
       }else{
         throw new Error('Failed to add comment');

       }
      }
    
      const newComment = await response.json();

      setComments(prev => [newComment.article, ...prev]);
      toast.success("Comment added successfully!");
    } catch (error: any) {
      // console.log(JSON.parse(error).message)
      toast.error(error.message || "Failed to add comment");
    } finally {
      setCommentLoading(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      const response = await fetch(`${HOST}api/comments/${commentId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete comment');
      }

      setComments(prev => prev.filter(comment => comment.id !== commentId));
      toast.success("Comment deleted successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to delete comment");
    }
  };

  const handleEditSubmit = async () => {
    if (!currentEditComment || editCommentText === currentEditComment.body) {
      setCurrentEditComment(null);
      return;
    }

    try {
      const response = await fetch(`${HOST}api/comments/${currentEditComment.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          body: editCommentText
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update comment');
      }

      const updatedComment = await response.json();
      setComments(prev => prev.map(comment => 
        comment.id === currentEditComment.id ? updatedComment : comment
      ));
      toast.success("Comment updated successfully!");
      setCurrentEditComment(null);
    } catch (error: any) {
      toast.error(error.message || "Failed to update comment");
    }
  };

  if (loading || !article) {
    return (
      <div className="min-h-screen py-8 bg-gray-50">
        <Container maxWidth="lg">
          <div className="w-[80%] mx-auto mb-8 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-8">
            <Skeleton variant="text" width="80%" height={60} />
            <div className="flex items-center gap-4 mt-4">
              <Skeleton variant="circular" width={48} height={48} />
              <div>
                <Skeleton variant="text" width={120} height={24} />
                <Skeleton variant="text" width={100} height={20} />
              </div>
            </div>
          </div>
          <div className="w-[80%] mx-auto mb-8 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-8">
            <Skeleton variant="text" width="40%" height={40} className="mb-6" />
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} variant="text" width="100%" height={24} className="mb-2" />
            ))}
            <div className="mt-8">
              <Skeleton variant="text" width="30%" height={40} className="mb-4" />
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-start mb-2">
                  <Skeleton variant="circular" width={8} height={8} className="mt-3 mr-2" />
                  <Skeleton variant="text" width="90%" height={20} />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen py-8 bg-gray-50"
    >
      {/* Article Content */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-[80%] mx-auto mb-8 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="p-8 space-y-6">
          <Typography variant="h2" component="h1" className="font-bold text-gray-900 leading-tight">
            {article.title}
          </Typography>

          <div className="flex items-center gap-4">
            <Avatar
              src={article.creator?.image || `https://ui-avatars.com/api/?name=${article.creator?.username || 'Anonymous'}&background=random`}
              className="w-12 h-12 border-2 border-white shadow-sm"
            />
            <div className="space-y-1">
              <Typography variant="subtitle1" className="font-medium text-gray-800">
                {article.creator?.username || 'Anonymous'}
              </Typography>
              <Typography variant="body2" className="text-gray-500">
                {formatDate(article.createdAt)}
              </Typography>
            </div>
          </div>
        </div>

        <Divider className="border-gray-100" />
        
        <div className="p-8 pt-6">
          <Typography variant="h4" className="mb-6 font-semibold text-gray-900">
            Description
          </Typography>
          <Typography variant="body1" className="text-lg leading-relaxed mb-8 p-4 text-gray-800">
            {article.body}
          </Typography>

          <Divider className="my-8 border-gray-100" />

          <Typography variant="h4" className="mt-6 mb-4 font-semibold text-gray-900">
            Key Takeaways
          </Typography>

          <ul className="space-y-4 mb-6">
            {article.body.split('\n').filter(point => point.trim() !== '').map((point, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-block bg-gray-300 rounded-full w-2 h-2 mt-2.5 mr-3 flex-shrink-0"></span>
                <Typography variant="body1" className="text-gray-700">
                  {point}
                </Typography>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Comments Section */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="w-[80%] mx-auto p-10 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <Typography variant="h4" className="mb-6 font-semibold text-gray-900">
          Comments ({comments.length})
        </Typography>

        {/* Comment Input */}
        <Box
          component="form"
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const commentText = formData.get('comment') as string;
            if (commentText.trim()) {
              try {
                await handleAddComment(commentText);
                e.currentTarget.reset();
              } catch (error) {
                // Error is already handled in handleAddComment
              }
            }
          }}
          className="mb-8"
        >
          <div className="flex gap-3 items-start">
            <Avatar
              src={user?.image || `https://ui-avatars.com/api/?name=${user?.username || user?.username || 'Anonymous'}&background=random`}
              className="w-10 h-10 mt-1"
            />
            <div className="flex-1">
              <TextField
                name="comment"
                placeholder="Write a comment..."
                variant="outlined"
                fullWidth
                required
                disabled={commentLoading}
                multiline
                rows={3}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    backgroundColor: '#f9fafb',
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#3b82f6',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#3b82f6',
                      borderWidth: '1px',
                    },
                  },
                }}
              />
              <div className="flex justify-end mt-2">
                <Button
                  type="submit"
                  variant="contained"
                  disabled={commentLoading}
                  endIcon={<SendIcon />}
                  sx={{
                    borderRadius: '8px',
                    textTransform: 'none',
                    backgroundColor: '#3b82f6',
                    '&:hover': {
                      backgroundColor: '#2563eb',
                    },
                  }}
                >
                  {commentLoading ? 'Posting...' : 'Post comment'}
                </Button>
              </div>
            </div>
          </div>
        </Box>

        {/* Comments List */}
        {comments.length === 0 ? (
          <div className="text-center py-8">
            <Typography variant="body1" className="text-gray-500 mb-6">
              No comments yet. Be the first to share your thoughts!
            </Typography>
          </div>
        ) : (
          <div className="space-y-6">
            {comments.map((comment) => (
              <div 
                key={comment.id} 
                className="group relative p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                {currentEditComment?.id === comment.id ? (
                  // Edit Mode
                  <div className="space-y-3">
                    <TextField
                      fullWidth
                      multiline
                      variant="outlined"
                      value={editCommentText}
                      onChange={(e) => setEditCommentText(e.target.value)}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                          backgroundColor: '#f9fafb',
                        },
                      }}
                    />
                    <div className="flex gap-2 justify-end">
                      <Button
                        variant="outlined"
                        onClick={() => setCurrentEditComment(null)}
                        sx={{
                          borderRadius: '8px',
                          textTransform: 'none',
                          color: '#6b7280',
                          borderColor: '#e5e7eb',
                          '&:hover': {
                            borderColor: '#d1d5db',
                            backgroundColor: 'rgba(0,0,0,0.02)',
                          },
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        onClick={async () => {
                          try {
                            await handleEditSubmit();
                            setCurrentEditComment(null);
                          } catch (error) {
                            // Error is already handled in handleEditSubmit
                          }
                        }}
                        disabled={editCommentText === currentEditComment.body}
                        sx={{
                          borderRadius: '8px',
                          textTransform: 'none',
                          backgroundColor: '#3b82f6',
                          '&:hover': {
                            backgroundColor: '#2563eb',
                          },
                          '&:disabled': {
                            backgroundColor: '#e5e7eb',
                            color: '#9ca3af',
                          },
                        }}
                      >
                        Save changes
                      </Button>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <>
                    <div className="flex items-start gap-3">
                      <Avatar
                        src={comment.creator?.image || `https://ui-avatars.com/api/?name=${comment.creator?.username ||user?.username ||'Anonymous'}&background=random`}
                        className="w-10 h-10"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Typography variant="subtitle2" className="font-medium">
                            {comment.creator?.username || user?.username || 'Anonymous'}
                          </Typography>
                          <Typography variant="caption" className="text-gray-500">
                            {formatDate(comment.createdAt)}
                          </Typography>
                        </div>
                        <Typography variant="body1" className="mt-1 text-gray-800">
                          {comment.body}
                        </Typography>
                      </div>
                    </div>
                    
                    {Number(user?.id) === comment.creatorId && (
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-1">
                        <IconButton 
                          size="small" 
                          onClick={() => {
                            setCurrentEditComment(comment);
                            setEditCommentText(comment.body);
                          }}
                          aria-label="edit comment"
                          sx={{
                            backgroundColor: '#e5e7eb',
                            '&:hover': {
                              backgroundColor: '#d1d5db',
                            },
                          }}
                        >
                          <EditIcon fontSize="small" sx={{ color: '#4b5563' }} />
                        </IconButton>
                        <IconButton 
                          size="small" 
                          onClick={async () => {
                            const result = await Swal.fire({
                              title: 'Are you sure?',
                              text: "You won't be able to revert this!",
                              icon: 'warning',
                              showCancelButton: true,
                              confirmButtonColor: '#3085d6',
                              cancelButtonColor: '#d33',
                              confirmButtonText: 'Yes, delete it!'
                            });
                          
                            if (result.isConfirmed) {
                              handleDeleteComment(comment.id);
                            }
                          }}
                          aria-label="delete comment"
                          sx={{
                            backgroundColor: '#fee2e2',
                            '&:hover': {
                              backgroundColor: '#fecaca',
                            },
                          }}
                        >
                          <DeleteIcon fontSize="small" sx={{ color: '#dc2626' }} />
                        </IconButton>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Featured Articles */}
      <ArticleFeaturedSectio />

      {/* Similar Articles */}
      <ArticlesSimilar similarArticles={similarArticles} />
    </motion.div>
  );
}