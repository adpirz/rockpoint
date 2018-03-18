import React from 'react';
import Select from 'react-select';
import { Segment, Grid, Container } from 'semantic-ui-react';

const SearchBar = (props) => {

    return (
        <Segment>
            <Select
                name='select-main'
                value={props.value}
                onChange={props.onChange}
                options={props.options}
                multi
            />
        </Segment>

    );
};

export default SearchBar;