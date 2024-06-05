class ImageProcessor {
  constructor() {
    this.image = document.getElementById('imgSource');
    this.canvas = document.getElementById('canvasOut');
    this.ctx = this.canvas.getContext('2d');
  }

  loadImage(file) {
    let reader = new FileReader();
    reader.onload = (event) => {
      this.image.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }

  processImage() {
    this.image.onload = () => {
      let mat = cv.imread(this.image);
      this.basicTransformations(mat);
    };
  }

  basicTransformations(mat) {
    // Grayscale
    let grayMat = new cv.Mat();
    cv.cvtColor(mat, grayMat, cv.COLOR_RGBA2GRAY);

    // Gaussian blur
    let blurMat = new cv.Mat();
    let ksize = new cv.Size(5, 5);
    cv.GaussianBlur(grayMat, blurMat, ksize, 0);

    cv.imshow(this.canvas, blurMat);

    mat.delete();
    grayMat.delete();
    blurMat.delete();
  }
}

cv['onRuntimeInitialized'] = () => {
  const imageProcessor = new ImageProcessor();

  document.getElementById('fileInput').addEventListener('change', (event) => {
    let file = event.target.files[0];
    if (file) {
      imageProcessor.loadImage(file);
      imageProcessor.processImage();
    }
  });
};
