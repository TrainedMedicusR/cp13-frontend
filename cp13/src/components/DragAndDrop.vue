<template>
  <div>
    <div class = 'container'>
      <div class = 'qid'>This is question {{id}} !</div>
      <div class = 'question'>
          {{isExpanded ? msg : capitalize(msg)}}
        <button>
          <span @click = "expandClick" class = "expand">
            {{isExpanded ? "show less": "show more"}}
          </span>
        </button>
      </div>
      <hr>
      <h5>Waiting for classification</h5>
      <hr>
      <div class='drop-zone'
           @drop = 'onDrop($event,1)'
           @dragenter.prevent
           @dragover.prevent
      >
        <div v-for='item in listOne' :key='item.title' class='drag-el' draggable = "true"
             @dragstart = 'startDrag($event,item)'
        >
          {{ item.title }}
        </div>

      </div>
      <hr>
      <h5>This is class 1</h5>
      <hr>
      <div class='drop-zone'
           @drop = 'onDrop($event,2)'
           @dragenter.prevent
           @dragover.prevent
      >
        <div v-for='item in listTwo' :key='item.title' class='drag-el' draggable="true"
             @dragstart = 'startDrag($event,item)'
        >
          {{ item.title }}
        </div>
      </div>
      <hr>
      <h5>This is class 2</h5>
      <hr>
      <div class='drop-zone'
           @drop = 'onDrop($event,3)'
           @dragenter.prevent
           @dragover.prevent
      >
        <div v-for='item in listThree' :key='item.title' class='drag-el' draggable="true"
             @dragstart = 'startDrag($event,item)'
        >
          {{ item.title }}
        </div>
      </div>
    </div>
  </div>
</template>


<script>

import {getSurvey} from "../api/getSurvey";
import storage from "../utils/storage";

export default {
  name: "DragAndDrop",
  data () {
    return {
      id:100,
      isExpanded:false,
      msg:"dcfvgbhnjrcvcrxcdtfvgybgyvtrctfvgtbynuj",
      items: [
        {
          id: 0,
          title: 'Item A',
          list: 1
        },
        {
          id: 1,
          title: 'Item B',
          list: 1

        },

        {
          id: 2,
          title: 'Item C',
          list: 1
        }]
    }
  },
  mounted() {

    this.initPage()
  },

  computed: {
    listOne () {
      return this.items.filter(item => item.list === 1)
    },
    listTwo () {
      return this.items.filter(item => item.list === 2)
    },
    listThree () {
      return this.items.filter(item => item.list === 3)
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
    expandClick(){
      this.isExpanded = !this.isExpanded
    },

    capitalize: function(value){
      if(!value) return 'NO!'
      value = value.toString();
      if(value.length >10){
        return value.substr(0,10)
      }else{
        return value
      }
    },

    startDrag: (evt, item) => {
      evt.dataTransfer.dropEffect = 'move'
      evt.dataTransfer.effectAllowed = 'move'
      evt.dataTransfer.setData('itemID', item.id)
    },

    onDrop (evt, list) {
      const itemID = evt.dataTransfer.getData('itemID')
      const item = this.items.find(item => item.id == itemID)
      item.list = list
    }
  }

}
</script>

<style scoped>
  /*.container {*/
  /*  display: flex;*/
  /*  flex-wrap: wrap;*/
  /*  justify-content: space-between;*/
  /*  width: 800px;*/
  /*  margin: 0 auto;*/
  /*  padding: 20px;*/
  /*}*/
  .qid{
    font-family: Times New Roman,serif;
    font-size: 30px;
    width: 100%;
    background-color: white;
    text-align: center;
  }
  .question{
    font-family: Arial,serif;
    font-size: 20px;
    width: 100%;
    background-color: white;
    text-align: center;
  }
  .expand{
    color: cornflowerblue;
  }
  .drop-zone {
    background-color: #eee;
    margin-bottom: 10px;
    padding: 10px;
  }
  .drag-el {
    background-color: #fff;
    margin-bottom: 10px;
    padding: 5px;
  }
</style>
