<template>
  <n-message-provider>
    <main font-sans>
      <Layout>
        <router-view />
        <n-back-top :right="30" />
      </Layout>
    </main>
  </n-message-provider>
</template>
