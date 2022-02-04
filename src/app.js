"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
dotenv.config();
var express = require("express");
var path = require("path");
var typeorm_1 = require("typeorm");
var jwt = require("jsonwebtoken");
var user_1 = require("./entity/user");
var todo_1 = require("./entity/todo");
function generateJSONAccessToken(credential) {
    return jwt.sign(credential, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}
function authenticateToken(req, res, next) {
    var authHeader = req.headers;
    if (!authHeader.cookie) {
        return res.redirect('/sign-in');
    }
    var token = authHeader.cookie.slice(4);
    if (token == null)
        return res.redirect(401, '/sign-in');
    jwt.verify(token, process.env.TOKEN_SECRET, function (err, user) {
        req.user = user;
        next();
    });
}
(0, typeorm_1.createConnection)().then(function (connection) {
    var app = express();
    var userRepo = connection.getRepository(user_1.User);
    var todoRepo = connection.getRepository(todo_1.Todo);
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, '../src/views'));
    app.use(express.static(__dirname + '/public'));
    app.use(express.urlencoded({ extended: true }));
    // app.use(express.json())
    app.get('/sign-up', function (req, res) {
        res.render('auth/signup');
    });
    app.post('/sign-up', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, username, password, newUser;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, username = _a.username, password = _a.password;
                    newUser = new user_1.User();
                    newUser.username = username;
                    newUser.password = password;
                    return [4 /*yield*/, userRepo.save(newUser).catch(function (err) { return console.log(err); })];
                case 1:
                    _b.sent();
                    res.redirect('/sign-in');
                    return [2 /*return*/];
            }
        });
    }); });
    app.get('/sign-in', function (req, res) {
        res.render('auth/signin');
    });
    app.post('/sign-in', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var foundUser, result, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userRepo
                        .findOne({ where: { 'username': req.body.username } })
                        .catch(function (err) { return console.log(err); })];
                case 1:
                    foundUser = _a.sent();
                    result = 'We can not find any account with the provided credentials';
                    if (foundUser) {
                        if (foundUser.password === req.body.password) {
                            token = generateJSONAccessToken({ username: req.body.username, password: req.body.password });
                            res.cookie('jwt', token, { httpOnly: true, secure: false, maxAge: 1800000 });
                            res.status(404).redirect('/add-to-do');
                        }
                        else
                            res.send(result);
                    }
                    else
                        res.send(result);
                    return [2 /*return*/];
            }
        });
    }); });
    app.get('/log-out', function (req, res) {
        res.clearCookie('jwt');
        res.redirect('/sign-in');
    });
    app.get('/get-all-to-do', authenticateToken, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var foundUser, foundTodos;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userRepo
                        .find({ where: { 'username': req.user.username } })];
                case 1:
                    foundUser = _a.sent();
                    return [4 /*yield*/, todoRepo
                            .find({ where: { 'user': foundUser[0] } })];
                case 2:
                    foundTodos = _a.sent();
                    res.render('todo/get', { req: req, foundTodos: foundTodos });
                    return [2 /*return*/];
            }
        });
    }); });
    app.get('/get-to-do-by-id/:id', authenticateToken, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var foundUser, foundTodo, allUsersExclude, dateOfCompletion, dateOfCreation, dateOfModification, datetime;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userRepo
                        .find({ where: { 'username': req.user.username } })];
                case 1:
                    foundUser = _a.sent();
                    return [4 /*yield*/, todoRepo
                            .find({ where: { 'id': req.params.id } })];
                case 2:
                    foundTodo = _a.sent();
                    return [4 /*yield*/, userRepo
                            .find({ where: { id: (0, typeorm_1.Not)(foundUser[0].id) } })];
                case 3:
                    allUsersExclude = _a.sent();
                    dateOfCompletion = foundTodo[0].dateOfCompletion.toISOString().slice(0, 16);
                    dateOfCreation = foundTodo[0].dateOfCreation.toISOString().slice(0, 16);
                    dateOfModification = foundTodo[0].dateOfModification.toISOString().slice(0.16);
                    datetime = {
                        dateOfCompletion: dateOfCompletion,
                        dateOfCreation: dateOfCreation,
                        dateOfModification: dateOfModification
                    };
                    res.render('todo/detail', { req: req, foundTodo: foundTodo[0], datetime: datetime, allUsers: allUsersExclude });
                    return [2 /*return*/];
            }
        });
    }); });
    app.get('/add-to-do', authenticateToken, function (req, res) {
        res.render('todo/add', { req: req });
    });
    app.post('/add-to-do', authenticateToken, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, name, description, dateofcompletion, status, foundUser, date, dateString, newTodo;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, name = _a.name, description = _a.description, dateofcompletion = _a.dateofcompletion;
                    console.log(req.body.dateofcompletion);
                    status = 'new';
                    return [4 /*yield*/, userRepo
                            .find({ where: { 'username': req.user.username } })];
                case 1:
                    foundUser = _b.sent();
                    console.log(dateofcompletion);
                    date = new Date().getTime();
                    dateString = new Date(date);
                    newTodo = new todo_1.Todo();
                    newTodo.name = name;
                    newTodo.description = description;
                    newTodo.user = foundUser[0];
                    newTodo.dateOfCompletion = new Date(dateofcompletion);
                    newTodo.status = status;
                    newTodo.dateOfCreation = dateString;
                    newTodo.dateOfModification = dateString;
                    return [4 /*yield*/, todoRepo.save(newTodo).catch(function (err) { return console.log(err); })];
                case 2:
                    _b.sent();
                    res.redirect('/get-all-to-do');
                    return [2 /*return*/];
            }
        });
    }); });
    app.post('/remove-to-do/:id', authenticateToken, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, todoRepo.delete(req.params.id)];
                case 1:
                    _a.sent();
                    res.redirect('/get-all-to-do');
                    return [2 /*return*/];
            }
        });
    }); });
    app.post('/update-to-do/:id', authenticateToken, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, name, description, dateofcompletion, date, dateString;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, name = _a.name, description = _a.description, dateofcompletion = _a.dateofcompletion;
                    date = new Date().getTime();
                    dateString = new Date(date);
                    return [4 /*yield*/, (0, typeorm_1.getConnection)()
                            .createQueryBuilder()
                            .update(todo_1.Todo)
                            .set({
                            name: name,
                            description: description,
                            dateOfCompletion: dateofcompletion,
                            dateOfModification: dateString
                        })
                            .where("id= :id", { id: req.params.id })
                            .execute()];
                case 1:
                    _b.sent();
                    res.redirect('/get-all-to-do');
                    return [2 /*return*/];
            }
        });
    }); });
    app.post('/update-to-do/:id/status', authenticateToken, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, foundTodo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    return [4 /*yield*/, todoRepo
                            .find({ where: { 'id': id } })];
                case 1:
                    foundTodo = _a.sent();
                    if (!(foundTodo[0].status === 'new')) return [3 /*break*/, 3];
                    return [4 /*yield*/, (0, typeorm_1.getConnection)()
                            .createQueryBuilder()
                            .update(todo_1.Todo)
                            .set({
                            status: 'complete'
                        })
                            .where("id= :id", { id: id })
                            .execute()];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, (0, typeorm_1.getConnection)()
                        .createQueryBuilder()
                        .update(todo_1.Todo)
                        .set({
                        status: 'new'
                    })
                        .where("id= :id", { id: id })
                        .execute()];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5: return [2 /*return*/, res.sendStatus(200)];
            }
        });
    }); });
    app.get('/get-all-user', authenticateToken, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var allUsers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userRepo.find()];
                case 1:
                    allUsers = _a.sent();
                    res.render('user/alluser', { req: req, allUsers: allUsers });
                    return [2 /*return*/];
            }
        });
    }); });
    app.post('/assign-to-do/:todoid/:userid', authenticateToken, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var foundUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userRepo
                        .find({ where: { 'id': req.params.userid } })];
                case 1:
                    foundUser = _a.sent();
                    console.log(foundUser[0]);
                    return [4 /*yield*/, (0, typeorm_1.getConnection)()
                            .createQueryBuilder()
                            .update(todo_1.Todo)
                            .set({
                            user: foundUser[0]
                        })
                            .where("id= :id", { id: req.params.todoid })
                            .execute()];
                case 2:
                    _a.sent();
                    res.redirect("/get-all-task-by-user/".concat(req.params.userid));
                    return [2 /*return*/];
            }
        });
    }); });
    app.get('/get-all-task-by-user/:id', authenticateToken, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var foundTodos, foundUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, todoRepo
                        .find({ where: { 'user': req.params.id } })];
                case 1:
                    foundTodos = _a.sent();
                    return [4 /*yield*/, userRepo
                            .find({ where: { 'id': req.params.id } })];
                case 2:
                    foundUser = _a.sent();
                    res.render('user/getassignedtask', { req: req, foundTodos: foundTodos, foundUser: foundUser[0] });
                    return [2 /*return*/];
            }
        });
    }); });
    app.get('*', function (req, res) {
        res.redirect('/sign-in');
    });
    app.listen(8000, function () {
        console.log('Listening on port 8000');
    });
});
