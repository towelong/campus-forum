<script setup lang="ts">
import { useFetch } from '@vueuse/core'

const { isFetching, error, data } = useFetch('https://httpbin.org/get')
</script>

<template>
  <div>
    <transition>
      <p v-if="isFetching">
        loading: {{ isFetching }}
      </p>
    </transition>
    <template v-if="!isFetching">
      <p>
        接口返回：data => {{ data }}
      </p>
      <br>
      <p>
        接口返回：error => {{ error }}
      </p>
    </template>
  </div>
</template>
