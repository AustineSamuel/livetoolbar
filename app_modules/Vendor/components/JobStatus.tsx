import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { screenPadding } from '@/glob/style';
import moment from 'moment';
import { JobApplication } from '@/app/screens/job_applications';

interface Props {
  myApplication?: JobApplication;
}

const RenderJobApplicationStatus: React.FC<Props> = ({ myApplication }) => {
  if (!myApplication) return null;

  if (!myApplication.amHired) {
    return (
      <View style={[styles.container, styles.pending]}>
        <Text style={[styles.header, styles.pendingText]}>⏳ Under Review</Text>
        <Text style={styles.body}>
          Your application was received on{' '}
          {moment(myApplication.appliedAt).format('YYYY-MM-DD')}. Please wait for the job poster to make a decision.
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, styles.approved]}>
      <Text style={[styles.header, styles.approvedText]}>✅ You've Been Hired</Text>
      <Text style={styles.body}>
        Congratulations! You were hired on {moment(myApplication.appliedAt).format('YYYY-MM-DD')}.
      </Text>
    </View>
  );
};

export default RenderJobApplicationStatus;

const styles = StyleSheet.create({
  container: {
    padding: screenPadding,
    borderRadius: 10,
    margin: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  body: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
  approved: {
    backgroundColor: '#e6ffed',
    borderColor: '#52c41a',
  },
  approvedText: {
    color: '#237804',
  },
  pending: {
    backgroundColor: '#fffbe6',
    borderColor: '#ffdd57',
  },
  pendingText: {
    color: '#b38f00',
  },
});
