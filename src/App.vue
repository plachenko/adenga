<template>
  <div id="app">
    <div id="agendaCont">

      <div id="agendaStart" class="box">
      </div>

      <div class="box" id="agendaHeader">
        <h2>{{time}}</h2>
        <form @submit.prevent="setStart">
          <span>started:</span> <input type="time" v-model="startTime">
        </form>
      </div>

      <div class="box" id="agendaInput">
        <form @submit.prevent="addItem">
          <input v-model="itemInp.title" type="text" placeholder="title">
          <input v-model="itemInp.time" type="number" min="0" step="1" placeholder="time">
          <input type="submit" />
        </form>
      </div>

      <div class="box" id="agendaBody">
        <!-- item widget -->
        <div class="agendaItem" @click="current = idx" :class="{'current': idx == current}" v-for="(item, idx) in itemsRev" :key="idx">
          <span>{{item.title}}</span>
          <span>{{item.time}}</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import moment from 'moment';

@Component({
  components: {}
})
export default class App extends Vue {
  private itemInp = {
    title: '',
    time: 0
  }
  private items: any = [];
  private current = 20;
  private timer = new Date();
  private tick: any = null;
  private timeObj = {
    start: new Date(),
    end: new Date()
  };

  get itemsRev(){
    return this.items.slice().reverse();
  }

  get time(){
    return moment(this.timer).format('hh:mm:ss A');
  }

  get endTime(){
    return moment(this.timeObj.end).format('HH:mm')
  }

  get startTime(){
    return moment(this.timeObj.start).format('HH:mm')
  }

  mounted(){
    this.tick = setInterval(() => this.timeTick(), 1000);
  }

  public timeTick(){
    this.timer = new Date();
  }

  public addItem(){
    // this.itemInp.time = 

    const _item: any = Object.assign({}, this.itemInp);

    for(let i = 0; i <= 40; i++){
      this.items.push(_item);
    }
  }

  public remItem(){
    console.log('removing');
  }
}
</script>

<style>
html, body{
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 0px;
  }
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  width: 100%;
  overflow: hidden;
  }
  #agendaStart{
    border-bottom: 1px solid;
    min-height: 30px;
    max-height: 30px;
    }

  #agendaCont{
    height: 100%;
    width: 100%;
    display: flex;
    flex-flow: column;
    }
    #agendaCont .box{
      flex: 1;
      border-bottom: 1px solid;
      }
    #agendaHeader{
      text-align: center;
      max-height: 100px;
      }

    #agendaInput{
      min-height: 90px;
      max-height: 90px;
      border-bottom: 1px solid;
      }
      #agendaInput form{
        height:100%;
        }

    #agendaBody{
      overflow-y: scroll;
      }
      #agendaBody .agendaItem{
        border-bottom: 1px solid;
        padding: 10px;
        min-height: 20px;
        }
      #agendaBody .current{
        position: sticky;
        bottom: 0px;
        background-color:#F00;
      }
</style>
