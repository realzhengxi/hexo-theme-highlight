# Highlight

> 极简 Hexo 博客主题 — 让文字回归纯粹

**Highlight** 是一款极简风格的 Hexo 主题，灵感来自 [失眠海峡](https://blog.imalan.cn)。它摒弃一切冗余装饰，用克制的排版和大量留白，让你的内容成为唯一的主角。

![预览截图](screenshot.png)

---

## ✨ 特性 / Features

- **极简设计** — 米白底色 + 衬线标题 + 红棕强调色，克制而优雅
- **文章列表** — 分类标签、标题、摘要、日期四要素，清晰有序
- **全文搜索** — `Cmd/Ctrl + K` 快捷键呼出，实时过滤高亮
- **归档页面** — 按年份分组的文章时间线
- **响应式布局** — 完美适配桌面端与移动端
- **代码高亮** — 内置 highlight.js 支持
- **SEO 友好** — 语义化 HTML + meta 标签
- **零依赖** — 纯 CSS + 原生 JS，无需任何前端框架

## 📸 截图预览 / Screenshots

| 首页文章列表 | 文章详情 | 搜索弹窗 |
|:---:|:---:|:---:|
| ![首页](screenshots/home.png) | ![文章](screenshots/post.png) | ![搜索](screenshots/search.png) |

## 🚀 快速开始 / Quick Start

### 安装 / Installation

```bash
cd your-hexo-blog
git clone https://github.com/your-repo/hexo-theme-highlight themes/highlight
```

### 启用 / Enable Theme

编辑站点根目录的 `_config.yml`：

```yaml
theme: highlight
```

### 预览 / Preview

```bash
hexo clean && hexo generate && hexo server -p 4000
```

打开浏览器访问 `http://localhost:4000` 即可看到效果。

## ⚙️ 配置 / Configuration

在主题目录的 `_config.yml` 中自定义各项设置：

```yaml
# ============================================
# Highlight Theme Configuration
# ============================================

# --- 导航栏 ---
nav:
  # 显示归档链接
  show_archives: true
  # 显示搜索按钮（支持 Cmd/Ctrl+K 快捷键）
  show_search: true

# --- 首页 ---
index:
  # 每页显示文章数（需配合站点 _config.yml 的 per_page）
  per_page: 10
  # 是否显示文章摘要
  show_excerpt: true
  # 摘要最大字符数（默认 120）
  excerpt_length: 120

# --- 文章页 ---
post:
  # 显示版权声明
  show_copyright: true
  # 显示上一篇/下一篇导航
  show_prev_next: true

# --- 评论系统 ---
# 支持 Disqus（可选）
disqus_shortname:

# --- 站点信息 ---
author: Your Name

# --- 样式微调（可选）---
style:
  # 主容器最大宽度（px）
  max_width: 680
  # 字体大小倍率（默认 1）
  font_scale: 1
  # 圆角大小（px），设为 0 关闭圆角
  border_radius: 16
  # 卡片阴影：'none' | 'subtle' | 'default'
  shadow: 'default'
```

## 📝 使用指南 / Usage Guide

### 文章摘要 / Excerpt

首页文章列表会自动显示摘要。摘要获取优先级如下：

1. **Front-matter 手动指定**（推荐）

```markdown
---
title: 我的文章标题
description: 这是一段自定义摘要，会显示在首页列表中。
---
正文内容...
```

2. **自动截取** — 若未写 `description`，主题会从正文中提取前 120 个字符作为摘要。

3. **使用 `<!-- more -->`** — Hexo 的截断标记同样生效，`<!-- more -->` 之前的内容将作为摘要。

### 分类与标签 / Categories & Tags

```bash
hexo new page categories
hexo new page tags
```

创建后编辑对应 `index.md`，添加：

```yaml
---
type: categories
layout: categories
---
```

```yaml
---
type: tags
layout: tags
---
```

### 归档页面 / Archives

点击导航栏的 **Archives** 链接即可访问，按年份自动分组展示所有文章。

### 搜索功能 / Search

- 点击导航栏 🔍 **Search** 按钮
- 或使用快捷键 **`Cmd + K`**（Mac）/ **`Ctrl + K`**（Windows/Linux）
- 输入关键词实时搜索，匹配结果高亮显示
- 按 **ESC** 或点击 ✕/遮罩关闭

> **注意**：需要安装 `hexo-generator-searchdb` 插件：
>
> ```bash
> npm install hexo-generator-searchdb --save
> ```
>
> 该插件会生成 `search.json` 数据文件供搜索功能使用。

### 自定义页面 / Custom Pages

使用 `page` 布局即可创建独立页面：

```bash
hexo new page about
```

编辑生成的 `source/about/index.md`：

```yaml
---
title: 关于我
layout: page
---
这里写你的内容...
```

## 🎨 自定义样式 / Customization

### 调整颜色

在主题 `source/css/style.css` 中修改 CSS 变量：

```css
:root {
  --bg: #f5f3ef;          /* 页面背景 */
  --card-bg: #fff;         /* 卡片背景 */
  --text-primary: #2a2524; /* 正文颜色 */
  --text-secondary: #777;  /* 辅助文字 */
  --accent: #b74e4e;       /* 强调色（分类标签、链接等） */
  --border: rgba(0,0,0,0.07); /* 分隔线 */
}
```

### 替换字体

修改 `--body-font` 和 `--title-font` 变量：

```css
:root {
  --body-font: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", sans-serif;
  --title-font: Georgia, "Noto Serif SC", "Songti SC", serif;
}
```

## 📂 目录结构 / File Structure

```
highlight/
├── _config.yml              # 主题配置文件
├── package.json             # 包描述
├── layout/
│   ├── layout.ejs           # 基础布局（HTML 结构 + 搜索逻辑）
│   ├── index.ejs            # 首页模板（文章列表 ★ 核心）
│   ├── post.ejs             # 文章详情模板
│   ├── page.ejs             # 自定义页面模板
│   ├── archive.ejs          # 归档页面模板
│   ├── category.ejs         # 分类页面模板
│   ├── tag.ejs              # 标签页面模板
│   └── _partial/
│       ├── header.ejs       # 头部组件（站名 + 导航栏）
│       └── footer.ejs       # 页脚组件
└── source/
    ├── css/
    │   └── style.css        # 全部样式（~600 行）
    └── js/
        └── search.js        # 搜索脚本（内嵌于 layout.ejs）
```

## 🔧 兼容性 / Browser Support

| 浏览器 | 最低版本 |
|--------|---------|
| Chrome | 70+ |
| Firefox | 65+ |
| Safari | 12.1+ |
| Edge | 79+ |

> 主要使用了 CSS Grid/Flexbox 和 CSS 变量，不支持 IE。

## 📄 许可证 / License

[MIT License](LICENSE)

## 🙏 致谢 / Credits

- 设计灵感来自 [失眠海峡](https://blog.imalan.cn)
- 基于 [Hexo](https://hexo.io/) 构建
- 搜索数据由 [hexo-generator-searchdb](https://github.com/theme-next/hexo-generator-searchdb) 生成

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/realzhengxi">ZhengXi</a><br>
  <em>"Less is More."</em>
</p>
