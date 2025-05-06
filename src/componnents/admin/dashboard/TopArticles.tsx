import { Box, Grid, Typography } from '@mui/material';

interface Article {
  id: number;
  title: string;
  views: number;
  comments: number;
}

interface TopArticlesProps {
  articles: Article[];
}

export default function TopArticles({ articles }: TopArticlesProps) {
  return (
    <Box sx={{ p: 2, backgroundColor: 'background.paper', borderRadius: 1 }}>
      <Grid container spacing={2}>
        {articles.map((article) => (
          <Grid item xs={12} sm={6} md={3} key={article.id}>
            <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
              <Typography variant="subtitle1">{article.title}</Typography>
              <Typography variant="body2">Views: {article.views}</Typography>
              <Typography variant="body2">Comments: {article.comments}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}