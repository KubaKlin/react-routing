import { Box, Typography } from '@mui/material';
import { ArticleForm } from '../ArticleForm/ArticleForm';
import useArticleCreate from '../../hooks/useArticleCreate';
import useArticleEdit from '../../hooks/useArticleEdit';

export const ArticleModal = ({ onClose, isEditing, article }) => {
  const { handleCreate } = useArticleCreate();
  const { handleEdit } = useArticleEdit();

  const handleSubmit = async (articleData) => {
    if (isEditing) {
      return await handleEdit(article.id, articleData);
    } else {
      return await handleCreate(articleData);
    }
  };

  return (
      <Box>
        <ArticleForm
          article={article}
          isEditing={isEditing}
          onClose={onClose}
          onSubmit={handleSubmit}
        />
      </Box>
  );
};
