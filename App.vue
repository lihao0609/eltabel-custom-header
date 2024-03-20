<template>
  <div style="width: 100%">
    <el-table
      :data="tableData"
      ref="table"
      stripe
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
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
    </el-table>



    <el-table
      :data="tableData"
      ref="table2"
      stripe
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
      <el-table-column
        prop="hhh"
        label="哈哈">
      </el-table-column>
      <el-table-column
        prop="operate"
        label="操作">
      </el-table-column>
    </el-table>
    

    <el-checkbox-group 
      v-model="mixinCheckDatatable2"
      style="margin-top: 20px;margin-left: 20px;"
      >
        <el-checkbox @change="handleCheckedTableColumnsChangetable2(data)"  v-for="data in mixinAllDatatable2" :label="data.id" :key="data.id">{{ data.label }}</el-checkbox>
    </el-checkbox-group>

  </div>
</template>

<script>
import { CostomTable } from './index'
  export default {
    mixins: [CostomTable({ref: 'table' }), CostomTable({ref: 'table2'})],
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          hhh: 'hhhhhhhhhhhh'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          hhh: 'hhhhhhhhhhhh'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          hhh: 'hhhhhhhhhhhh'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          hhh: 'hhhhhhhhhhhh'
        }]
      }
    }
  }
</script>