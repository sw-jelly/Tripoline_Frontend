// API 통신 모아놓기
import { localAxios, IMG_AXIOS } from '@/utils/http-commons'
const { VITE_IMGBB_API } = import.meta.env
const local = localAxios()

const imgAXIOS = IMG_AXIOS()
async function boardImage(blob, success, fail) {
  const formData = new FormData()
  formData.append('image', blob)
  formData.append('key', VITE_IMGBB_API)
  await imgAXIOS.post('', formData).then(success).catch(fail)
}

// 책 목록 조회
function totalArticleList(params, success, fail) {
  local.get('boardRest', { params }).then(success).catch(fail)
}

function bestArticleList(params, success, fail) {
  local.get('boardRest/searchBest', { params }).then(success).catch(fail)
}

// 공사중
function categoryArticleList(categoryId, params, success, fail) {
  local.get(`boardRest/searchby/${categoryId}`, { params }).then(success).catch(fail)
}

function articleDetail(articleId, success, fail) {
  console.log(articleId + 'articleDetail........')
  local.get(`boardRest/${articleId}`).then(success).catch(fail)
}

function registArticle(article, success, fail) {
  const articleData = JSON.stringify(article)
  console.log('resgistArticle.........', articleData)
  local.post(`boardRest`, articleData).then(success).catch(fail)
}

function deleteArticle(articleId, success, fail) {
  local.delete(`boardRest/${articleId}`).then(success).catch(fail)
}

function likeArticle(articleId, success, fail) {
  local.put(`boardRest/${articleId}`).then(success).catch(fail)
}

function updateArticle(article, success, fail) {
  local.put(`boardRest`, article).then(success).catch(fail)
}

function getComments(articleId, success, fail) {
  local.get(`boardRest/comments/${articleId}`).then(success).catch(fail)
}

function registComment(comment, success, fail) {
  local.post(`boardRest/comments`, comment).then(success).catch(fail)
}

function updateComment(comment, success, fail) {
  console.log(comment)
  local.put(`boardRest/comments`, comment).then(success).catch(fail)
}

function deleteComment(commentId, success, fail) {
  local.delete(`boardRest/comments/${commentId}`).then(success).catch(fail)
}

export {
  totalArticleList,
  bestArticleList,
  articleDetail,
  registArticle,
  updateArticle,
  deleteArticle,
  likeArticle,
  getComments,
  registComment,
  categoryArticleList,
  deleteComment,
  updateComment,
  boardImage
}
