'use strict'
let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('./../src/server').default
let should = chai.should()

chai.use(chaiHttp)

describe('/GET /', () => {
    it('it should GET index route', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('message').eql('Server is UP!')
                done()
            })
    })
})