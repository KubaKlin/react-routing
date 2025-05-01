import { Box, Button, TextField } from '@mui/material';
import useArticleCreate from '../../hooks/useArticleCreate';
import useArticleEdit from '../../hooks/useArticleEdit';
import {useArticleForm} from "./useArticleForm";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export const ArticleForm = ({ isEditing, article }) => {
  const { handleCreate } = useArticleCreate();
  const { handleEdit } = useArticleEdit();

  const onSubmit = async (articleData) => {
    if (isEditing) {
      return await handleEdit(article.id, articleData);
    } else {
      return await handleCreate(articleData);
    }
  };

  const { handleTitleChange, handleContentChange, title, content } =
      useArticleForm(article?.title || '', article?.content || '');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const articleData = { title, content };
      const success = await onSubmit(articleData);

      if (success) {
        navigate(`/articles/${article.id}`);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/articles');
  };

  return (
      <form onSubmit={handleSubmit}>
        <TextField
            name="title"
            value={title}
            onChange={handleTitleChange}
            label={isEditing ? 'Article title' : 'New article title'}
            fullWidth
            sx={{mt: 1}}
            variant="filled"
        />
        <TextField
            name="content"
            value={content}
            onChange={handleContentChange}
            label={isEditing ? 'Article content' : 'New article content'}
            fullWidth
            sx={{mt: 2}}
            variant="filled"
        />
        <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%', mt: 3}}>
          <Button variant="outlined" onClick={handleBack}>
            Back to List
          </Button>
          <Button
              type="submit"
              variant="outlined"
              disabled={isLoading}
          >
            {isLoading ? 'Loading...' : isEditing ? 'Update' : 'Submit'}
          </Button>
        </Box>
      </form>
  );
};
