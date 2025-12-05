<script setup lang="ts">
import { useHead } from '@unhead/vue'

defineOptions({
  name: 'PrivacyPolicyPage',
})

useHead({
  title: '隐私政策 - 艺体志愿宝',
  meta: [
    {
      name: 'description',
      content: '艺体志愿宝平台隐私政策，详细说明我们如何收集、使用和保护您的个人信息',
    },
  ],
})
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 py-8 container">
    <!-- Hero Section -->
    <section class="mb-16 text-center">
      <h1 class="mb-4 text-4xl text-gray-900 font-bold sm:text-5xl dark:text-white">
        隐私政策
      </h1>
      <p class="text-lg text-gray-600 dark:text-gray-300">
        生效日期：2025年1月1日
      </p>
    </section>

    <!-- Privacy Policy Content -->
    <section class="mb-20 rounded-xl bg-white p-8 shadow-lg dark:bg-gray-800">
      <div class="text-gray-600 leading-relaxed space-y-8 dark:text-gray-300">
        <div>
          <h2 class="mb-4 text-2xl text-gray-900 font-bold dark:text-white">
            一、引言
          </h2>
          <p>
            艺体志愿宝（以下简称"我们"）非常重视用户的隐私保护。本隐私政策将详细说明我们在使用艺体志愿宝平台（以下简称"平台"）时收集、使用、存储和保护用户个人信息的政策和措施。
          </p>
          <p class="mt-4">
            请您在使用平台前仔细阅读本隐私政策，特别是加粗或下划线的内容。如果您不同意本隐私政策的任何内容，请立即停止使用平台。
          </p>
        </div>

        <div>
          <h2 class="mb-4 text-2xl text-gray-900 font-bold dark:text-white">
            二、我们收集的信息
          </h2>

          <h3 class="mb-3 text-xl text-gray-900 font-semibold dark:text-white">
            2.1 您主动提供的信息
          </h3>
          <p>
            当您使用平台的某些功能时，您可能需要向我们提供个人信息，包括但不限于：姓名、邮箱地址、手机号码、身份证号码、学校信息、考试成绩等。
          </p>

          <h3 class="mb-3 mt-6 text-xl text-gray-900 font-semibold dark:text-white">
            2.2 我们自动收集的信息
          </h3>
          <p>
            当您访问或使用平台时，我们可能会自动收集某些信息，包括但不限于：IP地址、浏览器类型、操作系统、访问时间、访问页面、设备信息等。
          </p>
        </div>

        <div>
          <h2 class="mb-4 text-2xl text-gray-900 font-bold dark:text-white">
            三、我们如何使用您的信息
          </h2>
          <p>
            我们收集您的信息主要用于以下目的：
          </p>
          <ul class="mt-4 list-disc pl-8 space-y-2">
            <li>为您提供平台的核心功能和服务</li>
            <li>处理您的请求和提供客户支持</li>
            <li>改进平台的功能和用户体验</li>
            <li>向您发送重要通知和更新</li>
            <li>开展市场调研和分析</li>
            <li>防止和打击欺诈、滥用等违法行为</li>
          </ul>
        </div>

        <div>
          <h2 class="mb-4 text-2xl text-gray-900 font-bold dark:text-white">
            四、信息分享与披露
          </h2>
          <p>
            我们不会将您的个人信息出售或出租给第三方。在以下情况下，我们可能会分享您的信息：
          </p>
          <ul class="mt-4 list-disc pl-8 space-y-2">
            <li>获得您的明确同意</li>
            <li>根据法律法规或政府要求</li>
            <li>保护我们或他人的合法权益</li>
            <li>与我们的合作伙伴共享（但需遵守严格的保密协议）</li>
          </ul>
        </div>

        <div>
          <h2 class="mb-4 text-2xl text-gray-900 font-bold dark:text-white">
            五、数据安全
          </h2>
          <p>
            我们采取了合理的技术和管理措施来保护您的个人信息，防止其被未经授权的访问、使用、披露或篡改。这些措施包括但不限于：
          </p>
          <ul class="mt-4 list-disc pl-8 space-y-2">
            <li>使用加密技术保护数据传输和存储</li>
            <li>限制访问个人信息的人员范围</li>
            <li>定期进行安全审计和评估</li>
            <li>制定严格的安全管理制度</li>
          </ul>
        </div>

        <div>
          <h2 class="mb-4 text-2xl text-gray-900 font-bold dark:text-white">
            六、您的权利
          </h2>
          <p>
            根据相关法律法规，您有权：
          </p>
          <ul class="mt-4 list-disc pl-8 space-y-2">
            <li>访问和获取您的个人信息</li>
            <li>更正或补充您的个人信息</li>
            <li>删除您的个人信息</li>
            <li>限制或拒绝我们使用您的信息</li>
            <li>撤回您的同意</li>
            <li>提出投诉和请求协助</li>
          </ul>
        </div>

        <div>
          <h2 class="mb-4 text-2xl text-gray-900 font-bold dark:text-white">
            七、儿童隐私
          </h2>
          <p>
            平台不面向14周岁以下的儿童提供服务。如果我们发现自己在未事先获得可验证的家长同意的情况下收集了儿童的个人信息，我们将立即删除相关信息。
          </p>
        </div>

        <div>
          <h2 class="mb-4 text-2xl text-gray-900 font-bold dark:text-white">
            八、隐私政策的变更
          </h2>
          <p>
            我们可能会不时更新本隐私政策。当政策发生变更时，我们会在平台上发布更新通知，并修改"生效日期"。建议您定期查看本隐私政策以了解最新情况。
          </p>
        </div>

        <div>
          <h2 class="mb-4 text-2xl text-gray-900 font-bold dark:text-white">
            九、联系我们
          </h2>
          <p>
            如果您对本隐私政策有任何疑问或建议，请通过以下方式联系我们：
          </p>
          <div class="mt-4 space-y-2">
            <p><strong>电子邮箱：</strong>privacy@yitisheng.com</p>
            <p><strong>联系电话：</strong>400-123-4567</p>
            <p><strong>联系地址：</strong>河南省郑州市金水区文化路100号创新大厦A座12层</p>
          </div>
        </div>

        <div class="border-t border-gray-300 pt-8 dark:border-gray-700">
          <p class="text-center text-sm text-gray-500 dark:text-gray-400">
            © 2025 艺体志愿宝 保留所有权利
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
