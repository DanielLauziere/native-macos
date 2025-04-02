import AVKit

class AVPlayerCustomView: AVPlayerView {

    // Define the filePath property to receive video file path
    @objc var filePath: NSString = "" {
        didSet {
            print("🎥 New filePath received: \(filePath)")
            playVideo()
        }
    }

    // Override the init method to ensure proper initialization
    override init(frame frameRect: NSRect) {
        super.init(frame: frameRect)
        print("🎥 AVPlayerCustomView initialized with frame: \(frameRect)")
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        print("🎥 AVPlayerCustomView initialized from coder")
    }

    // Set up the AVPlayer to play video using file path
    private func playVideo() {
        // Create a URL from the file path
        let url = URL(fileURLWithPath: filePath as String)

        // Create an AVPlayer with the URL
        let player = AVPlayer(url: url)
        
        // Since AVPlayerView already manages the player internally, just set it
        self.player = player  // Correct way to assign to the internal player property

        // Start playing the video
        player.play()
    }
}
