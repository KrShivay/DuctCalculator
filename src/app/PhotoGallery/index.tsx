import * as React from 'react';
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import ScreenWrapper from '../../layout/ScreenWrapper';

type PhotoGalleryProps = {
  handleClick: (uri: string) => void;
};

const PhotoGallery = ({handleClick}: PhotoGalleryProps) => {
  const PHOTOS = Array.from({length: 24}).map(
    _ =>
      'https://fastly.picsum.photos/id/1068/300/300.jpg?hmac=zKd8Mz3C8enPRhzmFGBc0LhWP_qjQmyS3u-7sejZgEE',
  );

  return (
    <ScreenWrapper contentContainerStyle={styles.content}>
      {PHOTOS.map((uri, idx) => (
        <View key={idx} style={styles.item}>
          <TouchableOpacity onPress={() => handleClick(uri)}>
            <Image
              source={{uri}}
              style={styles.photo}
              accessibilityIgnoresInvertColors
            />
          </TouchableOpacity>
        </View>
      ))}
    </ScreenWrapper>
  );
};

export default PhotoGallery;

const styles = StyleSheet.create({
  ...Platform.select({
    web: {
      content: {
        // there is no 'grid' type in RN :(
        display: 'grid' as 'none',
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
        gridRowGap: '8px',
        gridColumnGap: '8px',
        padding: 8,
      },
      item: {
        width: '100%',
        height: 150,
      },
    },
    default: {
      content: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 4,
      },
      item: {
        height: Dimensions.get('window').width / 2,
        width: '50%',
        padding: 4,
      },
    },
  }),
  photo: {
    flex: 1,
    resizeMode: 'cover',
  },
  screen: {
    flex: 1,
  },
});
