import Foundation
import AVKit
import React // Import React

@objc(AVPlayerViewManager)
class AVPlayerViewManager: RCTViewManager { // Only inherit from RCTViewManager
  override func view() -> NSView! {
    let playerView = AVPlayerView()
    
    // Set video URL (Make sure sample.mp4 exists in your macOS project)
    guard let videoPath = Bundle.main.path(forResource: "sample", ofType: "mp4") else {
      print("Error: Video file not found")
      return playerView
    }
    
    let url = URL(fileURLWithPath: videoPath)
    let player = AVPlayer(url: url)
    
    playerView.player = player
    playerView.controlsStyle = .floating // Enables playback controls
    
    return playerView
  }

  @objc override static func requiresMainQueueSetup() -> Bool {
    return true
  }
}
