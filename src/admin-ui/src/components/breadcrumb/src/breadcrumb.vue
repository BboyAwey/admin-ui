<style lang="scss">
  @import '../../../style/vars';
  .au-breadcrumb {
    font-family: $fontFamily;
    font-size: $normal;
  }
  .au-breadcrumb-item {
    display: inline-block;
  }
  .au-breadcrumb-separator {
    margin: 0 10px;
  }
  .au-breadcrumb-text {
    cursor: pointer;
  }
</style>
<template>
  <ul class="au-breadcrumb au-theme-font-color--base-3">
    <li class="au-breadcrumb-item" v-for="(crumb, index) in localCrumbs" :key="index">
      <span class="au-breadcrumb-separator au-theme-font-color--base-7" v-if="index">{{ separator }}</span>
      <span
        class="au-breadcrumb-text"
        :class="{
          'au-theme-hover-font-color--primary-3': index != localCrumbs.length - 1 && crumb.url,
          'au-theme-font-color--base-7': index == localCrumbs.length - 1 || !crumb.url
        }"
        :style="{
          cursor: (index != localCrumbs.length - 1 && crumb.url) ? 'pointer' : 'auto'
        }"
        @click="handleCrumbClick(crumb, index)">
        {{ crumb.text }}
      </span>
    </li>
  </ul>
</template>
<script>
  import { deepClone } from '../../../helpers/utils'

  export default {
    name: 'au-breadcrumb',
    data () {
      return {
        localCrumbs: deepClone(this.crumbs)
      }
    },
    props: {
      crumbs: {
        type: Array
        // default () {
        //   return [
        //     {
        //       text: '',
        //       url: ''
        //     }
        //   ]
        // }
      },
      separator: {
        type: String,
        default: '/'
      },
      separatorClass: String
    },
    watch: {
      crumbs: {
        deep: true,
        handle (v) {
          this.localCrumbs = v
        }
      }
    },
    methods: {
      handleCrumbClick (crumb, index) {
        if (crumb && index < this.localCrumbs.length - 1) {
          this.localCrumbs = this.localCrumbs.splice(index, this.localCrumbs.length - 2 - index)
          this.$emit('select', crumb)
        }
      }
    }
  }
</script>
