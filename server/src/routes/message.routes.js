import express from 'express'
import verifyJWT from '../middlewares/auth.middlewares.js'
import { getAllMessages, sendMessage } from '../controllers/message.controllers.js'

const router = express.Router()
router.use(verifyJWT)

router.route('/sendMessage/:chatId')
.post(sendMessage)

router.route('/getMessages/:chatId')
.get(getAllMessages)

export default router