package com.example.expounity.unity

import android.util.Log
import java.util.concurrent.CopyOnWriteArrayList

data class UnityMessage(val target: String, val method: String, val payload: String)

object UnityMessageBus {
  private val messages = CopyOnWriteArrayList<UnityMessage>()

  fun post(target: String, method: String, payload: String) {
    val message = UnityMessage(target, method, payload)
    messages += message
    Log.i("UnityMessageBus", "Queued message: $message")
  }

  fun drain(): List<UnityMessage> {
    val snapshot = messages.toList()
    messages.clear()
    return snapshot
  }
}
