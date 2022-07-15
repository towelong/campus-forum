<script setup lang="ts">
const value = ref<string>('')
const [open, toggle] = useToggle(false)
</script>

<template>
  <div flex flex-col pt-1 mb-1 border-b-1 border-light-700>
    <div flex>
      <img
        class="w-10 h-10"
        src="https://gss0.bdstatic.com/6LZ1dD3d1sgCo2Kml5_Y_D3/sys/portrait/item/tb.1.683a949b.ujmqt3E6neU9jVwXXYl8yA"
        alt=""
      >
      <p text-emerald-700 ml-1>
        我舞影凌乱
      </p>
      <p mr-1>
        :
      </p>
      <p>试过了五百多分开通不了</p>
    </div>
    <div flex justify-end text-slate-400>
      <p mr-1>
        发表于 2022-06-21 12:48:08
      </p>
      <!-- <p ml-2 text-emerald-700 cursor-pointer @click="toggle()">
        回复
      </p> -->
      <n-button text @click="toggle()">
        <p text-emerald-700>
          回复
        </p>
      </n-button>
    </div>
    <template v-if="open">
      <n-input v-model:value="value" type="textarea" placeholder="回复" />
      <div flex justify-end my-1>
        <n-button type="primary">
          发表
        </n-button>
      </div>
    </template>
  </div>
</template>
