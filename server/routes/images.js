const router = require('express').Router();
const ImageServiceInstance = require('../services/imagesService');
const ImagesService = new ImageServiceInstance().getInstance();

router.get('/', async ({query}, res) => {
  try {
    const {page = 1, limit = 15} = query;
    const response = await ImagesService.getImages(parseInt(page), limit);

    if (!response.images.length) res.status(204).send();

    res.send(response);
  } catch (err) {
    res.status(500).send();
  }
});

router.patch('/like', ({body}, res) => {
  try {
    const {id, count} = body;

    const image = ImagesService.increaseImageLikes(id, count);

    if (!image) res.status(400).send();

    res.send(image);
  } catch (err) {
    res.status(500).send();
  }
});

module.exports = router;