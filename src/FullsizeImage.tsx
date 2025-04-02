import React, {FC, useEffect, useState} from 'react';
import {Image, StyleSheet, View, Dimensions} from 'react-native';

interface TablesProps {
  path: string;
  fullSize?: boolean;
}

const styles = StyleSheet.create({
  imageThumbnail: {
    height: 120,
    width: null,
    aspectRatio: 3,
    objectFit: 'contain',
  },
  fullsizeCenterContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

const FullsizeImage: FC<TablesProps> = ({path}) => {
  const windowHeight = Dimensions.get('window').height;
  const windowWidth = Dimensions.get('window').width;
  const windowAspectRatio = windowWidth / windowHeight;

  const [imgWidth, setImgWidth] = useState(0);
  const [imgHeight, setImgHeight] = useState(0);
  const [aspectRatio, setAspectRatio] = useState(2);
  const [direction, setDirection] = useState('row');

  useEffect(() => {
    if (aspectRatio > windowAspectRatio) {
      setDirection('row');
    } else {
      setDirection('column');
    }
  }, [aspectRatio, windowAspectRatio]);

  useEffect(() => {
    if (imgWidth !== 0 && imgHeight !== 0) {
      setAspectRatio(imgWidth / imgHeight);
    }
  }, [imgHeight, imgWidth]);

  let height: {height: number | string} = {height: 120};
  let width: {width: number | string | null} = {width: null};

  height = {height: '100%'};
  width = {width: '100%'};

  return (
    <View style={{...styles.fullsizeCenterContainer, flexDirection: direction}}>
      <Image
        source={{uri: path}}
        style={{
          ...styles.imageThumbnail,
          aspectRatio,
          ...height,
          ...width,
          ...{resizeMode: 'contain'},
        }}
        onLoad={e => {
          const width = e.nativeEvent.source.width;
          const height = e.nativeEvent.source.height;
          setImgWidth(width);
          setImgHeight(height);
        }}
      />
    </View>
  );
};

export default FullsizeImage;
