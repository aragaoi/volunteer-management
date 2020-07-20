import PropTypes from "prop-types";

export const AddressType = PropTypes.shape({
  street: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,
});

export const UserType = PropTypes.shape({
  name: PropTypes.string,
  avatarUrl: PropTypes.string
});

export const EvaluationType = PropTypes.shape({
  user: UserType,
  comment: PropTypes.string,
  value: PropTypes.number
});

export const RatingType = PropTypes.shape({
  average: PropTypes.number,
  evaluations: PropTypes.arrayOf(EvaluationType)
});
