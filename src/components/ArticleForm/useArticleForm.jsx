import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useArticleForm = (initialTitle = '', initialContent = '', isEditing = false, article = null, handleCreate, handleEdit) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const resetForm = () => {
    setTitle(initialTitle);
    setContent(initialContent);
  };

  const onSubmit = async (articleData) => {
    if (isEditing) {
      return await handleEdit(article.id, articleData);
    } else {
      return await handleCreate(articleData);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const articleData = { title, content };
      const articleId = await onSubmit(articleData);
      navigate(`/articles/${articleId}`);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/articles');
  };

  return {
    title,
    content,
    isLoading,
    resetForm,
    handleTitleChange,
    handleContentChange,
    handleSubmit,
    handleBack,
  };
};

export default useArticleForm;
