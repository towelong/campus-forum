<script setup lang="ts">
const props = withDefaults(defineProps<{
  avatar: string
  name: string
  time: string
}>(), {
  avatar: 'https://avataaars.io/?avatarStyle=Circle&topType=WinterHat1&accessoriesType=Prescription01&hatColor=Gray01&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light',
  name: 'PeacefulBY',
  time: '2020-01-01',
})
</script>

<template>
  <div flex items-center>
    <img :src="props.avatar" w-12 h-12 rounded-3xl>
    <div flex flex-col text-sm justify-between max-h-12 ml-2>
      <h3 hover:text-emerald-700 cursor-pointer>
        {{ props.name }}
      </h3>
      <p text-xs text-neutral mt-1>
        {{ props.time }}
      </p>
    </div>
  </div>
</template>
