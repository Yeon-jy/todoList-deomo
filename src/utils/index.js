import cacheStore from './localcache';

const cs = new cacheStore({
    dataType: 'JSON',
    expire: 1,
    isCleanDirtyStorage: false,
    isCleanDataWhenFull: false,
    turnOnLogger: true
});

const keyName = 'todo_list';

const listType = {
    // 进行中
    exe: "exe",
    // 已删除
    del: "del",
    // 已完成
    done: "done"
};

const modifyStatus = (id, fn, status) => {
    cs.get({ keyName: keyName }, (res) => {
        const result = res.result;
        const data = res.data;
        if (result === 1) {
            data.value.data[id].completed = status;
            cs.save({
                keyName: keyName,
                value: data.value
            }, (res) => {
                fn && typeof fn === 'function' && fn(res);
            });
        } else {
            fn && typeof fn === 'function' && fn(res);
        }
    });
};

export default {
    // 增
    create: (item, fn) => {
        cs.get({ keyName: keyName }, (res) => {
            const result = res.result;
            const data = res.data;
            if (result === 1) {
                item.id = data.value.data.length;
                data.value.data.push(item);
                cs.save({
                    keyName: keyName,
                    value: data.value
                }, (res) => {
                    fn && typeof fn === 'function' && fn(res);
                });
            } else {
                item.id = 0;
                cs.save({
                    keyName: keyName,
                    value: {
                        data: [item]
                    }
                }, (res) => {
                    fn && typeof fn === 'function' && fn(res);
                });
            }
        });
    },
    // 查
    retrieve: (fn, id = null, status = listType.exe) => {
        cs.get({ keyName: keyName }, (res) => {
            const result = res.result;
            const data = res.data;
            console.log(res);
            let finalRes;
            //对空的情况做一下判断
            if (res.data) {
                finalRes = {
                    result: 1,
                    msg: res.msg,
                    data: res.data.value.data
                };
            } else {
                finalRes = {
                    result: 0,
                    msg: '信息为空',
                    data: []
                };
            }

            console.log('查询结果:', res);
            fn && typeof fn === 'function' && fn(finalRes);
        });
    },
    // 改
    update: (id, item, fn) => {
        cs.get({ keyName: keyName }, (res) => {
            const result = res.result;
            const data = res.data;
            if (result === 1) {
                data.value.data[id] = item;
                cs.save({
                    keyName: keyName,
                    value: data.value
                }, (res) => {
                    fn && typeof fn === 'function' && fn(res);
                });
            } else {
                fn && typeof fn === 'function' && fn(res);
            }
        });
    },

    // 撤销完成
    recover: (id, fn) => {
        modifyStatus(id, fn, false);
    },
    // 完成
    done: (id, fn) => {
        modifyStatus(id, fn, true);
    },
    //清空
    flush: () => {
        cs.flush();
    }
}