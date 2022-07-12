<script setup lang="ts">
const router = useRouter()
const go = (id: string) => {
    if (id)
        router.push(`/forum/detail/${id}`)
}
const options = ref([
    {
        name: '张三',
        src: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg',
    },
    {
        name: '李四',
        src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg',
    },
    {
        name: '王五',
        src: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg',
    },
    {
        name: '赵六',
        src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg',
    },
    {
        name: '七仔',
        src: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg',
    },
])
const star = ref(false)
const toggleStar = useToggle(star)
</script>

<template>
    <div class="card" flex="~ col" p-6 @click="go('123')">
        <div flex items-center justify-between>
            <img rounded w-10 h-10 mb-2
                src="https://avataaars.io/?avatarStyle=Circle&topType=WinterHat1&accessoriesType=Prescription01&hatColor=Gray01&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light">
            <p v-if="!star" i-carbon-star @click.stop="toggleStar()" />
            <p v-else i-carbon-star-filled text-yellow @click.stop="toggleStar()" />
        </div>
        <p class="text-color mb-2 text-xl">
            Friendly Partner
        </p>
        <p mb-2>
            the United Nations can remain in TimorLeste as a friendly partner.
        </p>
        <n-avatar-group :options="options" :size="30" :max="3" ml-auto>
            <template #avatar="{ option: { name, src } }">
                <n-tooltip>
                    <template #trigger>
                        <n-avatar :src="src" size="small" />
                    </template>
                    {{ name }}
                </n-tooltip>
            </template>
        </n-avatar-group>
    </div>
</template>

<style scoped>
.card {
    /* height: 168px; */
    /* background-color: rgba(0, 128, 0, 0.12); */
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12);
    cursor: pointer;
}
</style>