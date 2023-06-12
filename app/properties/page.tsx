import getCurrentUser from '@/actions/getCurrentUser';
import { EmptyState } from '@/components/EmptyState';
import getListings from '@/actions/getListings';

const PropertiesCopy = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  const listing = await getListings({
    userId: currentUser.id,
  });

  if (listing.length === 0) {
    return (
      <EmptyState
        title="No properties found"
        subtitle="Looks like you have no properties."
      />
    );
  }

  return <PropertiesClient listing={listing} currentUser={currentUser} />;
};

export default PropertiesCopy;
