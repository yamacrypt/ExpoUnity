import UIKit

final class UnityViewController: UIViewController {
  private let messages: [UnityMessage]

  init(messages: [UnityMessage]) {
    self.messages = messages
    super.init(nibName: nil, bundle: nil)
  }

  @available(*, unavailable)
  required init?(coder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }

  override func viewDidLoad() {
    super.viewDidLoad()
    view.backgroundColor = UIColor(red: 17/255, green: 24/255, blue: 39/255, alpha: 1)

    let dismissButton = UIButton(type: .system)
    dismissButton.translatesAutoresizingMaskIntoConstraints = false
    dismissButton.setTitle("閉じる", for: .normal)
    dismissButton.tintColor = .white
    dismissButton.addTarget(self, action: #selector(close), for: .touchUpInside)

    let titleLabel = UILabel()
    titleLabel.translatesAutoresizingMaskIntoConstraints = false
    titleLabel.text = "Unity Placeholder"
    titleLabel.textColor = .white
    titleLabel.font = UIFont.systemFont(ofSize: 28, weight: .bold)

    let bodyLabel = UILabel()
    bodyLabel.translatesAutoresizingMaskIntoConstraints = false
    bodyLabel.textColor = UIColor(red: 226/255, green: 232/255, blue: 240/255, alpha: 1)
    bodyLabel.numberOfLines = 0
    bodyLabel.textAlignment = .center
    bodyLabel.font = UIFont.systemFont(ofSize: 16)
    if messages.isEmpty {
      bodyLabel.text = "Unity Library が未連携のため、プレースホルダー画面を表示しています。"
    } else {
      bodyLabel.text = messages
        .map { "\($0.target).\($0.method) ← \($0.payload)" }
        .joined(separator: "\n")
    }

    view.addSubview(titleLabel)
    view.addSubview(bodyLabel)
    view.addSubview(dismissButton)

    NSLayoutConstraint.activate([
      titleLabel.centerXAnchor.constraint(equalTo: view.centerXAnchor),
      titleLabel.centerYAnchor.constraint(equalTo: view.centerYAnchor, constant: -80),
      bodyLabel.topAnchor.constraint(equalTo: titleLabel.bottomAnchor, constant: 16),
      bodyLabel.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 24),
      bodyLabel.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -24),
      dismissButton.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor, constant: -32),
      dismissButton.centerXAnchor.constraint(equalTo: view.centerXAnchor)
    ])
  }

  @objc private func close() {
    dismiss(animated: true)
  }
}
