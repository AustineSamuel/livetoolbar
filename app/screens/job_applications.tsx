import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, useFocusEffect } from 'expo-router';
import Header from '@/utils/Header';
import { Job } from '@/app_modules/User/components/Jobs';
import colors from '@/constants/Colors';
import BR from '@/utils/BR';
import { User } from '@/types/user.types';
import moment from 'moment';
import MyButton from '@/utils/button';

export interface JobApplication {
  person: User;
  uid: string;
  appliedAt: string;
  jobId:string,
  coverLetter:string,
  amHired: boolean;
}

const JobApplications: React.FC = () => {
  const [job, setJob] = useState<Job>();
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const params = useLocalSearchParams();

  const fetchApplications = () => {
    setLoading(true);
    const parsedJob: Job | null = params.job ? JSON.parse(params.job as string) : null;
    if (parsedJob) {
      setJob(parsedJob);

      // Simulate async data load
      setTimeout(() => {
        setApplications([
          {
            uid: '1',
            appliedAt: new Date().toISOString(),
            amHired: false,
            person: {
              fullname: 'Mary Johnson',
              username: 'maryj',
              photo: 'https://randomuser.me/api/portraits/women/1.jpg',
            },
          },
          {
            uid: '2',
            appliedAt: new Date().toISOString(),
            amHired: true,
            person: {
              fullname: 'James Smith',
              username: 'jamess',
              photo: 'https://randomuser.me/api/portraits/men/2.jpg',
            },
          },
        ]);
        setLoading(false);
      }, 1000);
    } else {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchApplications();
    }, [params.job])
  );

  const handleHire = (uid: string) => {
    setApplications((prev) =>
      prev.map((app) => ({
        ...app,
        amHired: app.uid === uid,
      }))
    );
  };

  const handleMessage = (username: string) => {
    console.log(`Messaging ${username}`);
  };

  const filteredApps = applications.filter(
    (app) =>
      app.person.fullname.toLowerCase().includes(search.toLowerCase()) ||
      app.person.username.toLowerCase().includes(search.toLowerCase())
  );

  if (!job) {
    return (
      <View style={styles.container}>
        <Header title="Job Applications" />
        <Text style={styles.text}>No job data found.</Text>
      </View>
    );
  }

  return (
    <>
      <Header title="Job Applications" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{job.title}</Text>
        <BR height={10} />

        {job.images?.length > 0 && (
          <View style={styles.imageGallery}>
            {job.images.map((image: string, i: number) => (
              <Image key={i} source={{ uri: image }} style={styles.image} />
            ))}
          </View>
        )}

        <Text style={styles.label}>Description</Text>
        <Text style={styles.text}>{job.descriptions}</Text>

        <Text style={styles.title}>Applications</Text>
        <TextInput
          placeholder="Search applicants..."
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
        />
        <BR height={10} />

        {loading ? (
          <View style={styles.loadingWrapper}>
            <ActivityIndicator size="large" color={colors.primaryColor} />
          </View>
        ) : filteredApps.length === 0 ? (
          <Text style={styles.text}>No applications found.</Text>
        ) : (
          filteredApps.map((app) => (
            <View key={app.uid} style={styles.appCard}>
              <View style={styles.appRow}>
                <Image source={{ uri: app.person.photo }} style={styles.appAvatar} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.appName}>{app.person.fullname}</Text>
                  <Text style={styles.appUsername}>@{app.person.username}</Text>
                  <Text style={styles.appliedAt}>
                    Applied: {moment(app.appliedAt).format('MMM D, YYYY')}
                  </Text>
                  {app.amHired && (
                    <Text style={styles.hiredText}>✅ Hired</Text>
                  )}
                </View>
              </View>
              <View style={styles.actionsRow}>
                {!app.amHired && (
                  <MyButton
                    label="Hire"
                    style={styles.hireButton}
                    textStyle={{ color: colors.white }}
                    onPress={() => handleHire(app.uid)}
                  />
                )}
                <TouchableOpacity
                  onPress={() => handleMessage(app.person.username)}
                  style={styles.messageBtn}
                >
                  <Text style={styles.messageText}>Message</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </>
  );
};

export default JobApplications;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  loadingWrapper: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  imageGallery: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
    backgroundColor: colors.lightGray,
    padding: 5,
    borderRadius: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#eee',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#222',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    color: '#333',
  },
  text: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
    marginBottom: 20,
  },
  appCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#eee',
  },
  appRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  appAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  appName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#222',
  },
  appUsername: {
    color: '#777',
    fontSize: 14,
  },
  appliedAt: {
    color: '#999',
    fontSize: 13,
    marginTop: 4,
  },
  hiredText: {
    color: colors.success,
    fontWeight: 'bold',
    marginTop: 4,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    gap: 10,
  },
  hireButton: {
    backgroundColor: colors.primaryColor,
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  messageBtn: {
    borderColor: colors.primaryColor,
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  messageText: {
    color: colors.primaryColor,
    fontWeight: '600',
  },
});
