import { Container, Box, Typography, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import useArticles from '../../hooks/useArticles';
import useFavoriteArticles from '../../hooks/useFavoriteArticles';

const ArticleDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { articles } = useArticles(false, '');
  const { favoriteArticles, handleToggleFavorite } = useFavoriteArticles();

  const article = articles.find((article) => article.id === id);

  if (!article) {
    return (
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4">Article not found</Typography>
        </Box>
      </Container>
    );
  }

  const isFavorite = favoriteArticles.includes(article.id);

  const handleEdit = () => {
    navigate(`/articles/${id}/modify`);
  };

  const handleBack = () => {
    navigate('/articles');
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Box sx={{ display: 'flex', gap: 2, my: 4 }}>
          <Button variant="outlined" onClick={handleBack}>
            Back to List
          </Button>
          <Button
            variant="outlined"
            onClick={() => handleToggleFavorite(article.id)}
            color={isFavorite ? 'primary' : 'inherit'}
          >
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </Button>
          <Button variant="outlined" onClick={handleEdit}>
            Edit
          </Button>
        </Box>
        <Typography variant="h4">{article.title}</Typography>
        <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
          {article.content}
        </Typography>
      </Box>
    </Container>
  );
};

export default ArticleDetailsPage;
