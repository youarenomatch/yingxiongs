<template>
  <div>
    <div class="topbar bg-black py-2 px-3 d-flex ai-center">
      <img src="//game.gtimg.cn/images/lol/v3/logo-public.png" height="30">
      <div class="px-2 flex-1">
        
      </div>
      <button type="button" class="btn bg-primary">立即下载</button>
    </div>
    <div class="bg-primary pt-3 pb-2">
      <div class="nav nav-inverse pb-1 jc-around">
        <div class="nav-item " :class="{active: isActive === 1}" @click="changeClass(1)">
          <router-link class="nav-link" tag="div" to="/">首页</router-link>
        </div>
        <div class="nav-item" :class="{active: isActive === 2}" @click="changeClass(2)">
          <router-link class="nav-link" tag="div" to="/stratey">攻略中心</router-link>
        </div>
        <div class="nav-item" :class="{active: isActive === 3}" @click="changeClass(3)">
          <router-link class="nav-link" tag="div" to="/saishi">赛事中心</router-link>
        </div>
        
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data(){
    return{
      isActive: 1
    }
  },
  methods: {
  changeClass(i) {
    this.isActive = i;
  }
}
}
</script>

<style lang="scss">
.topbar {
  position: sticky;
  top: 0;
  z-index: 999;
}
</style>
