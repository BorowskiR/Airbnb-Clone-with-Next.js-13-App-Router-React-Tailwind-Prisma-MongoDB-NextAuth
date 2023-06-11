import { EmptyState } from '@/components/EmptyState';
import ListingClient from './ListingClient';

import getListingById from '@/actions/getListingById';
import getReservations from '@/actions/getReservations';
import getCurrentUser from '@/actions/getCurrentUser';

interface IParams {
  listingId: string;
}

export default async function ListingPage({ params }: { params: IParams }) {
  const listing = await getListingById(params);
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return <EmptyState />;
  }

  return (
    <ListingClient
      reservations={reservations}
      listing={listing}
      currentUser={currentUser}
    />
  );
}
