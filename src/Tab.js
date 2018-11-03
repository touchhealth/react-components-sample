import './Tab.css';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from './Paper';

/**
 * Tab - é uma componente de layout de abas, e extende as propriedades de Paper
 */
export default class Tab extends Component {
    static propTypes = {
        /**
         * titulo das abas
         */
        titles: PropTypes.arrayOf(PropTypes.string),
        /**
         * Nós das abas filhas
         */
        content: PropTypes.arrayOf(PropTypes.node),
    }

    constructor(props) {
        super(props);
        this.state = {
            tabSelectedIdx: 0
        }
    }

    selectTab(idx) {
        this.setState({ tabSelectedIdx: idx });
    } 

    render() {
        const {
            titles,
            content,
            ...otherProps
        } = this.props;

        const {
            tabSelectedIdx
        } = this.state;

        let titlesBar = (
            <div className="titleBarContainer">
                {titles.map((title, idx) => <div className="titleBarItem" onClick={this.selectTab.bind(this, idx)} >{title}</div>)}
            </div>
        )

        return (
            <Paper className="Tab" {...otherProps}>
                {titlesBar}
                <hr/>
                <div key={titles[tabSelectedIdx]} className="contentContainer">
                    {content[tabSelectedIdx]}
                </div>
            </Paper>
        );
    }
}