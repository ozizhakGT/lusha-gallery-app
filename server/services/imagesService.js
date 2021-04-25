const uuid = require('uuid').v4;
const imagesApi = require('../api/imagesApi');

class ImagesService {
  constructor(images=[]) {
    this.images = images;
  }

  #setImages(imagesArr) {
    this.images = [
      ...this.images,
      ...(imagesArr.map(item => ({...item, id: uuid()})))
    ]
  }

  async getImages(page, limit) {
    const validLimitPageSize = Math.min(limit, 20)
    const arrLength = page * validLimitPageSize;
    const startIndex = arrLength - validLimitPageSize;

    if (arrLength > this.images.length) {
      const imagesArr = (await imagesApi.get('small'))?.data?.slice(this.images.length, arrLength);

      this.#setImages(imagesArr);
    }

    const images = this.images.slice(startIndex, arrLength);

    return {
      images,
      page,
      nextPage: images.length ? page+1 : null,
      count: images.length
    };
  }

  increaseImageLikes(imageId, likesCount = 1) {
    const image = this.images.find(({id}) => imageId === id);

    if (!image) throw new Error("No Image Found");

    image.likes += likesCount;

    return image;
  }
}

class ImageSingleton {

  constructor() {
    if (!ImageSingleton.instance) {
      ImageSingleton.instance = new ImagesService();
    }
  }

  getInstance() {
    return ImageSingleton.instance;
  }

}

module.exports = ImageSingleton;