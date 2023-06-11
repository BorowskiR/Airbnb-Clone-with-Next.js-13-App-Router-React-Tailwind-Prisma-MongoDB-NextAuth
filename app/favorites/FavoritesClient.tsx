'use client';

import { Container } from '@/components/Container';
import { Heading } from '@/components/Heading';
import { ListingItem } from '@/components/listings/ListingItem';

import { SafeListing, SafeUser } from '@/types';

interface FavoritesClientProps {
  currentUser?: SafeUser | null;
  favoritesListing: SafeListing[];
}

export const FavoritesClient: React.FC<FavoritesClientProps> = ({
  favoritesListing,
  currentUser,
}) => {
  return (
    <Container>
      <Heading title="Favorites" subtitle="List of places you favorited!" />
      <div
        className="
            mt-10
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
          "
      >
        {favoritesListing.map((listing: any) => (
          <ListingItem
            currentUser={currentUser}
            key={listing.id}
            data={listing}
          />
        ))}
      </div>
    </Container>
  );
};
