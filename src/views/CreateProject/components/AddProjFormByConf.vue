<template>
  <el-form class="fast-proj-form" :model="form" label-position="top">
    <el-form-item label="工程名称" prop="project_name_zh" :rules="[
      { required: true, message: '请输入工程名称', trigger: 'blur' }]">
      <el-input
        size="small"
        v-model="form.project_name_zh"
        @input="chgNameZh"
        style="width: 320px;"
      ></el-input>
    </el-form-item>

    <el-form-item label="工程标识（英文）">
      <el-input size="small" v-model="form.project_name" style="width: 320px;"></el-input>
    </el-form-item>

    <el-form-item label="数据存储字段">
      <div class="field">
        <div class="field-title">字段名</div>
        <el-input size="small" value="Id" style="width: 240px;"></el-input>
        <el-select style="width: 120px;" size="small" value="数字" disabled>
          <el-option label="数字" value="Float" checked ></el-option>
        </el-select>

        <div class="field-title">字段注释</div>
        <el-input size="small" value="自增Id" style="width: 240px;" disabled></el-input>
       
      </div>
      <div class="field" v-for="(field, index) in form.tpl_input" :key="index">
        <div class="field-title">字段名</div>
        <el-input size="small" v-model="field.name" style="width: 240px;" placeholder="请输入字段名"></el-input>
        <el-select style="width: 120px;" v-model="field.type" size="small" placeholder="请选择">
          <el-option label="字符串" value="String(255)"></el-option>
          <el-option label="数字" value="Float"></el-option>
          <el-option label="长文本" value="Text"></el-option>
          <el-option label="媒体链接" value="Media"></el-option>
        </el-select>

        <div class="field-title">字段注释</div>
        <el-input size="small" v-model="field.comment" style="width: 240px;"></el-input>

        <div class="field-title">提取规则</div>
        <el-select
          style="width: 120px;"
          v-model="field.extract_type"
          size="small"
          placeholder="请选择"
        >
          <el-option label="xpath" value="xpath"></el-option>
          <el-option label="css" value="css"></el-option>
          <el-option label="正则表达式" value="regexp"></el-option>
        </el-select>
        <el-input size="small" v-model="field.extract_rule" style="width: 240px;"></el-input>

        <div class="field-title">默认值</div>
        <el-input size="small" v-model="field.default" style="width: 240px;"></el-input>

        <el-button type="text" icon="el-icon-delete" class="del-btn" @click="delField(index)"></el-button>
      </div>
    </el-form-item>

    <el-form-item>
      <el-button type="text" @click="addField">+添加参数</el-button>
    </el-form-item>
    <el-button size="small" @click="onSubmit">提交</el-button>
  </el-form>
</template>

<script>
import PinyinMixin from "./PinyinMixin";
export default {
  mixins: [PinyinMixin],
  data() {
    return {
      form: {
        template: "general",
        project_name: null,
        project_name_zh: null,
        tpl_input: [
          {
            name: null,
            type: "String(255)",
            extract_type: "xpath",
            extract_rule: null,
            default: null,
            comment: null
          }
        ]
      }
    };
  },
  methods: {
    addField() {
      this.form.tpl_input.push({
        name: null,
        type: "String(255)",
        extract_type: "xpath",
        extract_rule: null,
        default: null,
        comment: null
      });
    },
    delField(i) {
      this.form.tpl_input.splice(i, 1);
    },
    onSubmit() {
      const _form = this.$deepcopy(this.form);
      _form.tpl_input = JSON.stringify(_form.tpl_input);
      this.$emit("submit", _form);
    }
  }
};
</script>

<style lang="scss">
.fast-proj-form {
  .field {
    @include flex(row, flex-start);

    .del-btn {
      margin-left: 20px;
      font-size: 20px;
      color: #ff3d3d;
    }
  }
  .field-title {
    width: 70px;
    color: black;
    margin-left: 30px;
    margin-right: 10px;
    &:first-child {
      margin-left: 0;
    }
  }
}
</style>