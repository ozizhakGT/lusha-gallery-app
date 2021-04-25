const imagesAPI = require('../api/imagesApi');
const ImageServiceInstance = require('./imagesService');
const ImagesService = new ImageServiceInstance().getInstance();

const createImage = (overrides = {}) => ({
  description: "Floor lamp near a wall",
  likes: 0,
  url: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyNDU2M30",
  ...overrides,
});

afterEach(() => {
  jest.restoreAllMocks();
  ImagesService.images = [];
});

describe('getImages', () => {
  test('Retrieves images from the images api and returns the data', async () => {
    const mockImages = Array.from({length: 10}).fill(createImage());

    const imagesApiSpy = jest.spyOn(imagesAPI, 'get').mockResolvedValueOnce({ data: mockImages });

    const page = 1;
    const limit = 10;

    const images = (await ImagesService.getImages(page, limit)).images;

    const expectedImages = mockImages.map(image => ({...image, id: expect.any(String)}));

    expect(images).toEqual(expectedImages);
    expect(imagesApiSpy).toHaveBeenCalledWith('small');
  });

  test('Returns images from cache when requested data already exists', async () => {
    const imagesApiSpy = jest.spyOn(imagesAPI, 'get');

    const page = 1;
    const limit = 10;

    ImagesService.images = Array.from({length: page * limit}).fill(createImage());

    const images = (await ImagesService.getImages(page, limit)).images;

    const expectedImages = [...images];

    expect(images).toEqual(expectedImages)
    expect(imagesApiSpy).not.toHaveBeenCalled();
  });
})

describe('increaseImageLike', () => {
  test('Increases image likes', () => {
    const imageId = '1234';
    ImagesService.images = [createImage({ id: imageId })];
    const image = ImagesService.increaseImageLikes(imageId, 10);

    expect(ImagesService.images[0].likes).toBe(10);
  });

  test('Increases image likes by 1 if likesCount was not given', () => {
    const imageId = '1234';
    ImagesService.images = [createImage({ id: imageId })];
    const image = ImagesService.increaseImageLikes(imageId);

    expect(ImagesService.images[0].likes).toBe(1);
  });

  test('Throws an error if the image to like was not found', () => {
    const imageId = '1234';
    const image = createImage({ id: imageId });
    ImagesService.images = [image];
    const nonExistingImageId = '111';

    expect(() => ImagesService.increaseImageLikes(nonExistingImageId)).toThrow('No Image Found');
  });
});