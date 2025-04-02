import React, {FC, useEffect, useState} from 'react';
import {Image, StyleSheet} from 'react-native';

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
});

const ResizeImage: FC<TablesProps> = ({path, fullSize = false}) => {
  const [imgWidth, setImgWidth] = useState(0);
  const [imgHeight, setImgHeight] = useState(0);
  const [aspectRatio, setAspectRatio] = useState(2);

  useEffect(() => {
    if (imgWidth !== 0 && imgHeight !== 0) {
      setAspectRatio(imgWidth / imgHeight);
    }
  }, [imgHeight, imgWidth]);

  let height: {height: number | string} = {height: 120};
  let width: {width: number | string | null} = {width: null};

  if (fullSize) {
    height = {height: '100%'};
    width = {width: '100%'};
  }

  return (
    <Image
      source={{uri: path}}
      style={{...styles.imageThumbnail, aspectRatio, ...height, ...width}}
      onLoad={e => {
        const width = e.nativeEvent.source.width;
        const height = e.nativeEvent.source.height;
        setImgWidth(width);
        setImgHeight(height);
      }}
    />
  );
};

export default ResizeImage;
