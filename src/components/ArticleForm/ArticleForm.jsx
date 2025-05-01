import { useState } from 'react';
import { useArticleForm } from './useArticleForm';
import { TextField, Button } from '@mui/material';
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
        sx={{ mt: 1 }}
        variant="filled"
      />
      <Button
        type="submit"
        sx={{ mt: 1 }}
        variant="outlined"
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : isEditing ? 'Update' : 'Submit'}
      </Button>
    </form>
  );
};
