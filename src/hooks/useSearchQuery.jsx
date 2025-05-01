import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const useSearchQuery = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get('search') || '',
  );

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (searchQuery) {
      params.set('search', searchQuery);
    } else {
      params.delete('search');
    }
    navigate({ search: params.toString() }, { replace: true });
  }, [searchQuery, location.search, navigate]);

  return [searchQuery, setSearchQuery];
};

export default useSearchQuery;
