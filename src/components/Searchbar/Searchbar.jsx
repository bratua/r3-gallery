import { Field, Form, Formik } from 'formik';
import { ReactComponent as SearchIcon } from '../icons/search.svg';

export const SearchBar = ({ onSubmit }) => {
  const initialValues = { searchQuery: '' };

  const handleSubmit = ({ searchQuery }, actions) => {
    setTimeout(() => {
      onSubmit(searchQuery);
      actions.setSubmitting(false);
    }, 3000);
    // onSubmit(searchQuery);
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
              placeholder="Search images and photos"
            />
          </Form>
        </div>
      )}
    </Formik>
  );
};
