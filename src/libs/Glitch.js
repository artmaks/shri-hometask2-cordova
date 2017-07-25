class Glitch {

    constructor(canvas, context) {
        this._glitchAmount = 3;
        this._brightnessAmount = 7;
        this._canvas = canvas;
        this._context = context;
        this._useScanLines = true;
        this._imageLoaded = false;
        this._glitching = false;
    }

    static getRandInt(min, max) {
        return (Math.floor(Math.random() * (max - min) + min));
    }

    static getRandChannel() {
        var r = Math.random();
        if (r < .33) {
            return BitmapDataChannel.GREEN;
        } else if (r < .66) {
            return BitmapDataChannel.RED;
        } else {
            return BitmapDataChannel.BLUE;
        }
    }

    loadImage(url) {
        this._inputImage = new Image();
        this._inputImage.src = url;
        this._inputImage.onload = this.onImageLoaded.bind(this);
        this._inputImage.onerror = function (error) {
            console.log("Image not found.");
        };
    }

    onImageLoaded() {
        this._imageLoaded = true;

        this._iw = this._inputImage.width;
        this._ih = this._inputImage.height;

        this._canvas.width = this._iw;
        this._canvas.height = this._ih;

        //draw to canvas
        this._context.drawImage(this._inputImage, 0, 0);
        console.log(this._iw, this._ih);
        console.log("Image Loaded");
    }

    glitchImage(glitchAmount, brightnessAmount, callback) {
        if (!this._imageLoaded || this._glitching) return;
        this._glitching = true;

        this._glitchAmount = glitchAmount;
        this._brightnessAmount = brightnessAmount;

        console.log("glitchiness = " + this._glitchAmount);
        console.log("brightness = " + this._brightnessAmount);

        // document.querySelector('.loading').innerHTML = 'Glitching...';
        //break into 2 functions to allow status text to update
        this._canvas.style.webkitFilter = "blur(8px)";
        setTimeout(this.glitchImage2.bind(this, callback), 300);
    }

    glitchImage2(callback) {
        var start = new Date().getTime();

        // document.querySelector('.loading').innerHTML = 'Glitching...';

        //draw input image to output canvas
        console.log(this._iw);
        const outputBMD = new BitmapData(this._iw, this._ih);
        outputBMD.draw(this._inputImage);

        //init inputBMD
        const inputBMD = new BitmapData(this._iw, this._ih);
        inputBMD.draw(this._inputImage);
        var maxOffset = this._glitchAmount * this._glitchAmount / 100 * this._iw;

        //randomly offset slices horizontally
        for (let i = 0; i < this._glitchAmount * 2; i++) {

            var startY = Glitch.getRandInt(0, this._ih);
            var chunkHeight = Glitch.getRandInt(1, this._ih / 4);
            chunkHeight = Math.min(chunkHeight, this._ih - startY);
            var offset = Glitch.getRandInt(-maxOffset, maxOffset);

            if (offset == 0)
                continue;

            if (offset < 0) {
                //shift left
                outputBMD.copyPixels(inputBMD, new Rectangle(-offset, startY, this._iw + offset, chunkHeight), new Point(0, startY));
                //wrap around
                outputBMD.copyPixels(inputBMD, new Rectangle(0, startY, -offset, chunkHeight), new Point(this._iw + offset, startY));

            } else {
                //shift right
                outputBMD.copyPixels(inputBMD, new Rectangle(0, startY, this._iw, chunkHeight), new Point(offset, startY));
                //wrap around
                outputBMD.copyPixels(inputBMD, new Rectangle(this._iw - offset, startY, offset, chunkHeight), new Point(0, startY));
            }
        }

        //do color offset
        var channel = Glitch.getRandChannel();
        outputBMD.copyChannel(inputBMD, new Rectangle(0, 0, this._iw, this._ih), new Point(Glitch.getRandInt(-this._glitchAmount * 2, this._glitchAmount * 2), Glitch.getRandInt(-this._glitchAmount * 2, this._glitchAmount * 2)), channel, channel);

        //make brighter
        //convert 1 - 10 -> 1 -> 2
        var b = 1 + this._brightnessAmount / 10 * 1;
        var brightMat = [
            b, 0, 0, 0, 0,
            0, b, 0, 0, 0,
            0, 0, b, 0, 0,
            0, 0, 0, 1, 0
        ];

        const zeroPoint = new Point();
        const brightnessFilter = new ColorMatrixFilter(brightMat);
        outputBMD.applyFilter(outputBMD, outputBMD.rect, zeroPoint, brightnessFilter);

        if (this._useScanLines) {
            //Add Scan Lines
            var line = new Rectangle(0, 0, this._iw, 1);
            for (let i = 0; i < this._ih; i++) {
                if (i % 3 == 0) {
                    line.y = i;
                    outputBMD.fillRect(line, 0);
                }
            }
        }

        //draw to canvas
        this._canvas.style.webkitFilter = "blur(0px)";
        this._context.putImageData(outputBMD.data, 0, 0);

        //log time
        var end = new Date().getTime();
        console.log("Completed in  " + Math.round((end - start) / 1000) + " seconds");
        this._glitching = false;
        callback();
        // document.querySelector('.loading').innerHTML = '';
    }

    saveImage() {
        // window.open(this._canvas.toDataURL());
        return this._canvas.toDataURL();
    }
};

module.exports = Glitch;