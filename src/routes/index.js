'use strict'

import AuthRouter from './auth'

export default (app) => {
  app.use('/', (req, res) => {
    return res.status(200).json({ message: 'Server is UP!' })
  })
  app.use('/auth', AuthRouter)
}
