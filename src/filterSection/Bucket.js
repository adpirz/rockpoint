import React from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react'

const Bucket = props => {
    return (
        <Segment attached inverted={props.selected}
            tertiary={props.disabled}
            color={props.selected ? props.color : undefined}>
            {props.text}
        </Segment>
    );
};

Bucket.propTypes = {

};

export default Bucket;