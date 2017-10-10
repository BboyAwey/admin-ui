<style lang="scss">
  @import '../../../style/vars';
  .admin-paginator {
    display: inline-block;
    user-select: none;
    & > ul:after {
      content: "";
      display: block;
      clear: both;
    }
    & > ul > li {
      float: left;
      width: 40px;
      height: 32px;
      border-top-width: 1px/*$grayBrighten15*/;
      border-top-style: solid;
      border-bottom-width: 1px/*$grayBrighten15*/;
      border-bottom-style: solid;
      border-right-width: 1px/*$grayBrighten15*/;
      border-right-style: solid;
      line-height: 32px;
      text-align: center;
      font-size: 12px;
      // color: $grayDarken35;
    }
    & > ul > .ellipsis{
      border-bottom: none;
      border-top: none;
      // border-right: 1px solid /*$grayBrighten15*/;
      border-right-width: 1px;
      border-right-style: solid; 
    }
    & > ul > .active{
      // background-color: $primary;
      color: #fff;
      border: none;
    }
    & > ul > .disabled{
      // background-color: $grayBrighten20;
      // color: $grayBrighten10;
      cursor: not-allowed;
    }
    & > ul > li:not(.active):not(.disabled):not(.ellipsis):hover{
      // background-color: $grayBrighten20;
      // color: $primary;
      cursor: pointer;
    }
    & > ul > li:first-child {
      // border-left: 1px solid /*$grayBrighten15*/;
      border-left-width: 1px;
      border-left-style: solid;
      border-top-left-radius: 2px;
      border-bottom-left-radius: 2px;
    }
    & > ul > li:last-child {
      border-top-right-radius: 2px;
      border-bottom-right-radius: 2px;
    }
  }
</style>
<template lang="html">
  <div class="admin-paginator">
    <ul>
     <li :class="{disabled: curPage <= 1,
                  'au-theme-border-color--base-8': true,
                  'au-theme-font-color--base-3': true,
                  'au-theme-background-color--base-9': curPage <= 1,
                  'au-theme-font-color--base-6': curPage <= 1,
                  'au-theme-hover-background-color--base-10': curPage > 1,
                  'au-theme-hover-font-color--primary-3': curPage > 1}" @click="prevPage" v-if="_pageCount() >= 0"><au-icon type="angle-left" size="16px"></au-icon></li>
     <!-- 总数小等于 0-->
     <li :class="{active: curPage == 1,
                  'au-theme-border-color--base-8': true,
                  'au-theme-font-color--base-3': true,
                  'au-theme-hover-background-color--base-10': curPage != 1,
                  'au-theme-hover-font-color--primary-3': curPage != 1,
                  'au-theme-background-color--primary-5': curPage == 1,
                  'au-theme-font-color--primary-3-important': curPage == 1}" class="  " attr="ion-more-1" v-if="_pageCount()<=0" @click="page(1)">1</li>
     <!-- 总数大于等于 0 且小于等10-->
     <li :class="{active: curPage == index,
                  'au-theme-border-color--base-8': true,
                  'au-theme-font-color--base-3': true,
                  'au-theme-hover-background-color--base-10': curPage != index,
                  'au-theme-hover-font-color--primary-3': curPage != index,
                  'au-theme-background-color--primary-5': curPage == index,
                  'au-theme-font-color--primary-3-important': curPage == index}" v-show="_pageCount() > 0 && _pageCount() <= 10" v-for="index in _pageCount()" @click="page(index)">{{index}}</li>
     <!-- 总数大于 10-->
     <li :class="{active: curPage == 1,
                  'au-theme-border-color--base-8-important': true,
                  'au-theme-font-color--base-3': true,
                  'au-theme-hover-background-color--base-10': curPage != 1,
                  'au-theme-hover-font-color--primary-3': curPage != 1,
                  'au-theme-background-color--primary-5': curPage == 1,
                  'au-theme-font-color--primary-3-important': curPage == 1}" attr="ion-more-1" v-if="_pageCount() > 10 " @click="page(1)">1</li>
     <li :class="{'au-theme-border-color--base-8': true,
                  'au-theme-font-color--base-3': true}" attr="ion-more-left" class="ellipsis" v-show="_offset()>1 && _pageCount() > 10"><au-icon type='ellipsis-h'></au-icon></li>
     <li :class="{active: curPage == _cPage(index), 
                  'au-theme-border-color--base-8': true,
                  'au-theme-font-color--base-3': true,
                  'au-theme-hover-background-color--base-10': curPage != _cPage(index),
                  'au-theme-hover-font-color--primary-3': curPage != _cPage(index),
                  'au-theme-background-color--primary-5': curPage == _cPage(index),
                  'au-theme-font-color--primary-3-important': curPage == _cPage(index) }" v-show="(_cPage(index) <= _limit() ) && _pageCount() > 10" v-for="index in _limit()" @click="page(_cPage(index))">{{_cPage(index)}}</li>
     <li :class="{'au-theme-border-color--base-8-important': true,
                  'au-theme-font-color--base-3': true}" attr="ion-more-right" class="ellipsis" v-show="(_limit() < _pageCount() - 1) && _pageCount() > 10"><au-icon type='ellipsis-h'></au-icon></li>
     <li :class="{active: curPage == _pageCount(),
                  'au-theme-border-color--base-8': true,
                  'au-theme-font-color--base-3': true,
                  'au-theme-hover-background-color--base-10': curPage != _pageCount(),
                  'au-theme-hover-font-color--primary-3': curPage != _pageCount(),
                  'au-theme-background-color--primary-5': curPage == _pageCount(),
                  'au-theme-font-color--primary-3-important': curPage == _pageCount()}" attr="pageCount"  @click="page(_pageCount())" v-if="_pageCount() > 10">{{_pageCount()}}</li>
     <li :class="{disabled: curPage >= _pageCount(),
                  'au-theme-border-color--base-8': true,
                  'au-theme-font-color--base-3': true,
                  'au-theme-hover-background-color--base-10': curPage < _pageCount(),
                  'au-theme-hover-font-color--primary-3': curPage < _pageCount(),
                  'au-theme-background-color--base-9': curPage >= _pageCount(),
                  'au-theme-font-color--base-6': curPage >= _pageCount()}" @click="nextPage" v-if="_pageCount() >=0"><au-icon type="angle-right" size="16px"></au-icon></li>
     </ul>
  </div>
</template>
<script>
  // Author: Bearhotel
  // email: lilijing@rongcapital.cn
  // github:
  // blog:

  // Modifier: Awey
  // email: chenwei@rongcapital.cn
  // github: https://github.com/BboyAwey
  // blog: http://www.jianshu.com/u/3c8fe1455914

  export default {
    name: 'au-paginator',
    props: {
      total: {
        type: Number,
        default: 0
      },
      current: {
        type: Number,
        default: 1
      },
      size: {
        type: Number,
        default: 10
      }
    },
    data () {
      return {
        // _newMiddleLimit: 0,
        middleLimit: 6,
        showPageNum: 10,
        curPage: 1,
        totalC: 0,
        pageS: 10
      }
    },
    created () {
      var pc = 1
      if (this.total > 0 && this.size > 0) {
        pc = Math.ceil(this.total / this.size)
      }
      if (pc < this.current) {
        this.curPage = pc
      } else {
        this.curPage = this.current
      }
      this.totalC = this.total
      this.pageS = this.size
    },
    computed: {
      _newMiddleLimit () {
        // console.log('_newMiddleLimit', this.curPage + 3)
        return this.curPage + 3
      }
    },
    watch: {
      total (val) {
        this.totalC = val > 0 ? val : 0
      },
      current (val) {
        this.curPage = val > this.totalC ? this.totalC || 1 : val
      },
      size (val) {
        this.pageS = val
        this._currentPage = val > this.totalC ? this.totalC || 1 : val
      }
    },
    methods: {
      _offset () {
        var v = this.curPage + 3 - this.middleLimit
        var r = 1
        if (v > 1 && this._pageCount() - v <= this.middleLimit) {
          r = this._pageCount() - this.middleLimit
        } else if (v > 1 && this._pageCount() - v > this.middleLimit) {
          r = v
        }
        return r
      },
      _limit () {
        var c = 0
        if (this._newMiddleLimit <= this.middleLimit) {
          c = this.middleLimit
        } else if (this._newMiddleLimit > this._pageCount() - 1) {
          c = this._pageCount() - 1
        } else {
          c = this._newMiddleLimit
        }
        return c
      },
      _cPage (p) {
        // console.log('this._offset()', this._offset())
        return p + this._offset()
      },
      _pageCount () {
        return Math.ceil(this.total / this.size)
      },
      page (indexPage) {
        this.$emit('toggle', indexPage)
        this.curPage = indexPage
      },
      nextPage () {
        if (this.curPage < this.totalC / this.pageS) {
          this.page(this.curPage + 1)
        }
      },
      prevPage () {
        if (this.curPage > 1) {
          this.page(this.curPage - 1)
        }
      }

    }
  }
</script>
