import AVKit
import React

@objc(AVPlayerViewManager)
class AVPlayerViewManager: RCTViewManager {

    override func view() -> NSView! {
        let playerView = AVPlayerCustomView(frame: NSRect(x: 0, y: 0, width: 800, height: 450))

      playerView.autoresizingMask = [.width, .height]
      playerView.videoGravity = .resizeAspect

        print("🎥 AVPlayerCustomView initialized with frame: \(playerView.frame)")
        return playerView
    }

    // Expose available commands to React Native
    override func constantsToExport() -> [AnyHashable: Any]! {
        return ["Commands": ["setFilePath": 3]] // Ensure command is properly registered
    }

    // Expose setFilePath as a callable method
    @objc func setFilePath(_ reactTag: NSNumber, filePath: NSString) {
        DispatchQueue.main.async {
            print("🎥 Received setFilePath command with filePath: \(filePath)")

            // Find the view by reactTag
            if let playerView = self.bridge.uiManager.view(forReactTag: reactTag) as? AVPlayerCustomView {
                print("🎥 Found player view, setting file path")
                playerView.filePath = filePath 
            } else {
                print("❌ Error: Could not find player view for reactTag: \(reactTag)")
            }
        }
    }

    override static func requiresMainQueueSetup() -> Bool {
        return true
    }
}
