#import "AppDelegate.h"
#import <AuthenticationServices/AuthenticationServices.h> // <- Add This Import
#import <SafariServices/SafariServices.h> // <- Add This Import
#import <FBSDKCoreKit/FBSDKCoreKit-swift.h>
//#import <React/RCTBundleURLProvider.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions

{
  [[FBSDKApplicationDelegate sharedInstance] application:application
                       didFinishLaunchingWithOptions:launchOptions];
  [FBSDKApplicationDelegate.sharedInstance initializeSDK];
  self.moduleName = @"SocialAuth";
  
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};
  
  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}
- (BOOL)application:(UIApplication *)app
            openURL:(NSURL *)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
  return [[FBSDKApplicationDelegate sharedInstance]application:app
                                                      openURL:url
                                                      options:options];
}

@end

