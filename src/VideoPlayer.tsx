import {requireNativeComponent, UIManager, findNodeHandle} from 'react-native';
import {useEffect, useRef} from 'react';

// Ensure AVPlayerView is registered
const AVPlayerView = requireNativeComponent('AVPlayerView');

export default function VideoPlayer({filePath}) {
  const playerRef = useRef(null);

  useEffect(() => {
    if (filePath && playerRef.current) {
      const viewId = findNodeHandle(playerRef.current);
      console.log(
        '🎥 Dispatching setFilePath command with filePath:',
        filePath,
      );

      // Ensure UIManager has the correct command mapping
      const Commands = UIManager.AVPlayerView?.Commands;
      console.log('✅ UIManager.AVPlayerView.Commands:', Commands);

      // Use the correct command index instead of the missing set_filePath reference
      UIManager.dispatchViewManagerCommand(
        viewId,
        Commands?.setFilePath, // Use the registered command (which should now exist)
        [filePath], // Pass the file path in an array
      );
    }
  }, [filePath]);

  return (
    <AVPlayerView
      ref={playerRef}
      style={{
        height: '100%',
        width: '100%',
      }}
    />
  );
}
