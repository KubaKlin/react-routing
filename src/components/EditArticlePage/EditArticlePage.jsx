import { Container, Box, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { ArticleForm } from '../ArticleForm/ArticleForm';
import useArticleEdit from '../../hooks/useArticleEdit';
import useArticles from '../../hooks/useArticles';
import useArticleNotFound from '../../hooks/useArticleNotFound.jsx';

const EditArticlePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { articles } = useArticles(false, '');
  const { open: editOpen, handleClose: handleEditClose } = useArticleEdit();

  const article = articles.find((article) => article.id === id);
  const { renderNotFound } = useArticleNotFound(article);

  const notFoundComponent = renderNotFound();
  if (notFoundComponent) return notFoundComponent;

  const handleModalClose = () => {
    handleEditClose();
    navigate(`/articles/${id}`);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Edit Article
          </Typography>
        </Box>
        <ArticleForm
          open={editOpen}
          onClose={handleModalClose}
          isEditing={true}
          article={article}
        />
      </Box>
    </Container>
  );
};

export default EditArticlePage;
