import {useState, useEffect, useCallback} from "react";
import {getImages} from "../api/imageAPI";
import {NO_IMAGES, SERVER_ERROR} from "../const/messages";
import Notification from "../const/notifications";

const errorMessage = Notification("error");
const infoMessage  = Notification("info");
const initialState = {
  gallery: [],
  page: 1,
  count: 0,
}

export default function useGallery() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(initialState);

  const fetchImages = useCallback(async () => {
    await getImages(data.page)
      .then(res => {
        if (res.status === 204 || res.status >= 400) {
          switch (res.status) {
            case 204:
              infoMessage(NO_IMAGES);
              setData({...data, page: null})
              return;
            default:
              errorMessage(SERVER_ERROR);
          }
        }

        const { images, nextPage, ...rest } = res.data;

        setData({
          ...rest,
          gallery: [...data.gallery, ...images],
          page: nextPage,
        });
      })
      .catch(err => {
        errorMessage(err.message);
      })
      .finally(() => setLoading(false));
  }, [data]);

  useEffect(() => fetchImages(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

  useEffect(() => {
    if (data.message) {
      errorMessage(data.message);
    }
  }, [data.message])

  return {
    loading,
    ...data,
    fetchImages
  }
}