import React from 'react';
import VideoPlayer from './src/VideoPlayer';
import {
  Button,
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {useState, useEffect} from 'react';
import RNFS from 'react-native-fs';
import ResizeImage from './src/ResizeImage';
import VideoButton from './src/VideoButton';
import FullsizeImage from './src/FullsizeImage';

const Item = ({name, path, isFile, getFileContent}) => {
  return (
    <View style={styles.imageContainer}>
      {!isFile && (
        <Button
          title={path.replace('/Users/daniellauziere/Documents/', '')}
          onPress={() => getFileContent(path)}
        />
      )}
    </View>
  );
};

function App() {
  const [path, setPath] = useState(RNFS.DocumentDirectoryPath);
  const [files, setFiles] = useState<RNFS.ReadDirItem[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | undefined>(
    undefined,
  );
  const [selectedVideo, setSelectedVideo] = useState<string | undefined>(
    undefined,
  );
  // const videoRef = useRef<VideoRef>(null);

  const getFileContent = async (path: string) => {
    setPath(path);
    const reader = await RNFS.readDir(path);

    const sorted = reader.sort((a, b) => a.name.localeCompare(b.name));

    setFiles(sorted);
  };

  useEffect(() => {
    setPath(RNFS.DocumentDirectoryPath);
    getFileContent(RNFS.DocumentDirectoryPath);
  }, []);

  const setSelectedVideoPath = async (path: string) => {
    if (await RNFS.exists(path)) {
      if (Platform.OS === 'macos') {
        const localFilePath = path.replace('file://', '');
        // Check if file exists
        const fileExists = await RNFS.exists(localFilePath);
        if (!fileExists) {
          console.error('File does not exist:', localFilePath);
          return;
        }
        setSelectedVideo(localFilePath);
      }
    }
  };

  const renderItem = ({item}) => {
    return (
      <View>
        <Item
          name={item.name}
          path={item.path}
          isFile={item.isFile()}
          getFileContent={getFileContent}
        />
      </View>
    );
  };

  const move = (forward: boolean) => {
    const currentIndex = files.findIndex(({path}) => {
      if (selectedFile) {
        return path === selectedFile;
      } else if (selectedVideo) {
        return path === selectedVideo;
      } else {
        return false;
      }
    });
    if (forward) {
      try {
        let i = 1;
        let nextFile = files[currentIndex + i].path;
        while (nextFile) {
          console.log('nextFile: ' + nextFile);

          if (nextFile.includes('mp4')) {
            setSelectedFile(undefined);
            setSelectedVideo(nextFile);
            break;
          } else if (
            nextFile.includes('jpg') ||
            nextFile.includes('jpeg') ||
            nextFile.includes('png')
          ) {
            setSelectedVideo(undefined);
            setSelectedFile(nextFile);
            break;
          } else {
            i++;
            nextFile = files[currentIndex + i].path;
          }
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        let i = 1;
        let nextFile = files[currentIndex - i].path;
        while (nextFile) {
          console.log('nextFile: ' + nextFile);

          if (nextFile.includes('mp4')) {
            setSelectedFile(undefined);
            setSelectedVideo(nextFile);
            break;
          } else if (
            nextFile.includes('jpg') ||
            nextFile.includes('jpeg') ||
            nextFile.includes('png')
          ) {
            setSelectedVideo(undefined);
            setSelectedFile(nextFile);
            break;
          } else {
            i++;
            nextFile = files[currentIndex - i].path;
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <SafeAreaView>
      <View
        style={styles.iconHolder}
        onTouchStart={() => {
          if (selectedFile || selectedVideo) {
            setSelectedFile(undefined);
            setSelectedVideo(undefined);
          } else {
            let newPath = path.substr(0, path.lastIndexOf('/'));
            if (newPath.includes('/Users/daniellauziere/Documents')) {
              if (newPath !== RNFS.DocumentDirectoryPath) {
                getFileContent(newPath);
              } else {
                getFileContent(RNFS.DocumentDirectoryPath);
              }
            }
          }
        }}>
        <Image style={styles.image} source={require('./assets/back.png')} />
      </View>
      {(selectedFile || selectedVideo) && (
        <>
          <View
            style={styles.iconHolderBack}
            onTouchStart={() => {
              move(false);
            }}>
            <Image
              style={styles.image}
              source={require('./assets/backward.png')}
            />
          </View>
          <View
            style={styles.iconHolderForward}
            onTouchStart={() => {
              move(true);
            }}>
            <Image style={styles.image} source={require('./assets/next.png')} />
          </View>
        </>
      )}

      {selectedFile ? (
        <FullsizeImage path={selectedFile} />
      ) : selectedVideo ? (
        <View style={styles.fullsizeCenterContainer}>
          <VideoPlayer filePath={selectedVideo} />
        </View>
      ) : (
        <View style={styles.fullsizeContainer}>
          <FlatList
            data={files}
            renderItem={renderItem}
            keyExtractor={item => item.name}
          />
          <ScrollView>
            <View style={styles.imageContainer}>
              {files.map(({path, name}, i) => {
                return path.includes('jpg') ||
                  path.includes('jpeg') ||
                  path.includes('png') ? (
                  <View
                    key={`${path}-${i}`}
                    onTouchStart={() => {
                      setSelectedFile(path);
                    }}>
                    <ResizeImage path={path} />
                  </View>
                ) : path.includes('mp4') ? (
                  <VideoButton
                    key={`${path}-${i}`}
                    name={name}
                    path={path}
                    setSelectedVideoPath={setSelectedVideoPath}
                  />
                ) : (
                  <View key={`${path}-${i}`} />
                );
              })}
            </View>
          </ScrollView>
        </View>
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
  fullsizeCenterContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullsizeContainer: {
    width: '100%',
    height: '100%',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  image: {
    height: 30,
    width: 30,
    zIndex: 99999,
  },
  iconHolder: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    height: 30,
    width: 30,
    zIndex: 9999,
    backgroundColor: '#77777787',
    borderRadius: 5,
  },
  iconHolderBack: {
    position: 'absolute',
    bottom: 10,
    left: 50,
    height: 30,
    width: 30,
    zIndex: 9999,
    backgroundColor: '#77777787',
    borderRadius: 5,
  },
  iconHolderForward: {
    position: 'absolute',
    bottom: 10,
    left: 90,
    height: 30,
    width: 30,
    zIndex: 9999,
    backgroundColor: '#77777787',
    borderRadius: 5,
  },
});

export default App;
