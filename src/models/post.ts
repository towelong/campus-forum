import type { EditorModel } from '~/components/CustomEditor/model'

export interface PostModel extends EditorModel {
  section_id: number
}

export interface PostEditModel extends EditorModel {
  id: number
}