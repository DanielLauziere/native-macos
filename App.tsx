import React from 'react';
import VideoPlayer from './src/VideoPlayer';
import {Button, FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import {useState, useEffect} from 'react';
import RNFS from 'react-native-fs';
import ResizeImage from './src/ResizeImage';

const Item = ({name, path, isFile, getFileContent}) => {
  return (
    <View style={styles.imageContainer}>
      {!isFile && <Button title={path} onPress={() => getFileContent(path)} />}
    </View>
  );
};

function App() {
  const [files, setFiles] = useState<RNFS.ReadDirItem[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | undefined>(
    undefined,
  );
  const [selectedVideo, setSelectedVideo] = useState<string | undefined>(
    undefined,
  );
  // const videoRef = useRef<VideoRef>(null);

  const getFileContent = async (path: string) => {
    const reader = await RNFS.readDir(path);
    setFiles(reader);
  };

  useEffect(() => {
    getFileContent(RNFS.DocumentDirectoryPath);
  }, []);

  const setSelectedVideoPath = async (path: string) => {
    if (await RNFS.exists(path)) {
      setSelectedVideo('test');

      // RNFS.copyAssetsVideoIOS(path, RNFS.DocumentDirectoryPath).then(e =>
      //   console.log(e),
      // );

      // RNFS.copyFile(path, RNFS.DocumentDirectoryPath).then(e => {
      //   console.log(e);
      // });
    }
  };

  const renderItem = ({item}) => {
    return (
      <View key={`${item.path}`}>
        <Item
          name={item.name}
          path={item.path}
          isFile={item.isFile()}
          getFileContent={getFileContent}
        />
      </View>
    );
  };
  return (
    <SafeAreaView>
      <Button
        title={'./'}
        onPress={() => {
          setSelectedFile(undefined);
          setSelectedVideo(undefined);
          getFileContent(RNFS.DocumentDirectoryPath);
        }}
      />

      {selectedFile ? (
        <View style={styles.fullsizeContainer}>
          <ResizeImage path={selectedFile} fullSize />
        </View>
      ) : selectedVideo ? (
        <View style={styles.fullsizeContainer}>
          <VideoPlayer />
        </View>
      ) : (
        <>
          <FlatList
            data={files}
            renderItem={renderItem}
            keyExtractor={item => item.name}
          />
          <View style={styles.imageContainer}>
            {files.map(({path}, i) => {
              return path.includes('jpg') ? (
                <View
                  key={`${path}-${i}`}
                  onTouchStart={() => {
                    setSelectedFile(path);
                  }}>
                  <ResizeImage path={path} />
                </View>
              ) : path.includes('mp4') ? (
                <Button
                  title={path}
                  onPress={() => {
                    setSelectedVideoPath(path);
                  }}
                />
              ) : (
                <></>
              );
            })}
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
    width: '100%',
    flexWrap: 'wrap',
  },
  imageThumbnail: {
    height: 100,
    width: null,
    flex: 1,
    justifyContent: 'center',
  },
  fullsizeContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default App;
