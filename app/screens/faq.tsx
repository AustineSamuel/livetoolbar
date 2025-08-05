import React from 'react'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native'
import Header from '@/utils/Header'
import { Ionicons } from '@expo/vector-icons'

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true)
}

const FAQScreen: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = React.useState<number | null>(null)

  const toggleExpand = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  const faqs = [
    {
      question: 'What personal data does LIFE TOOL BAR collect?',
      answer:
        'We collect information like your name, contact details, resume, and service inquiries. We also collect device data and usage behavior automatically.',
    },
    {
      question: 'Do you share my information with third parties?',
      answer:
        'We do not sell your data. We only share it with service providers or clients (with your consent) and regulatory bodies when legally required.',
    },
    {
      question: 'How is my data protected?',
      answer:
        'We use encryption, access controls, and secure storage to protect your data. However, no system is completely immune to breaches.',
    },
    {
      question: 'Can I delete my information?',
      answer:
        'Yes. You can request access, updates, or deletion of your data by contacting lifetoolbar@gmail.com or calling 08135170922.',
    },
    {
      question: 'What if I am under 13?',
      answer:
        'Our services are not intended for children under 13. If we find such data, it will be deleted promptly.',
    },
    {
      question: 'How long do you keep my data?',
      answer:
        'We retain your data only as long as necessary to provide services or comply with laws. Once it’s no longer needed, it’s securely deleted.',
    },
    {
      question: 'What happens if the Privacy Policy changes?',
      answer:
        'We’ll notify you of any significant changes via email or app notification. The latest version is always available on our app or website.',
    },
  ]

  return (
    <>
      <Header title="FAQs - Privacy & Security" />
      <ScrollView contentContainerStyle={styles.container}>
        {faqs.map((faq, index) => (
          <View key={index} style={styles.card}>
            <TouchableOpacity onPress={() => toggleExpand(index)} style={styles.questionRow}>
              <Text style={styles.question}>{faq.question}</Text>
              <Ionicons
                name={expandedIndex === index ? 'chevron-up' : 'chevron-down'}
                size={22}
                color="#333"
              />
            </TouchableOpacity>
            {expandedIndex === index && <Text style={styles.answer}>{faq.answer}</Text>}
          </View>
        ))}
      </ScrollView>
    </>
  )
}

export default FAQScreen

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
  },
  questionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  question: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    flex: 1,
    marginRight: 8,
  },
  answer: {
    marginTop: 10,
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
})
