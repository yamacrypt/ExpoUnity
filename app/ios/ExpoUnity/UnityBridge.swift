import ExpoModulesCore
import UIKit

struct UnityMessage {
  let target: String
  let method: String
  let payload: String
}

class UnityBridge {
  static let shared = UnityBridge()
  private var pendingMessages: [UnityMessage] = []
  private init() {}

  func preparePlaceholder() {
    pendingMessages.removeAll()
  }

  func show() {
    DispatchQueue.main.async {
      guard let presenter = self.topViewController() else {
        NSLog("[UnityBridge] Failed to locate presenter")
        return
      }
      let controller = UnityViewController(messages: self.pendingMessages)
      controller.modalPresentationStyle = .fullScreen
      presenter.present(controller, animated: true) {
        self.pendingMessages.removeAll()
      }
    }
  }

  func postMessage(target: String, method: String, payload: String) {
    let message = UnityMessage(target: target, method: method, payload: payload)
    pendingMessages.append(message)
    NSLog("[UnityBridge] queued message: \(message)")
  }

  private func topViewController(base: UIViewController? = UIApplication.shared.connectedScenes
    .compactMap { ($0 as? UIWindowScene)?.keyWindow }
    .first?.rootViewController) -> UIViewController? {
    if let nav = base as? UINavigationController {
      return topViewController(base: nav.visibleViewController)
    }
    if let tab = base as? UITabBarController {
      return topViewController(base: tab.selectedViewController)
    }
    if let presented = base?.presentedViewController {
      return topViewController(base: presented)
    }
    return base
  }
}

public class UnityBridgeModule: Module {
  public func definition() -> ModuleDefinition {
    Name("UnityBridge")

    Function("show") {
      UnityBridge.shared.show()
    }

    Function("postMessage") { (target: String, method: String, payload: String) in
      UnityBridge.shared.postMessage(target: target, method: method, payload: payload)
    }
  }
}
