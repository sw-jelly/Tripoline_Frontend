<script setup>
import { RouterLink } from 'vue-router'
import { useMemberStore } from '@/stores/member'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
const router = useRouter()
const memberStore = useMemberStore()
const { userLogout } = memberStore
const { userInfo, isLogin } = storeToRefs(memberStore)

const logout = async () => {
  await userLogout(userInfo.memberId)
  if (!isLogin.value) {
    alert('로그 아웃 완료!')
    router.push('/')
  }
}
</script>

<template>
  <nav class="flex min-h-[100px] align-center justify-around bg-white text-black font-mono">
    <div class="flex items-center">
      <RouterLink :to="{ name: 'main' }" class="no-underline">
        <!-- <img src="@/assets/flight.png" width="90" /> -->
        <span
          class="animate-move-bg bg-gradient-to-r from-indigo-500 via-pink-500 to-indigo-500 bg-[length:400%] bg-clip-text text-transparent text-4xl font-bold"
          >TRIPOLINE
        </span>
      </RouterLink>
      <div class="w-[100px]">
        <h1 id="typed_header" class="text-2xl mx-4 text-black"></h1>
      </div>
    </div>
    <div class="flex items-center">
      <ul class="cursor-pointer text-2xl">
        <li class="float-left hover:text-blue-500">
          <RouterLink class="nav-link" :to="{ name: 'board-list', params: { key: 2 } }"
            >공지사항</RouterLink
          >
        </li>
        <li class="float-left ml-[10px] hover:text-blue-500">
          <RouterLink class="nav-link" :to="{ name: 'board' }">게시판</RouterLink>
        </li>
        <li class="float-left ml-[10px] hover:text-blue-500">
          <RouterLink class="nav-link" :to="{ name: 'attraction' }">관광지검색</RouterLink>
        </li>
        <li class="float-left ml-[10px] hover:text-blue-500">
          <RouterLink class="nav-link" :to="{ name: 'plan' }">여행계획</RouterLink>
        </li>
        <li class="float-left ml-[10px] hover:text-blue-500">
          <RouterLink class="nav-link" :to="{ name: 'hotplace' }">핫플레이스</RouterLink>
        </li>
      </ul>
    </div>
    <div class="flex flex-row items-center text-2xl">
      <ul class="flex items-center">
        <li class="flex float-left ml-[10px] my-auto">
          <img
            v-if="userInfo != null && userInfo.memberPhoto"
            :src="`${userInfo.memberPhoto}`"
            alt="아바타"
            class="rounded-full w-[60px] h-[60px]"
          />
          <img
            v-else
            src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp"
            class="rounded-full"
          />
        </li>
        <!-- src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp" -->

        <li class="float-left ml-[10px]">
          <span class="underline" v-if="userInfo"
            ><RouterLink
              style="text-decoration: none"
              class="cursor-pointer text-black hover:text-blue-600"
              :to="{ name: 'member' }"
              >{{ userInfo.memberName }}</RouterLink
            ></span
          >님 환영합니다
        </li>
        <li class="float-left ml-[10px] cursor-pointer hover:text-red-300" @click="logout">
          로그아웃
        </li>
        <li class="float-left ml-[10px] hover:text-blue-300">
          <RouterLink class="nav-link" :to="{ name: 'member' }">마이페이지</RouterLink>
        </li>
        <li
          class="float-left ml-[10px] hover:text-blue-300"
          v-if="userInfo != null && userInfo.memberRole == 0"
        >
          <RouterLink class="nav-link" :to="{ name: 'admin' }">어드민페이지</RouterLink>
        </li>
      </ul>
    </div>

    <!-- 로그인 후 -->
    <!-- <c:if test="${!empty userinfo}">
          <ul class="navbar-nav me-2">
            <li class="nav-item me-5"><a class="nav-link" id="welcome"></a></li>
            <li class="nav-item">
              <a class="nav-link" href="${root}/user?action=logout">로그아웃</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#mypageModal"
                >마이페이지</a
              >
            </li>
          </ul>
        </c:if> -->
    <!-- </div>
    </div> -->
  </nav>
</template>

<style scoped>
@font-face {
  font-family: 'Tenada';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2210-2@1.0/Tenada.woff2')
    format('woff2');
  font-weight: normal;
  font-style: normal;
}
* {
  font-family: 'pretendard', sans-serif !important;
}

@keyframes moveBackground {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}

.animate-move-bg {
  animation: moveBackground 5s linear infinite;
  font-family: 'Tenada', sans-serif !important;
}
</style>
