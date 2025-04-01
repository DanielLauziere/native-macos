import React from 'react';
import {requireNativeComponent, View, StyleSheet} from 'react-native';

const AVPlayerView = requireNativeComponent('AVPlayerView');

const VideoPlayer = () => {
  return (
    <View style={styles.container}>
      <AVPlayerView />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  //   video: {
  //     width: 800,
  //     height: 450,
  //   },
});

export default VideoPlayer;
