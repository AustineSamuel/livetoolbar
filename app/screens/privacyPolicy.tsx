import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import Header from '@/utils/Header';

const PrivacyPolicyScreen = () => {
  return (
    <>
      <Header title="Privacy Policy" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Privacy Policy</Text>
        <Text style={styles.subheading}>Effective Date: July 11, 2025</Text>
        <Text style={styles.subheading}>Last Updated: [Insert Date of Last Update]</Text>

        <Text style={styles.paragraph}>
          Welcome to LIFE TOOL BAR. Your privacy is important to us. This Privacy Policy explains how we collect, use, share, and protect your personal information when you use our website, mobile application, and services.
        </Text>

        <Text style={styles.paragraph}>
          By using our website or app, you agree to the terms of this Privacy Policy.
        </Text>

        {/* Section 1 */}
        <Text style={styles.section}>1. Information We Collect</Text>
        <Text style={styles.subsection}>a. Information You Provide to Us</Text>
        <Text style={styles.listItem}>• Name, phone number, email address, and physical address</Text>
        <Text style={styles.listItem}>• Resume/CV, work experience, or personal identification</Text>
        <Text style={styles.listItem}>• Service requests or inquiries submitted through forms or chat features</Text>

        <Text style={styles.subsection}>b. Information Collected Automatically</Text>
        <Text style={styles.listItem}>• IP address and browser type</Text>
        <Text style={styles.listItem}>• Device type and operating system</Text>
        <Text style={styles.listItem}>• Usage data (pages visited, time spent, clicks)</Text>

        <Text style={styles.subsection}>c. Cookies & Tracking Technologies</Text>
        <Text style={styles.paragraph}>
          We may use cookies and similar tracking technologies to improve your user experience. You can disable cookies in your browser settings.
        </Text>

        {/* Section 2 */}
        <Text style={styles.section}>2. How We Use Your Information</Text>
        <Text style={styles.listItem}>• Respond to inquiries and service requests</Text>
        <Text style={styles.listItem}>• Match you with job opportunities or service roles</Text>
        <Text style={styles.listItem}>• Provide and improve our services</Text>
        <Text style={styles.listItem}>• Communicate updates, offers, or service notifications</Text>
        <Text style={styles.listItem}>• Ensure security and legal compliance</Text>

        {/* Section 3 */}
        <Text style={styles.section}>3. How We Share Your Information</Text>
        <Text style={styles.paragraph}>We do not sell your personal information.</Text>
        <Text style={styles.listItem}>• With service providers or contractors helping us deliver services</Text>
        <Text style={styles.listItem}>• With clients (only with your consent)</Text>
        <Text style={styles.listItem}>• With regulatory authorities when required by law</Text>
        <Text style={styles.paragraph}>All third parties are expected to follow strict confidentiality standards.</Text>

        {/* Section 4 */}
        <Text style={styles.section}>4. Data Security</Text>
        <Text style={styles.paragraph}>
          We take reasonable measures to secure your data, including encryption, access controls, and secure storage. However, no internet or app system is 100% secure.
        </Text>

        {/* Section 5 */}
        <Text style={styles.section}>5. Your Rights</Text>
        <Text style={styles.listItem}>• Access or update your data</Text>
        <Text style={styles.listItem}>• Request deletion</Text>
        <Text style={styles.listItem}>• Withdraw consent</Text>
        <Text style={styles.listItem}>• Object to certain processing</Text>
        <Text style={styles.paragraph}>
          To exercise your rights, contact us at lifetoolbar@gmail.com or call 08135170922.
        </Text>

        {/* Section 6 */}
        <Text style={styles.section}>6. Data Retention</Text>
        <Text style={styles.paragraph}>
          We retain your data only as long as needed for our services or as required by law. When no longer needed, it will be deleted or anonymized.
        </Text>

        {/* Section 7 */}
        <Text style={styles.section}>7. Children’s Privacy</Text>
        <Text style={styles.paragraph}>
          Our services are not intended for children under 13. If such data is collected, it will be promptly deleted.
        </Text>

        {/* Section 8 */}
        <Text style={styles.section}>8. Links to Third-Party Sites</Text>
        <Text style={styles.paragraph}>
          Our website or app may contain links to third-party websites. We are not responsible for their privacy practices or content.
        </Text>

        {/* Section 9 */}
        <Text style={styles.section}>9. Changes to This Privacy Policy</Text>
        <Text style={styles.paragraph}>
          We may update this policy occasionally. If major changes occur, we’ll notify you via email or in-app. The latest version will always be accessible in the app or website.
        </Text>

        {/* Section 10 */}
        <Text style={styles.section}>10. Contact Us</Text>
        <Text style={styles.paragraph}>Christian O. Uramah</Text>
        <Text style={styles.paragraph}>Managing Director, LIFE TOOL BAR</Text>
        <Text style={styles.paragraph}>📍 Shop No. 5, Traders Plaza, Zaria, Kaduna State</Text>
        <Text style={styles.paragraph}>📞 Phone: 08135170922</Text>
        <Text style={styles.paragraph}>📧 Email: lifetoolbar@gmail.com</Text>
      </ScrollView>
    </>
  );
};

export default PrivacyPolicyScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#111',
  },
  subheading: {
    fontSize: 14,
    color: '#555',
    marginBottom: 6,
  },
  paragraph: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
    lineHeight: 22,
  },
  section: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 8,
    color: '#000',
  },
  subsection: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    marginTop: 10,
    color: '#444',
  },
  listItem: {
    fontSize: 14,
    color: '#333',
    paddingLeft: 12,
    marginBottom: 4,
  },
});
