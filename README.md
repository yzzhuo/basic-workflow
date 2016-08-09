# basic-workflow
## 基于gulp搭建的前端工作流
### 用于开发环境的命令
### gulp 
### 实现功能如下：
* 实现将sass自动编译成css
* 实时监控文件变化
* 利用browser-sync启动本地服务器，修改html，css或js文件可以触发浏览器自动刷新


### 用于部署输出静态文件的命令
### gulp build
### 实现功能如下：
* 合并、压缩js文件
* 合并css文件
* 图片压缩
* 实现雪碧图
* 在build之前自动清空dist目录

参考文章:https://css-tricks.com/gulp-for-beginners/

### 其它
#### gulp images报错
具体错误原因未知，可能和gulp-imagemin的依赖cross-spawn有关  
个人的解决方法：    
卸掉gulp-imagemin模块，用cnpm安装

	npm cache clean gulp-imagemin
    rm -rf node_modules/gulp-imagemin
    cnpm install gulp-imagemin --save-dev