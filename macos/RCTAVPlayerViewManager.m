#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(AVPlayerViewManager, RCTViewManager)

// Expose the method to React Native
RCT_EXTERN_METHOD(setFilePath:(nonnull NSNumber *)reactTag filePath:(NSString *)filePath)

@end
