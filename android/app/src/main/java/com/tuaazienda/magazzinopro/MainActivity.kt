package com.tuaazienda.magazzinopro

import android.os.Build
import android.os.Bundle
import com.facebook.react.ReactActivity
import expo.modules.ReactActivityDelegateWrapper

class MainActivity : ReactActivity() {
  override fun getMainComponentName(): String = "main"

  override fun onCreate(savedInstanceState: Bundle?) {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
      setTheme(android.R.style.Theme_DeviceDefault_Light_NoActionBar)
    }
    super.onCreate(null)
  }

  override fun createReactActivityDelegate() =
    ReactActivityDelegateWrapper(this, BuildConfig.IS_NEW_ARCHITECTURE_ENABLED, super.createReactActivityDelegate())
}
