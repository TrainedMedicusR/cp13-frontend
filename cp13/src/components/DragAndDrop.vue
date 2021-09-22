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

      <div v-for = 'panel in panels' :key='panel.id' class='drop-zone'
           @drop = 'onDrop($event,panel.id)'
           @dragenter.prevent
           @dragover.prevent>
        <hr>
        <h5>{{panel.info}}</h5>
        <div v-for='item in panelListItem(panel.id)' :key='item.title' class='drag-el' draggable="true"
             @dragstart = 'startDrag($event,item)'
        >
          {{ item.title }}
        </div>
      </div>

      <div class="next">
        <button class="btn-next btn-sm" v-on:click="share('share')">
          <i class="glyphicon glyphicon-arrow-left"></i> Prev Question
        </button>
        <button class="btn-next btn-sm" v-on:click="share('share')">
          Next Question <i class="glyphicon glyphicon-arrow-right"></i>
        </button>
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

      panels: [
        {
          info: "Waiting for classification",
          id: 0
        },
        {
          info: "This is class 1",
          id: 1
        },
        {
          info: "This is class 2",
          id: 2
        }
      ],
      items: [
        {
          id: 0,
          title: 'Item A',
          list: 0
        },
        {
          id: 1,
          title: 'Item B',
          list: 0

        },

        {
          id: 2,
          title: 'Item C',
          list: 0
        }]
    }
  },
  mounted() {

    this.initPage()
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
    },

    panelListItem: function (value) {
      return this.items.filter(item => item.list === value)
    }
  }

}
</script>

<style scoped>

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
  .next {
    text-align: center;
  }
</style>
