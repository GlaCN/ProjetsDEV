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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
exports.login = exports.register = void 0;
var emailValidator = require("email-validator");
var bcrypt = require("bcrypt");
var mysql = require("mysql");
// Connection entre Express et Mysql
var connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});
try {
    connection.connect();
    console.log("connection is ok");
}
catch (error) {
    console.error(error);
}
function register(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, pseudo, email, password, password_confirm, salt, hashPassword, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = req.body, pseudo = _a.pseudo, email = _a.email, password = _a.password, password_confirm = _a.password_confirm;
                    if (password !== password_confirm) {
                        return [2 /*return*/, res.render('register', { error: 'Les mots de passe ne sont pas identiques !' })];
                    }
                    if (!emailValidator.validate(email)) {
                        return [2 /*return*/, res.render('register', { error: 'votre email n\'est pas valide' })];
                    }
                    return [4 /*yield*/, bcrypt.genSalt(10)];
                case 1:
                    salt = _b.sent();
                    hashPassword = bcrypt.hashSync(password, salt);
                    connection.query("INSERT INTO users (pseudo, email, mdp) VALUES (?, ?, ?)", [pseudo, email, hashPassword], function (error, dbRes) {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            res.redirect("/login");
                        }
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _b.sent();
                    console.log(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.register = register;
function login(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, email, password, sqlSearch, search_query;
        return __generator(this, function (_b) {
            _a = req.body, email = _a.email, password = _a.password;
            // console.log(req.body);
            try {
                sqlSearch = "Select * from users where email = ?";
                search_query = mysql.format(sqlSearch, [email]);
                connection.query(search_query, function (error, result) {
                    // console.log(`Results : ${result[0].email}`);
                    if (error) {
                        console.log(error);
                        res.sendStatus(404);
                    }
                    else if (result.length === 0) {
                        console.log("Mauvaise adresse mail.");
                        res.sendStatus(404);
                    }
                    // const sqlQuery = "Select * from users where email = ?"
                    // connection.query (sqlQuery, [email], (error, result) => {
                    var mdpDB = result[0].mdp;
                    var match = bcrypt.compareSync(password, mdpDB);
                    if (match) {
                        console.log('Connexion');
                        // connexion réussie ==> on enregistre une sesion pr le user
                        req.session.user = {
                            email: result[0].email,
                            username: result[0].pseudo
                        };
                        console.log('session:', req.session);
                        res.cookie('session', req.session.user);
                        res.redirect('channels');
                    }
                    else {
                        console.log("Mauvais mot de passe.");
                        res.sendStatus(404);
                    }
                    // }
                });
            }
            catch (error) {
                console.log(error);
                return [2 /*return*/, res.status(500).send("Erreur interne du serveur")];
            }
            return [2 /*return*/];
        });
    });
}
exports.login = login;
// const dom = document.addEventListener('DOMContentLoaded', (event) => {
// const form: any = window.document.querySelector('.register_form');
//     // 1- Récup des données du form 
//     // ? signifie que form peut être null
//     form?.addEventListener("submit", async function(event) {
//         // Empecher le rechargement par defaut de la page
//         event.preventDefault();
//         // L'objet formData récupère tout les champs du formulaire
//         const formData = new FormData(form);
//         console.log('form :', form)
//         console.log('formData :', formData)
//         try {
//             const response = await fetch('/register', {
//                 method: 'POST',
//                 body: formData
//             });
//             const result = await response.json();
//             console.log(result);
//         } catch (error) {
//             console.error('Erreur :', error)
//         }
//     })
// })
