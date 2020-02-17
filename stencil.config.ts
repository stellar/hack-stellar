import { Config } from '@stencil/core'
import { sass } from '@stencil/sass'
import { postcss } from '@stencil/postcss'
import autoprefixer from 'autoprefixer'
import nodePolyfills from 'rollup-plugin-node-polyfills'

// https://stenciljs.com/docs/config

export const config: Config = {
  devServer: {
    openBrowser: false
  },
  outputTargets: [
    {
      type: 'www',
      serviceWorker: null,
      baseUrl: process.env.NODE_ENV === 'development' ? 'http://localhost:3333/' : 'https://hack-stellar.now.sh/'
    }
  ],
  globalStyle: 'src/global/app.scss',
  globalScript: 'src/global/app.ts',
  commonjs: {
    namedExports: {
      'stellar-sdk': ['Keypair', 'TransactionBuilder', 'BASE_FEE', 'Networks', 'Operation', 'Asset']
    },
  },
  plugins: [
    nodePolyfills(),
    sass(),
    postcss({
      plugins: [autoprefixer()]
    })
  ],
  nodeResolve: {
    browser: true,
    preferBuiltins: true
  }
}
