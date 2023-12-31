<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { registArticle, articleDetail, updateArticle, likeArticle } from '@/api/board'
import { getPlan } from '@/api/plan'
import VSelect from '../../common/VSelect.vue'
import Editor_Deploy from './Editor_Deploy.vue'
import { computed } from 'vue'
import { useMemberStore } from '@/stores/member'
import { storeToRefs } from 'pinia'
const memberStore = useMemberStore()
const { userInfo } = storeToRefs(memberStore)

// 후기 작성을 위한 요소들
const plan = ref({})
const isChecked = ref(false)

// router, route setting
const router = useRouter()
const route = useRoute()

// category select options
const boardOptions = ref([])
if (route.params.planId == 0) {
  boardOptions.value = [
    { text: '카테고리 선택', value: 'all' },
    { text: '자유게시판', value: 1 },
    { text: '공지사항', value: 2 },
    { text: '질문게시판', value: 3 }
  ]
} else {
  boardOptions.value = [{ text: '여행 후기', value: 4 }]
}

// getting props
const props = defineProps({ type: String })

const isUseId = ref(false)

const articleId = route.params.articleId
// article Dto setting
const article = ref({
  articleId: 0, // db에서 auto increment
  articleContent: '',
  articleTitle: '',
  categoryId: 0,
  image: '',
  likeCount: 0,
  memberId: '',
  memberName: '',
  viewCount: 0,
  updateTime: new Date(),
  registerTime: new Date()
})

if (props.type === 'modify') {
  let { articleId } = route.params
  console.log(articleId + '번글 얻어와서 수정할거야')
  // API 호출
  isUseId.value = true
}

onMounted(() => {
  if (props.type === 'modify') {
    getArticle()
    console.log(article.value.categoryId)
  }
  article.value.memberId = userInfo.value.memberId
  article.value.memberName = userInfo.value.memberName

  if (route.params.planId != 0) {
    // planId로 plan 정보 얻어오기
    getPlan(
      route.params.planId,
      ({ data }) => {
        console.log('성공적으로 plan 얻어오기 완료', data)
        plan.value = data
        console.log('plan', plan.value)
      },
      (error) => {
        console.log('plan 얻어오기 실패', error)
      }
    )
    changeKey(4)
  } else {
    changeKey(1)
  }
})

const currentMemberId = computed(() => {
  return props.type === 'modify' ? article.value.memberId : userInfo.value.memberId
})

const currentMemberName = computed(() => {
  return props.type === 'modify' ? article.value.memberName : userInfo.value.memberName
})

function changeKey(val) {
  console.log('BoardForm에서 선택한 조건 : ' + val)
  article.value.categoryId = val
}

function writeArticle() {
  // 경로 주의
  // isChecked가 true이면 plan으로 통하는 경로를 넣어준다.
  if (isChecked.value) {
    article.value.articleContent += `\n\n[${userInfo.value.memberName}님의 ${plan.value.planTitle} 계획 보러 가기](http://localhost:9000/plan/detail/${plan.value.planId})`
  }

  registArticle(
    article.value,
    ({ data }) => {
      alert('성공적으로 글 등록 완료', data)
      router.push({ name: 'board-list' })
    },
    (error) => {
      alert('글 등록 중 문제 발생', error)
    }
  )
}

const contentIsLoaded = ref(false)

const getArticle = () => {
  contentIsLoaded.value = true
  console.log(articleId + '번글 얻으러 가자!!!')
  // API 호출
  articleDetail(
    articleId,
    ({ data }) => {
      console.log('성공적으로 글 얻어오기 완료', data)
      article.value = data
      contentIsLoaded.value = false
    },
    (error) => {
      console.log('글 얻어오기 실패', error)
    }
  )
}

const update = () => {
  console.log(article.value.articleId + '번글 수정하자!!', article.value)
  // API 호출
  updateArticle(
    article.value,
    ({ data }) => {
      alert('성공적으로 글 수정 완료', data)
      router.push({ name: 'board-list' })
    },
    (error) => {
      alert('글 수정 중 문제 발생', error)
    }
  )
}

function moveList() {
  router.push({ name: 'board-list' })
}

const setContent = (content) => {
  console.log('content', content)
  article.value.articleContent = content
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <!-- 인성오빠가 후기 카테고리 성공하면 다시 살아날 친구 (v-show) -->
    <div v-show="route.params.planId == 0" class="mb-3">
      <label for="categoryId" class="form-label">게시판 분류 : </label>
      <VSelect
        :selectOption="boardOptions"
        @onKeySelect="changeKey"
        :notice="props.type === 'regist' || props.type === 'modify' ? true : false"
        :review="route.params.planId === 1 ? true : false"
      />
    </div>
    <div class="mb-3">
      <label for="userid" class="form-label">작성자 ID : </label>
      <input
        type="text"
        class="form-control"
        v-model="currentMemberId"
        placeholder="작성자ID..."
        readonly="readonly"
        style="background-color: #e9ecef"
      />
    </div>
    <div class="mb-3">
      <label for="subject" class="form-label">제목 : </label>
      <input
        type="text"
        class="form-control"
        v-model="article.articleTitle"
        placeholder="제목..."
      />
    </div>

    <div class="mb-3">
      <label for="member_name" class="form-label">이름 : </label>
      <input
        type="text"
        class="form-control"
        v-model="currentMemberName"
        readonly="readonly"
        placeholder="이름..."
        style="background-color: #e9ecef"
      />
    </div>

    <div v-if="route.params.planId != 0" class="mb-3">
      <input type="checkbox" id="share" name="share" v-model="isChecked" class="form-check-input" />
      <label for="share" class="form-label"
        >&nbsp;계획 공유하기 (해당 계획의 링크가 함께 공유됩니다)</label
      >
    </div>

    <div class="mb-3">
      <Editor_Deploy
        :data="article.articleContent"
        @setContent="setContent"
        v-if="!contentIsLoaded"
      />
    </div>
    <div class="col-auto text-center">
      <button
        type="submit"
        class="btn btn-outline-primary mb-3 bg-yellow-500"
        v-if="type === 'regist'"
        @click="writeArticle"
      >
        글작성
      </button>
      <button type="submit" class="btn btn-outline-success mb-3" @click="update" v-else>
        글수정
      </button>
      <button type="button" class="btn btn-outline-danger mb-3 ms-1" @click="moveList">
        목록으로이동...
      </button>
    </div>
  </form>
</template>

<style scoped></style>
