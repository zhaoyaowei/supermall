<template>
  <div class="param-info" v-if="Object.keys(paramInfo).length !== 0">
    <table class="rules" v-for="(item, index) in paramInfo.rules" :key="index">
      <tr v-for="(tr, inder) in item" :key="inder">
        <td v-for="(td, inded) in tr" :key="inded">{{td}}</td>
      </tr>
    </table>
    <table class="infos">
      <tr v-for="item in paramInfo.infos" :key="item.id">
        <td class="key">{{item.key}}</td>
        <td class="value">{{item.value}}</td>
      </tr>
    </table>
    <div class="info-img" v-if="paramInfo.image.length !== 0">
      <img :src="paramInfo.image" alt="">
    </div>
  </div>
</template>

<script>

  export default {
    name: 'DetailParamInfo',
    props: {
      paramInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }

</script>
<style scoped>
  .param-info {
    padding: 20px 15px;
    font-size: 14px;
    border-bottom: 5px solid #f2f5f8;

  }

  .param-info table {
    border-collapse:collapse;
    width: 100%;
  }

  .param-info table, tr {
    height: 42px;
  }

  .param-info table tr td {
    border-bottom: 1px solid rgba(100,100,100,.1);
  }

  .infos {
    border-top: 1px solid rgba(0,0,0,.1);
  }

  .key {
    width: 95px;
  }

  .value {
    color: #eb4868;
  }

  .info-img img {
    width: 100%;
  }
</style>