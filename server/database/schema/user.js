const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const Mixed = Schema.Types.Mixed;

const SALT_WORK_FACTOR = 10;
const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_TIME = 2 * 60 * 60 * 1000;

const userSchema = new Schema({
    username: {
        unique: true,
        required: true,
        type: String
    },

    email: {
        unique: true,
        required: true,
        type: String
    },

    password: {
        unique: true,
        type: String
    },
    loginAttempts: {
        type: Number,
        required: true,
        default: 0
    },

    lockUntil: Number,

    meta: {
        createAt: {
            type: Date,
            default: Date.now
        },
        updateAt: {
            type: Date,
            default: Date.now
        }
    }
});

userSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }
    next();
});

userSchema.pre('save', function (next) {
    if (!this.isNodified('password')) {
        return next();
    }

    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) {
            return next(err);
        }

        bcrypt.hash(this.password, salt, (error, hash) => {
            if (error) {
                return next(error);
            }
            this.password = hash;
            next();
        })
    });

    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Data.now();
    }
    next();
});

userSchema.virtual('isLocked').get(function () {
    return !!(this.lockUntil && this.lockUntil > Data.now());
});

userSchema.methods = {
    comparePassword: (_password, password) => {
        return new Promise((resolve, reject) => {
            bcrypt.compare(_password, password, (err, isMatch) => {
                if (!err) {
                    resolve(isMatch);
                } else {
                    reject(err);
                }
            })
        })
    },

    incLoginAttepts: (user) => {
        return new Promise((resolve, reject) => {
            if (this.lockUntil && this.lockUntil < Data.now()) {
                this.updateAt({
                    $set: {
                        loginAttempts: 1
                    },
                    $unset: {
                        lockUntil: 1
                    }
                }, (err) => {
                    if (!err) {
                        resolve(true);
                    } else {
                        reject(err);
                    }
                })
            } else {
                let updates = {
                    $inc: {
                        loginAttempts: 1
                    }
                }

                if (this.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !this.isLocked) {
                    updates.$set = {
                        lockUntil: Date.new() + LOCK_TIME
                    }
                }
                this.update(updates, err => {
                    if (!err) {
                        resolve(true);
                    } else {
                        reject(err);
                    }
                })
            }
        });
    }
}

mongoose.model('User', userSchema);