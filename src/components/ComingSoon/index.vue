<template>
  <div class="movie_body">
    <Loading v-if="isLoading" />
    <Scroller v-else :handleToTouchEnd="handleToTouchEnd">
      <ul>
        <li v-for="(item, index) in comingList" :key="index">
          <div class="pic_show" @click="handleToDetail(item.filmId)">
            <img :src="item.poster" />
          </div>
          <div class="info_list">
            <h2 @click="handleToDetail(item.filmId)">{{ item.name }}</h2>
            <!-- <p><span class="person">17746</span> 人想看</p> -->
            <p>主演: {{ item.director }}</p>
            <p>{{ item.premiereAt | timestampToTime }}上映</p>
          </div>
          <div class="btn_pre">预售</div>
        </li>
      </ul>
    </Scroller>
  </div>
</template>
<script>
export default {
  name: "coMingSoon",
  data() {
    return {
      comingList: [],
      isLoading: true,
      prevCityId: -1,
    };
  },
  activated() {
    var cityId = this.$store.state.city.id;
    if (this.prevCityId === cityId) {
      return;
    }
    this.isLoading = true;
    this.axios({
      url: `https://m.maizuo.com/gateway?cityId=${cityId}&pageNum=1&pageSize=10&type=2&k=3029342`,
      headers: {
        "X-Client-Info":
          '{"a":"3000","ch":"1002","v":"5.0.4","e":"1620796061118386478546945","bc":"210300"}',
        "X-Host": "mall.film-ticket.film.list",
      },
    }).then((res) => {
      var msg = res.data.msg;
      if (msg === "ok") {
        this.comingList = res.data.data.films;
        this.isLoading = false;
        this.prevCityId = cityId;
      }
    });
  },
  methods: {
    handleToDetail(movieId) {
      this.$router.push("/movie/detail/2/" + movieId);
    },
    handleToTouchEnd() {},
  },
};
</script>

<style>
#content .movie_body {
  flex: 1;
  overflow: auto;
}
.movie_body ul {
  margin: 0 12px;
  overflow: hidden;
}
.movie_body ul li {
  margin-top: 12px;
  display: flex;
  align-items: center;
  border-bottom: 1px #e6e6e6 solid;
  padding-bottom: 10px;
}
.movie_body .pic_show {
  width: 64px;
  height: 90px;
}
.movie_body .pic_show img {
  width: 100%;
}
.movie_body .info_list {
  margin-left: 10px;
  flex: 1;
  position: relative;
}
.movie_body .info_list h2 {
  font-size: 17px;
  line-height: 24px;
  width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.movie_body .info_list p {
  font-size: 13px;
  color: #666;
  line-height: 22px;
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.movie_body .info_list .grade {
  font-weight: 700;
  color: #faaf00;
  font-size: 15px;
}
.movie_body .info_list img {
  width: 50px;
  position: absolute;
  right: 10px;
  top: 5px;
}
.movie_body .btn_mall,
.movie_body .btn_pre {
  width: 47px;
  height: 27px;
  line-height: 28px;
  text-align: center;
  background-color: #f03d37;
  color: #fff;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}
.movie_body .btn_pre {
  background-color: #3c9fe6;
}
</style>