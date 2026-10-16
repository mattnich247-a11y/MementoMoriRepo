import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import sharp from 'sharp';

const ROOT_DIR = process.cwd();
const BUILD_DIR = path.join(ROOT_DIR, '.android-build');
const ANDROID_JAR = '/opt/android-sdk/platforms/android-34/android.jar';
const BUILD_TOOLS_DIR = '/opt/android-sdk/build-tools/34.0.0';
const AAPT2_TOOL = path.join(BUILD_TOOLS_DIR, 'aapt2');
const D8_TOOL = path.join(BUILD_TOOLS_DIR, 'd8');
const ZIPALIGN_TOOL = path.join(BUILD_TOOLS_DIR, 'zipalign');
const APKSIGNER_TOOL = path.join(BUILD_TOOLS_DIR, 'apksigner');

async function buildPixelReadyApk() {
  console.log('🚀 [Pixel APK Builder] Step 1: Building production web bundle...');
  execSync('npm run build', { stdio: 'inherit' });

  console.log('📦 [Pixel APK Builder] Step 2: Preparing Android build workspace...');
  if (fs.existsSync(BUILD_DIR)) {
    fs.rmSync(BUILD_DIR, { recursive: true, force: true });
  }

  const dirs = [
    'gen',
    'bin',
    'res/values',
    'res/xml',
    'res/mipmap-mdpi',
    'res/mipmap-hdpi',
    'res/mipmap-xhdpi',
    'res/mipmap-xxhdpi',
    'res/mipmap-xxxhdpi',
    'src/com/mementomori/app',
    'assets/www',
  ];

  dirs.forEach(d => fs.mkdirSync(path.join(BUILD_DIR, d), { recursive: true }));

  console.log('🎨 [Pixel APK Builder] Step 3: Generating high-res mipmap launcher icons...');
  const iconSource = path.join(ROOT_DIR, 'public', 'pwa-512x512.png');
  const iconSizes = [
    { dir: 'res/mipmap-mdpi', size: 48 },
    { dir: 'res/mipmap-hdpi', size: 72 },
    { dir: 'res/mipmap-xhdpi', size: 96 },
    { dir: 'res/mipmap-xxhdpi', size: 144 },
    { dir: 'res/mipmap-xxxhdpi', size: 192 },
  ];

  for (const { dir, size } of iconSizes) {
    const dest = path.join(BUILD_DIR, dir, 'ic_launcher.png');
    await sharp(iconSource)
      .resize(size, size)
      .png()
      .toFile(dest);
  }

  console.log('📄 [Pixel APK Builder] Step 4: Writing modern Android resources & XML configs...');
  fs.writeFileSync(
    path.join(BUILD_DIR, 'res/values/strings.xml'),
    `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="app_name">Memento Mori</string>
</resources>
`
  );

  fs.writeFileSync(
    path.join(BUILD_DIR, 'res/values/colors.xml'),
    `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="window_background">#0c0a09</color>
</resources>
`
  );

  fs.writeFileSync(
    path.join(BUILD_DIR, 'res/values/styles.xml'),
    `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <style name="AppTheme" parent="@android:style/Theme.DeviceDefault.NoActionBar.Fullscreen">
        <item name="android:windowBackground">@color/window_background</item>
    </style>
</resources>
`
  );

  fs.writeFileSync(
    path.join(BUILD_DIR, 'res/xml/network_security_config.xml'),
    `<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <domain-config cleartextTrafficPermitted="true">
        <domain includeSubdomains="true">localhost</domain>
        <domain includeSubdomains="true">127.0.0.1</domain>
        <domain includeSubdomains="true">appassets.androidplatform.net</domain>
    </domain-config>
    <base-config cleartextTrafficPermitted="true" />
</network-security-config>
`
  );

  fs.writeFileSync(
    path.join(BUILD_DIR, 'AndroidManifest.xml'),
    `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.mementomori.app"
    android:versionCode="101"
    android:versionName="1.0.1">

    <uses-sdk android:minSdkVersion="24" android:targetSdkVersion="34" />
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

    <application
        android:label="@string/app_name"
        android:icon="@mipmap/ic_launcher"
        android:theme="@style/AppTheme"
        android:hardwareAccelerated="true"
        android:usesCleartextTraffic="true"
        android:networkSecurityConfig="@xml/network_security_config"
        android:allowBackup="true"
        android:supportsRtl="true">
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:configChanges="orientation|screenSize|keyboardHidden|smallestScreenSize|screenLayout"
            android:windowSoftInputMode="adjustResize">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>
`
  );

  console.log('☕ [Pixel APK Builder] Step 5: Writing modern Android Java sources...');
  fs.writeFileSync(
    path.join(BUILD_DIR, 'src/com/mementomori/app/MainActivity.java'),
    `package com.mementomori.app;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Color;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.ConsoleMessage;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

public class MainActivity extends Activity {
    private static final String TAG = "MementoMori";
    private static final String APP_SCHEME = "https://appassets.androidplatform.net";
    private WebView webView;
    private static final Map<String, String> MIME_TYPES = new HashMap<>();

    static {
        MIME_TYPES.put("html", "text/html; charset=utf-8");
        MIME_TYPES.put("htm", "text/html; charset=utf-8");
        MIME_TYPES.put("js", "application/javascript; charset=utf-8");
        MIME_TYPES.put("mjs", "application/javascript; charset=utf-8");
        MIME_TYPES.put("css", "text/css; charset=utf-8");
        MIME_TYPES.put("json", "application/json; charset=utf-8");
        MIME_TYPES.put("webmanifest", "application/manifest+json; charset=utf-8");
        MIME_TYPES.put("png", "image/png");
        MIME_TYPES.put("jpg", "image/jpeg");
        MIME_TYPES.put("jpeg", "image/jpeg");
        MIME_TYPES.put("svg", "image/svg+xml");
        MIME_TYPES.put("ico", "image/x-icon");
        MIME_TYPES.put("woff2", "font/woff2");
        MIME_TYPES.put("woff", "font/woff");
        MIME_TYPES.put("ttf", "font/ttf");
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Immersive dark mode styling
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        Window window = getWindow();
        window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
        window.setStatusBarColor(Color.parseColor("#0c0a09"));
        if (Build.VERSION.SDK_INT >= 26) {
            window.setNavigationBarColor(Color.parseColor("#0c0a09"));
        }

        // Initialize WebView
        webView = new WebView(this);
        webView.setBackgroundColor(Color.parseColor("#0c0a09"));

        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(true);
        settings.setAllowFileAccessFromFileURLs(true);
        settings.setAllowUniversalAccessFromFileURLs(true);
        settings.setCacheMode(WebSettings.LOAD_DEFAULT);
        settings.setMediaPlaybackRequiresUserGesture(false);
        settings.setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);

        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public boolean onConsoleMessage(ConsoleMessage consoleMessage) {
                Log.d("MementoMoriJS", consoleMessage.message());
                return true;
            }
        });

        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                return handleUrlOverride(request.getUrl());
            }

            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                return handleUrlOverride(Uri.parse(url));
            }

            private boolean handleUrlOverride(Uri uri) {
                String host = uri.getHost();
                if ("appassets.androidplatform.net".equals(host) || "localhost".equals(host) || "127.0.0.1".equals(host)) {
                    return false;
                }
                try {
                    Intent intent = new Intent(Intent.ACTION_VIEW, uri);
                    startActivity(intent);
                    return true;
                } catch (Exception e) {
                    return false;
                }
            }

            @Override
            public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
                return handleIntercept(request.getUrl());
            }

            @Override
            public WebResourceResponse shouldInterceptRequest(WebView view, String url) {
                return handleIntercept(Uri.parse(url));
            }

            private WebResourceResponse handleIntercept(Uri uri) {
                String host = uri.getHost();
                if (!"appassets.androidplatform.net".equals(host) && !"localhost".equals(host) && !"127.0.0.1".equals(host)) {
                    return null;
                }

                String path = uri.getPath();
                if (path == null || path.isEmpty() || "/".equals(path)) {
                    path = "/index.html";
                }
                if (path.startsWith("/")) {
                    path = path.substring(1);
                }

                String assetPath = "www/" + path;
                try {
                    InputStream is = getAssets().open(assetPath);
                    String mime = getMimeType(assetPath);
                    Map<String, String> headers = new HashMap<>();
                    headers.put("Access-Control-Allow-Origin", "*");
                    headers.put("Cache-Control", "public, max-age=31536000");
                    return new WebResourceResponse(mime, "UTF-8", 200, "OK", headers, is);
                } catch (IOException e) {
                    // SPA route fallback: serve index.html
                    try {
                        InputStream is = getAssets().open("www/index.html");
                        Map<String, String> headers = new HashMap<>();
                        headers.put("Access-Control-Allow-Origin", "*");
                        return new WebResourceResponse("text/html", "UTF-8", 200, "OK", headers, is);
                    } catch (IOException ignored) {
                        return null;
                    }
                }
            }
        });

        setContentView(webView);
        webView.loadUrl(APP_SCHEME + "/index.html");
    }

    private static String getMimeType(String path) {
        int dot = path.lastIndexOf('.');
        if (dot >= 0) {
            String ext = path.substring(dot + 1).toLowerCase();
            String mime = MIME_TYPES.get(ext);
            if (mime != null) return mime;
        }
        return "application/octet-stream";
    }

    @Override
    public void onBackPressed() {
        if (webView != null && webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (webView != null) webView.onResume();
    }

    @Override
    protected void onPause() {
        super.onPause();
        if (webView != null) webView.onPause();
    }

    @Override
    protected void onDestroy() {
        if (webView != null) {
            webView.destroy();
        }
        super.onDestroy();
    }
}
`
  );

  console.log('⚡ [Pixel APK Builder] Step 6: Compiling resources with AAPT2...');
  execSync(
    `${AAPT2_TOOL} compile --dir "${path.join(BUILD_DIR, 'res')}" -o "${path.join(BUILD_DIR, 'compiled_res.zip')}"`,
    { stdio: 'inherit' }
  );

  console.log('⚡ [Pixel APK Builder] Step 7: Linking resources & generating R.java with AAPT2...');
  execSync(
    `${AAPT2_TOOL} link "${path.join(BUILD_DIR, 'compiled_res.zip')}" -I "${ANDROID_JAR}" --manifest "${path.join(BUILD_DIR, 'AndroidManifest.xml')}" --java "${path.join(BUILD_DIR, 'gen')}" -o "${path.join(BUILD_DIR, 'base.apk')}" --auto-add-overlay`,
    { stdio: 'inherit' }
  );

  console.log('🔨 [Pixel APK Builder] Step 8: Compiling Java classes with Android 14 SDK...');
  execSync(
    `javac -source 1.8 -target 1.8 -cp "${ANDROID_JAR}:${path.join(BUILD_DIR, 'gen')}" -d "${path.join(BUILD_DIR, 'bin')}" $(find "${path.join(BUILD_DIR, 'src')}" "${path.join(BUILD_DIR, 'gen')}" -name "*.java")`,
    { stdio: 'inherit' }
  );

  console.log('🔄 [Pixel APK Builder] Step 9: Running Google D8 dex compiler for Android 14 (min-api 24)...');
  execSync(
    `${D8_TOOL} --lib "${ANDROID_JAR}" --min-api 24 --release --output "${path.join(BUILD_DIR, 'bin')}" $(find "${path.join(BUILD_DIR, 'bin')}" -name "*.class")`,
    { stdio: 'inherit' }
  );

  console.log('📂 [Pixel APK Builder] Step 10: Copying clean web assets into assets/www...');
  execSync(`cp -r "${path.join(ROOT_DIR, 'dist')}"/* "${path.join(BUILD_DIR, 'assets/www')}/"`, { stdio: 'inherit' });
  // Clean any nested APK files from the assets directory
  execSync(`rm -f "${path.join(BUILD_DIR, 'assets/www')}"/*.apk`, { stdio: 'inherit' });

  console.log('📦 [Pixel APK Builder] Step 11: Packaging assets into APK with AAPT2...');
  execSync(
    `${AAPT2_TOOL} link "${path.join(BUILD_DIR, 'compiled_res.zip')}" -I "${ANDROID_JAR}" --manifest "${path.join(BUILD_DIR, 'AndroidManifest.xml')}" -A "${path.join(BUILD_DIR, 'assets')}" -o "${path.join(BUILD_DIR, 'bin/unsigned.apk')}" --auto-add-overlay`,
    { stdio: 'inherit' }
  );

  console.log('➕ [Pixel APK Builder] Step 12: Adding classes.dex to APK...');
  execSync(
    `cd "${path.join(BUILD_DIR, 'bin')}" && zip -u unsigned.apk classes.dex`,
    { stdio: 'inherit' }
  );

  console.log('📐 [Pixel APK Builder] Step 13: 4-byte boundary zipalign...');
  execSync(
    `${ZIPALIGN_TOOL} -f -p 4 "${path.join(BUILD_DIR, 'bin/unsigned.apk')}" "${path.join(BUILD_DIR, 'bin/aligned.apk')}"`,
    { stdio: 'inherit' }
  );

  console.log('🔐 [Pixel APK Builder] Step 14: Signing APK with official Google apksigner (v1, v2, v3)...');
  const keystorePath = path.join(ROOT_DIR, 'memento-mori-release.jks');
  if (!fs.existsSync(keystorePath)) {
    execSync(
      `keytool -genkeypair -v -keystore "${keystorePath}" -alias mementomori -keyalg RSA -keysize 2048 -validity 10000 -storepass mementomori -keypass mementomori -dname "CN=MementoMori, OU=App, O=MementoMori, L=Global, ST=Earth, C=US"`,
      { stdio: 'inherit' }
    );
  }

  const outputApk1 = path.join(ROOT_DIR, 'public', 'MementoMori.apk');
  const outputApk2 = path.join(ROOT_DIR, 'public', 'memento-mori.apk');

  execSync(
    `${APKSIGNER_TOOL} sign --ks "${keystorePath}" --ks-pass pass:mementomori --key-pass pass:mementomori --out "${outputApk1}" "${path.join(BUILD_DIR, 'bin/aligned.apk')}"`,
    { stdio: 'inherit' }
  );

  fs.copyFileSync(outputApk1, outputApk2);

  if (fs.existsSync(path.join(ROOT_DIR, 'dist'))) {
    fs.copyFileSync(outputApk1, path.join(ROOT_DIR, 'dist', 'MementoMori.apk'));
    fs.copyFileSync(outputApk1, path.join(ROOT_DIR, 'dist', 'memento-mori.apk'));
  }

  console.log('🔍 [Pixel APK Builder] Step 15: Verifying signature & badging for Pixel compatibility...');
  execSync(`${APKSIGNER_TOOL} verify -v "${outputApk1}"`, { stdio: 'inherit' });
  execSync(`${path.join(BUILD_TOOLS_DIR, 'aapt')} dump badging "${outputApk1}" | grep -E "package:|sdkVersion:|targetSdkVersion:|compileSdkVersion:"`, { stdio: 'inherit' });

  const stats = fs.statSync(outputApk1);
  const sizeMb = (stats.size / (1024 * 1024)).toFixed(2);
  console.log(`\n🎉 [Pixel APK Builder] SUCCESS! Standalone Android 14+ Pixel-ready APK created:`);
  console.log(`📁 File: public/MementoMori.apk (${sizeMb} MB)`);
  console.log(`📁 File: public/memento-mori.apk (${sizeMb} MB)`);
}

buildPixelReadyApk().catch(err => {
  console.error('❌ Build failed:', err);
  process.exit(1);
});
