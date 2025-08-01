import React, { useState } from 'react'
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  ScrollView,
} from 'react-native'
import Header from '@/utils/Header'
import { router } from 'expo-router'
import colors from '@/constants/Colors'

export interface Job {
  id: string
  title: string
  images: string[]
  descriptions: string
  createdAt: string
  updatedAt: string
}

interface JobsProps {
  isAdmin?: boolean
}

const fakeJobs: Job[] = [
  {
    id: '1',
    title: 'React Native Developer',
    images: ['https://via.placeholder.com/100'],
    descriptions: 'Build mobile apps using React Native framework.',
    createdAt: '2024-07-01',
    updatedAt: '2024-07-10',
  },
  {
    id: '2',
    title: 'Backend Engineer',
    images: ['https://via.placeholder.com/100'],
    descriptions: 'Develop APIs and manage databases.',
    createdAt: '2024-06-15',
    updatedAt: '2024-07-05',
  },
  {
    id: '3',
    title: 'UI/UX Designer',
    images: ['https://via.placeholder.com/100'],
    descriptions: 'Design user interfaces and improve user experience.',
    createdAt: '2024-05-20',
    updatedAt: '2024-06-10',
  },
]

export const JobsScreen: React.FC<JobsProps> = ({ isAdmin }) => {
  const [jobs, setJobs] = useState<Job[]>(fakeJobs)
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [editMode, setEditMode] = useState<'edit' | 'delete' | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [editDescription, setEditDescription] = useState('')

  const openEditModal = (job: Job) => {
    setSelectedJob(job)
    setEditTitle(job.title)
    setEditDescription(job.descriptions)
    setEditMode('edit')
    setModalVisible(true)
  }

  const openDeleteModal = (job: Job) => {
    setSelectedJob(job)
    setEditMode('delete')
    setModalVisible(true)
  }

  const saveEdit = () => {
    if (!selectedJob) return
    const updatedJobs = jobs.map(job =>
      job.id === selectedJob.id
        ? { ...job, title: editTitle, descriptions: editDescription, updatedAt: new Date().toISOString() }
        : job
    )
    setJobs(updatedJobs)
    closeModal()
  }

  const deleteJob = () => {
    if (!selectedJob) return
    const updatedJobs = jobs.filter(job => job.id !== selectedJob.id)
    setJobs(updatedJobs)
    closeModal()
  }

  const closeModal = () => {
    setModalVisible(false)
    setSelectedJob(null)
    setEditMode(null)
  }

  const renderJob = ({ item }: { item: Job }) => (
    <View style={styles.jobCard}>
      <Image source={{ uri: item.images[0] }} style={styles.jobImage} />
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={styles.jobTitle}>{item.title}</Text>
        <Text numberOfLines={2} style={styles.jobDescription}>
          {item.descriptions}
        </Text>
       
      </View>

      {isAdmin ?  (
        <View style={styles.actions}>
          <TouchableOpacity style={styles.editBtn} onPress={() => openEditModal(item)}>
            <Text style={styles.btnText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteBtn} onPress={() => openDeleteModal(item)}>
            <Text style={styles.btnText}>Delete</Text>
          </TouchableOpacity>
        </View>
      ):(
         <View style={styles.actions}>
          <TouchableOpacity style={[styles.editBtn,{backgroundColor:colors.primaryColor}]} onPress={() =>{
            router.push("/screens/ApplyAsServiceProvider")
          }}>
            <Text style={styles.btnText}>Apply</Text>
          </TouchableOpacity>
       
        </View>
      )}
    </View>
  )

  return (
    <>
    
      <FlatList
        data={jobs}
        keyExtractor={item => item.id}
        renderItem={renderJob}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            {editMode === 'edit' && selectedJob && (
              <>
                <Text style={styles.modalTitle}>Edit Job</Text>
                <ScrollView>
                  <Text style={{ marginBottom: 4 }}>Title:</Text>
                  <TextInput
                    value={editTitle}
                    onChangeText={setEditTitle}
                    style={styles.input}
                  />
                  <Text style={{ marginBottom: 4, marginTop: 12 }}>Description:</Text>
                  <TextInput
                    value={editDescription}
                    onChangeText={setEditDescription}
                    multiline
                    numberOfLines={4}
                    style={[styles.input, { height: 80 }]}
                  />
                </ScrollView>
                <View style={styles.modalButtons}>
                  <Button title="Cancel" onPress={closeModal} />
                  <Button title="Save" onPress={saveEdit} />
                </View>
              </>
            )}

            {editMode === 'delete' && selectedJob && (
              <>
                <Text style={styles.modalTitle}>Confirm Delete</Text>
                <Text style={{ marginBottom: 20 }}>
                  Are you sure you want to delete job:{"\n"}
                  <Text style={{ fontWeight: "bold" }}>{selectedJob.title}</Text>?
                </Text>
                <View style={styles.modalButtons}>
                  <Button title="Cancel" onPress={closeModal} />
                  <Button title="Delete" onPress={deleteJob} color="red" />
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  jobCard: {
    flexDirection: 'row',
    padding: 12,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  jobImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#ccc',
  },
  jobTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  jobDescription: {
    color: '#555',
    marginTop: 4,
  },
  jobDates: {
    color: '#999',
    fontSize: 12,
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
  },
  editBtn: {
    backgroundColor: '#4caf50',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
  },
  deleteBtn: {
    backgroundColor: '#f44336',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    maxHeight: '80%',
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 12,
  },
  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
})
