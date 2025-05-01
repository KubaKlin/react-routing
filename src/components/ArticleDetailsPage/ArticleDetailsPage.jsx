import { Container, Box, Typography, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import useArticles from '../../hooks/useArticles';
import useLocalStorage from '../../hooks/useLocalStorage';

const ArticleDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { articles } = useArticles(false, '');
  const [favoriteArticles, setFavoriteArticles] = useLocalStorage(
    'favoriteArticles',
    [],
  );

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

  const handleToggleFavorite = () => {
    setFavoriteArticles((previous) => {
      if (previous.includes(article.id)) {
        return previous.filter((id) => id !== article.id);
      }
      return [...previous, article.id];
    });
  };

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
            onClick={handleToggleFavorite}
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
