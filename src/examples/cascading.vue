<style lang="scss" scoped>

</style>
<template>
  <div class="page">
    <au-cascading label="请选择地区" v-model="value" :options="options"></au-cascading><br>
    <au-cascading label="请选择地区" v-model="value" :options="options" disabled></au-cascading><br>
    <au-cascading label="请选择地区" v-model="value" :options="options" :warnings="['waooh~']"></au-cascading><br>
    <au-cascading label="请选择地区" v-model="value" :options="options" :validators="validators"></au-cascading><br>
  </div>
</template>
<script>
  export default {
    name: 'cascading',
    data () {
      return {
        value: '',
        options: [
          {
            value: 'prov1',
            text: '江西',
            children: [
              {
                value: 'city1',
                text: '南昌',
                children: [
                  {
                    value: 'cout1',
                    text: '南昌县'
                  },
                  {
                    value: 'cout2',
                    text: '奉新县'
                  },
                  {
                    value: 'cout3',
                    text: '安义县'
                  }
                ]
              },
              {
                value: 'city2',
                text: '吉安',
                children: [
                  {
                    value: 'cout4',
                    text: '吉安县'
                  },
                  {
                    value: 'cout5',
                    text: '泰和县'
                  },
                  {
                    value: 'cout6',
                    text: '万安县'
                  }
                ]
              },
              {
                value: 'city3',
                text: '赣州',
                children: [
                  {
                    value: 'cout7',
                    text: '南康县'
                  },
                  {
                    value: 'cout8',
                    text: '上犹县'
                  },
                  {
                    value: 'cout9',
                    text: '信丰县'
                  }
                ]
              }
            ]
          },
          {
            value: 'prov2',
            text: '某个省',
            children: [
              {
                value: 'city4',
                text: '嘿',
                children: [
                  {
                    value: 'cout10',
                    text: '嘿嘿'
                  },
                  {
                    value: 'cout11',
                    text: '嘿嘿嘿'
                  },
                  {
                    value: 'cout12',
                    text: '嘿嘿嘿嘿'
                  }
                ]
              },
              {
                value: 'city5',
                text: '哈',
                children: [
                  {
                    value: 'cout13',
                    text: '哈哈'
                  },
                  {
                    value: 'cout14',
                    text: '哈哈哈'
                  },
                  {
                    value: 'cout15',
                    text: '哈哈哈哈'
                  }
                ]
              },
              {
                value: 'city6',
                text: '吼',
                children: [
                  {
                    value: 'cout16',
                    text: '吼吼'
                  },
                  {
                    value: 'cout17',
                    text: '吼吼吼'
                  },
                  {
                    value: 'cout18',
                    text: '吼吼吼吼'
                  }
                ]
              }
            ]
          }
        ],
        validators: [
          {
            validator (v) {
              return v === 'cout6'
            },
            warning: '我是万安人'
          }
        ]
      }
    }
  }
</script>


