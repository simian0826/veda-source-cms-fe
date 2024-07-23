const { overrides } = require("./.eslintrc.cjs");

module.exports = {
  extends: [
    "styleint-config-standard", // 配置stylelint扩展插件
    "styleint-config-html/vue", // 使用Vue模板要是格式化
    "styleint-config-standard-scss", //配置scss插件
    "styleint-config-recommended-vue/scss", // 配置vue中scss样式格式化
    "stylelint-config-recess-order", //配置 css属性书写属性顺序插件
    "stylelint-config-prettier", // 使用prettier代替eslint代码格式化
  ],
  overrides: [
    {
      files: ["**/*.(scss|css|vue|html)"],
      customSyntax: "postcss-scss",
    },
    {
      files: ["**/*.(html|vue)"],
      customSyntax: "postcss-html",
    },
  ],
  rules: {
    "value-keyword-case": null, // 在css中使用v-bind不报错
    "no-descending-specificity": null, // 禁止在具有较高优先级的选择器出现被其覆盖的较低优先级的选择器
    "function-url-quotes": "always", // 要求或禁止URL的引号 “always”必须加上 ｜ “never”不要引号
    "no-empty-source": null, // 禁止出现空文件
    "selector-class-pattern": null, //关闭相知选择器类名的格式
    "block-opening-brace-space-before": "always", // 大括号前必须有一个空格
    "value-no-vendor-prefix": null, // 禁止属性值前缀 --webkit-box
    "property-no-vendor-prefix": null, // 禁止属性前缀 --weblit-mask
    "selector-pseudo-class-no-unknown": [
      true, // 允许非特殊选择器或选择器子类名使用带有效果名称的pseudo-class
      {
        ignorePseudoClasses: ["global", "v-deep", "deep"],
      }, //忽略属性，修改UI库默认样式会用到
    ], //允许非特殊选择器的特殊点击选择器
  },
};
