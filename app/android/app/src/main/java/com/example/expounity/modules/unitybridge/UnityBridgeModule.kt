package com.example.expounity.modules.unitybridge

import android.content.Intent
import android.util.Log
import androidx.core.content.ContextCompat
import com.example.expounity.unity.UnityLauncherActivity
import com.example.expounity.unity.UnityMessageBus
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class UnityBridgeModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("UnityBridge")

    Function("show") {
      val activity = appContext.currentActivity
      val context = activity ?: appContext.reactContext
      if (context != null) {
        val intent = Intent(context, UnityLauncherActivity::class.java)
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        ContextCompat.startActivity(context, intent, null)
      } else {
        Log.w(TAG, "No activity available to launch Unity")
      }
    }

    Function("postMessage") { target: String, method: String, payload: String ->
      UnityMessageBus.post(target, method, payload)
    }
  }

  companion object {
    private const val TAG = "UnityBridgeModule"
  }
}
