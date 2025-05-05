import useArticleDelete from '../../hooks/useArticleDelete';
import { Button, Box, IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useNavigate } from 'react-router-dom';

export const ArticleEdit = ({ article, isFavorite, onToggleFavorite, refreshArticles }) => {
  const { deleteArticle } = useArticleDelete(refreshArticles);

  const navigate = useNavigate();

  const handleViewArticle = () => {
    navigate(`/articles/${article.id}`);
  };

  const handleRemove = () => {
    deleteArticle(article.id);
  };

  const handleEditArticle = () => {
    navigate(`/articles/${article.id}/modify`);
  };

  return (
    <Box sx={{ mt: 2, display: 'flex', gap: 1, alignItems: 'center' }}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleEditArticle}
        aria-label="Edit article"
        size="small"
      >
        Edit
      </Button>
      <Button
        size="small"
        variant="contained"
        color="error"
        onClick={handleRemove}
        aria-label="Remove article"
      >
        Remove
      </Button>
      <Button
        size="small"
        variant="contained"
        color="success"
        onClick={handleViewArticle}
        aria-label="Remove article"
      >
        See article
      </Button>
      <IconButton
        onClick={onToggleFavorite}
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        color={isFavorite ? 'primary' : 'default'}
        size="small"
      >
        {isFavorite ? <StarIcon /> : <StarBorderIcon />}
      </IconButton>
    </Box>
  );
};
