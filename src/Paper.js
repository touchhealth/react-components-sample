import React from 'react';
import PropTypes from 'prop-types';
import { shadows } from './styles';

/**
 * Papel - é uma simples componente de layout, sem estado interno (stateless)
 */
function Paper(props) {
    const {
        children,
        elevation
    } = props;

    if (elevation < 0 || elevation > 25) {
        console.warn("Invalid Elevation: " + elevation + " reseting to " + Paper.defaultProps.elevation);
        elevation = Paper.defaultProps.elevation;
    }

    var style = {
        boxShadow: shadows[elevation],
        padding: 10
    }

    return (
        <div style={style}>            
            {children}
        </div>
    );
}

Paper.propTypes = {
    /**
     * o conteudo
     */
    children: PropTypes.node,
    /**
     * 
     * Aceita valores entre 0 and 24 inclusive.
     */
    elevation: PropTypes.number
};

Paper.defaultProps = {
    elevation: 2
 };

 export default Paper;