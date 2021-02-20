<template>
  <v-container @paste="pasteImage">
    <v-card>
      <v-card-text>
        <v-text-field v-model="range.start" step="10" thumb-label ticks
          >start</v-text-field
        >
        <v-text-field v-model="range.end" step="10" thumb-label ticks
          >end</v-text-field
        >
      </v-card-text>
      <v-btn @click="draw()">draw</v-btn>
      <v-btn @click="process()">process</v-btn>
    </v-card>
    <v-row>
      <v-col cols="12" md="6" lg="6" xl="6">
        original image
        <canvas width="500" height="1000" ref="originalCanvas"></canvas
      ></v-col>
      <v-col cols="12" md="6" lg="6" xl="6">
        processed image
        <canvas width="500" height="1000" ref="processedCanvas"></canvas>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "DrawingCanvas",

  data: () => ({
    range: {
      start: 50,
      end: 100,
    },
    src: "",
  }),
  watch: {
    range() {},
  },
  methods: {
    // 描画
    draw() {
      console.log("draw original image");
      var originalImage = new Image();
      originalImage.src = this.src;

      // 画像サイズ取得
      var imageWidth = originalImage.width;
      var imageHeight = originalImage.height;

      // 消去
      this.clearCanvas(this.originalCanvas);
      // 元イメージ描画
      this.originalContext.drawImage(
        originalImage,
        0,
        0,
        imageWidth,
        imageHeight,
        0,
        0,
        500,
        (imageHeight * 500) / imageWidth
      );
      console.log("draw processed image");
      var processedImage = new Image();
      processedImage.src = this.src;
      // 画像サイズ取得
      var processedImageWidth = processedImage.width;
      var processedImageHeight = processedImage.height;
      // var imageAspectRatio = imageHeight / imageWidth;
      // ↑のイメージ

      // 消去

      this.clearCanvas(this.processedCanvas);
      // 元イメージ描画
      this.processedContext.drawImage(
        processedImage,
        0,
        0,
        processedImageWidth,
        processedImageHeight,
        0,
        0,
        500,
        (processedImageHeight * 500) / processedImageWidth
      );
    },
    /**
     * canvas の全消去
     */
    clearCanvas: function (canvas) {
      var context = canvas.getContext("2d");
      context.clearRect(0, 0, canvas.width, canvas.height);
      console.log(
        "clear canvas width: ",
        canvas.width,
        " canvas.height: ",
        canvas.height
      );
    },
    process: function () {
      console.log("process");
      // キャンバスを初期化
      this.clearCanvas(this.processedCanvas);
      var processedImage = new Image();
      processedImage.src = this.src;
      // 画像サイズ取得
      var processedImageWidth = processedImage.width;
      var processedImageHeight = processedImage.height;

      // 大小順番比較
      if (this.range.start > this.range.end) {
        var tmpStart = this.range.start;
        var tmpEnd = this.range.end;
        this.range.start = tmpEnd;
        this.range.end = tmpStart;
      }

      // 上部分を描画
      this.processedContext.drawImage(
        processedImage,
        0,
        0,
        processedImageWidth,
        this.range.start,
        0,
        0,
        500,
        (this.range.start * 500) / processedImageWidth
      );
      // 下部分を描画
      this.processedContext.drawImage(
        processedImage,
        0,
        this.range.end,
        processedImageWidth,
        processedImageHeight - this.range.end,
        0,
        (this.range.start * 500) / processedImageWidth,
        500,
        ((processedImageHeight - this.range.end) * 500) / processedImageWidth
      );
      // 間部分を描画;
      this.processedContext.beginPath();
      this.processedContext.moveTo(
        0,
        (this.range.start * 500) / processedImageWidth - 5
      );
      for (var i = 0; i < 10; i++) {
        var waveHeight1 = i % 2 == 0 ? 10 * 1 : 10 * -1;

        // sin カーブ描画
        this.processedContext.quadraticCurveTo(
          25 + i * 50,
          (this.range.start * 500) / processedImageWidth + waveHeight1 - 5,
          (i + 1) * 50,
          (this.range.start * 500) / processedImageWidth - 5
        );
      }
      this.processedContext.lineTo(
        500,
        (this.range.start * 500) / processedImageWidth + 5
      );
      for (var j = 10; j > 0; j--) {
        var waveHeight2 = j % 2 == 0 ? 10 * -1 : 10 * 1;

        // sin カーブ描画
        this.processedContext.quadraticCurveTo(
          25 + (j - 1) * 50,
          (this.range.start * 500) / processedImageWidth + waveHeight2 + 5,
          (j - 1) * 50,
          (this.range.start * 500) / processedImageWidth + 5
        );
      }
      this.processedContext.lineTo(
        0,
        (this.range.start * 500) / processedImageWidth
      );

      this.processedContext.fillStyle = "rgb(255,255,255)";
      this.processedContext.fill();
      this.processedContext.strokeStyle = "gray";
      this.processedContext.stroke();
    },
    // download: function () {
    //   // canvas を画像データにする
    //   console.log("called download");
    //   const base64 = this.processedCanvas.toDataURL("image/png");
    //   const tmp = base64.split(","); // ["data:image/png;base64,", "iVBORw0k～"]
    //   const data = atob(tmp[1]); // 右側のデータ部分(iVBORw0k～)をデコード
    //   const mime = tmp[0].split(":")[1].split(";")[0]; // 画像形式(image/png)を取り出す
    //   // Blobのコンストラクタに食わせる値を作成
    //   let buff = new Uint8Array(data.length);
    //   for (let i = 0; i < data.length; i++) {
    //     buff[i] = data.charCodeAt(i);
    //   }
    //   var blob = new Blob([buff], { type: mime });
    //   const dataURI = window.URL.createObjectURL(blob); // Blobデータを「URI」に変換
    //   var dlLink = document.getElementById("download");
    //   dlLink.href = dataURI;
    //   dlLink.download = "sample.jpg";
    // },
    // paste
    pasteImage: function (event) {
      console.log("called paste image()");
      event.preventDefault();
      event.stopPropagation();
      let blob = event.clipboardData.items[0].getAsFile();
      console.log(blob);
      let blobUrl = window.URL.createObjectURL(blob);
      // do something with url here
      this.src = blobUrl;
      console.log(blobUrl);
      this.draw();
    },
  },
  mounted() {
    this.originalCanvas = this.$refs.originalCanvas;
    this.originalContext = this.originalCanvas.getContext("2d");
    this.processedCanvas = this.$refs.processedCanvas;
    this.processedContext = this.processedCanvas.getContext("2d");
    // event listener
    window.addEventListener("paste", this.pasteImage());
  },
  destroyed() {
    // event listener
    window.removeEventListener("paste", this.pasteImage());
  },
};
</script>
