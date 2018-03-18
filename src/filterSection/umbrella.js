import React from 'react';
import PropTypes from 'prop-types';
import { Header, Segment } from 'semantic-ui-react';
import Bucket from './Bucket'

const Umbrella = props => {
    let u_selected = false;
    for (let k in props.buckets) {
        if (props.buckets[k]["selected"]) u_selected = true;
    }
    return (
        <div>
            <Header attached="top" color={props.color} inverted={u_selected}
                style={{ backgroundColor: props.bgcolor }}>
                {props.name}
            </Header>
            {Object.keys(props.buckets).map((b, i) => {
                return (
                    <Bucket
                        text={b}
                        selected={props.buckets[b]["selected"]}
                        disabled={props.buckets[b]["disabled"]}
                        color={props.color}
                        key={i}
                    />
                )
            })}

        </div>
    );
};

Umbrella.propTypes = {

};

export default Umbrella;