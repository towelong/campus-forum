import type { IToolbarConfig } from '@wangeditor/editor'

// 工具栏配置参考
// https://www.wangeditor.com/demo/index.html
// toolbar.getConfig().toolbarKeys
export const toolbarConfig: Partial<IToolbarConfig> = {
  toolbarKeys: [
    'headerSelect', 'blockquote', '|',
    'bold', 'underline', 'italic', 'color',
    'bgColor', '|', 'fontSize', 'bulletedList', 'numberedList',
    '|', 'justifyLeft', 'justifyRight', 'justifyCenter', 'justifyJustify',
    '|', 'emotion', 'uploadImage', 'insertTable', 'codeBlock', 'divider',
  ],
}

export const editorConfig = { placeholder: '请输入内容...' }
