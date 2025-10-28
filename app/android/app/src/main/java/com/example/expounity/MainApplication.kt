package com.example.expounity

import android.app.Application
import android.content.res.Configuration
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.soloader.SoLoader
import expo.modules.ApplicationLifecycleDispatcher
import expo.modules.ReactNativeHostWrapper
import com.example.expounity.modules.unitybridge.UnityModulesProvider

class MainApplication : Application(), ReactApplication {
  private val modulesProvider = UnityModulesProvider()
  private val mReactNativeHost = ReactNativeHostWrapper(this, object : ReactNativeHost(this) {
    override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG

    override fun getPackages(): List<ReactPackage> = PackageList(this).packages

    override fun getJSMainModuleName(): String = "index"

    override fun isHermesEnabled(): Boolean = true
  }, modulesProvider)

  override fun getReactNativeHost(): ReactNativeHost = mReactNativeHost

  override fun onCreate() {
    super.onCreate()
    SoLoader.init(this, false)
    ApplicationLifecycleDispatcher.onApplicationCreate(this)
  }

  override fun onConfigurationChanged(newConfig: Configuration) {
    super.onConfigurationChanged(newConfig)
    ApplicationLifecycleDispatcher.onConfigurationChanged(this, newConfig)
  }
}
