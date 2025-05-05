import { useState } from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useSearchQuery from '../../hooks/useSearchQuery';
import SortButton from '../SortButton/SortButton';
import SearchBar from '../SearchBar/SearchBar';
import { ArticlesList } from '../ArticlesList/ArticlesList';
import useLocalStorage from '../../hooks/useLocalStorage';
import useArticles from '../../hooks/useArticles';
import { useDebounce } from 'use-debounce';

const ArticlesListPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useSearchQuery();
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
  const [isSorted, setIsSorted] = useState(false);
  const [favoriteArticles, setFavoriteArticles] = useLocalStorage(
    'favoriteArticles',
    [],
  );
  const { articles, refreshArticles } = useArticles(isSorted, debouncedSearchQuery);

  const handleToggleFavorite = (articleId) => {
    setFavoriteArticles((previous) => {
      if (previous.includes(articleId)) {
        return previous.filter((id) => id !== articleId);
      }
      return [...previous, articleId];
    });
  };

  const handleToggleSort = () => {
    setIsSorted((previousArticle) => !previousArticle);
  };

  const handleCreateArticle = () => {
    navigate('/new-article');
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Articles list
          </Typography>
          <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
            <Button
              size="small"
              variant="outlined"
              sx={{ mb: 2 }}
              onClick={handleCreateArticle}
            >
              Add new article
            </Button>
            <SortButton isSorted={isSorted} onToggleSort={handleToggleSort} />
          </Box>
        </Box>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <ArticlesList
          articles={articles}
          favoriteArticles={favoriteArticles}
          onToggleFavorite={handleToggleFavorite}
          refreshArticles={refreshArticles}
        />
      </Box>
    </Container>
  );
};

export default ArticlesListPage;
