import type { IToolbarConfig } from '@wangeditor/editor'
import { apiBaseUrl } from '~/composables'

// 工具栏配置参考
// https://www.wangeditor.com/demo/index.html
// toolbar.getConfig().toolbarKeys
export const toolbarConfig: Partial<IToolbarConfig> = {
  toolbarKeys: [
    'headerSelect', 'blockquote', '|',
    'bold', 'underline', 'italic', 'color',
    'bgColor', '|', 'fontSize', 'bulletedList', 'numberedList',
    '|', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyJustify',
    '|', 'emotion', 'uploadImage', 'insertTable', 'codeBlock', 'divider',
  ],
}

export const editorConfig = {
  placeholder: '请输入正文内容...',
  MENU_CONF: {
    uploadImage: {
      server: `${apiBaseUrl}/upload`,
      onBeforeUpload(file: any) {
        // console.log('onBeforeUpload', file)
        return file
      },
      onSuccess(_file: any, _res: any) {
        // console.log('onSuccess', file, res)
      },
    },
  },

}
