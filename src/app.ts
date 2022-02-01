import * as dotenv from "dotenv"
dotenv.config()

import * as express from "express";
import * as path from "path"
import { createConnection, Equal, getConnection, Not } from "typeorm";
import * as jwt from "jsonwebtoken"
import { User } from "./entity/user";
import { IGetUserAuthInfoRequest } from "./definitionfile";
import { Todo } from "./entity/todo";

function generateJSONAccessToken(credential) {
    return jwt.sign(credential, process.env.TOKEN_SECRET, { expiresIn: '1800s' })
}

function authenticateToken(req: IGetUserAuthInfoRequest, res, next) {
    const authHeader = req.headers
    if (!authHeader.cookie) {
        return res.redirect('/sign-in')
    }
    const token = authHeader.cookie.slice(4)

    if (token == null) return res.redirect(401, '/sign-in')
    jwt.verify(token, process.env.TOKEN_SECRET as string, (err, user) => {
        req.user = user
        next()
    })
}

createConnection().then(connection => {
    const app = express()
    const userRepo = connection.getRepository(User)
    const todoRepo = connection.getRepository(Todo)

    app.set('view engine', 'ejs')
    app.set('views', path.join(__dirname, '../src/views'))
    app.use(express.static(__dirname + '/public'));
    app.use(express.urlencoded({ extended: true }))
    // app.use(express.json())

    app.get('/sign-up', (req, res) => {
        res.render('auth/signup')
    })

    app.post('/sign-up', async (req, res) => {
        const { username, password } = req.body
        const newUser = new User()
        newUser.username = username
        newUser.password = password

        await userRepo.save(newUser).catch((err) => console.log(err))
        res.redirect('/sign-in')
    })

    app.get('/sign-in', (req, res) => {
        res.render('auth/signin')
    })

    app.post('/sign-in', async (req, res) => {
        const foundUser = await userRepo
            .findOne({ where: { 'username': req.body.username } })
            .catch((err) => console.log(err))
        let result = 'We can not find any account with the provided credentials'
        if (foundUser) {
            if (foundUser.password === req.body.password) {
                const token = generateJSONAccessToken({ username: req.body.username, password: req.body.password })
                res.cookie('jwt', token, { httpOnly: true, secure: true, maxAge: 1800000 })
                res.redirect('/add-to-do')
            }
            else res.send(result)
        }
        else res.send(result)
    })

    app.get('/log-out', (req, res) => {
        res.clearCookie('jwt');
        res.redirect('/sign-in')
    })

    app.get('/get-to-do', authenticateToken, async (req: IGetUserAuthInfoRequest, res) => {
        const foundUser = await userRepo
            .find({ where: { 'username': req.user.username } })
        const foundTodos = await todoRepo
            .find({ where: { 'user': foundUser[0] } })

        res.render('todo/get', { req, foundTodos })
    })

    app.get('/to-do/:id', authenticateToken, async (req: IGetUserAuthInfoRequest, res) => {
        const foundUser = await userRepo
            .find({ where: { 'username': req.user.username } })

        const foundTodo = await todoRepo
            .find({ where: { 'id': req.params.id } })

        const allUsersExclude = await userRepo
            .find({ where: { id: Not(foundUser[0].id) } })

        const dateOfCompletion = foundTodo[0].dateOfCompletion.toISOString().slice(0, 16)
        const dateOfCreation = foundTodo[0].dateOfCreation.toISOString().slice(0, 16)
        const dateOfModification = foundTodo[0].dateOfModification.toISOString().slice(0.16)

        const datetime = {
            dateOfCompletion,
            dateOfCreation,
            dateOfModification
        }

        res.render('todo/detail', { req, foundTodo: foundTodo[0], datetime, allUsers: allUsersExclude })
    })

    app.get('/add-to-do', authenticateToken, (req, res) => {
        res.render('todo/add', { req })
    })

    app.post('/add-to-do', authenticateToken, async (req: IGetUserAuthInfoRequest, res) => {
        const { name, description, dateofcompletion } = req.body
        let status = 'new'
        const foundUser = await userRepo
            .find({ where: { 'username': req.user.username } })

        const date = new Date().getTime()
        const dateString = new Date(date)

        const newTodo = new Todo()
        newTodo.name = name
        newTodo.description = description
        newTodo.user = foundUser[0]
        newTodo.dateOfCompletion = new Date(dateofcompletion)
        newTodo.status = status
        newTodo.dateOfCreation = dateString
        newTodo.dateOfModification = dateString

        await todoRepo.save(newTodo).catch((err) => console.log(err))

        res.redirect('/get-to-do')
    })

    app.post('/remove-to-do/:id', authenticateToken, async (req: IGetUserAuthInfoRequest, res) => {
        await todoRepo.delete(req.params.id)
        res.redirect('/get-to-do')
    })

    app.post('/update-to-do/:id', authenticateToken, async (req: IGetUserAuthInfoRequest, res) => {
        const { name, description, dateofcompletion } = req.body
        const date = new Date().getTime()
        const dateString = new Date(date)
        await getConnection()
            .createQueryBuilder()
            .update(Todo)
            .set({
                name,
                description,
                dateOfCompletion: dateofcompletion,
                dateOfModification: dateString
            })
            .where("id= :id", { id: req.params.id })
            .execute()
        res.redirect('/get-to-do')
    })

    app.post('/update-to-do/:id/status', authenticateToken, async (req: IGetUserAuthInfoRequest, res) => {
        const { id } = req.params
        const foundTodo = await todoRepo
            .find({ where: { 'id': id } })

        if (foundTodo[0].status === 'new') {
            await getConnection()
                .createQueryBuilder()
                .update(Todo)
                .set({
                    status: 'complete'
                })
                .where("id= :id", { id: id })
                .execute()
        }
        else {
            await getConnection()
                .createQueryBuilder()
                .update(Todo)
                .set({
                    status: 'new'
                })
                .where("id= :id", { id: id })
                .execute()
        }

        return res.status(200)
    })

    app.get('/get-all-user', authenticateToken, async (req: IGetUserAuthInfoRequest, res) => {
        const allUsers = await userRepo.find()
        res.render('user/alluser', { req, allUsers })
    })

    app.post('/assign-to-do/:todoid/:userid', authenticateToken, async (req: IGetUserAuthInfoRequest, res) => {
        const foundUser = await userRepo
            .find({ where: { 'id': req.params.userid } })

        console.log(foundUser[0])
        await getConnection()
            .createQueryBuilder()
            .update(Todo)
            .set({
                user: foundUser[0]
            })
            .where("id= :id", { id: req.params.todoid })
            .execute()
        res.redirect(`/get-all-task-by-user/${req.params.userid}`)
    })

    app.get('/get-all-task-by-user/:id', authenticateToken, async (req: IGetUserAuthInfoRequest, res) => {
        const foundTodos = await todoRepo
            .find({ where: { 'user': req.params.id } })

        const foundUser = await userRepo
            .find({ where: { 'id': req.params.id } })

        res.render('user/getassignedtask', { req, foundTodos, foundUser: foundUser[0] })
    })

    app.get('*', (req, res) => {
        res.redirect('/sign-in')
    })

    app.listen(8000, () => {
        console.log('Listening on port 8000')
    })
})