'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';

import { Container } from '@/components/Container';
import { Heading } from '@/components/Heading';
import { ListingItem } from '@/components/listings/ListingItem';

import { SafeReservation, SafeUser } from '@/types';

interface ReservationsI {
  reservations: SafeReservation[];
  currentUser?: SafeUser | null;
}

export const ReservationsClient: React.FC<ReservationsI> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success('Reservation cancelled');
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
      <Heading title="Reservations" subtitle="Bookings on your properties" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation) => (
          <ListingItem
            key={reservation.id}
            reservation={reservation}
            data={reservation.listing}
            actionId={reservation.id}
            disabled={deletingId === reservation.id}
            onAction={onCancel}
            actionLabel="Cancel guest reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};
