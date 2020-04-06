module.exports = {
    root: true,
    env: {
        node: true,
        browser: true,
        es6: true
    },
    parser: "vue-eslint-parser",
    extends: [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    parserOptions: {
        parser: 'babel-eslint'
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        //空格2个字符
        "indent": ["off", 2],
        "no-tabs": "off",
        "space-before-function-paren": 0,
        "no-unused-vars": 'off' 
    },
    // Plugin:[
    //     'html',
    //     "transform-object-rest-spread"]
}