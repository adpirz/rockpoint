import React, { Component } from 'react';
import PropTypes from 'prop-types';

import App from './App';
import Data from './data/dummy';
import Cleaned, { Constants } from './data/cleaned';

class AppContainer extends Component {

    constructor() {
        super()
        this.state = {
            selected: [],
            value: '',
            valid: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.options = this.options.bind(this);
        // this.value = this.value.bind(this);
        this.disabledBuckets = this.disabledBuckets.bind(this);

    }

    handleChange(selected) {
        this.setState({ selected, value: selected.map((o) => o.value).join(',') });
    }

    options() {
        const selected = this.state.selected
        let group_selected = false;
        let category_selected = false;
        let options = Cleaned.Options

        if (selected.length === 0) return Cleaned.Options;
        for (let i = 0; i < selected.length; i++) {
            const selection = selected[i];

            if (selection.umbrella === "groups") {
                group_selected = true;
                options = options.map((o) => {
                    if (o.umbrella === 'groups' && o.value !== selection.value) {
                        return { ...o, style: { display: 'none' } }
                    }
                    return o;
                })
            }

            if (selection.umbrella === "category") {
                category_selected = true;
                options = options.map((o) => {
                    if (o.umbrella === 'category' && o.value !== selection.value) {
                        return { ...o, style: { display: 'none' } }
                    }
                    return o;
                })
            }
        }

        return options
    }

    disabledBuckets() {
        /*
            Returns an array of buckets ({umbrella, bucket}) to disable; 
        */
        const selected = this.state.selected
        let group_selected = undefined;
        let category_selected = undefined;
        let threshold_filter = undefined;
        let time_filter = undefined;
        
        let out = [].concat(Cleaned.disabledBuckets);

        for (let i = 0; i < selected.length; i++) {
            const selection = selected[i];

            if (selection.umbrella === "groups") {                
                group_selected = selection.bucket;
            }

            if (selection.umbrella === "category") {
                category_selected = selection.bucket;
            }
        }

        for (let i = 0; i < Cleaned.allBuckets.length; i++) {
            const bucket = Cleaned.allBuckets[i];
            const umbrella = bucket.umbrella
            if (group_selected !== undefined && umbrella === "groups" && group_selected !== bucket) {
                out.push(bucket) 
            }

            if (category_selected !== undefined && umbrella === "category" && category_selected !== bucket) {
                out.push(bucket)
            }

            if (category_selected !== undefined) {
                //TODO: Help out
            }

        }

        return out
    }

    render() {
        return (
            <App
                options={this.options()}
                umbrellas={Cleaned.umbrellas}
                value={this.state.value}
                validSearch={this.state.valid}
                handleChange={this.handleChange}
                disabledBuckets={this.disabledBuckets()}
                selected={this.state.selected}
            />
        );
    }
}

AppContainer.propTypes = {
};

export default AppContainer;

/*
Disabled buckets: [{umbrella, bucket}] 
*/