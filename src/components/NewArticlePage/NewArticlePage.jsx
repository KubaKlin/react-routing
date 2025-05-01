import { Container, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArticleForm } from '../ArticleForm/ArticleForm';
import useArticleCreate from '../../hooks/useArticleCreate';

const NewArticlePage = () => {
  const navigate = useNavigate();
  const {
    open: createOpen,
    handleClose: handleCreateClose,
  } = useArticleCreate();

  const handleModalClose = (articleId) => {
    handleCreateClose();
    if (articleId) {
      navigate(`/articles/${articleId}`);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Create New Article
          </Typography>
        </Box>
        <ArticleForm
          open={createOpen}
          onClose={handleModalClose}
          isEditing={false}
        />
      </Box>
    </Container>
  );
};

export default NewArticlePage; 