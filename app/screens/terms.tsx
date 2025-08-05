import React from 'react'
import { ScrollView, View, Text, StyleSheet } from 'react-native'
import Header from '@/utils/Header'

const TermsAndConditionsScreen = () => {
  return (
    <>
      <Header title="Terms & Conditions" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Terms and Conditions</Text>
        <Text style={styles.subheading}>Effective Date: July 11, 2025</Text>
        <Text style={styles.subheading}>Last Updated: [Insert latest update date]</Text>

        <Text style={styles.paragraph}>
          Welcome to LIFE TOOL BAR! These Terms and Conditions (“Terms”) govern your use of our
          website, mobile application, and services. By accessing or using our services, you agree
          to these Terms. If you do not agree, please do not use our platform or services.
        </Text>

        {/* Section 1 */}
        <Text style={styles.section}>1. Company Information</Text>
        <Text style={styles.paragraph}>
          LIFE TOOL BAR is registered under CAC Nigeria, registration number BN 3322200. Address:
          Shop No. 5, Traders Plaza, Zaria, Kaduna State.
        </Text>

        {/* Section 2 */}
        <Text style={styles.section}>2. Use of Services</Text>
        <Text style={styles.paragraph}>We provide services such as:</Text>
        <Text style={styles.list}>• Artisan workers (plumbers, painters, etc.)</Text>
        <Text style={styles.list}>• Routine workers (cleaners, laundry, etc.)</Text>
        <Text style={styles.list}>• Outsourced staff (sales, receptionist, domestic help)</Text>
        <Text style={styles.paragraph}>
          You must be at least 18 years old to use our services and capable of entering a legal
          agreement.
        </Text>

        {/* Section 3 */}
        <Text style={styles.section}>3. Service Requests and Agreements</Text>
        <Text style={styles.paragraph}>
          Requests may be submitted via phone, email, forms, or office visit. A service is confirmed
          upon agreement or payment.
        </Text>

        {/* Section 4 */}
        <Text style={styles.section}>4. Payments and Pricing</Text>
        <Text style={styles.paragraph}>
          Prices are provided based on scope. Payments are made via bank transfer, cash, or other
          accepted methods. Late payments may lead to suspension of service.
        </Text>

        {/* Section 5 */}
        <Text style={styles.section}>5. User Responsibilities</Text>
        <Text style={styles.list}>• Provide accurate information</Text>
        <Text style={styles.list}>• Do not misuse the service</Text>
        <Text style={styles.list}>• Allow necessary access to premises</Text>
        <Text style={styles.list}>• Treat our personnel respectfully</Text>

        {/* Section 6 */}
        <Text style={styles.section}>6. Outsourced Staffing Terms</Text>
        <Text style={styles.list}>• Do not hire our staff directly</Text>
        <Text style={styles.list}>• Ensure workplace safety</Text>
        <Text style={styles.list}>• Report issues or misconduct</Text>

        {/* Section 7 */}
        <Text style={styles.section}>7. Cancellations and Refunds</Text>
        <Text style={styles.paragraph}>
          Cancel at least 24 hours in advance. Refunds are based on circumstances. No refunds for
          last-minute or completed services unless agreed.
        </Text>

        {/* Section 8 */}
        <Text style={styles.section}>8. Limitation of Liability</Text>
        <Text style={styles.paragraph}>
          LIFE TOOL BAR is not liable for indirect or incidental damages, misuse, or third-party
          failures. Our liability is limited to the value of the service.
        </Text>

        {/* Section 9 */}
        <Text style={styles.section}>9. Intellectual Property</Text>
        <Text style={styles.paragraph}>
          All content is the property of LIFE TOOL BAR. Unauthorized use is prohibited.
        </Text>

        {/* Section 10 */}
        <Text style={styles.section}>10. Privacy and Data Use</Text>
        <Text style={styles.paragraph}>
          We handle your information according to our Privacy Policy.
        </Text>

        {/* Section 11 */}
        <Text style={styles.section}>11. Changes to Terms</Text>
        <Text style={styles.paragraph}>
          We may modify these terms anytime. Changes will be posted or communicated via app. Continued
          use means acceptance.
        </Text>

        {/* Section 12 */}
        <Text style={styles.section}>12. Termination</Text>
        <Text style={styles.paragraph}>
          We may suspend or terminate your access if you violate these terms or misuse the service.
        </Text>

        {/* Section 13 */}
        <Text style={styles.section}>13. Governing Law</Text>
        <Text style={styles.paragraph}>
          These terms are governed by Nigerian law. Disputes will be resolved in Kaduna State courts.
        </Text>

        {/* Section 14 */}
        <Text style={styles.section}>14. Contact Information</Text>
        <Text style={styles.paragraph}>Christian O. Uramah</Text>
        <Text style={styles.paragraph}>Managing Director – LIFE TOOL BAR</Text>
        <Text style={styles.paragraph}>📍 Shop No. 5, Traders Plaza, Zaria, Kaduna State</Text>
        <Text style={styles.paragraph}>📞 08135170922</Text>
        <Text style={styles.paragraph}>📧 lifetoolbar@gmail.com</Text>

        <Text style={[styles.paragraph, { marginTop: 20, fontStyle: 'italic' }]}>
          By continuing to use LIFE TOOL BAR’s services, you agree to these Terms and Conditions.
        </Text>
      </ScrollView>
    </>
  )
}

export default TermsAndConditionsScreen

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
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
  list: {
    fontSize: 14,
    color: '#333',
    paddingLeft: 12,
    marginBottom: 6,
  },
});
