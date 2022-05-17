const request = require('supertest')
const app = require('./app')

describe('Testing basic Problem details', () => {

	test('Testing normal request without errors', (done) => {
		request(app).get('/').then(response => {
			expect(response.statusCode).toBe(200)
			expect(response.body).toMatchObject({ data: 'hello there!' })
			done()
		})
	})

	test('Testing custom api error', (done) => {
		request(app).get('/1').then(response => {
			expect(response.statusCode).toBe(503)
			expect(response.body.success).toBe(false)
			expect(response.body.error.title).toMatch('some_error')
			expect(response.body.error.instance).toMatch('/1')
			expect(response.body.error.status).toBe(503)

			done()
		})
	})

	test('Testing not found error', (done) => {
		request(app).get('/666').then(response => {

			expect(response.statusCode).toBe(404)
			expect(response.body.error.title).toMatch('Not Found')
			expect(response.body.error.status).toBe(404)
			expect(response.body.error.instance).toMatch('/666')

			done()
		})
	}) 

	test('Testing multiple errors', (done) => {
		request(app).get('/2').then(response => {
			expect(response.body.error.title).toMatch('mutlipe_errors')
			expect(response.body.error.status).toBe(400)
			expect(response.body.error.subErrors).toBeInstanceOf(Array)
			expect(response.body.error.subErrors[0].title).toMatch('error_1')
			expect(response.body.error.subErrors[0].detail).toMatch('This is error 1')
			expect(response.body.error.subErrors[1].title).toMatch('error_2')
			expect(response.body.error.subErrors[1].detail).toMatch('This is error 2')
			expect(response.body.error.subErrors[2].title).toMatch('error_3')
			expect(response.body.error.subErrors[2].detail).toMatch('This is error 3')

			done()
		})
	})

	test('Should give a exception defails error', done => {
		request(app).get('/3').then(response => {
			expect(response.body.success).toBe(false)
			expect(response.body.error.status).toBe(500)
			expect(response.body.title).toMatch('Internal Server Error')
			expect(response.body.exception.name).toMatch('SyntaxError')
			done()
		})
	})
})
