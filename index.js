const mixinAllData = "mixinAllData"

const mixinCheckData = "mixinCheckData"

const handleCheckedTableColumnsChange = "handleCheckedTableColumnsChange"

function CostomTable(options = {}) {
    if(!isObject(options)) {
        console.error(options + ' needs to be an object, but not now !')
        return
    }
    const defaultOptions = {
        // 是非存到缓存当中
        isCache: true,
        ref: 'table',
        // 是否过滤操作
        hasHandle: true,
        // hasHandle为true的时候  过滤标题为handleName的列名
        handleName: '操作',
        // 缓存可以是后端的接口   默认缓存到localStorage  
        cacheAPI: {
            get: (ref) => {
                return JSON.parse(localStorage.getItem(getLocalStorageKey(ref)))
            },
            set: (CheckList, ref, item) => {
                localStorage.setItem(getLocalStorageKey(ref), JSON.stringify([...CheckList]))
            },
        }
    }
    
    options = mergeOptions(defaultOptions, options)
    const ref = options.ref
    // 动态生成的方法
    let methods = {}
    // 动态生成data
    let data = {}
    data[mixinAllData + ref] = []
    data[mixinCheckData + ref] = []
    methods[handleCheckedTableColumnsChange + ref] = function(item) {
        let selectedCount = 0
        this[mixinAllData + ref].forEach(column => {
            column.visible = this[mixinCheckData + ref].includes(column.id)
            selectedCount += column.visible ? 1 : 0
        })
        if (selectedCount === 0) {
            this.$nextTick(function() {
                this[mixinCheckData + ref] = [item.id]
                item.visible = true
            })
            return
        }
        if(options.isCache) {
            options.cacheAPI.set(this[mixinAllData + ref].filter(filterItem => filterItem.visible).map(mapItem => mapItem.id), ref, item)
        }
        this.updateColumnVisible(item, ref)
    }

    function fillData(self, options) {
        const { ref, hasHandle, handleName } = options
        let costomCheck = []
        let cacheAPIGet = options.cacheAPI.get(ref) || []
        for (let i = 0; i < self.$refs[ref].columns.length; i++) {
            // 如果过滤操作  并且列名是操作的 跳出
            if(hasHandle && self.$refs[ref].columns[i].label === handleName) {
                continue
            }
            let data = {
                id: self.$refs[ref].columns[i].property,
                label: self.$refs[ref].columns[i].label,
                visible: cacheAPIGet.length == 0 ? true : cacheAPIGet.includes(self.$refs[ref].columns[i].property)
            }
      
            self[mixinAllData + ref].push(data)
            costomCheck.push(self.$refs[ref].columns[i].property)
        }

        if(options.isCache && cacheAPIGet.length) {
            self[mixinCheckData + ref] = cacheAPIGet
            self[mixinAllData + ref].filter(filterItem => {
                if(!filterItem.visible) {
                    self.updateColumnVisible(filterItem, ref)
                }
            })
        }else {
            self[mixinCheckData + ref] = costomCheck
        }
    }

    return {
        data() {
            return {
                ...data
            }
        },
        mounted() {
            this.costomTableMixinAttch(options)
        },
        methods: {
            costomTableMixinAttch(options) {
                fillData(this, options)
            },
            updateColumnVisible(item, ref) {
                const table = this.$refs[ref]
                const vm = table.$children.find(e => e.prop === item.id)
                const columnConfig = vm.columnConfig
                if (item.visible) {
                    // 找出合适的插入点
                    const columnIndex = this[mixinAllData + ref].findIndex(itemtable => item.id == itemtable.id)
                    vm.owner.store.commit('insertColumn', columnConfig, columnIndex, null)
                } else {
                    vm.owner.store.commit('removeColumn', columnConfig, null)
                }
                table.doLayout()
            },
            ...methods
        }
    }
}

function mergeOptions(src, opts) {
    const optsRet = {
        ...src
    }
    for (const key in src) {
        if (hasOwnProperty(opts, key)) {
            optsRet[key] = opts[key]
        }
    }
    return optsRet
}

function hasOwnProperty(opts, key) {
   return Object.prototype.hasOwnProperty.call(opts, key)
}

function isObject(arr) {
    return Object.prototype.toString.call(arr) === "[object Object]"
}

function getLocalStorageKey(ref) {
    return window.location.hash ? window.location.hash + ref : window.location.pathname + ref
}

export {
    CostomTable
}
