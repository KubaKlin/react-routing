import { Box, Button, TextField } from '@mui/material';
import useArticleCreate from '../../hooks/useArticleCreate';
import useArticleEdit from '../../hooks/useArticleEdit';
import useArticleForm from './useArticleForm';

export const ArticleForm = ({ isEditing, article }) => {
  const { handleCreate } = useArticleCreate();
  const { handleEdit } = useArticleEdit();

  const {
    title,
    content,
    isLoading,
    handleTitleChange,
    handleContentChange,
    handleSubmit,
    handleBack,
  } = useArticleForm(
    article?.title || '',
    article?.content || '',
    isEditing,
    article,
    handleCreate,
    handleEdit,
  );

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="title"
        value={title}
        onChange={handleTitleChange}
        label={isEditing ? 'Article title' : 'New article title'}
        fullWidth
        sx={{ mt: 1 }}
        variant="filled"
      />
      <TextField
        name="content"
        value={content}
        onChange={handleContentChange}
        label={isEditing ? 'Article content' : 'New article content'}
        fullWidth
        sx={{ mt: 2 }}
        variant="filled"
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          mt: 3,
        }}
      >
        <Button variant="outlined" onClick={handleBack}>
          Back to List
        </Button>
        <Button type="submit" variant="outlined" disabled={isLoading}>
          {isLoading ? 'Loading...' : isEditing ? 'Update' : 'Submit'}
        </Button>
      </Box>
    </form>
  );
};
