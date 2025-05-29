import useLocalStorage from './useLocalStorage';

const useFavoriteArticles = () => {
  const [favoriteArticles, setFavoriteArticles] = useLocalStorage(
    'favoriteArticles',
    [],
  );

  const handleToggleFavorite = (articleId) => {
    setFavoriteArticles((previous) => {
      if (previous.includes(articleId)) {
        return previous.filter((id) => id !== articleId);
      }
      return [...previous, articleId];
    });
  };

  return {
    favoriteArticles,
    handleToggleFavorite,
  };
};

export default useFavoriteArticles;
