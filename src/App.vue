<template>
  <n-message-provider>
    <main font-sans>
      <Layout>
        <router-view />
        <n-back-top :right="50" />
      </Layout>
    </main>
  </n-message-provider>
</template>
