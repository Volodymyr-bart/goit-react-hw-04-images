import { useState, useEffect } from 'react';

import { Container } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { ModalWindow } from './Modal/Modal';
import axios from 'axios';

const API_KEY = `29486928-40983179e54322116410ec482`;
const perPage = 12;

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [largeImage, setLargeImage] = useState({
    url: null,
    tags: null,
  });
  const [totalPage, setTotalPage] = useState('');

  useEffect(() => {
    if (query === '') {
      return;
    }
    async function findImage() {
      try {
        console.log(query);
        setIsLoading(true);
        const response = await axios.get(
          `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${page}`
        );
        console.log(response);

        const { hits, totalHits } = response.data;
        const pages = Math.ceil(totalHits / this.state.perPage);
        setImages(prevState => [...prevState, ...hits]);
        console.log(images);
        setTotalPage(pages);
      } catch (error) {
        return alert(`Sorry, please try again`);
      } finally {
        setIsLoading(false);
        console.log(images);
      }
    }

    findImage();
  }, [query, page]);

  const onSubmit = searchData => {
    if (query !== searchData) {
      setQuery(searchData);
      setPage(1);
      setImages([]);
    }
  };
  const onImageClick = (url, tags) => {
    setLargeImage({ largeImage: { url, tags } });
  };
  const onHandleClose = () => {
    setLargeImage({ largeImage: { url: null, tags: null } });
  };
  const onChangePage = () => {
    setPage(prevState => prevState + 1);
  };
  return (
    <Container>
      <Searchbar onSubmit={onSubmit} />
      {isLoading && <Loader />}
      {images.length > 1 && (
        <ImageGallery images={images} onImageClick={onImageClick} />
      )}
      {images.length > 1 && totalPage > page && (
        <Button onChangePage={onChangePage} />
      )}
      {largeImage.url && (
        <ModalWindow
          onHandleClose={onHandleClose}
          url={largeImage.url}
          tags={largeImage.tags}
        />
      )}
    </Container>
  );
};

// export class App extends Component {
//   state = {
//     query: '',
//     page: 1,
//     images: [],
//     isLoading: false,
//     largeImage: {
//       url: null,
//       tags: null,
//     },
//     perPage: 12,
//     totalPage: null,
//   };

//   async componentDidUpdate(prevProps, prevState) {
//     const { query, perPage, page } = this.state;
//     if (prevState.query !== query) {
//       this.setState({ images: [] });
//       try {
//         this.setState({ isLoading: true });
//         const response = await axios.get(
//           `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=1`
//         );
//         const { hits, totalHits } = response.data;
//         const pages = Math.ceil(totalHits / this.state.perPage);
//         this.setState({ images: hits, totalPage: pages });
//       } catch (error) {
//         console.log(error);
//       } finally {
//         this.setState({ isLoading: false });
//       }
//       return;
//     }
//     if (prevState.query === query && prevState.page !== page) {
//       try {
//         this.setState({ isLoading: true });
//         const response = await axios.get(
//           `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${page}`
//         );
//         const { hits } = response.data;

//         this.setState(prevState => ({
//           images: [...prevState.images, ...hits],
//         }));
//       } catch (error) {
//         console.log(error);
//       } finally {
//         this.setState({ isLoading: false });
//       }
//     }
//   }
//   onSubmit = query => {
//     this.setState({ query });
//     this.setState({ page: 1 });
//   };
//   onImageClick = (url, tags) => {
//     this.setState({ largeImage: { url, tags } });
//   };
//   onHandleClose = () => {
//     this.setState({ largeImage: { url: null, tags: null } });
//   };
//   onChangePage = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   };

//   render() {
//     const { isLoading, images, totalPage, page, largeImage } = this.state;
//     return (
//       <Container>
//         <Searchbar onSubmit={this.onSubmit} />
//         {isLoading && <Loader />}
//         {images.length > 1 && (
//           <ImageGallery images={images} onImageClick={this.onImageClick} />
//         )}
//         {images.length > 1 && totalPage > page && (
//           <Button onChangePage={this.onChangePage} />
//         )}
//         {largeImage.url && (
//           <ModalWindow
//             onHandleClose={this.onHandleClose}
//             url={largeImage.url}
//             tags={largeImage.tags}
//           />
//         )}
//       </Container>
//     );
//   }
// }
