import ExpoModulesCore
import UIKit

@main
class AppDelegate: ExpoAppDelegate {
  override func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
  ) -> Bool {
    UnityBridge.shared.preparePlaceholder()
    return super.application(application, didFinishLaunchingWithOptions: launchOptions)
  }
}
