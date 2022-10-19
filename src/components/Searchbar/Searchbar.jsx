// import { Component } from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Header,
  SearchButton,
  SearchButtonLabel,
  SearchInput,
} from './Searchbar.styled';
export const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = event => {
    setSearchQuery(event.currentTarget.value);
  };
  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(searchQuery.trim());
    searchImputReset();
  };

  const searchImputReset = () => {
    setSearchQuery('');
  };

  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <SearchButton type="submit">
          <SearchButtonLabel>Search</SearchButtonLabel>
        </SearchButton>

        <SearchInput
          onChange={handleChange}
          name="query"
          value={searchQuery}
          type="text"
          autocomplete="off"
          placeholder="Search images and photos"
        />
      </Form>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

// export class Searchbar extends Component {
//   state = {
//     query: '',
//   };
//   handleChange = event => {
//     this.setState({ query: event.currentTarget.value });
//   };
//   handleSubmit = event => {
//     event.preventDefault();

//     this.props.onSubmit(this.state.query);
//     this.searchImputReset();
//   };

//   searchImputReset = () => {
//     this.setState({
//       query: '',
//     });
//   };
//   render() {
//     return (
//       <Header>
//         <Form onSubmit={this.handleSubmit}>
//           <SearchButton type="submit">
//             <SearchButtonLabel>Search</SearchButtonLabel>
//           </SearchButton>

//           <SearchInput
//             onChange={this.handleChange}
//             name="query"
//             value={this.state.query}
//             type="text"
//             autocomplete="off"
//             placeholder="Search images and photos"
//           />
//         </Form>
//       </Header>
//     );
//   }
// }
