<template>
  <div class="wrapper">
    <hr>
    <div class = "surveyTitle">
      <h1>{{Survey_title}}</h1>
    </div>
    <div class="container">
      <div class="ele question">
        <!-- <div class="picWall">
        </div>
        <hr>
        <div class = "shareNumber">
          <h3>{{number_people}} people liked or shared this.</h3>
        </div> -->
<!-- This section are all question buttons like share,like,check. -->
        <div class = "QuestionButtons">
          <div class = "buttoninline" v-for="item in questionbutton" v-bind:item="item" v-bind:index="index" v-bind:key="item.id">
            <div v-if="item.title=='share'">
              <button class="btn-primary btn-lg" v-on:click="share('share')">
                <i class="glyphicon glyphicon-share"></i>  Share
              </button>
            </div>
            <div v-else-if="item.title=='check'">
              <button class="btn-secondary btn-lg" v-on:click="check('check')">
                <i class="glyphicon glyphicon-question-sign"></i>  Check
              </button>
            </div>
            <div v-else-if="item.title=='like'">
              <button class="btn-info btn-lg" v-on:click="like('like')">
                <i class="glyphicon glyphicon-heart"></i> Like
              </button>
            </div>
            <div v-else-if="item.title=='skip'">
              <button class="btn-skip btn-lg" v-on:click="skip('skip')">
                <i class="glyphicon glyphicon-forward"></i> Skip
              </button>
            </div>
            <div v-else>
              <button class="btn-success btn-lg" v-on:click="customise_question(item.title)">
                {{item.title}}
              </button>
            </div>
            
            

          </div>
        </div>
        <hr>
<!-- This section are all social media buttons like linkedin,fb,ins and tw -->
        <div class = "shareNumber">
          <h3>Where do you want to share to?</h3>
        </div>

        <div class = "ShareButtons">
          <div class = "buttoninline" v-for="item in sharebutton" v-bind:item="item" v-bind:index="index" v-bind:key="item.id">
            <div v-if="item.title=='facebook'">
              <button class="btn btn-primary btn-lg" v-on:click="facebook('facebook')">
                <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'facebook' }"/>
                Facebook
              </button>
            </div>
            <div v-else-if="item.title=='instagram'">
              <button class="btn btn-warning btn-lg" v-on:click="instagram('instagram')">
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.1/css/all.css">
                <i class="fab fa-instagram-square share"></i>
                Instagram
              </button>
            </div>
            <div v-else-if="item.title=='linkedin'">
              <button class="btn btn-danger btn-lg" v-on:click="linkedin('linkedin')">
                <i class="fab fa-linkedin"></i>
                Linkedin
              </button>
            </div>
            <div v-else-if="item.title=='twitter'">
              <button class="btn btn-info btn-lg" v-on:click="twitter('twitter')">
                <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'twitter' }"/>
                Twitter
              </button>
            </div>
            <div v-else>
              <button class="btn btn btn-light btn-lg" v-on:click="customise_share(item.title)">
                <i class="glyphicon glyphicon-share"></i>  {{item.title}}
              </button>
            </div>
          </div>
          <br>
        </div>

      </div>

    </div>
  </div>
</template>

<script>

import {getSurvey} from "../../api/getSurvey";
import storage from "../../utils/storage";
export default {
  name: 'ButtonQuestion',
  data () {
    return {
      quantityListing: null,
      bestListing: null,
      host:location.hostname,
      questionbutton:[
          {title:"share"},
          {title:"like"},
          {title:"check"},
          {title:"skip"},
          {title:"randomdesign"}
      ],
      sharebutton:[
          {title:"facebook"},
          {title:"instagram"},
          {title:"linkedin"},
          {title:"twitter"},
          {title:"whatever"},
          {title:"hello"},
          {title:"newsharelink"}
      ]
    }
  },
  methods: {
    initPage() {
      const surveyJSON = getSurvey(this.$route.params.id).then(response=>{
        if (response.status === 200){
          let identifier = this.$route.params.id + new Date().getTime()
          console.log(identifier)
          const hashString = this.$md5(identifier);
          storage.set(this.$route.params.id,hashString);
          console.log(response.data);
        } else {
          alert("Data Error!");
        }}
      ).catch(e => {
        console.log(e);
      })
    },
    share: function (msg) {return(msg)},
    check: function (msg) {return(msg)},
    like: function (msg) {return(msg)},
    skip: function (msg) {return(msg)},
    customise_question: function (msg) {return(msg)},
    instagram: function (msg) {return(msg)},
    facebook: function (msg) {return(msg)},
    linkedin: function (msg) {return(msg)},
    twitter: function (msg) {return(msg)},
    pre: function (msg) {return(msg)},
    next: function (msg) {return(msg)},
    customise_share: function (msg) {return(msg)}
  }
}


</script>

<style scoped>
body {
  background-color: #EFF2F5;
}
.next{
  margin:0;padding:0;
     text-align:justify;
     text-align-last:justify;
     line-height:0;
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
.buttoninline{
  margin: 20px auto;
  margin-right:9px;
  display:inline-block;
}
.checkbutton{
width: 129px;
height: 48px;
left: 610px;
top: 849px;

background: #5DB3EC;
border-radius: 8px;
width: 61px;
height: 25px;
left: 658px;
top: 859px;

/* font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 18px;
line-height: 21px;
display: flex;
align-items: center;
text-align: center; */

color: #FFFFFF;
}
.likebutton{
width: 129px;
height: 48px;
left: 610px;
top: 849px;

background: #5DB3EC;
border-radius: 8px;
width: 61px;
height: 25px;
left: 658px;
top: 859px;

/* font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 18px;
line-height: 21px;
display: flex;
align-items: center;
text-align: center; */
color: #FFFFFF;

}
.sharebutton{
width: 129px;
height: 48px;
left: 610px;
top: 849px;

background: #1947E5;
border-radius: 8px;
width: 61px;
height: 25px;
left: 658px;
top: 859px;

color: #FFFFFF;

}
.btn-custom {
  background-color: #1947E5;
  border-color: #1947E5;
  color: #FFFFFF;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 1px 1px rgba(0, 0, 0, 0.075);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 1px 1px rgba(0, 0, 0, 0.075);
  background-image: -webkit-linear-gradient(top, #3f68f0 0%, #3f68f0 100%);
  background-image: -o-linear-gradient(top, #3f68f0 0%, #3f68f0 100%);
  background-image: linear-gradient(to bottom, #3f68f0 0%, #3f68f0 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff5bc0de', endColorstr='#ff2aabd2', GradientType=0);
  filter: progid:DXImageTransform.Microsoft.gradient(enabled = false);
  background-repeat: repeat-x;
  border-color: #3f68f0;
}
.btn-custom:hover,
.btn-custom:focus{
  background-color: #3f68f0;
  background-position: 0 -15px;
}
.btn-custom:active,
.btn-custom.active {
  -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  /* background-color: #455ca7;
  border-color: #0b1e5c; */
  /* color: #FFFFFF; */
}
.btn-custom.disabled,
.btn-custom[disabled],
fieldset[disabled] .btn-custom,
.btn-custom.disabled:hover,
.btn-custom[disabled]:hover,
fieldset[disabled] .btn-custom:hover,
.btn-custom.disabled:focus,
.btn-custom[disabled]:focus,
fieldset[disabled] .btn-custom:focus,
.btn-custom.disabled.focus,
.btn-custom[disabled].focus,
fieldset[disabled] .btn-custom.focus,
.btn-custom.disabled:active,
.btn-custom[disabled]:active,
fieldset[disabled] .btn-custom:active,
.btn-custom.disabled.active,
.btn-custom[disabled].active,
fieldset[disabled] .btn-custom.active{
  -webkit-box-shadow: none;
  box-shadow: none;
  background-color: #3960e0;
  background-image: none;
}
.btn-skip {
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 1px 1px rgba(0, 0, 0, 0.075);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 1px 1px rgba(0, 0, 0, 0.075);
  background-image: -webkit-linear-gradient(top, #B4CDDE 0%, #B4CDDE 100%);
  background-image: -o-linear-gradient(top, #B4CDDE 0%, #B4CDDE 100%);
  background-image: linear-gradient(to bottom, #B4CDDE 0%, #B4CDDE 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff5bc0de', endColorstr='#ff2aabd2', GradientType=0);
  filter: progid:DXImageTransform.Microsoft.gradient(enabled = false);
  background-repeat: repeat-x;
  border-color: #B4CDDE;
}
.btn-skip:hover,
.btn-skip:focus{
  background-color: #B4CDDE;
  background-position: 0 -15px;
}
.btn-skip:active,
.btn-skip.active {
  -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
}
.btn-skip.disabled,
.btn-skip[disabled],
fieldset[disabled] .btn-skip,
.btn-skip.disabled:hover,
.btn-skip[disabled]:hover,
fieldset[disabled] .btn-skip:hover,
.btn-skip.disabled:focus,
.btn-custom[disabled]:focus,
fieldset[disabled] .btn-skip:focus,
.btn-skip.disabled.focus,
.btn-skip[disabled].focus,
fieldset[disabled] .btn-skip.focus,
.btn-skip.disabled:active,
.btn-skip[disabled]:active,
fieldset[disabled] .btn-skip:active,
.btn-skip.disabled.active,
.btn-skip[disabled].active,
fieldset[disabled] .btn-skip.active{
  -webkit-box-shadow: none;
  box-shadow: none;
  background-color: #a7bfcf;
  background-image: none;
}


.btn-next {
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 1px 1px rgba(0, 0, 0, 0.075);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 1px 1px rgba(0, 0, 0, 0.075);
  background-image: -webkit-linear-gradient(top, #E44E33 0%, #E44E33 100%);
  background-image: -o-linear-gradient(top, #E44E33 0%, #E44E33 100%);
  background-image: linear-gradient(to bottom, #E44E33 0%, #E44E33 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#E44E33', endColorstr='#ff2aabd2', GradientType=0);
  filter: progid:DXImageTransform.Microsoft.gradient(enabled = false);
  background-repeat: repeat-x;
  border-color: #E44E33;
}
.btn-next:hover,
.btn-next:focus{
  background-color: #E44E33;
  background-position: 0 -15px;
}
.btn-next:active,
.btn-next.active {
  -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
}
.btn-next.disabled,
.btn-next[disabled],
fieldset[disabled] .btn-next,
.btn-next.disabled:hover,
.btn-next[disabled]:hover,
fieldset[disabled] .btn-next:hover,
.btn-next.disabled:focus,
.btn-custom[disabled]:focus,
fieldset[disabled] .btn-next:focus,
.btn-next.disabled.focus,
.btn-next[disabled].focus,
fieldset[disabled] .btn-next.focus,
.btn-next.disabled:active,
.btn-next[disabled]:active,
fieldset[disabled] .btn-next:active,
.btn-next.disabled.active,
.btn-skip[disabled].active,
fieldset[disabled] .btn-next.active{
  -webkit-box-shadow: none;
  box-shadow: none;
  background-color: #b94733;
  background-image: none;
}
</style>
