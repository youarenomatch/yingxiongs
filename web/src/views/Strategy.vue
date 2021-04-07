<template>
    <div>
        <swiper :options="swiperOption">
      <swiper-slide>
        <img class="w-100" src="//ossweb-img.qq.com/upload/adw/image/977/20210324/cce8563c74b935d48dcae8f5f9bf5be1.jpeg" alt>
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="//ossweb-img.qq.com/upload/adw/image/977/20210319/e5fc35fc08a4dbffab2fda29c633fb7f.jpeg" alt>
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="//ossweb-img.qq.com/upload/adw/image/977/20210327/eedeffb034bc53e267bdbb427edb86e0.jpeg" alt>
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3 pb-1" slot="pagination"></div>
    </swiper>


     <m-list-card icon="card-hero" title="装备列表" >
      <template>
        <div class="d-flex flex-wrap" style="margin: 0 -0.5rem;">
          <router-link
          tag="div"
          class="p-2 text-center"
          style="width: 20%;" 
         >
            <img  class="w-100">
            <div></div>
          </router-link>
        </div>
      </template>
    </m-list-card>
    </div>
</template>

<script>
export default {
    name:'stratey',
    data(){
        return{
          swiperOption: {
            pagination: {
              el: ".pagination-home"
            }
         },
        }
    }
}
</script>