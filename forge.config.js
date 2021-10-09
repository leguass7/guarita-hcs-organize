const path = require('path')
require('dotenv').config()

const packageJson = require('./package.json')
const { version, name } = packageJson
const iconDir = path.resolve(__dirname, 'assets')

const GITHUB_TOKEN = process.env.GITHUB_TOKEN

module.exports = {
  packagerConfig: {
    appBundleId: 'com.squirrel.hcsorganize.HcsOrganize',
    name: 'Avatar HCS Organize',
    executableName: 'hcs-organize',
    icon: 'assets/icon',
    extraResource: ['assets'],
    win32metadata: {
      CompanyName: 'Avatar Solucoes Digitais',
      FileDescription: 'Organizador de arquivos para SD Card da Linear HCS',
      OriginalFilename: 'hcs-organize',
      ProductName: 'Avatar HCS Organize'
    }
  },
  plugins: [
    [
      '@electron-forge/plugin-webpack',
      {
        mainConfig: './webpack/main.webpack.js',
        renderer: {
          config: './webpack/renderer.webpack.js',
          entryPoints: [
            {
              html: './public/index.html',
              js: './src/index.tsx',
              name: 'main_window',
              preload: { js: './electron/bridge.ts' }
            }
          ]
        }
      }
    ]
  ],
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      platforms: ['win32'],
      config: arch => {
        return {
          name: 'hcs-organize',
          authors: 'Avatar Solucoes Digitais',
          title: 'Avatar HCS Organize',
          version: version,
          exe: 'hcs-organize.exe',
          noMsi: true,
          setupExe: `hcs-organize-${version}-win32-${arch}-setup.exe`,
          setupIcon: path.resolve(iconDir, 'favicon.ico')
        }
      }
    },
    // {
    //   name: '@electron-forge/maker-zip',
    //   platforms: [
    //     // 'darwin',
    //     'win32'
    //   ]
    // },
    // {
    //   name: '@electron-forge/maker-wix',
    //   config: {
    //     appUserModelId: 'com.squirrel.hcsorganize.HcsOrganize',
    //     name: 'hcs-organize',
    //     exe: 'hcs-organize',
    //     manufacturer: 'Avatar Solucoes Digitais',
    //     programFilesFolderName: 'Avatar HCS Organize',
    //     shortName: 'hcs-organize',
    //     shortcutFolderName: 'Avatar HCS Organize',
    //     language: 1046,
    //     version: version,
    //     ui: { chooseDirectory: true }
    //   }
    // },
    {
      name: '@electron-forge/maker-deb',
      config: {}
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {}
    }
  ],
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      platforms: ['win32'],
      config: {
        authToken: GITHUB_TOKEN,
        repository: {
          owner: 'leguass7',
          name: name
        },
        draft: false,
        prerelease: false
      }
    }
  ]
}
