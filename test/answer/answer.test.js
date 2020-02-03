const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../../index")

const request = supertest(app)

beforeAll(async () => {
    const url = "mongodb://127.0.0.1/testanswer"
    mongoose.connect(url, { useNewUrlParser: true })
})


const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTM3NDBmNzg4NDFjYjI5ODhhNTYyMmMiLCJpYXQiOjE1ODA2ODUwNjJ9.DLoLzqCXX1g1c2jIFCnQ7zPcA8haNPpZPy-KRGONsbM'

//Test for proving with out login and getting token you can not create question
it("Should create Answer fail", async done => {
    const res = await request.post("/answer/5e3758ce1696323ad123da29").send({
        body: "Answer your question"
    })
    let { message } = JSON.parse(res.text);
    expect(message).toEqual("You have to login to perform this action")
    expect(res.status).toBe(401)

    done()
})

//Test for show create answer
it("Should create Answer pass", async done => {
    const res = await request.post("/answer/5e3758ce1696323ad123da29").set("auth-token", token).send({
        body: "Answer your question"
    })
    let { message } = JSON.parse(res.text);
    expect(message).toEqual("Thank you for you answe")
    expect(res.status).toBe(201)

    done()
})

//Test for getting one answer
it("Should get one Answer pass", async done => {
    const res = await request.get("/answer/5e3758ce1696323ad123da29")
    let { message } = JSON.parse(res.text);
    expect(res.status).toBe(200)

    done()
})

//Test for getting one answer
it("Should get all Answer pass", async done => {
    const res = await request.get("/answer/")
    let { message } = JSON.parse(res.text);
    expect(res.status).toBe(200)

    done()
})

//Test for getting one answer
it("Should get one Answer pass", async done => {
    const res = await request.put("/answer/update/5e3758ce1696323ad123da29").set("auth-token", token).send({
        "body": "Updated"
    })
    let { message } = JSON.parse(res.text);
    expect(res.status).toBe(200)

    done()
})