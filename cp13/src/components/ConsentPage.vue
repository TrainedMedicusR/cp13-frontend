<template>
  <div class="container">
    <header class = 'consent'>
      {{isExpanded ? content : capitalize(content)}}
      <button>
          <span @click = "expandClick" class = "expand">
            {{isExpanded ? "show less": "show more"}}
          </span>
      </button>
    </header>
    <hr>
    <button class='agreeButton' @onclick="agreeConsent"
            @mousehover="hover=true"
            @mouseleave="hover=false">I agree</button>
  </div>
</template>

<script>

export default {
  name: "ConsentPage",

  props:{
    consent:Boolean
  },

  data(){
    return{
      isExpanded:true,
      content:"This is consent page!"
    }
  },

  mounted(){
    this.initPage();
  },

  methods:{
    initPage() {

    },
    expandClick(){
      this.isExpanded = !this.isExpanded;
    },

    capitalize: function(value){
      if(!value) return 'NO!'
      value = value.toString();
      if(value.length >500){
        return value.substr(0,10)
      }else{
        return value
      }
    },

    agreeConsent(){
      this.$emit('checkConsent',!this.consent);
    }
  }

}
</script>

<style scoped>
.consent{
  font-family: Arial,serif;
  font-size: 20px;
  width: 100%;
  background-color: white;
  text-align: center;
}
.expand{
  color: cornflowerblue;
}
.container{
  display: contents;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.agreeButton{
  position: absolute;
  left: 50%;
  transform: translate(-50%,-50%);
}

.agreeButton:hover{
  background: #337ab7;
}
</style>
