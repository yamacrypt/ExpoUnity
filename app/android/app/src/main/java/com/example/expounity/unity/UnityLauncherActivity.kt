package com.example.expounity.unity

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.example.expounity.R

class UnityLauncherActivity : AppCompatActivity() {
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_unity_launcher)
  }

  override fun onResume() {
    super.onResume()
    val queued = UnityMessageBus.drain()
    if (queued.isNotEmpty()) {
      val joined = queued.joinToString(separator = "\n") { message ->
        "${message.target}.${message.method} <- ${message.payload}"
      }
      UnityPlaceholderDialog.show(this, joined)
    }
  }
}
