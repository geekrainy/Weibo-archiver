<script setup lang="ts">
const appName = 'Weibo-Archiver'
const title = `${appName} - 备份你的微博`
const description = `${appName} 一个微博备份工具，在账号被完全夹没前未雨绸缪 😭。`
const ogImage = 'https://p.chilfish.top/weibo/cover.webp'

useSeoMeta({
  title,
  description,
  ogDescription: description,
  ogImage,
  ogImageAlt: appName,
  ogSiteName: appName,
  ogType: 'website',
  ogUrl: 'https://weibo.chilfish.top',
  ogLocale: 'zh_CN',
  ogTitle: title,
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: description,
  twitterCreator: 'chilllish',
  twitterImage: ogImage,
  twitterImageAlt: appName,
  twitterSite: '@chilllish',
  keywords: '微博,备份,工具,微博备份,微博备份工具,备份微博,存档,油猴脚本,backup',
})

useHead({
  htmlAttrs: {
    lang: 'zh-CN',
  },
  meta: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0',
    },
  ],
})

const route = useRoute()
const loaded = ref(route.path === '/example')

onNuxtReady(async () => {
  const publicStore = usePublicStore()
  const users = localStorage.getItem('users')
  const curUid = localStorage.getItem('curUid')

  publicStore.users = JSON.parse(users || '[]')
  publicStore.curUid = curUid || ''

  watchImmediate(() => publicStore.curUid, async () => {
    if (route.path === '/example')
      return
    loaded.value = false
    await publicStore.migrateUser()
    loaded.value = true
  })

  loaded.value = true
})
</script>

<template>
  <nuxt-layout>
    <NuxtPage v-if="loaded" />
    <n-spin
      v-else
      class="center pt-16"
      size="large"
    />
  </nuxt-layout>
</template>
