import { ConfigEnv, UserConfigExport, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { viteMockServe } from "vite-plugin-mock";
import UnoCSS from "unocss/vite";
import { resolve } from "path";
import path from "path";
import legacy from "@vitejs/plugin-legacy";
import purgeIcons from "vite-plugin-purge-icons";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

// const resolve = (dir) => path.resolve(__dirname, dir);
function pathResolve(dir: string) {
  return resolve(process.cwd(), ".", dir);
}

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfigExport => {
  const root = process.cwd();

  const {
    VITE_USE_MOCK,
    VITE_PUBLIC_PATH,
    //VITE_GLOB_API_URL_PREFIX
  } = loadEnv(mode, root);
  return {
    base: VITE_PUBLIC_PATH,
    // base: root,
    build: {
      rollupOptions: {
        output: {
          entryFileNames: `assets/[name].[hash].js`, // 设置JS文件的输出路径和文件名格式
          chunkFileNames: `assets/[name].[hash].js`, // 设置非入口chunk的文件名格式
          assetFileNames: `assets/[name].[hash].[ext]`, // 设置资源文件的输出路径和文件名格式
        },
      },
      assetsDir: "assets",
      target: "esnext",
    },
    server: {
      hmr: {
        overlay: false,
      },
      host: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      cors: true,
      port: 8888,
      origin: "http://localhost:8888",
      proxy: {
        "/veda-source": {
          // target: "http://172.16.100.153:8080",
          target: "http://localhost:8080",

          changeOrigin: true,
          secure: true,
        },
      },
    },
    plugins: [
      vue(),
      vueJsx(),
      purgeIcons(),
      UnoCSS(),
      viteMockServe({
        mockPath: "/@/../mock",
        localEnabled: VITE_USE_MOCK === "true", //开发阶段能使用mock
      }),
      //svg 插件
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        symbolId: "icon-[dir]-[name]",
      }),
      legacy({
        targets: ["chrome < 60", "edge < 15"],
        renderLegacyChunks: true,
      }),
    ],

    resolve: {
      alias: [
        {
          find: "vue-i18n",
          replacement: "vue-i18n/dist/vue-i18n.cjs.js",
        },
        {
          find: /\/@\//,
          replacement: pathResolve("src") + "/",
        },
        {
          find: /\/#\//,
          replacement: pathResolve("types") + "/",
        },
      ],
    },
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: `@import "/@/style/variable.scss";`,
        },
        less: {
          charset: false,
          javascriptEnabled: true,

          additionalData: '@import "/@/design/index.less";',
        },
      },
    },
    optimizeDeps: {
      // @iconify/iconify: The dependency is dynamically and virtually loaded by @purge-icons/generated, so it needs to be specified explicitly
      include: [
        "@iconify/iconify",
        "ant-design-vue/es/locale/zh_CN",
        "moment/dist/locale/zh-cn",
        "ant-design-vue/es/locale/en_US",
        "moment/dist/locale/eu",
      ],
      exclude: ["vue-demi"],
    },
  };
};
