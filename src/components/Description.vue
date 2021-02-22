<template>
  <div class="hello">
    <v-card>
      <v-card-title>{{ msg }}<v-spacer></v-spacer><v-btn @click="show = !show">説明</v-btn></v-card-title>
      <v-card-text v-show="show">
        <p>グレー背景に、画像をペーストorドロップしてください。</p>
        <p>省略したい箇所をクリックして画像の一部を省略できます。</p>
        <p>［download］ボタンでダウンロードできます。</p>
        <p>［original］ボタンで加工前の画像を表示できます。</p>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Description",
  props: {
    msg: String,
  },
  data() {
    return {
      show: false
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
