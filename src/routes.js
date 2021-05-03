import Top from './pages/Top.vue'
import Login from './pages/Login.vue'
import CreateAccount from './pages/CreateAccount.vue'
import CreateAccountPreDone from './pages/CreateAccountPreDone.vue'
import CreateAccountDone from './pages/CreateAccountDone.vue'
import PasswordReset from './pages/PasswordReset.vue'
import Account from './pages/Account.vue'
import Question from './pages/Question.vue'
import ArticleList from './pages/ArticleList.vue'
import MenuList from './pages/MenuList.vue'
import PostMenu from './pages/PostMenu.vue'
import PostArticle from './pages/PostArticle.vue'
import ViewArticle from './pages/ViewArticle.vue'
import ViewMenu from './pages/ViewMenu.vue'
import QuestionDetail from './pages/QuestionDetail.vue'
import PostQuestion from './pages/PostQuestion.vue'
import About from './pages/About.vue'
import NotFound from './pages/404.vue'

export default [
  { path: '/index.html', component: Top },
  { path: '/', component: Top },
  { path: '/login', component: Login },
  { path: '/create/account', component: CreateAccount },
  { path: '/create/account/predone', component: CreateAccountPreDone },
  { path: '/create/account/done', component: CreateAccountDone },
  { path: '/password/reset', component: PasswordReset },
  { path: '/account', component: Account },
  { path: '/question', component: Question },
  { path: '/article/list', component: ArticleList },
  { path: '/menu/list', component: MenuList },
  { path: '/post/menu', component: PostMenu },
  { path: '/post/article', component: PostArticle },
  { path: '/article/item', component: ViewArticle },
  { path: '/menu/item', component: ViewMenu },
  { path: '/question/detail', component: QuestionDetail },
  { path: '/post/question', component: PostQuestion },
  { path: '/about', component: About },
  { path: '*', component: NotFound }
]