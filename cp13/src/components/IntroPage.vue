<template>
  <div class="container">
    <header class = 'header'>
      {{header}}
    </header>
    <dev class = 'intro'>
      {{introText}}
    </dev>
    <hr>
    <button class='nextButton' v-on:click="moveToNext"
            @mousehover="hover=true"
            @mouseleave="hover=false">Next</button>
  </div>

</template>

<script>

import {getSurvey} from "../api/getSurvey";
import {storage} from "../utils/storage";

export default {
  name: "IntroPage",


  data(){
    return{
      header:"Introduction",
      introText:"",
      isExpanded:true,
    }
  },

  mounted(){
    this.initPage();
  },

  methods: {
    initPage() {
      const resJSON = getSurvey(this.$route.params.id).then(response => {
        if (response.status === 200) {
          let identifier = this.$route.params.id + new Date().getTime();
          const hashString = this.$md5(identifier);
          this.hashString = hashString;
          storage.set(this.$route.params.id, hashString);
          const jsonString = response.data;
          this.introText = jsonString.introText;
        }
      })

    },
    moveToNext(){}
  }
}
</script>

<style scoped>


.container{
  display: contents;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 800px;
  margin: 0 auto;
  padding: 20px;
}


.header{
  font-family: Arial,serif;
  width: 100%;
  font-size: 30px;
  text-align: center;
  color: #005cbf;
  padding: 20px;
  background-color: #fff;
}

.intro{
  font-family: Arial,serif;
  width: 100%;
  font-size: 20px;
  text-align: center;
  color: #000000;
  padding: 20px;
  background-color: #fff;
}


.nextButton{
  position: absolute;
  left: 80%;
  transform: translate(-50%,-50%);
}

.nextButton:hover{
  background: #337ab7;
}
</style>
