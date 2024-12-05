import { expect, test, describe, afterAll } from '@jest/globals';
import { app, server } from "../server"
import request from "supertest"
import dotenv from "dotenv"
import connection from '../mysql/MySql';

dotenv.config()

afterAll(()=> {
    connection.end()
    server.close()
})

describe("Test pour les routes des posts", () => {
    describe("Test pour la route POST /", () => {
        test("Appel de l'API et retourne un status 200", async () => {
            return request(app)
                .post("/post")
                .set("Authorization", `Bearer ${process.env.TOKEN}`)
                .send({ title: "Test", content: "Test" })
                .then((res) => expect(res.status).toBe(200))
        })

        test("Appel de l'API sans token et retourne un status 401", async () => {
            return request(app)
                .post("/post")
                .send({ title: "Test", content: "Test" })
                .then((res) => expect(res.status).toBe(401))
        })

        test("Appel de l'API sans titre et contenu et retourne un status 400", async () => {
            return request(app)
                .post("/post")
                .set("Authorization", `Bearer ${process.env.TOKEN}`)
                .send({})
                .then((res) => expect(res.status).toBe(400))
        })
    })

    describe("Test pour la route PUT /:id", () => {
        test("Appel de l'API et retourne un status 200", async () => {
            return request(app)
                .put("/post/1")
                .set("Authorization", `Bearer ${process.env.TOKEN}`)
                .send({ title: "Test", content: "Test" })
                .then((res) => expect(res.status).toBe(200))
        })

        test("Appel de l'API sans token et retourne un status 401", async () => {
            return request(app)
                .put("/post/1")
                .send({ title: "Test", content: "Test" })
                .then((res) => expect(res.status).toBe(401))
        })

        test("Appel de l'API sans titre et contenu et retourne un status 400", async () => {
            return request(app)
                .put("/post/1")
                .set("Authorization", `Bearer ${process.env.TOKEN}`)
                .then((res) => expect(res.status).toBe(400))
        })
    })
})
