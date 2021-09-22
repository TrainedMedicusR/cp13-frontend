<template>
  <div class="wrapper">
    <hr>
    <div class = "surveyTitle">
      <h1>{{surveyTitle}}</h1>
    </div>

    <div class="container">
      <div class="ele question">
        <div class="title">Title</div>
        <div class="picWall">
        </div>
        <hr>
        <div class = "shareNumber">
          <h3>2500 people liked or shared this.</h3>
        </div>
        <div class = "surveyButtons">
          <button class="shareButtons">share</button>
          <button class="checkButtons" @click="submit">check</button>
          <button class="likeButtons">like</button>
          <button class="skipButtons">skip</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {getSurvey} from "../api/getSurvey";
// import {postSurvey} from "../api/postSurvey";
import storage from "../utils/storage";

export default {
  name: 'SurveyMain',
  data () {
    return {
      surveyTitle:null,
      quantityListing: null,
      bestListing: null,
      host:location.hostname,
    }
  },
  mounted(){
    this.initPage();
  },
  methods: {
    initPage() {
      const resJSON = getSurvey(this.$route.params.id).then(response=>{
        if (response.status === 200){
          let identifier = this.$route.params.id + new Date().getTime()
          const hashString = this.$md5(identifier);
          storage.set(this.$route.params.id,hashString);
          const jsonString = response.data
          console.log(jsonString);
          this.surveyTitle = jsonString.name;

        } else {
          alert("Data Error!");
        }}
      ).catch(e => {
        console.log(e);
      })
    },
    submit() {
      const resJSON = postSurvey()
    }
  }
}


</script>

<style scoped>
@import "../assets/bootstrap.css";

body {
  background-color: #EFF2F5;
}

.surveyTitle {
  text-align: center;
}

.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.wrapper{
  width: 1280px;
  max-width: 100%;
  overflow: hidden;
  margin: 0 auto;
  padding: 40px;
}

.ele {
  width: 40%;
  height: 400px;
}

.ele:nth-child(3n+1) {
  width: 100%;
}



.question{
  width: 60%;
  background-color: white;
  text-align: center;
}


.picWall{
  width: 80%;
  height: 230px;
  border: 4px solid;
  /*border-image: linear-gradient(45deg, turquoise, greenyellow) 1;*/
  margin: 20px auto;
  overflow: hidden;
  text-align: left;
}
</style>
