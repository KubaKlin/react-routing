import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const useSearchQuery = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get('search') || '',
  );

  const settingSearchQuery = (newQuery) => {
    setSearchQuery(newQuery);
    const params = new URLSearchParams(location.search);
    if (newQuery) {
      params.set('search', newQuery);
    } else {
      params.delete('search');
    }
    navigate({ search: params.toString() }, { replace: true });
  };

  return [searchQuery, settingSearchQuery];
};

export default useSearchQuery;
