import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import HomeHeader from '../components/HomeHeader';

export interface bookingsProps {
  uid: string;
  message: string;
  type: 'service' | 'job';
  status: 'pending' | 'failed' | 'canceled' | 'completed';
  statusUpdatedAt: string;
  jobId: string;
  service: {
    id: string;
    provider: string;
    otherDetails: any;
  };
}

// Fake Bookings Data
const fakeBookings: bookingsProps[] = [
  {
    uid: '1',
    message: 'Electrician booked for home wiring',
    type: 'service',
    status: 'completed',
    statusUpdatedAt: '2025-07-27T10:00:00',
    jobId: 'job-001',
    service: {
      id: 'srv-001',
      provider: 'John Electrician',
      otherDetails: {},
    },
  },
  {
    uid: '2',
    message: 'Cleaning job scheduled for tomorrow',
    type: 'job',
    status: 'pending',
    statusUpdatedAt: '2025-07-29T14:30:00',
    jobId: 'job-002',
    service: {
      id: 'srv-002',
      provider: 'Jane Cleaner',
      otherDetails: {},
    },
  },
  {
    uid: '3',
    message: 'Plumber request failed due to timeout',
    type: 'service',
    status: 'failed',
    statusUpdatedAt: '2025-07-28T18:45:00',
    jobId: 'job-003',
    service: {
      id: 'srv-003',
      provider: 'Mike Plumber',
      otherDetails: {},
    },
  },
];

const Bookings = () => {
  const [bookings] = useState<bookingsProps[]>(fakeBookings); // set to [] to test empty state

  const getStatusColor = (status: bookingsProps['status']) => {
    switch (status) {
      case 'completed':
        return '#00a86b';
      case 'pending':
        return '#f0ad4e';
      case 'failed':
      case 'canceled':
        return '#d9534f';
      default:
        return '#999';
    }
  };

  const renderBooking = ({ item }: { item: bookingsProps }) => (
    <View style={styles.card}>
      <Text style={styles.message}>{item.message}</Text>
      <Text style={styles.provider}>By: {item.service.provider}</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Status:</Text>
        <Text style={[styles.status, { color: getStatusColor(item.status) }]}>
          {item.status.toUpperCase()}
        </Text>
      </View>
      <Text style={styles.date}>
        {new Date(item.statusUpdatedAt).toLocaleString()}
      </Text>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <HomeHeader />

      <View style={{ padding: 16, flex: 1 }}>
        {bookings.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>📂 No bookings found</Text>
          </View>
        ) : (
          <FlatList
            data={bookings}
            keyExtractor={(item) => item.uid}
            renderItem={renderBooking}
            ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
};

export default Bookings;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 15,
  },
  message: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    marginBottom: 4,
  },
  provider: {
    fontSize: 14,
    color: '#555',
    marginBottom: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    color: '#333',
  },
  status: {
    fontSize: 14,
    fontWeight: '700',
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 80,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});
