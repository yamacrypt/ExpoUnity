package com.example.expounity.unity

import android.content.Context
import androidx.appcompat.app.AlertDialog

object UnityPlaceholderDialog {
  fun show(context: Context, message: String) {
    AlertDialog.Builder(context)
      .setTitle("Unity Placeholder")
      .setMessage(
        "Unity ライブラリがまだビルドされていないため、プレースホルダー画面を表示しています。\n\n" +
          "受信したメッセージ:\n$message"
      )
      .setPositiveButton(android.R.string.ok, null)
      .show()
  }
}
