const app = require("../../index")
const { User } = require("../../model/model")
const supertest = require("supertest");
const mongoose = require("mongoose")
const request = supertest(app);


beforeAll(async () => {
    const url = "mongodb://127.0.0.1/testuser"
    mongoose.connect(url, { useNewUrlParser: true })
})

//Test for registering a user 
it("Should create a user in the database", async done => {
    const res = await request.post("/user/create").send({
        firstname: "emmanuel",
        lastname: "Arinzechukwu",
        middlename: "wisdom",
        email: "mailsforanih@gmail.com",
        password: "password"
    })

    const user = await User.findOne({ email: "mailsforanih@gmail.com" })
    expect(user._id).toBeTruthy()
    expect(user.email).toBeTruthy()
    done()
})

//Test to reject duplicate email address
it("Should Reject because of the same email", async done => {
    const res = await request.post("/user/create").send({
        firstname: "emmanuel",
        lastname: "Arinzechukwu",
        middlename: "wisdom",
        email: "mailsforanih@gmail.com",
        password: "password"
    })

    let { message } = JSON.parse(res.text);
    expect(message).toEqual("User with email already exists")
    done()
})

//Test for getting all users
it("Should Get all the registered user", async done => {
    const res = await request.get("/user")

    console.log(res.status)
    let { message } = JSON.parse(res.text);
    console.log(message)
    expect(res.status).toBe(200)

    done()
})

//Test for getting only one user be the users ID
it("Should Get user using the users ID", async done => {
    const res = await request.get("/user/5e3740f78841cb2988a5622c");
    expect(res.status).toEqual(200)
    done()
})

//Test for Updating the User using the Users ID
it("Should Update the User by its ID", async done => {
    const res = await request.put("/user/update/5e3740f78841cb2988a5622c").send({
        middlename: "El Youn"
    })

    let { message } = JSON.parse(res.text);
    expect(res.status).toEqual(200)
    expect(message).toEqual("User updated successfully")
    // expect(user.email).toBeTruthy()
    done()
})

//Test for the login
it("Should login the user and generate token", async done => {
    const res = await request.post("/user/login").send({
        email: "mailsforanih@gmail.com",
        password: "password"
    })

    let { message } = JSON.parse(res.text);
    expect(res.status).toBe(200)
    expect(message).toEqual("You are loggedin successfully")
    done()
})

//Test for deleting a user
it("Should Delete the user with the ID", async done => {
    const res = await request.delete("/user/delete/5e36d96a155a7816dd4b60ca")
    let { message } = JSON.parse(res.text);
    expect(res.status).toBe(200)
    expect(message).toEqual("User deleted successfully")
    done()
})