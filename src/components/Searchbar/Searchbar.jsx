import { Field, Form, Formik } from 'formik';
import { toast } from 'react-toastify';

import { ReactComponent as SearchIcon } from '../icons/search.svg';

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
    // setTimeout(() => {
    //   onSubmit(searchQuery.trim());
    //   actions.setSubmitting(false);
    // }, 1000);
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
