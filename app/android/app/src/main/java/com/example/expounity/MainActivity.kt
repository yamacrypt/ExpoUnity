package com.example.expounity

import android.os.Bundle
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import expo.modules.ReactActivityDelegateWrapper

class MainActivity : ReactActivity() {
  override fun getMainComponentName(): String = "main"

  override fun createReactActivityDelegate(): ReactActivityDelegate =
    ReactActivityDelegateWrapper(this, BuildConfig.IS_NEW_ARCHITECTURE_ENABLED, object : ReactActivityDelegate(this, mainComponentName) {})

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(null)
  }
}
