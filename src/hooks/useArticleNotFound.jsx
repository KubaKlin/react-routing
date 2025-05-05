import { Container, Box, Typography } from '@mui/material';

const useArticleNotFound = (article) => {
  const renderNotFound = () => {
    if (!article) {
      return (
        <Container maxWidth="md">
          <Box sx={{ my: 4 }}>
            <Typography variant="h4">Article not found</Typography>
          </Box>
        </Container>
      );
    }
    return null;
  };

  return { renderNotFound };
};

export default useArticleNotFound; 