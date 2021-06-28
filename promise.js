const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';


/**
 * @param {Function} executor
 * executor是带有 resolve 和 reject 两个参数的函数
 * Promise 构造函数执行时立即调用 executor 函数
 */


class promise {
    constructor(fn) {
        this._state = PENDING;
        this._nextValue = null;
        this._error = undefined;
        fn(this._onFulfilled, this._onRejected);
    }

    _onFulfilled(value) {
        if (this._state !== PENDING) return;
        this._state = FULFILLED;
        this._nextValue = value;
        this._error = undefined;
    }

    _onRejected(err) {
        if (this._state !== PENDING) return;
        this._state = REJECTED;
        this._nextValue = null;
        this._error = err;
    }


    then(onFulfilled, onRejected) {
        // .then 也是返回promise 
        return new promise((resolve, reject) => {
            if (this._state === FULFILLED) {
                if (onFulfilled) {
                    const _value = onFulfilled
                        ? onFulfilled(this._nextValue)
                        : this._nextValue
                    // 如果 onFulfilled 有定义则运行 onFulfilled 返回结果
                    // 否则跳过，这里下一个 Promise 都是返回 fulfilled 状态
                    resolve(_value)
                }
            }
            if (this._state === REJECTED) {
                if (onRejected) {
                    resolve(onRejected(this._error))
                } else {
                    // 没有直接跳过，下一个 Promise 继续返回 rejected 状态
                    reject(this._error)
                }
            }
        });
    }
}

