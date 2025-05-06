import {
  Container,
  Box,
  Typography,
  Button,
  CircularProgress,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import useArticle from '../../hooks/useArticle';
import useFavoriteArticles from '../../hooks/useFavoriteArticles';
import ArticleNotFound from '../ArticleNotFound/ArticleNotFound';

const ArticleDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { article, isLoading } = useArticle(id);
  const { favoriteArticles, handleToggleFavorite } = useFavoriteArticles();

  if (!article) {
    return <ArticleNotFound />;
  }

  if (isLoading) {
    return (
      <Container maxWidth="md">
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
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
