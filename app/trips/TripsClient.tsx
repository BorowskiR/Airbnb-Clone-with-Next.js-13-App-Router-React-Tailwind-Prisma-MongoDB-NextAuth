'use client';

import { Container } from '@/components/Container';
import { Heading } from '@/components/Heading';
import { ListingItem } from '@/components/listings/ListingItem';
import { SafeReservation, SafeUser } from '@/types';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';

interface TripsClientProps {
  reservations: SafeReservation[];
  currentUser: SafeUser;
}

export const TripsClient: React.FC<TripsClientProps> = ({
  currentUser,
  reservations,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success('Reservation deleted');
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
        })
        .finally(() => {
          setDeletingId('');
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading
        title="Trips"
        subtitle="Where you have been and where you are going"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation) => (
          <ListingItem
            key={reservation.id}
            reservation={reservation}
            data={reservation.listing}
            actionId={reservation.id}
            disabled={deletingId === reservation.id}
            onAction={onCancel}
            actionLabel="Cancel reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};
