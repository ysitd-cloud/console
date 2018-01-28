import PropTypes from 'prop-types';

const propTypes = PropTypes.shape({
  loading: PropTypes.bool.isRequired,
  error: PropTypes.any,
  refetch: PropTypes.func.isRequired,
  fetchMore: PropTypes.func.isRequired,
  updateQuery: PropTypes.func.isRequired,
}).isRequired;

export default propTypes;
