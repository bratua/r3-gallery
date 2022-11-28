import PropTypes from 'prop-types';
import { Field, Form, Formik } from 'formik';
import { ReactComponent as SearchIcon } from '../icons/search.svg';
import { toast } from 'react-toastify';

export const SearchBar = ({ onSubmit }) => {
  const initialValues = { searchQuery: '' };
  let placeHolder = 'Search images and photos';

  const handleSubmit = ({ searchQuery }, actions) => {
    if (searchQuery.trim() === '') {
      placeHolder = 'Enter your search query!';
      toast.warn('Enter your search query!', {
        position: 'top-right',
      });
      actions.setSubmitting(false);
      return;
    }
    onSubmit(searchQuery.trim());
    actions.setSubmitting(false);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <div className="Searchbar">
          <Form className="SearchForm">
            <button
              disabled={isSubmitting}
              type="submit"
              className="SearchForm-button"
            >
              <span className="SearchForm-button-label">{<SearchIcon />}</span>
            </button>

            <Field
              className="SearchForm-input"
              name="searchQuery"
              type="text"
              autoComplete="off"
              autoFocus
              placeholder={placeHolder}
            />
          </Form>
        </div>
      )}
    </Formik>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func,
};
