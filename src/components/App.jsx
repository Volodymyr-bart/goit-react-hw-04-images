import { Component } from 'react';
import { Container } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { ModalWindow } from './Modal/Modal';
import axios from 'axios';

const API_KEY = `29486928-40983179e54322116410ec482`;

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    isLoading: false,
    largeImage: {
      url: null,
      tags: null,
    },
    perPage: 12,
    totalPage: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query, perPage, page } = this.state;
    if (prevState.query !== query) {
      this.setState({ images: [] });
      try {
        this.setState({ isLoading: true });
        const response = await axios.get(
          `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=1`
        );
        const { hits, totalHits } = response.data;
        const pages = Math.ceil(totalHits / this.state.perPage);
        this.setState({ images: hits, totalPage: pages });
      } catch (error) {
        console.log(error);
      } finally {
        this.setState({ isLoading: false });
      }
      return;
    }
    if (prevState.query === query && prevState.page !== page) {
      try {
        this.setState({ isLoading: true });
        const response = await axios.get(
          `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${page}`
        );
        const { hits } = response.data;

        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
        }));
      } catch (error) {
        console.log(error);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }
  onSubmit = query => {
    this.setState({ query });
    this.setState({ page: 1 });
  };
  onImageClick = (url, tags) => {
    this.setState({ largeImage: { url, tags } });
  };
  onHandleClose = () => {
    this.setState({ largeImage: { url: null, tags: null } });
  };
  onChangePage = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { isLoading, images, totalPage, page, largeImage } = this.state;
    return (
      <Container>
        <Searchbar onSubmit={this.onSubmit} />
        {isLoading && <Loader />}
        {images.length > 1 && (
          <ImageGallery images={images} onImageClick={this.onImageClick} />
        )}
        {images.length > 1 && totalPage > page && (
          <Button onChangePage={this.onChangePage} />
        )}
        {largeImage.url && (
          <ModalWindow
            onHandleClose={this.onHandleClose}
            url={largeImage.url}
            tags={largeImage.tags}
          />
        )}
      </Container>
    );
  }
}
