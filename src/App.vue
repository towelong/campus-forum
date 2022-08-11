<template>
  <n-message-provider>
    <main>
      <Layout>
        <router-view />
        <n-back-top :right="30" />
      </Layout>
    </main>
  </n-message-provider>
</template>
