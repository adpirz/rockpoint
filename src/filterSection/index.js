import React from 'react';
import PropTypes from 'prop-types';
import { Container, Segment, List, Grid } from 'semantic-ui-react';
import Umbrella from './umbrella'

const FilterSection = props => {
    
    const umbrellas = props.umbrellas;
    const selected = props.selected;
    const disabledBuckets = props.disabledBuckets;
    const grid_width = umbrellas.length

    // {umbrella: { bucket: {disabled, selected}}}
    const umbrellaHash = umbrellas.reduce((a, c) => {
        const key = c["name"];

        a[key] = c["buckets"].reduce((b, d) => {
            b[d] = { disabled: false, selected: false }
            return b;
        }, {})
        return a;
    }, {})

    const selectedBuckets = {}
    if(selected.length > 0) selected.forEach((s) => {
        umbrellaHash[s.umbrella][s.bucket]["selected"] = true;
        selectedBuckets[s.bucket] = true; 
    })
    if(disabledBuckets.length > 0) disabledBuckets.forEach((d) => {
        umbrellaHash[d.umbrella][d.bucket]["disabled"] = true;
    })

    return (
        <Segment>
            <Grid columns={grid_width} divided>
                <Grid.Row>
                    {umbrellas.map((u, i) => {
                        return (
                            <Grid.Column key={i}>
                                <Umbrella
                                    name={u.name}
                                    buckets={umbrellaHash[u.name]}
                                    color={u.color}
                                    bgcolor={u.bgcolor}
                                />
                            </Grid.Column>
                        )
                    })}
                </Grid.Row>
            </Grid>
        </Segment>
    );
};

FilterSection.propTypes = {

};

export default FilterSection;