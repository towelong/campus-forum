<script setup lang="ts">
const props = withDefaults(defineProps<{
  avatar: string
  name: string
  isAuthor: boolean
}>(), {
  avatar: 'https://avataaars.io/?avatarStyle=Circle&topType=WinterHat1&accessoriesType=Prescription01&hatColor=Gray01&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light',
  name: 'PeacefulBY',
  isAuthor: false,
})
</script>

<template>
  <div class="flex border-b border-slate-200">
    <div flex flex-col items-center px-4 py-6 border-r border-slate-200>
      <img :src="props.avatar" w-30 h-30 rounded-3xl>
      <div flex flex-col text-sm justify-between max-h-12 mx-4>
        <p>{{ props.name }}</p>
        <p>发帖数：31</p>
      </div>
      <n-tag v-if="props.isAuthor" type="success" size="small">
        楼主
      </n-tag>
    </div>
    <div class="px-6 py-2 flex flex-col justify-between">
      <p>
        光华管理学院教授招聘翻译助理，招聘说明如下：
        工作要求：在读博士、硕士和本科同学，具备较好的英语水平和学习能力，熟悉英语学术论文写作者，有一定的翻译速度并有工作经验者优先。
        工作时间：能够长期工作的优先考虑，工作量预估为每天4小时，每周25个小时左右。
        工作内容：经管类经典书籍的外文音频文件翻译并校对。
        工作方式：大部分任务为在线完成，只要在规定的时间内，完成相应的任务即可。
        报酬：具体面议，优秀者可获得实习证明、教授推荐信。
        应聘方式：请有志于参与的同学，尽快将简历以及英语能力证书（六级、雅思、托福等）发到邮箱：cuiqingqi@outlook.com。
      </p>
      <div flex justify-between w-full>
        <div flex>
          <div v-if="!props.isAuthor" flex justify-center items-center px-2 text-xs>
            <p i-carbon-chat />
            <p>回复</p>
          </div>
          <div flex justify-center items-center px-2 text-xs>
            <p i-carbon-warning-alt />
            <p>举报</p>
          </div>
        </div>
        <p class="text-slate-400">
          发表于 2022-05-12 15:41:49
        </p>
      </div>
    </div>
  </div>
</template>
