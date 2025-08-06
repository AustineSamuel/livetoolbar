import { View, Text } from 'react-native';
import React from 'react';
import { ProvidersService } from '@/app/screens/ApplyAsServiceProvider';
import { screenPadding } from '@/glob/style';
import moment from 'moment';

const RenderProviderResponseMessage: React.FC<{
  alreadyApplied: undefined | ProvidersService;
}> = ({ alreadyApplied }) => {
  if (!alreadyApplied) return null;

  const baseContainer = {
    padding: screenPadding,
    borderRadius: 10,
    margin: 16,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  };

  const headerText = {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  } as any

  const bodyText = {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  } as any

  if (!alreadyApplied.declined && !alreadyApplied.approved) {
    return (
      <View style={{ ...baseContainer, backgroundColor: '#fffbe6', borderColor: '#ffdd57' }}>
        <Text style={{ ...headerText, color: '#b38f00' }}>⏳ Application Pending</Text>
        <Text style={bodyText}>Your application was sent successfully. Please wait while it’s being reviewed.</Text>
      </View>
    );
  }

  if (alreadyApplied.declined) {
    return (
      <View style={{ ...baseContainer, backgroundColor: '#ffe6e6', borderColor: '#ff4d4f' }}>
        <Text style={{ ...headerText, color: '#a8071a' }}>❌ Application Declined</Text>
        <Text style={bodyText}>
          Reason: {alreadyApplied.reasonForDeclined || 'No reason provided.'}
        </Text>
      </View>
    );
  }

  if (alreadyApplied.approved) {
    return (
      <View style={{ ...baseContainer, backgroundColor: '#e6ffed', borderColor: '#52c41a' }}>
        <Text style={{ ...headerText, color: '#237804' }}>✅ Application Approved</Text>
        <Text style={bodyText}>
          Approved on: {moment(alreadyApplied.approvedAt).format('YYYY-MM-DD HH:mm:ss')}
        </Text>
        {alreadyApplied.reasonForDeclined && (
          <Text style={[bodyText, { marginTop: 4 }]}>
            Note: {alreadyApplied.reasonForDeclined}
          </Text>
        )}
      </View>
    );
  }

  return null;
};

export default RenderProviderResponseMessage;
