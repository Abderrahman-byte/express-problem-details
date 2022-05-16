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
			const body = JSON.parse(response.body)

			expect(response.statusCode).toBe(503)
			expect(body.success).toBe(false)
			expect(body.error.title).toMatch('some_error')
			expect(body.error.instance).toMatch('/1')
			expect(body.error.status).toBe(503)

			done()
		})
	})

	test('Testing not found error', (done) => {
		request(app).get('/666').then(response => {
			const body = JSON.parse(response.body)

			expect(response.statusCode).toBe(404)
			expect(body.error.title).toMatch('Not Found')
			expect(body.error.status).toBe(404)
			expect(body.error.instance).toMatch('/666')

			done()
		})
	}) 

	test('Testing must errors', (done) => {
		request(app).get('/2').then(response => {
			const body = JSON.parse(response.body)

			expect(body.error.title).toMatch('mutlipe_errors')
			expect(body.error.status).toBe(400)
			expect(body.error.subErrors).toBeInstanceOf(Array)
			expect(body.error.subErrors[0].title).toMatch('error_1')
			expect(body.error.subErrors[0].detail).toMatch('This is error 1')
			expect(body.error.subErrors[1].title).toMatch('error_2')
			expect(body.error.subErrors[1].detail).toMatch('This is error 2')
			expect(body.error.subErrors[2].title).toMatch('error_3')
			expect(body.error.subErrors[2].detail).toMatch('This is error 3')

			done()
		})
	})
})
