/**
 * CDN Helper for Hexo Highlight Theme
 *
 * 自动为静态资源添加 CDN 前缀（包括图片、CSS、JS 等）
 *
 * 原理：在 generate 完成后，扫描所有生成的 HTML 路由，
 * 将 /images/, /css/, /js/ 等路径替换为 CDN URL
 */

module.exports = function(hexo) {
  var config = hexo.config.cdn || {};
  var themeConfig = hexo.theme.config.cdn || {};

  // 全局 CDN 开关
  var enable = config.enable || themeConfig.enable;
  // CDN 基础 URL
  var baseUrl = (config.url || themeConfig.url || '').replace(/\/$/, '');

  if (!enable || !baseUrl) return;

  /**
   * 替换 HTML 内容中的静态资源路径为 CDN 地址
   */
  function replaceCdnUrls(html) {
    if (!html || !baseUrl) return html;

    // 替换 src="/images/xxx", href="/css/xxx" 等相对路径
    var result = html.replace(
      /(src|href)=(["'])\/(images|css|js|uploads|fonts|media|static)([^"']*)\2/g,
      function(match, attr, q, dir, rest) {
        return attr + '=' + q + baseUrl + '/' + dir + rest + q;
      }
    );

    return result;
  }

  // 使用 after_generate 钩子：在所有文件写入 public/ 之前处理
  hexo.extend.filter.register('after_generate', function() {
    var routes = hexo.route.list();
    var count = 0;

    routes.forEach(function(route) {
      // 只处理 HTML 文件
      if (!/\.(html|htm)$/.test(route.path)) return;
      if (!route.data) return; // 二进制文件

      try {
        var content = route.data.toString('utf8');
        var newContent = replaceCdnUrls(content);

        if (newContent !== content) {
          hexo.route.set(route.path, newContent);
          count++;
        }
      } catch(e) {
        // 忽略非文本文件
      }
    });

    if (count > 0) {
      console.log('[CDN Helper] Replaced ' + count + ' file(s) with CDN URLs (' + baseUrl + ')');
    }
  });

  // 同时注册 after_render:html 过滤器（作为备用）
  hexo.extend.filter.register('after_render:html', function(htmlStr) {
    return replaceCdnUrls(htmlStr);
  });

  return {
    url: function(path) {
      var cleanPath = path.replace(/^\//, '');
      return baseUrl + '/' + cleanPath;
    },
    vendor: function(name, file) {
      var vendors = themeConfig.vendors || {};
      var base = vendors[name] || '';
      if (file && base) return base + '/' + file;
      return base;
    },
    isEnabled: function() { return true; },
    getConfig: function() {
      return { enable: enable, url: baseUrl, vendors: themeConfig.vendors || {} };
    }
  };
};
