import globStyle from '@/glob/style';
import React from 'react';
import { Text, View } from 'react-native';
import { StarRatingDisplay } from 'react-native-star-rating-widget';

const StarRatingComponent: React.FC<{ rating: 0 | 1 | 2 | 3 | 4 | 5 | number }> = ({ rating }) => {
  return (
    <View style={[globStyle.flexItem, globStyle.alignCenter]}>
      <Text>{rating}/5</Text>
      <StarRatingDisplay
        rating={rating}
      starStyle={
        {
          marginHorizontal: 0
        }
      }
        starSize={16} // Adjust the size as needed
        color="#FFD700" // Customize the star color
      />
    </View>
  );
};

export default StarRatingComponent;
