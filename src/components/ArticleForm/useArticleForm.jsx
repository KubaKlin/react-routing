import { useState } from 'react';

const useArticleForm = (initialTitle = '', initialContent = '') => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

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

  return {
    title,
    content,
    resetForm,
    handleTitleChange,
    handleContentChange,
  };
};

export default useArticleForm;
