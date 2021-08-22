<template>
  <div id="detailContrainer" class="slide-enter-active">
    <Header title="影片详情">
      <i class="iconfont icon-right" @touchstart="handleToBack"></i>
    </Header>
    <Loading v-if="isLoading" />

    <div v-else id="content" class="contentDetail">
      <div class="detail_list">
        <div
          class="detail_list_bg"
          :style="{ 'background-image': 'url(' + detailMovie.poster + ')' }"
        ></div>
        <div class="detail_list_filter"></div>
        <div class="detail_list_content">
          <div class="detail_list_img">
            <img :src="detailMovie.poster" alt="" />
          </div>
          <div class="detail_list_info">
            <h2>{{ detailMovie.name }}</h2>
            <!-- <p>A Cool Fish</p> -->
            <p>{{ detailMovie.grade }}</p>
            <p>剧情,喜剧,犯罪</p>
            <p>{{ detailMovie.nation }}</p>
            <p>{{ detailMovie.premiereAt | timestampToTime }}上映</p>
          </div>
        </div>
      </div>
      <div class="detail_intro">
        <p>
          {{ detailMovie.synopsis }}
        </p>
      </div>
      <div class="detail_player swiper-container" ref="detail_player">
        <ul class="swiper-wrapper">
          <li
            class="swiper-slide"
            v-for="(item, index) in detailMovie.actors"
            :key="index"
          >
            <div>
              <img :src="item.avatarAddress" alt="" />
            </div>
            <p>{{ item.name }}</p>
            <p>{{ item.role }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header";
export default {
  name: "detail",
  components: {
    Header,
  },
  props: ["movieId"],
  data() {
    return {
      detailMovie: {},
      isLoading: true,
    };
  },
  mounted() {
    this.axios({
      url: `https://m.maizuo.com/gateway?filmId=${this.movieId}&k=9411059`,
      headers: {
        "X-Client-Info":
          '{"a":"3000","ch":"1002","v":"5.0.4","e":"1620796061118386478546945"}',
        "X-Host": "mall.film-ticket.film.info",
      },
    }).then((res) => {
      var msg = res.data.msg;
      if (msg === "ok") {
        this.detailMovie = res.data.data.film;
        this.isLoading = false;
        this.$nextTick(() => {
          new Swiper(this.$refs.detail_player, {
            slidesPerView: "auto",
            freeMode: true,
            freeModeSticky: true,
          });
        });
      }
    });
  },
  methods: {
    handleToBack() {
      this.$router.back();
    },
  },
};
</script>
<style scoped>
#detailContrainer {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 100;
  width: 100%;
  min-height: 100%;
  background: white;
}
#detailContrainer.slide-enter-active {
  animation: 0.5s slideMove;
}
@keyframes slideMove {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0%);
  }
}
#content.contentDetail {
  display: block;
  margin-bottom: 0;
}
#content .detail_list {
  height: 200px;
  width: 100%;
  position: relative;
  overflow: hidden;
}
.detail_list .detail_list_bg {
  width: 100%;
  height: 100%;
  /* background: url(../images/movie_1.jpg) 0 40%; */
  filter: blur(20px);
  background-size: cover;
  position: absolute;
  left: 0;
  top: 0;
}
.detail_list .detail_list_filter {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #40454d;
  opacity: 0.55;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
}
.detail_list .detail_list_content {
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
}
.detail_list .detail_list_img {
  width: 108px;
  height: 150px;
  border: solid 1px #f0f2f3;
  margin: 20px;
}
.detail_list .detail_list_img img {
  width: 100%;
  height: 100%;
}
.detail_list .detail_list_info {
  margin-top: 20px;
}
.detail_list .detail_list_info h2 {
  font-size: 20px;
  color: white;
  font-weight: normal;
  line-height: 40px;
}
.detail_list .detail_list_info p {
  color: white;
  line-height: 20px;
  font-size: 14px;
  color: #ccc;
}

#content .detail_intro {
  padding: 10px;
}
#content .detail_player {
  margin: 20px;
}
.detail_player .swiper-slide {
  width: 70px;
  margin-right: 20px;
  text-align: center;
  font-size: 14px;
}
.detail_player .swiper-slide img {
  width: 100%;
  margin-bottom: 5px;
}
.detail_player .swiper-slide p:nth-of-type(2) {
  color: #999;
}
</style>