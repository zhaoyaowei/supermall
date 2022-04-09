# supermall

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Customize configuration

npm install --legacy-peer-deps
--legacy-peer-deps标志是在v7中引入的，目的是绕过peerDependency自动安装；它告诉 NPM 忽略项目中引入的各个modules之间的相同modules但不同版本的问题并继续安装，保证各个引入的依赖之间对自身所使用的不同版本modules共存

vuex安装报错的原因：安装的版本过高的原因造成的
解决方法：
1、可以npm view vuex versions --json查版本，找适合的版本（不要最新的）
2、npm install vuex@3.6.2 --save



作者：Asscre
链接：https://juejin.cn/post/6971268824288985118
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

See [Configuration Reference](https://cli.vuejs.org/config/).

sudo -s 获取权限
git clone https://github.com/zhaoyaowei/supermall.git

git status --> git add . --> git commit -m "说明" --> git push "https://github.com/zhaoyaowei/supermall.git"

git push git@github.com:zhaoyaowei/supermall.git             
