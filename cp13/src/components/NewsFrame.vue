<template>
  <div class="container">
  <div>
    <h1>{{ newsTitle }}</h1>
  </div>

  <div class="news">
    <div class="picture">
      <img :src="imgPath" alt="">
    </div>
    <div class="newsText">{{ description }}</div>
  </div>
  </div>
</template>
<script>
export default {
  name: "NewsFrame",
  // data() {
  //   return {
  //     newsTitle: "",
  //     imgPath:"https://storage.googleapis.com/soft3888/123.jpeg",
  //     description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices eros in cursus turpis. Nibh venenatis cras sed felis eget velit aliquet sagittis id. Interdum posuere lorem ipsum dolor sit amet. Tristique senectus et netus et malesuada fames. Odio ut sem nulla pharetra diam sit amet. Netus et malesuada fames ac turpis egestas. Sit amet facilisis magna etiam. Praesent tristique magna sit amet purus. Viverra justo nec ultrices dui sapien eget mi.",
  //   }
  // },
  props: {
    imgPath: String,
    newsTitle: String,
    description: String,
    required: true
  },
}
</script>

<style scoped>
.container {
  /*border: 1px solid grey;*/
  width: 700px;
  /*margin: 0 auto;*/
  padding: 20px;
  text-align: center;
  align-content: center;
  /*border: 1px solid black;*/
}

.news{
  text-align: center;
  /*border: 1px solid grey;*/
  font-size: 15px;
  /*align-content: center;*/
  margin-bottom: 20px;
  /*display:table-cell;*/
  align-items: center;
}

.newsText{
  margin-top: 12px;
  /*display:inline-block;*/
  text-align: left;
}
.picture{
  border: 2px solid grey;
  width: 600px;
  /*margin: 0 auto;*/
  display: inline-block;
  vertical-align: middle;
}

.picture img{
  /*height: 250px;*/
  width: 100%;
  height:100%;
  max-width: 100%;
  max-height: 100%;
  margin: auto;

}
</style>
