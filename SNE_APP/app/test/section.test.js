import { expect, test, describe, afterEach, afterAll } from '@jest/globals';
import { app, server } from "../server"
import request from "supertest"
import dotenv from "dotenv"
import connection from '../mysql/MySql';

dotenv.config()

afterAll(()=> {
    connection.end()
    server.close()
})

describe("Test pour les routes des sections", () => {
    describe("Test pour la route GET /", () => {
        test("Appel de l'API et retourne 200", async () => {
            return request(app)
                .get("/section")
                .then((res) => expect(res.statusCode).toBe(200))
        })

        test("Appel de l'API et retourne au minimum les 9 sections", async () => {
            return request(app)
                .get("/section")
                .then((res) => expect(res.body.data.length).toBeGreaterThanOrEqual(9))
        })

        test("Appel de l'API et retourne des données cohérentes", async () => {
            return request(app)
                .get("/section")
                .then((res) => expect(res.body.data[0].name).not.toBeNull())
        })
    })

    describe("Test pour la route GET /:id", () => {
        test("Appel de l'API et retourne 200", async () => {
            return request(app)
                .get("/section/1")
                .set('Authorization', `Bearer ${process.env.TOKEN}`)
                .then((res) => expect(res.statusCode).toBe(200))
        })

        test("Appel de l'API et retourne une section", async () => {
            return request(app)
                .get("/section/1")
                .set("Authorization", `Bearer ${process.env.TOKEN}`)
                .then((res) => expect(res.body.data.length).toBe(1))
        })

        test("Appel de l'API et retourne des données cohérentes", async () => {
            return request(app)
                .get("/section/1")
                .set("Authorization", `Bearer ${process.env.TOKEN}`)
                .then((res) => expect(res.body.data[0].name).not.toBeNull())
        })

        test("Appel de l'API avec un id incorrecte et retourne une erreur", async () => {
            return request(app)
                .get("/section/abc")
                .set("Authorization", `Bearer ${process.env.TOKEN}`)
                .then((res) => expect(res.statusCode).toBe(404))
        })
    })

    describe("Test pour la route GET /:name", () => {
        test("Appel de l'API et retourne 200", async () => {
            return request(app)
                .get("/section/name/Informatique")
                .set('Authorization', `Bearer ${process.env.TOKEN}`)
                .then((res) => expect(res.statusCode).toBe(200))
        })

        test("Appel de l'API et retourne une section", async () => {
            return request(app)
                .get("/section/name/Informatique")
                .set("Authorization", `Bearer ${process.env.TOKEN}`)
                .then((res) => expect(res.body.data.length).toBe(1))
        })

        test("Appel de l'API et retourne des données cohérentes", async () => {
            return request(app)
                .get("/section/name/Informatique")
                .set("Authorization", `Bearer ${process.env.TOKEN}`)
                .then((res) => expect(res.body.data[0].name).not.toBeNull())
        })

        test("Appel de l'API avec un nom incorrecte et retourne une erreur", async () => {
            return request(app)
                .get("/section/name/abc")
                .set("Authorization", `Bearer ${process.env.TOKEN}`)
                .then((res) => expect(res.statusCode).toBe(404))
        })
    })

    describe("Test pour la route POST /", () => {
        test("Appel de l'API et retourne un status 200", async () => {
            return request(app)
                .post("/section")
                .send({ "name": "Luke" })
                .set("Authorization", `Bearer ${process.env.TOKEN}`)
                .then((res) => expect(res.statusCode).toBe(200))
        })

        test("Appel de l'API et teste si la requête POST a été effectué", async () => {
            return request(app)
                .get("/section/name/Luke")
                .set("Authorization", `Bearer ${process.env.TOKEN}`)
                .then((res) => expect(res.statusCode).toBe(200))
        })

        test("Appel de l'API et teste si le nom de la section est juste", async () => {
            return request(app)
            .get("/section/name/Luke")
            .set("Authorization", `Bearer ${process.env.TOKEN}`)
            .then((res) => expect(res.body.data[0].name).toBe("Luke"))
        })

        test("Appel de l'API pour tester si on ne passe aucune donnée et renvoie un status 500", async () => {
            return request(app)
            .post("/section")
            .set("Authorization", `Bearer ${process.env.TOKEN}`)
            .then((res) => expect(res.statusCode).toBe(500))
        })
    })

    describe("Test pour la route PUT /:id", () => {
        test("Appel de l'API et retourne un status 200", async () => {
            return request(app)
                .put("/section/2")
                .set("Authorization", `Bearer ${process.env.TOKEN}`)
                .send({ "name": "Informatik" })
                .then((res) => expect(res.statusCode).toBe(200))
        })

        test("Appel de l'API et check si le nom a bien été changé", () => {
            return request(app)
                .get("/section/2")
                .set("Authorization", `Bearer ${process.env.TOKEN}`)
                .then((res) => expect(res.body.data[0].name).toBe("Informatik"))
        })

        test("Appel de l'API avec un id de section inexistant et retourne une erreur 404", () => {
            return request(app)
                .put("/section/-1")
                .set("Authorization", `Bearer ${process.env.TOKEN}`)
                .send({ "name": "Doesen't Exist" })
                .then((res) => expect(res.statusCode).toBe(404))
        })
    })

    describe("Test pour la route DELETE /:id", () => {
        test("Appel de l'API et retourne un status 200", async () => {
            return request(app)
                .delete("/section/2")
                .set("Authorization", `Bearer ${process.env.TOKEN}`)
                .then((res) => expect(res.statusCode).toBe(200))
        })

        test("Appel de l'API et check si la section a bien été supprimé", () => {
            return request(app)
                .get("/section/2")
                .set("Authorization", `Bearer ${process.env.TOKEN}`)
                .then((res) => console.log(res))
        })

        test("Appel de l'API avec un id de section inexistant et retourne une erreur 404", () => {
            return request(app)
                .delete("/section/15")
                .set("Authorization", `Bearer ${process.env.TOKEN}`)
                .then((res) => expect(res.statusCode).toBe(404))
        })
    })
})
