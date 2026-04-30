# Eren 个人网站 · 设计交付文档

> **Codename**: Home-Eren | AI Edgerunners
> **Style**: 王家卫 × Cyberpunk
> **Last updated**: 2026.04.29

---

## 0 · 一句话概括

> **凌晨三点的尖沙咀，霓虹打在湿漉漉的电路板上。**
> 一个穿着风衣的人站在街角，他的手机里跑着一段 AI 推理日志。

整站的体验目标：**慢一点点，再赛博一点点**。访客一进来不是被信息砸到，是被"氛围"裹住。

---

## 1 · 设计基调（Design Direction）

### 1.1 风格融合公式

| 王家卫负责 | 赛博朋克负责 |
| --- | --- |
| 时间感 / 怀旧 / 步进印片（step-printing）的拖影 | 故障 / 扫描线 / 色差 / 终端字 |
| 饱和的胶片色（绿、红、琥珀） | 高对比霓虹（青、品红） |
| 手写感的中文、潮湿感、暧昧 | 几何感的英文、硬边、冷光 |
| 文本里的日期与编号 | UI 上的时间戳与状态码 |
| "人"的温度 | "机器"的纹理 |

**底层逻辑**：用王家卫的"慢"和"暖"反差掉赛博朋克容易陷入的"冷"和"装"。任何元素如果只有赛博朋克味、没有人味，就重做。

### 1.2 关键词（用来给设计师对齐）

`霓虹` `胶片颗粒` `扫描线` `步进印片` `潮湿` `时间戳` `手写` `招牌` `终端` `九龙城寨` `磁带` `慢镜头` `走廊` `单行道` `凌晨三点`

### 1.3 必须避免的"AI 网站通病"

- ❌ 一打开就紫粉渐变 + 玻璃拟态
- ❌ 标准化的 hero "Hi, I'm \_\_\_, a designer/developer based in \_\_\_"
- ❌ 浮夸的 3D 球体 / 流体
- ❌ "Made with ❤️" 那种自得其乐的页脚

---

## 2 · 配色系统（Color System）

所有色值都给十六进制 + 用途。设计师可以直接抄进 Figma 的 color styles。

### 2.1 基础底色（Surface）

| Token | Hex | 用途 |
| --- | --- | --- |
| `--bg-void` | `#0A0A0F` | 整站主背景。略偏蓝的近黑，比纯黑更"夜"。 |
| `--bg-surface-1` | `#13131A` | 卡片底、section 微抬升 |
| `--bg-surface-2` | `#1E1A28` | 卡片 hover 态，带一点点品红底色，照到霓虹的感觉 |
| `--bg-letterbox` | `#000000` | 视频上下黑边、过渡帧用纯黑 |

### 2.2 王家卫主色（Filmic Accent）

| Token | Hex | 用途 |
| --- | --- | --- |
| `--wkw-green` | `#3DFF8F` | **核心主色**。重庆森林那种街灯绿、过期日期绿。链接、关键数字、终端文字 |
| `--wkw-red` | `#FF2E63` | 霓虹招牌红。强调、错误状态、印章 |
| `--wkw-amber` | `#FFB627` | 暖色台灯。About Me 区块、深夜模式、Footer |
| `--wkw-amber-dim` | `#7A5A1F` | 哑光琥珀，用于柔和提示 |

### 2.3 赛博朋克副色（Cyber Accent）

| Token | Hex | 用途 |
| --- | --- | --- |
| `--cy-cyan` | `#00E5FF` | 全息感、loading、数据可视化、"已复制"提示 |
| `--cy-magenta` | `#FF00E5` | 故障态、色差里的红绿蓝拆分用 |
| `--cy-scanline` | `rgba(255,255,255,0.04)` | 扫描线纹理 |

### 2.4 文本色

| Token | Hex | 用途 |
| --- | --- | --- |
| `--text-primary` | `#F5F5F7` | 主要正文（不要纯白，太刺眼） |
| `--text-secondary` | `#8B8B95` | 次要信息、注释、辅助说明 |
| `--text-mute` | `#4A4A55` | 时间戳、版本号、底层信息 |

### 2.5 用色比例（70/20/8/2）

整站铺色按这个比例：

- **70%** `--bg-void` + `--bg-surface-1` 的暗底
- **20%** `--text-primary` 的白文字
- **8%** 其中一个王家卫主色当主导（按 section 分配，见下）
- **2%** 赛博副色用作"故障"点缀

### 2.6 各 section 主导色分配

| Section | 主导色 | 说明 |
| --- | --- | --- |
| Loading | `--cy-cyan` | 终端、加载条 |
| Hero | `--wkw-green` | "everything!" 的那种命运感 |
| About Me | `--wkw-amber` | 暖光、温度、人 |
| Photo Mask | `--wkw-red` → `--wkw-green` | 红到绿的过渡呼应蒙版变化 |
| Skills | `--wkw-green`，编号用 `--wkw-red` | 让数字像招牌 |
| Portfolio | `--wkw-red` | 项目印章感 |
| Videos | 整体去饱和，hover 时 `--wkw-amber` 注入 |
| Footer | `--wkw-amber-dim` | 散场后的余温 |

---

## 3 · 字体系统（Typography）

### 3.1 字体清单（全部开源 / Google Fonts 可用）

| 角色 | 英文 | 中文 | 备注 |
| --- | --- | --- | --- |
| **Display 大标题** | `Anton` 或 `Bebas Neue` | `庞门正道粗书体` 或 `站酷高端黑` | 用于 Hero、section 大编号、招牌字 |
| **Mono 终端字** | `JetBrains Mono` | （中文不需要） | 时间戳、状态码、加载文本、复制按钮 |
| **Body 正文** | `Inter` | `思源黑体 / Source Han Sans` 的 Regular / Medium | 长段说明、卡片描述 |
| **Handwritten 手写** | `Caveat` 或 `Reenie Beanie` | `霞鹜文楷 LXGW WenKai` | 王家卫感的旁白、注释、中文短句 |

> **备选**：如果项目预算允许商用授权，英文 Display 可以换 `Druk Wide Bold`（更扁、更狠），更接近 Edgerunners 的官方字体气质。

### 3.2 字号层级（rem 基准 16px）

| Level | Size | Weight | Letter-spacing | 用途 |
| --- | --- | --- | --- | --- |
| H1 / Hero | `clamp(64px, 12vw, 180px)` | 800 | `-0.02em` | "The world / AI represents / Everything!" |
| H2 / Section title | `64px` (mobile 40px) | 700 | `0` | "ABOUT ME"、"what skills can i have" |
| H3 / 卡片标题 | `28px` | 600 | `0` | 技能卡、作品卡标题 |
| Body L | `18px` | 400 | `0` | 主介绍段落 |
| Body | `15px` | 400 | `0` | 一般正文 |
| Caption | `12px` | 500 | `0.05em` | 编号、标签 |
| Mono | `13px` / `11px` | 400 | `0` | 时间戳、终端文本 |

### 3.3 中英文混排规则

- 中英之间留一个 **0.125em** 的视觉间隙（用 CSS `word-spacing` 或半角空格手动）
- 中文 punctuation 用全角，英文用半角
- 中英文混排的副标题，**英文用 mono、中文用霞鹜文楷**，会有一种"翻译注释"的感觉。例：
  ```
  ABOUT ME
  关·于·我
  ```
- 间隔点 `·` 用得起劲一点，是王家卫的招牌（"先·别·滑·走"）

---

## 4 · 全局视觉元素（Global Visual Layer）

这一层是叠加在所有 section 之上的"氛围层"，不归任何 section 管。

### 4.1 胶片颗粒（Film Grain）

- 全屏 SVG 噪点叠加，`opacity: 0.06`，`mix-blend-mode: overlay`
- 不要静止，要 **8fps 循环 6 帧**，模拟真实胶片
- 实现：可以用 [grained.js](https://github.com/sapegin/grained) 或自己写 canvas

### 4.2 扫描线（Scanlines）

- 全屏，水平线，间距 3px
- 颜色 `--cy-scanline`（极淡）
- 不动也行；如果做动效，**整体每 4 秒缓慢下移一像素**，几乎察觉不到

### 4.3 霓虹辉光（Bloom）

- 所有用 `--wkw-green`、`--wkw-red`、`--cy-cyan` 的高亮文字 / 元素，加 `filter: drop-shadow(0 0 8px currentColor)`
- 强度根据元素大小调整，标题加 `0 0 24px`，小字加 `0 0 4px`

### 4.4 色差（Chromatic Aberration）

不要全局开。只在以下时机使用：

- Hover 大标题
- 故障态（Glitch state）
- Section 切换的 1 帧
- 闲置状态触发的 idle 动画

实现：文字用三层叠加，红 +2px / 绿 0 / 蓝 -2px

### 4.5 自定义光标

- 默认状态：一个 12px 的青色细十字 `+`，跟随鼠标，**带 50ms 延迟**形成微弱拖影（王家卫的步进印片感）
- Hover 可点击：变成一个 16px 圆环 + 中心绿点
- Hover 视频 / 图片：变成 `→ WATCH` 的小标签，mono 字体
- 拖动滚轮：拖影加长

### 4.6 滚动行为

- `scroll-behavior: smooth`，但用 Lenis 做更柔的滚动
- 滚动时整页有非常细微的 motion blur（`filter: blur(0.5px)` 仅在滚动中），停止 100ms 后取消
- **滚动速度比默认慢 15%**——这是营造"时间感"的关键

---

## 5 · 全局交互（Global Interactions）

### 5.1 闲置状态（Idle Mode）

**触发**：用户 8 秒没有任何输入（鼠标 / 滚动 / 键盘）

**表现**：
1. 屏幕右下角缓慢淡入一行 mono 文字：
   ```
   2026.04.29  03:14:22  CHANGHUA, TW
   STILL THERE? [press any key]
   ```
2. 主标题文字开始非常缓慢地"呼吸"——色差幅度从 0 到 1px 的循环
3. 轻微噪点强度从 0.06 提升到 0.10

**退出**：任何输入立即恢复，配合 1 帧色差闪烁。

### 5.2 深夜模式（Insomnia Mode）

**触发**：检测用户本地时间在 23:00 – 05:00 之间，**自动启用**（不要做切换按钮）

**表现**：
- 整体氛围色温向琥珀偏移：所有 surface 加一层 `rgba(255, 182, 39, 0.04)` 的覆盖
- Hero 的视频背景透明度降低到 70%
- Footer 出现额外一行：`> INSOMNIA_MODE  ENABLED // 这个时间还醒着，欢迎`

### 5.3 页面切换（访客登记 / 主页）

不要用淡入淡出。用 **VHS 倒带** 效果：

1. 当前页面整体向上"拉"成一条水平线（180ms，cubic-bezier(0.65, 0, 0.35, 1)）
2. 中间一帧纯黑 + 一行 mono `> SWITCHING TAPE...`（80ms）
3. 新页面从水平线"展开"出来（200ms）

### 5.4 彩蛋（Easter Eggs）

| 触发 | 效果 |
| --- | --- |
| 键盘连按 `↑↑↓↓←→←→BA` | 全屏故障 2 秒，色差拉满，结束后留下一行 mono：`> CHEAT_CODE_ACCEPTED // 你也是同道中人` |
| 在 Hero 上停留 30 秒不滚动 | 背景视频出现一段隐藏字幕：`他在等什么？/ What's he waiting for?` |
| 连续点击 Footer 的 `END OF FILM` 三次 | 页面播放一段 1 秒"卷盘倒带"动画，回到顶部 |

### 5.5 音频（默认关闭，给开关）

- 默认静音
- 右下角有一个小图标：扬声器 + 一行 mono `AMBIENCE`
- 点开后播放 ambient loop：背景城市音 + 极轻的 bossa nova 钢琴
- 这一项不是必须，但开了之后体验会上一层

---

## 6 · 各 Section 详细设计

> 每个 section 给四块：**视觉**、**内容映射**、**交互细节**、**实现要点**。

---

### Section 1 · Loading 加载页

**视觉**

- 全屏播放用户已有的 `4月29日.mp4`
- 视频上叠加：胶片颗粒 + 扫描线 + 4:3 letterbox（上下黑边各 8vh）
- 左下角，mono 字体，`--cy-cyan` 色：
  ```
  EREN.OS  v2.0.26
  LOADING  ▓▓▓▓▓▓▓▓░░  80%
  [00:00:01.234]
  ```
- 时间戳真实计数

**交互细节**

- 进度条不要假进度，跟实际视频缓冲走
- 100% 时，**最后 3 帧**做色差爆发 + 一帧纯白 + 切到首屏
- 用户可以按任意键跳过加载，跳过时也走同样的"切换"动画

**实现要点**

- 视频 `playsinline muted autoplay`，移动端必须能播
- 提供 webp 序列帧 fallback（万一 mp4 加载慢）

---

### Section 2 · Hero 首屏

**视觉**

- 背景：循环播放的城市夜景视频（用素材里的视频之一，去饱和 + 加绿色调），**0.7x 倍速**
- 上方 letterbox 的位置（顶栏）从左到右：
  - 左：返回箭头 `←`（mono）
  - 中：留白
  - 右：两个圆形按钮 —— `MENU`、`VISITOR LOG`
- 中央主标题三行：
  ```
  The world
  AI represents
  Everything!
  ```
  Anton 800、`--wkw-green`、巨大、有色差
- 副标题（在主标题下方，往左偏一点）：
  ```
  -Wait, don't go yet-
  先 · 别 · 滑 · 走
  ```
  英文 mono、中文霞鹜文楷
- 屏幕底部：scroll 提示
  ```
  ↓
  scroll, slowly
  ```

**内容映射**（来自原文档）

- "The world / AI represents / Everything!" → 主标题，**保留**
- "-Wait, don't go yet- / 先·别·滑·走" → 副标题，**保留**
- 之前文档里提到的"名句"全部不加

**交互细节**

1. **主标题逐字打字机**：进入时三行依次打出来，每字 40ms。打到"Everything"的"!"时停 200ms 然后炸一帧色差。
2. **副标题跟手**：副标题文字以延迟 80ms 跟随鼠标做**最大 12px** 的位移（视差感）。
3. **悬停 "Everything"**：每个字符随机变成 ASCII 乱码 200ms 后还原。
4. **顶栏三个按钮**：
   - `←` 返回：hover 时按钮内出现"REW"图标，点击触发 5.3 的倒带效果
   - `MENU`：hover 展开为四个选项 `HOME / SKILLS / WORKS / VIDEO`，竖直排列；展开过程像 CRT 切换频道，**中间夹一帧雪花静电**（80ms）
   - `VISITOR LOG`：点击进入访客登记新页（见 Section 9）
5. **闲置 5 秒**：触发 5.1 的 idle 状态。
6. **scroll 提示**：那条 `↓` 是一条 `--wkw-green` 的 1px 直线，每 1.5 秒缓慢"流"一次（光点从上到下走过去）。

**实现要点**

- 主标题字号一定要顶满。`clamp(80px, 14vw, 220px)`。不能怂。
- 三个顶栏按钮在移动端折叠成一个汉堡（仍然是 mono 字体的 `[≡]`）

---

### Section 3 · About Me

**视觉**

- 进入这个 section 时，最顶上出现一条像电影开场的"片头白边"（白色横条，里面 mono 文字 `> SECT 03 / ABOUT_ME`），停 600ms 后向上消失
- 标题 `ABOUT ME` 大字（H2），下面跟一行小字：`关·于·我` 霞鹜文楷
- 正文：
  ```
  Hello, this is Eren — former short-video director,
  now diving deep into AI.

  Let's do some cool things :)
  ```
- 右上角小字：`▲ REC  00:00:42`（持续闪烁的红点）

**内容映射**

- 标题 `ABOUT ME` —— 保留
- 内容 `Hello, this is Eren ...` —— 保留，但建议把破折号 `—` 用上，更王家卫
- `Let's do some cool things :)` —— 保留，那个 `:)` 是核心人味

**交互细节**

1. **打字机出现**：正文用 mono 字体打字机效果出现，60ms / 字
2. **`:)` 持续闪烁**：每 1 秒闪一次，模拟终端光标
3. **悬停 "former"**：单词出现 strikethrough 删除线，同时下方淡入小字 `[2019 - 2024]`
4. **悬停 "AI"**：AI 两个字符变成 `--wkw-green` + bloom + 1 帧色差
5. **REC 小红点**：每 1.2s 闪一次，时间戳真实计数（页面打开时长）

**实现要点**

- 整个 section 的字号用相对小一点的 H2（48px），让它更像"独白"
- 不要居中，左对齐，配合大量留白

---

### Section 4 · 个人照片（Photo Mask Transition）

> 用户文档里说：图1 → 图2 随滚动渐变，参考图3。

**视觉**

- Section 高度 = `200vh`（吃掉两屏滚动）
- 图片始终居中，`object-fit: cover`，铺满 80% viewport
- 滚动进度 0% → 100% 控制蒙版从 0 到 100%

**交互细节** —— 这一段是这一个 section 的核心

1. **基础 mask transition**：用 SVG mask 或 CSS `clip-path`，从图1 平滑过渡到图2。形状不要用规整的水平线，用一个**轻微波浪**的边界（像水面）
2. **蒙版边缘**：边界处 4px 宽，色差拉到 RGB 拆分（红绿蓝各偏 2px），看起来像玻璃裂痕
3. **进度指示**：屏幕右侧 1px 竖线，`--wkw-red` → `--wkw-green` 渐变，按滚动进度填充
4. **50% 节点的故障帧**：滚动到正中间那一瞬间，**插入一帧两张图叠加 + 全屏色差**，持续 60ms 然后消失。这是 hooking moment。
5. **底部提示**：滚动期间右下角出现 mono 字 `TRANSFORMING... 47%`，进度真实
6. **离开 section**：色差归零、进度提示淡出

**实现要点**

- 用 `IntersectionObserver` + `scroll progress` 做精确控制，不要用 css 动画近似
- 移动端：因为悬停操作不可用，**滚动驱动一切**正好适配
- 两张图必须保证脸部 / 主体在同一位置，不然蒙版过渡会很丑

---

### Section 5 · Skills

**视觉**

- 标题：
  ```
  what skills
  / can i have
  ```
  两行错落，第二行往右缩进，前面带斜杠
- 三个卡片**横向排列**（移动端竖向），每张卡片的结构：
  - 巨大的编号 `01` `02` `03`，半透明绿色，约占卡片 60% 高度，作为背景层
  - 卡片正文（叠在编号上）：
    - 上：英文标题 `AI Trainer`，Anton Bold，`--text-primary`
    - 中：中文括注 `（AI 训练赋能）`，霞鹜文楷
    - 下：手写感小字 `爱调教一些奇奇怪怪的 AI`
- 三张卡片纵向不对齐，**Card 1 顶齐、Card 2 下沉 24px、Card 3 上抬 16px**（王家卫的不对称排版）
- 卡片之间不要有强分割线，用空气感分隔

**内容映射**

| 编号 | 英文 | 中文 | 描述 |
| --- | --- | --- | --- |
| 01 | AI Trainer | AI 训练赋能 | 爱调教一些奇奇怪怪的 AI |
| 02 | Short-video Director | 短视频编导 | 爱拍一些莫名其妙的视频 |
| 03 | Graphic Designer | 平面制作 | 爱做一些不拘一格的设计 |

底部标语（三行，居中或居左，错落排列）：
```
Full of creativity
   Able to imagine
      Ready to create
```
三行各用一个不同色：`--wkw-green` / `--wkw-amber` / `--cy-cyan`，每行进入视口时再亮起。

**交互细节**

1. **卡片入场**：滚到这一区域，三张卡片**错峰**从下方升起，间隔 120ms
2. **卡片 hover**：
   - 卡片整体 Y 轴抬起 8px
   - 背景编号从半透明绿变成**实色 `--wkw-red`**，并有一道扫描线从上往下扫过
   - 描述行的小字逐字加亮
   - 卡片底部出现一条 `--wkw-green` 的进度条，120ms 走完
3. **3D 微视差**：鼠标在 hero section 之外的整个页面移动时，卡片做 `transform: rotateY()` 最多 ±3 度，跟手感
4. **底部三行标语**：每行进入视口时打字机展开，三行总共 1.2s 完成

**实现要点**

- 编号用 `font-size: 240px` 这种夸张字号，但 `line-height: 0.85`，让数字"扁"
- 描述行的手写体用 `transform: rotate(-1deg)` 微微倾斜，更像随手记

---

### Section 6 · Portfolio / Works

> 用户文档里说：4 个作品，悬停显示图片，点击跳到抖音主页。

**视觉**

- 标题：
  ```
  Eren 参与制作过的账号
  / Projects Eren has contributed to
  ```
- 4 个项目以**列表形式纵向**排列（不是网格），每行：
  ```
  01    [项目名]                             →
  02    [项目名]                             →
  03    [项目名]                             →
  04    [项目名]                             →
  ```
- 行高极大（`120px`），编号用 Anton 88px 半透明白
- 默认状态：极简，只有文字，没有图片

**交互细节**

1. **悬停某一行**：
   - 该行的项目名和编号点亮，`--wkw-red`
   - 该行其他兄弟行**自动降到 30% 透明度**（聚焦感）
   - **图片以"快门光圈打开"的方式从行的右侧浮现**——一个圆形 mask 从中心向外扩散，把项目截图露出来。图片大小约 `400 x 300px`，浮动在右侧 20vw 处
   - 图片右下角盖一个 `--wkw-red` 的圆形印章 `[01]`（汉字章感）
   - 鼠标光标变成 `→ VIEW ON DOUYIN`
2. **离开行**：图片以同样的光圈方式收回中心然后消失
3. **点击行**：
   - 整行闪一帧白
   - 触发 5.3 的 VHS 倒带样式过渡
   - 在新标签页打开抖音主页链接
4. **移动端 fallback**：因为没有 hover，每行下方直接展开缩略图（默认折叠状态）

**实现要点**

- 浮动图片用 `position: absolute` + `pointer-events: none` 防止挡操作
- 印章用 SVG 做，红色 + 略微旋转 4 度
- 每个项目对应抖音 URL，需用户后续提供

---

### Section 7 · Personal Videos

> 用户文档里说：`get more video of Eren`，2025，4 个视频用图片网格 / 瀑布流。

**视觉**

- 标题：
  ```
  video
  / get more video of Eren
  ```
- 右上角小标签：`RECORDED: 2025`，mono 字
- **不要**用规整的 2x2 网格，用王家卫式的不对称布局：
  ```
  ┌────────────┐  ┌──────┐
  │   Video 1  │  │ V 2  │
  │   (大)     │  └──────┘
  │            │  ┌──────────────┐
  └────────────┘  │   Video 3    │
  ┌────────────────────────────┐ │
  │       Video 4 (横长)        │ │
  └────────────────────────────┘ ┘
  ```
  视频缩略图大小不一，错落

**内容映射**

- 4 个视频文件直接用用户提供的：
  - `949f92fa33bd15b7a92f08a5d8babe91.mp4`
  - `d1995f18d13526b1c7846d1c4c4ed066_raw.mp4`
  - `四大发明.mp4`
  - `女神节.mp4`

**交互细节**

1. **默认状态**：4 个视频都是首帧静止图，**整体去饱和到 30%**（接近黑白但留一点点色），叠加扫描线
2. **悬停某个视频**：
   - 该视频开始**静音自动播放**
   - 颜色还原到 100%
   - 左上角出现 `REC ●` + 真实计时（视频播放进度，不是页面停留时间）
   - 其他视频降到 20% 透明度
3. **点击视频**：
   - 视频弹出全屏 modal，黑底 + 8vh letterbox，自带胶片颗粒
   - 修改鼠标光标为 `[ × CLOSE ]`
   - 点击外部关闭，按 ESC 关闭
4. **移动端**：tap 一次预览（自动播放静音），tap 两次进 fullscreen

**实现要点**

- 视频统一压成 720p 或 480p，加 `preload="metadata"` 不要 `preload="auto"`，省流量
- 移动端默认全部静止，避免一打开就 4 个视频抢资源
- 全屏 modal 不要用 `<dialog>`（兼容性），用一个 fixed 全屏 div

---

### Section 8 · Footer

**视觉**

整段排版像电影**结尾职员表**，但用 mono 字体。居中 / 左对齐均可。

```
> CONTACT
> EMAIL    1976487027@qq.com           [ COPY ]
> TEL      17606382975                 [ COPY ]
> WECHAT   [ QR Code ▢ ]               [ SHOW ]

——

> END OF FILM
> LOOP? [Y/N]    © 2025 EREN. ALL FRAMES RESERVED.
```

**交互细节**

1. **每行进入视口**：从左到右扫光出现（`--wkw-amber-dim`，0.4s）
2. **`[COPY]` 按钮**：
   - 默认：方括号包裹的 mono 字
   - hover：括号变成 `--cy-cyan`，文字变 `[ COPY → ]`
   - 点击：复制内容，文字变 `[ COPIED ✓ ]`，2 秒后还原。**不要弹 toast，太重**
3. **WECHAT [SHOW]**：点击在原位展开 200x200 的 QR 码，再点关闭
4. **`LOOP? [Y/N]`**：
   - hover Y：变绿
   - 点击 Y：触发"卷盘倒带"，**整页快速回到顶部**（750ms，反向滚动 + 短暂色差）
   - hover N：变红
   - 点击 N：什么也不发生，但 mono 文字闪一下 `> OK, GOOD NIGHT.`
5. **彩蛋**：连续点击 `END OF FILM` 三次，触发 5.4 中的彩蛋动画

**实现要点**

- 邮箱、电话、微信要保证移动端也能直接点（`tel:` `mailto:` 链接 + 长按复制）
- QR 码图建议 SVG 矢量

---

### Section 9 · 访客登记页（Visitor Log，新页面）

> 这是 Hero 顶栏右上角 `VISITOR LOG` 点击进入的新页。

**概念**

像入境处的登记表 + 一段日志终端，访客留下名字、来自哪、想说什么，提交后会显示在页面上的留言列表（如果不做后端，可以暂时用 localStorage 假装持久化，或者 mock 一些初始数据）。

**视觉**

- 顶部一行 mono：
  ```
  > VISITOR_LOG.LOG
  > ENTRIES: 247        LAST UPDATE: 2026.04.29 03:14
  ```
- 中间表单，每个 input 长得像终端命令行：
  ```
  > NAME:        ▮
  > FROM:        ▮
  > MESSAGE:     ▮
                 ▮
                 ▮
  > [SUBMIT]
  ```
  `▮` 是闪烁光标
- 下半页是已提交的留言列表，每条像一行 log：
  ```
  [2026.04.29 03:14:22]  Lin from 上海:        路过，喜欢你的设计 :)
  [2026.04.29 02:55:11]  小李 from 北京:        AI 这条路加油
  [2026.04.28 23:40:08]  Anonymous:            ...
  ```

**交互细节**

1. **input 聚焦**：左侧 `>` 变成 `--wkw-green` 并发光
2. **提交**：
   - 表单每行变成"打字机重放"，从左到右快速重打一遍
   - 然后整条行往下推到 log 列表里
   - 最顶端浮现一行 mono：`> ENTRY ADDED  ✓`，2s 后消失
3. **空提交保护**：留空 NAME 时，按 SUBMIT 整张表单 horizontal shake 200ms + 一帧色差，下方出现 `> ERROR: NAME REQUIRED`
4. **回到主页**：左上角箭头 `← BACK TO MAIN`，点击触发 VHS 倒带切回首页

**实现要点**

- 如果有后端：留言数据存数据库
- 如果纯前端：localStorage + mock 一批初始数据让页面不空着
- **必须有敏感词过滤**，否则会被填脏话

---

## 7 · 动效规范（Animation Specs）

### 7.1 缓动曲线（Easing）

| Token | Bezier | 用途 |
| --- | --- | --- |
| `--ease-cinematic` | `cubic-bezier(0.65, 0, 0.35, 1)` | 主流过渡、section 切换 |
| `--ease-glitch` | `steps(6, end)` | 故障态、打字机 |
| `--ease-soft` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | 卡片浮起、hover |
| `--ease-snap` | `cubic-bezier(0.87, 0, 0.13, 1)` | 印章盖上、按钮按下 |

### 7.2 时长规范

| 用途 | 时长 |
| --- | --- |
| 微交互（hover、按钮反馈） | 150 – 200ms |
| 卡片入场、淡入 | 400 – 600ms |
| 页面切换 | 460ms（180 + 80 + 200） |
| 滚动驱动（mask transition） | 跟滚动同步，无固定时长 |
| 故障 / 闪烁 | 60 – 120ms |
| 闲置呼吸 | 4s 一个循环 |

### 7.3 关键动效命名（动效库参考）

- `glitch-burst`：色差爆发 + 1 帧白闪
- `vhs-rewind`：垂直压扁 → 水平线 → 垂直展开
- `crt-channel-switch`：雪花静电 80ms
- `aperture-open`：圆形 mask 从中心扩散
- `seal-stamp`：印章随机旋转 ±5° 落下，带轻微弹跳
- `typewriter`：逐字出现，每字 40-60ms，可加光标
- `scan-sweep`：水平扫描线从上到下扫过元素一次

---

## 8 · 响应式（Responsive）

### 8.1 断点

| 名称 | 宽度 | 备注 |
| --- | --- | --- |
| Mobile | < 640px | 必须保证全部功能 |
| Tablet | 640 – 1024px | hover 类降级为 tap |
| Desktop | 1024 – 1440px | 主体验目标 |
| Wide | ≥ 1440px | 超大屏适配，加宽 hero 字号 |

### 8.2 移动端关键调整

- Hero 主标题降到 `clamp(56px, 16vw, 96px)`
- 顶栏三按钮折叠成 `[≡]` 汉堡
- Skills 三卡片纵向堆叠
- Portfolio 4 个项目，hover 图片改为默认展示缩略图
- Videos 取消去饱和默认态，避免黑乎乎
- 所有 hover 动画改为**tap 触发**或**进入视口触发**
- 自定义光标在移动端禁用
- 胶片颗粒、扫描线 opacity 降低 50%（移动端 GPU 吃不消太多 blend）

---

## 9 · 性能与可访问性

- **图片**：全部 webp + lazy load + 提供 `width / height` 防止布局抖动
- **视频**：preload="metadata"，移动端不自动播放（除了 hero 背景，且必须 muted）
- **动效降级**：监听 `prefers-reduced-motion`，命中时关闭所有非必要动画（仅保留淡入淡出）
- **对比度**：所有正文 `--text-primary` on `--bg-void` 对比度 ≥ 12:1，过关
- **键盘可达**：所有可点击元素必须能 Tab 到，focus 状态用 `--cy-cyan` 描边
- **字号**：移动端正文不小于 14px

---

## 10 · 交付物清单（给设计师 / 前端）

### 设计师产出

- [ ] Figma 文件，包含：
  - Color styles（按 §2 的 token 命名）
  - Text styles（按 §3 的层级）
  - Components：按钮、卡片、输入框、印章、滚动条
  - 各 section 高保真稿（desktop + mobile）
  - 自定义光标 4 个状态
  - Loading 进度条样式
- [ ] 全套图标 SVG（icon set 不超过 12 个）
- [ ] 印章 SVG 4 个（编号 01-04）
- [ ] 噪点纹理 PNG（半透明）
- [ ] QR 码 SVG
- [ ] Favicon 16/32/180

### 前端产出

- [ ] HTML 结构 + 语义化 tag
- [ ] CSS（建议用 Tailwind + custom CSS variables）
- [ ] 动画用 GSAP + Lenis（滚动）
- [ ] Intersection Observer 处理 section 进入退出
- [ ] localStorage 处理访客登记（如无后端）
- [ ] 性能预算：FCP ≤ 1.5s / LCP ≤ 2.5s / CLS ≤ 0.1
- [ ] Lighthouse 分数 ≥ 90

### 内容缺口（需用户补充）

- [ ] 4 个 Portfolio 项目的真实**抖音主页 URL**
- [ ] WECHAT 二维码图
- [ ] 个人照片 2 张（用于 Section 4 的 mask transition）
- [ ] 隐藏字幕的英文 "What's he waiting for?" 是否保留

---

## 附录 A · 参考站对照

| 参考 | 取法 |
| --- | --- |
| https://www.jiejoe.com | Hero 字号、Skills 错落排版、案例列表交互的"高级感" |
| 重庆森林 1994 | 步进印片、绿色街灯、手写感、过期日期 |
| Cyberpunk: Edgerunners | 命名调性、霓虹色组合、故障美学 |
| Blade Runner 2049 | letterbox、雾感、慢节奏 |
| 银翼杀手 / 攻壳机动队 | 终端字、扫描线、CRT 质感 |

---

## 附录 B · 词汇对照表（中英文常用）

| 中文 | 英文 | 出现位置 |
| --- | --- | --- |
| 关于我 | ABOUT ME | §3 |
| 我有什么技能 | what skills can i have | §5 |
| 参与制作过的账号 | Projects Eren has contributed to | §6 |
| 视频 | video / get more video of Eren | §7 |
| 联系方式 | CONTACT | §8 |
| 访客登记 | VISITOR LOG | §9 |
| 先别滑走 | Wait, don't go yet | §2 |

---

> 文档结束。
> `> END OF SPEC // ALL FRAMES RESERVED.`
