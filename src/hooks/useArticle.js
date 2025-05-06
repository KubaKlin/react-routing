import { useState, useEffect } from 'react';

const useArticle = (articleId) => {
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(
          `http://localhost:3010/articles/${articleId}`,
        );

        if (!response.ok) {
          throw new Error('Failed to fetch article');
        }

        const articleData = await response.json();
        setArticle(articleData);
      } catch (error) {
        console.error('Failed to fetch article:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (articleId) {
      fetchArticle();
    }
  }, [articleId]);

  return { article, isLoading };
};

export default useArticle;
