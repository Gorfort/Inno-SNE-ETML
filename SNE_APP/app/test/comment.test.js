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

describe("Test pour les routes des comments", () => {
    describe("Test de la route POST /", () => {
        test("Appel de l'API et retourne un status 200", async () => {
            return await request(app)
                .post("/comment")
                .set("Authorization", `Bearer ${process.env.TOKEN}`)
                .send({ comment: "Test de commentaire", fk_Post: 1 })
                .then(res => expect(res.status).toBe(200))
        })

        test("Appel de l'API sans token et retourne un status 401", async () => {
            return await request(app)
                .post("/comment")
                .send({ comment: "Test de commentaire", fk_Post: 1 })
                .then(res => expect(res.status).toBe(401))
        })

        test("Appel de l'API sans donnée et retourne un status 400", async () => {
            return await request(app)
                .post("/comment")
                .set("Authorization", `Bearer ${process.env.TOKEN}`)
                .then(res => expect(res.status).toBe(400))
        })
    })
})
