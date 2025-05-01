import { Routes, Route, Navigate } from 'react-router-dom';
import ArticlesListPage from './components/ArticlesListPage/ArticlesListPage';
import NewArticlePage from './components/NewArticlePage/NewArticlePage';
import ArticleDetailsPage from './components/ArticleDetailsPage/ArticleDetailsPage';
import EditArticlePage from './components/EditArticlePage/EditArticlePage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/articles" replace />} />
      <Route path="/articles" element={<ArticlesListPage />} />
      <Route path="/new-article" element={<NewArticlePage />} />
      <Route path="/articles/:id" element={<ArticleDetailsPage />} />
      <Route path="/articles/:id/modify" element={<EditArticlePage />} />
    </Routes>
  );
};

export default App;
