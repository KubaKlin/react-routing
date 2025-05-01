import { useState } from 'react';
import { useArticleForm } from './useArticleForm';
import { TextField, Button, Box } from '@mui/material';
import { useNavigate } from "react-router-dom";

export const ArticleForm = ({ article, isEditing, onSubmit }) => {
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: 3 }}>
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
