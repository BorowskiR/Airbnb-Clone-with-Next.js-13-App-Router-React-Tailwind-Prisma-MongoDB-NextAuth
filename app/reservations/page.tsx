import { EmptyState } from '@/components/EmptyState';
import { ReservationsClient } from './reservationsClient';

import getReservations from '@/actions/getReservations';
import getCurrentUser from '@/actions/getCurrentUser';

interface ReservationPageI {
  reservationId: string;
}

const ReservationPage = async ({ params }: { params: ReservationPageI }) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    <EmptyState title="Unauthorized" subtitle="Please login" />;
  }
  const reservations = await getReservations({
    authorId: currentUser?.id,
  });

  if (!reservations) {
    return (
      <EmptyState
        title="No reservations found"
        subtitle="Looks like you have no reservations on your property"
      />
    );
  }

  return (
    <ReservationsClient reservations={reservations} currentUser={currentUser} />
  );
};

export default ReservationPage;
