import React, {FC} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

interface TablesProps {
  name: string;
  path: string;
  setSelectedVideoPath: (path: string) => Promise<void>;
}

const styles = StyleSheet.create({
  view: {
    height: 120,
    aspectRatio: 2,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  image: {height: 30, width: 30},
  text: {color: 'black'},
});

const VideoButton: FC<TablesProps> = ({path, name, setSelectedVideoPath}) => {
  return (
    <View style={styles.view} onTouchStart={() => setSelectedVideoPath(path)}>
      <Text style={styles.text}>{name}</Text>
      <Image style={styles.image} source={require('./../assets/video.png')} />
    </View>
  );
};

export default VideoButton;
