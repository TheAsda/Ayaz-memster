import { connect } from 'react-redux';
import { setall, getall } from './actions';

function mapStateToProps(state) {
  return {
    images: state.images,
    current: state.current,
  };
}

const mapDispatchToProps = {
  setall: setall,
  getall: getall,
};

export default component =>
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(component);
