package com.example.expounity.modules.unitybridge

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModulesProvider

class UnityModulesProvider : ModulesProvider {
  override fun getModulesList(): List<Class<out Module>> = listOf(UnityBridgeModule::class.java)
}
