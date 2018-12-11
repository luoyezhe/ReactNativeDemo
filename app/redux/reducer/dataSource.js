let _dataSource;
class DataSource {
    constructor() {
        this.sourceAll = {};
    }

    push(sourceName, key, value) {
        if (!this.sourceAll[sourceName]) {
            this.sourceAll[sourceName] = {};
        }
        if (Array.isArray(value)) {
            value.forEach(item => {
                this.push(sourceName, item[key], item);
            });
        } else {
            this.sourceAll[sourceName][key] = value;
        }
    }

    /*
     * sourceName: 数据源的名字
     * key: 存的key
     * childKey: 子key
     * value: 值
     * */
    update(sourceName, key, childKey, value) {
        if (!this.sourceAll[sourceName]) {
            this.sourceAll[sourceName] = {};
        }
        if (childKey) {
            if (!this.sourceAll[sourceName][key]) {
                this.sourceAll[sourceName][key] = {};
            }
            this.sourceAll[sourceName][key][childKey] = value;
        } else {
            this.sourceAll[sourceName][key] = value;
        }
    }

    // 标讯收藏这种特殊的更新
    updateCollect(sourceName, key, value, isCollect) {
        if (!this.sourceAll[sourceName]) {
            this.sourceAll[sourceName] = {};
        }
        if (!this.sourceAll[sourceName].detail) {
            this.sourceAll[sourceName].detail = {};
        }
        this.sourceAll[sourceName][key].is_collect = isCollect;
        this.sourceAll[sourceName][key].detail.collect_id = value;
    }
}

const initDataSource = () => {
    if (!_dataSource) {
        _dataSource = new DataSource();
    }
};

initDataSource();

export { _dataSource as dataSource };
