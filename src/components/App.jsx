import { useState, useEffect, useCallback } from 'react';
import { SpinnerCircular } from 'spinners-react';
import Notiflix from 'notiflix';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';

export const App = () => {
  const [search, setSearch] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const getPhotos = useCallback(
    async currentPage => {
      setLoading(true);

      const API_KEY = '31230805-8b64b0dc0b8f6a09d94599afb';
      const QUERY = search;

      const respone = await fetch(
        `https://pixabay.com/api/?q=${QUERY}&page=${currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );

      const images = await respone.json();

      setLoading(false);

      return [
        ...images.hits.map(item => {
          return {
            id: item.id,
            webformatURL: item.webformatURL,
            largeImageURL: item.largeImageURL,
          };
        }),
      ];
    },
    [search]
  );

  useEffect(() => {
    if (search === '') {
      return;
    }
    if (page === 1) {
      getPhotos(page)
        .then(data => {
          if (data.length === 0) {
            Notiflix.Notify.failure('Images not found...');
          }
          setImages([...data]);
        })
        .catch(err => console.log(err));
      return;
    }
    getPhotos(page)
      .then(data => {
        setImages(images => [...images, ...data]);
      })
      .catch(err => console.log(err));
  }, [search, getPhotos, page]);

  const loadMore = () => {
    setPage(page => page + 1);
  };

  const onSubmit = event => {
    event.preventDefault();
    let searchName = event.target.elements.searchInput.value;

    if (searchName !== search) {
      setPage(1);
      setImages([]);
    }

    setSearch(searchName);
  };

  return (
    <>
      <Searchbar submit={onSubmit} />
      {images && <ImageGallery images={images} />}
      {loading && <SpinnerCircular className="spiner" />}
      {images.length >= 12 && <Button loadMore={loadMore} />}
    </>
  );
};
