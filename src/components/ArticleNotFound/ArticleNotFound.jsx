import { Container, Box, Typography } from '@mui/material';

const ArticleNotFound = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4">Article not found</Typography>
      </Box>
    </Container>
  );
};

export default ArticleNotFound;
