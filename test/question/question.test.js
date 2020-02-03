const mongoose = require("mongoose");
const app = require("../../index")
const supertest = require("supertest")
const request = supertest(app)

beforeAll(async () => {
    const url = "mongodb://127.0.0.1/testquestion"
    mongoose.connect(url, { useNewUrlParser: true })
})

//Test for proving with out login and getting token you can not create question
it("Should create Question", async done => {
    const res = await request.post("/question/create").send({
        title: "Unit Testing",
        question: "Going to fail because the user is not logged in"
    })
    let { message } = JSON.parse(res.text);
    expect(message).toEqual("You have to login to perform this action")
    expect(res.status).toBe(401)

    done()
})

//Test to for creating question when loggedin
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTM3NDBmNzg4NDFjYjI5ODhhNTYyMmMiLCJpYXQiOjE1ODA2ODUwNjJ9.DLoLzqCXX1g1c2jIFCnQ7zPcA8haNPpZPy-KRGONsbM'
it("Should create Question", async done => {
    const res = await request.post("/question/create").set("auth-token", token).send({
        title: "Unit Testing",
        question: "Going to fail because the user is not logged in"
    })
    let { message } = JSON.parse(res.text);
    expect(message).toEqual("Question created successfully")
    expect(res.status).toBe(201)
    done()
})

//Test for getting all the question
it("Should get all the question", async done => {
    const res = await request.get("/question");
    expect(res.status).toBe(200)
    done()
})

//Test for getting one question
it("Should get one question", async done => {
    const res = await request.get("/question/5e3757982b195935890d6b63");
    expect(res.status).toBe(200)
    done()
})


//Test for updating one question without token
it("Should update question", async done => {
    const res = await request.put("/question/5e3757982b195935890d6b63").send({
        votequestion: "upvote"
    })
    let { message } = JSON.parse(res.text);
    expect(message).toEqual("You have to login to perform this action")
    expect(res.status).toBe(401)
    done()
})


//Test for updating one question with token
it("Should update question", async done => {
    const res = await request.put("/question/5e3758ce1696323ad123da29").set("auth-token", token).send({
        votequestion: "upvote"
    })
    let { message } = JSON.parse(res.text);
    expect(message).toEqual("Question updated successfully")
    expect(res.status).toBe(200)
    done()
})

//Test for updating one question without token
it("Should delete question", async done => {
    const res = await request.delete("/question/delete/5e3758ce1696323ad123da29")
    let { message } = JSON.parse(res.text);
    expect(message).toEqual("You have to login to perform this action")
    expect(res.status).toBe(401)
    done()
})


//Test for updating one question with token
it("Should delete question", async done => {
    const res = await request.delete("/question/delete/5e3757c74eb61935c0b05304").set("auth-token", token)
    let { message } = JSON.parse(res.text);
    expect(message).toEqual("Question deleted successfully")
    expect(res.status).toBe(200)
    done()
})