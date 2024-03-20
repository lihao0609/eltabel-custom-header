
eltabel-custom-header
==========
## element UI table 自定义表头
可以很简单的实现自定义表头，对原始代码侵入很少。
支持缓存  前端缓存和后端缓存。
支持一个页面多个table使用
只需要简单的混入，并给table 设置一个ref 即可实现

## Usage
```js
// 混入
mixins: [CostomTable({ref: 'table' }), CostomTable({ref: 'table2'})],

// 参数
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


// 表格使用 示例
<el-table-column
prop="operate"
label="操作">
<template slot="header">
    <span>操作</span>
    <el-popover
        title="操作"
        width="100"
        trigger="hover">
        <el-checkbox-group 
        v-model="mixinCheckDatatable"
        style="margin-left: 6px;display: flex;flex-direction: column"
        >
            <el-checkbox @change="handleCheckedTableColumnsChangetable(data)" v-for="data in mixinAllDatatable" :label="data.id" :key="data.id">{{ data.label }}</el-checkbox>
        </el-checkbox-group>
        <i slot="reference" style="margin-left: 5px;color: #1989fa;cursor: pointer;" class="el-icon-s-tools"></i>
    </el-popover>
</template>
</el-table-column>

// 按钮使用实例
<el-checkbox-group 
    v-model="mixinCheckDatatable2"
    style="margin-top: 20px;margin-left: 20px;"
    >
    <el-checkbox @change="handleCheckedTableColumnsChangetable2(data)"  v-for="data in mixinAllDatatable2" :label="data.id" :key="data.id">{{ data.label }}</el-checkbox>
</el-checkbox-group>
```
代码实例 app.vue文件

## describe
混入会插入
data 变量
        mixinAllDatatable ('mixinAllData' + ref)
        mixinCheckDatatable  ('mixinCheckData' + ref)
methods 方法
handleCheckedTableColumnsChangetable ('handleCheckedTableColumnsChange' + ref)