<template>
  <div class="hello">
    <h2>{{ msg }}</h2>
    <p>グレー背景の個所に、画像をペーストしてください。</p>
    <p>［DRAW］ボタンで画像を表示します。</p>
    <p>［DPROCESS］ボタンで加工します。</p>
    <p>右クリック「名前を付けて画像を保存」でダウンロードできます。</p>
  </div>
</template>

<script>
export default {
  name: "Description",
  props: {
    msg: String,
  },
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
