<template>
<div class="wrapper">
    <hr>
    <div class = "drop">
          <dropdown class="my-dropdown-toggle"
          :options="arrayOfObjects"
          :selected="object"
          v-on:updateOption="methodToRunOnSelect"
          :placeholder="'Select an Item'"
          :closeOnOutsideClick="boolean">
        </dropdown>
        </div>
    <div class = "surveyTitle">
      <h1>Survey title</h1>
    </div>
    <div class="container">
      <div class="ele question">
        <div class="picWall">
        </div>
        <hr>
        <div class = "shareNumber">
          <h3>2500 people liked or shared this.</h3>
        </div>

        <div class = "surveyButtons">
          <button class="shareButtons">share</button>
          <button class="checkButtons">check</button>
          <button class="likeButtons">like</button>
          <button class="skipButtons">skip</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import dropdown from 'vue-dropdowns';
import {getSurvey} from "../../api/getSurvey";
import storage from "../../utils/storage";
export default {
  name: 'SurveyMain',
  data () {
    return {
      quantityListing: null,
      bestListing: null,
      host:location.hostname,
      arrayOfObjects: [{
            name: 'Chinese',
        },{
            name: 'English',
        },{
            name: 'Arabic',
        }],
        object: {
            name: 'Languages',
        },
    }
  },
   components: {
            'dropdown': dropdown,
    },
  methods: {
    initPage() {
      const surveyJSON = getSurvey(this.$route.params.id).then(response=>{
        if (response.status === 200){
          let identifier = this.$route.params.id + new Date().getTime()
          const hashString = this.$md5(identifier);
          storage.set(this.$route.params.id,hashString);
        } else {
          alert("Data Error!");
        }}
      ).catch(e => {
        console.log(e);
      })
    },
    methodToRunOnSelect(payload) {
          this.object = payload;
          alert('Hello ' + payload.name + '!')
    }
  }
}


</script>

<style scoped>
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

.drop{
    width: 80%;
    height: 230px;
    text-align: left;
}

.my-dropdown-toggle {
  border-radius: 5px;

  }::v-deep .dropdown-toggle {
    color: tomato;
    font-size: 25px;
    font-weight: 800;
  }

  ::v-deep .dropdown-toggle-placeholder {
    color: tomato;
  }
</style>
