# QA 知识

本目录负责质量和验证标准。

故事的 `tests.md` 在定义验收检查时，应引用本目录。故事的 `plans/qa.md` 记录该故事的具体验证结果。

当前标准：

- 声明实现完成前，必须运行 `pnpm build`。
- 涉及 UI 改动时，应尽量使用浏览器或 Playwright 验证核心路径。
- 故事级验证结果记录到 `products/.../story-*/plans/qa.md`。
