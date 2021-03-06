import { Router } from 'express'
import adminRouter from './resources/admin/admin.router.js'
import capsuleRouter from './resources/capsule/capsule.router.js'
import courseRouter from './resources/course/course.router.js'
import learnerRouter from './resources/learner/learner.router.js'
import modRouter from './resources/mod/mod.router.js'
import teacherRouter from './resources/teacher/teacher.router.js'
import authRouter from './utils/auth/learner.auth.router.js'
import adminAuthRouter from './utils/admin_auth/admin.auth.router.js'

const apiRouter = Router()
//Registred Routes

apiRouter.use('/capsules', capsuleRouter)
apiRouter.use('/courses', courseRouter)
apiRouter.use('/learner', learnerRouter)
apiRouter.use('/mod', modRouter)
apiRouter.use('/teacher', teacherRouter)
apiRouter.use('/user', authRouter)
apiRouter.use('/boss', adminRouter)
apiRouter.use('/admin', adminAuthRouter)


export default apiRouter