import { createWebHashHistory, createRouter } from "vue-router";
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import jwt_decode from "jwt-decode";
import AuthService from './services/auth.service';
import AppLayout from './layout/AppLayout.vue'



// lazy-loaded
const Profile = () => import("./components/Profile.vue")

const BoardUser = () => import("./components/BoardUser.vue")

const StudentList = () => import("./components/student/StudentList.vue")

const RightsTable = () => import("./components/RightsTable.vue")
const DirectionList = () => import("./components/student/DirectionList.vue")

const ProfileList = () => import("./components/student/ProfileList.vue")


const GroupList = () => import("./components/student/GroupList.vue")

const CWList = () => import("./components/student/CwList.vue")




const ListenerList = () => import("./components/listener/ListenerList.vue")
const ListenerDetail = () => import("./components/ListenerDetail.vue")

const PayerList = () => import("./components/listener/PayerList.vue")
const PayerDetail = () => import("./components/PayerDetail.vue")

const ContractList = () => import("./components/listener/ContractList.vue")
const ContractDetail = () => import("./components/ContractDetail.vue")
const AddContract = () => import("./components/AddContract.vue")

const ScheduleLoads = () => import("./components/ScheduleLoads.vue")



const ProgramList = () => import("./components/listener/ProgramList.vue")
const AddProgram = () => import("./components/AddProgram.vue")
const ProgramDetail = () => import("./components/ProgramDetail.vue")

const AddPayment = () => import("./components/AddPayment.vue")
const PaymentList = () => import("./components/listener/PaymentList.vue")
const PaymentDetail = () => import("./components/PaymentDetail.vue")

const AddCourse = () => import("./components/AddCourse.vue")
const CourseList = () => import("./components/CourseList.vue")
const CourseDetail = () => import("./components/CourseDetail.vue")


const AuditList = () => import("./components/AuditList.vue")
const AuditDetail = () => import("./components/AuditDetail.vue")
const AddAudit = () => import("./components/AddAudit.vue")

const addLgroup = () => import("./components/AddListenergroup.vue")
const lGroupList = () => import("./components/listener/ListenergroupList.vue")
const lGroupDetail = () => import("./components/LgroupDetail.vue")

//ЖУРНАЛ
const TeacherList = () => import("./components/TeacherList.vue")
const AddTeacher = () => import("./components/AddTeacher.vue")
const TeacherDetail = () => import("./components/TeacherDetail.vue")


const TegrsuList = () => import("./components/TegrsuList.vue")
const AddTegrsu = () => import("./components/AddTegrsu.vue")
const TegrsuDetail = () => import("./components/TegrsuDetail.vue")

const JournalList = () => import("./components/JournalList.vue")
//ЖУРНАЛ

const xlparse = () => import("./components/xlparse.vue")


const RoleList = () => import("./components/admin/RoleList.vue")
const ProcedureList = () => import("./components/admin/ProcedureList.vue")
const FunctionList = () => import("./components/admin/FunctionList.vue")
const TriggerList = () => import("./components/admin/TriggerList.vue")
const TableList = () => import("./components/admin/TableList.vue")
const UserList = () => import("./components/admin/UserList.vue")
const routes = [

  {
    path: "/",
    name: "home",
    component: AppLayout,
    children: [
      {
        path: "/home",
        component: Home,
      },
      {
        path: "/login",
        component: Login,
      },
      {
        path: "/register",
        component: Register,
      },
      {
        path: "/profile",
        name: "profile",
        // lazy-loaded
        component: Profile,
      },
      {
        path: "/xlparse",
        name: "Импорт данных",
        component: xlparse,
      },

      // КОМПОНЕНТЫ СТУДЕНТОВ
      
      { 
        path: '/students', 
        name: "Студенты",
        component: StudentList 
      },

      //{ path: '/students/:studentId', component: StudentDetail },
      { path: '/rights/:table', component: RightsTable },
      { path: '/directions', component: DirectionList },
      //{ path: '/directions/:directionId', component: DirectionDetail },

      { path: '/profiles', component: ProfileList },
      // { path: '/profiles/:profileId', component: ProfileDetail },


      { path: '/groups', component: GroupList },
      // { path: '/groups/:groupId', component: GroupDetail },


      { path: '/courses', component: CourseList },
      { path: '/courses/:courseID', component: CourseDetail },
      { path: '/AddCourse', component: AddCourse },

      // КОНЕЦ КОМПОНЕНТОВ СТУДЕНТОВ
      // КОМПОНЕНТЫ ДЛЯ СЛУШАТЕЛЕЙ

      { 
        path: '/listeners', 
        name: "Слушатели",
        component: ListenerList 
      },
      {
        path: '/listeners/:listenerId',
        name: "Данные слушателя",
        component: ListenerDetail},
      { 
        path: '/payers', 
        name: "Плательщики",
        component: PayerList 
      },
      { 
        path: '/payers/:payerId', 
        name: "Данные плательщика",
        component: PayerDetail 
      },
      { 
        path: '/lgroups', 
        name: "Группы",
        component: lGroupList 
      },
      { 
        path: '/addlgroup', 
        name: "Добавить группу",
        component: addLgroup 
      },
      { 
        path: '/lgroups/:groupId', 
        name: "Данные группы",
        component: lGroupDetail 
      },
      { 
        path: '/contracts',
        name: "Договоры", 
        component: ContractList 
      },
      { 
        path: '/contracts/:contractId', 
        name: "Данные договора",
        component: ContractDetail 
      },
      { 
        path: '/AddContract', 
        name: "ДОбавить договор",
        component: AddContract 
      },
      { 
        path: '/programs', 
        name: "Программы",
        component: ProgramList 
      },
      { 
        path: '/programs/:programId', 
        name: "Информация о программе",
        component: ProgramDetail 
      },
      { 
        path: '/AddProgram', 
        name: "Добавить программу",
        component: AddProgram 
      },
      { 
        path: '/payments', 
        name: "Платежи",
        component: PaymentList 
      },
      { 
        path: '/payments/:paymentID', 
        name: "Данные о платеже",
        component: PaymentDetail 
      },
      { 
        path: '/AddPayment', 
        name: "Добавить платёж",
        component: AddPayment 
      },

      // КОНЕЦ КОМПОНЕНТОВ ДЛЯ СЛУШАТЕЛЕЙ

      { path: '/ScheduleLoads', component: ScheduleLoads },

      //{ path: '/addcw', component: AddCw },
      { path: '/courseworks', component: CWList },
      // { path: '/courseworks/:CwId', component: CWdetail },

      { path: '/programs', component: ProgramList },
      { path: '/programs/:programId', component: ProgramDetail },
      { path: '/AddProgram', component: AddProgram },

      { path: '/audits', component: AuditList },
      { path: '/audits/:scheduleId', component: AuditDetail },
      { path: '/AddAudit', component: AddAudit },
      
      //ЖУРНАЛ
      { path: '/teachers', component: TeacherList },
      { path: '/teachers/:teacherId', component: TeacherDetail },
      { path: '/AddTeacher', component: AddTeacher },
    
      { path: '/tegrsus', component: TegrsuList },
      { path: '/tegrsus/:tegrsuId', component: TegrsuDetail },
      { path: '/AddTegrsu', component: AddTegrsu },
    
      { path: '/journals', component: JournalList },
      //ЖУРНАЛ


      { path: '/lgroups', component: lGroupList },
      { path: '/addlgroup', component: addLgroup },
      { path: '/lgroups/:groupId', component: lGroupDetail },
      {
        path: "/user",
        name: "user",
        // lazy-loaded
        component: BoardUser,
      },

      { path: '/procedures', component: ProcedureList },
      { path: '/functions', component: FunctionList },
      { path: '/triggers', component: TriggerList },
      { path: '/tables', component: TableList },
      { path: '/roles', component: RoleList },
      { path: '/users', component: UserList },
    ]
    // { path: '/AddStudent/:groupName', component: AddStudent },
  },

];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/home'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');



  if (authRequired && !loggedIn) {
    next('/login'); // Redirect to login page if not logged in
  } else if (loggedIn) {
    const token = JSON.parse(loggedIn).accessToken;
    document.title=to.name;
    try {
      const decodedToken = jwt_decode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        // Token has expired, perform logout and redirect to login
        AuthService.logout();
        next('/login');
      } else {
        next(); // Continue to the intended route
      }
    } catch (error) {
      // Handle token decoding errors if needed
      next();
    }
  } else {
    next(); // Continue to the intended route (public page)
  }
});

/*
на случай если мы не хотим проверять токен
router.beforeEach(async (to, from, next) => {
  await store.dispatch('auth/checkTokenExpiration'); // Check token expiration

  const publicPages = ['/login', '/register', '/home'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');
  
  if (authRequired && !loggedIn) {
    next('/login'); // Redirect to login page if not logged in
  } else {
    next(); // Continue to the intended route
  }
});
*/

export default router;
