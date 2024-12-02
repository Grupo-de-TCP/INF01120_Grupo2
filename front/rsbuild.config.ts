import { pluginTypeCheck } from "@rsbuild/plugin-type-check";
import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginEslint } from '@rsbuild/plugin-eslint';

export default defineConfig(({ envMode }) => {

  return {
    source: {
      entry: { index: "./src/index.tsx" },
      define: {
        "process.env.ENV_MODE": `'${envMode}'`,
      },
    },
    plugins: [
      pluginReact({
        reactRefreshOptions: {
          exclude: [/node_modules/],
        },
      }),
      pluginTypeCheck(),
      pluginEslint({
        enable: true,
        eslintPluginOptions: {
          cwd: __dirname,
          configType: 'flat',
          ignorePatterns: ["node_modules", "dist"],
        }
      })
    ],
    dev: {
      assetPrefix: true,
    },
    server: {
      port: Number(process.env.APP_PORT!),
      open: true,
    },
    html: {
      template: "./src/assets/index.html",
    },
    output: {
      assetPrefix: process.env.APP_URL! + "/",
    },
    tools: {
      bundlerChain: (chain) => {
        chain.output.uniqueName(process.env.APP_NAME!);
        chain.output.publicPath(process.env.APP_URL + "/");
      },
    },
  };
});
