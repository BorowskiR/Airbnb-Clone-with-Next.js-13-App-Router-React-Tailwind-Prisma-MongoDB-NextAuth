import { EmptyState } from '@/components/EmptyState';
import { FavoritesClient } from './FavoritesClient';

import getCurrentUser from '@/actions/getCurrentUser';
import getFavoriteListings from '@/actions/getFavoriteListings';

const FavoritesPage = async () => {
  const currentUser = await getCurrentUser();
  const favoritesListing = await getFavoriteListings();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  if (favoritesListing.length === 0) {
    return (
      <EmptyState
        title="No favorites found"
        subtitle="Looks like you have no favorite listings."
      />
    );
  }

  return (
    <FavoritesClient
      favoritesListing={favoritesListing}
      currentUser={currentUser}
    />
  );
};

export default FavoritesPage;
