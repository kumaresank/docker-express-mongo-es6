'use strict'

import { Router } from 'express'
import AuthController from './../controllers/auth'
const router = Router()

router.post('/register', (req, res) => { AuthController.register(req, res) })
router.post('/authenticate', (req, res) => { AuthController.authenticate(req, res) })

export default router
