"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Todo = void 0;
var typeorm_1 = require("typeorm");
var user_1 = require("./user");
var Todo = /** @class */ (function () {
    function Todo() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
        __metadata("design:type", Number)
    ], Todo.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', length: 64 }),
        __metadata("design:type", String)
    ], Todo.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', length: 256 }),
        __metadata("design:type", String)
    ], Todo.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function (type) { return user_1.User; }, function (user) { return user.todos; }),
        __metadata("design:type", user_1.User)
    ], Todo.prototype, "user", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'datetime' }),
        __metadata("design:type", Date)
    ], Todo.prototype, "dateOfCompletion", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: 'enum',
            enum: ['new', 'complete'],
            default: 'new'
        }),
        __metadata("design:type", String)
    ], Todo.prototype, "status", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'datetime' }),
        __metadata("design:type", Date)
    ], Todo.prototype, "dateOfCreation", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'datetime' }),
        __metadata("design:type", Date)
    ], Todo.prototype, "dateOfModification", void 0);
    Todo = __decorate([
        (0, typeorm_1.Entity)('todo')
    ], Todo);
    return Todo;
}());
exports.Todo = Todo;
