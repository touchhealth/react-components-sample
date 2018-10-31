import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from './Paper';

const styles = {
    titleBarContainer: {
        padding: 5
    },

    titleBarItem: {
        margin: '0px 10px',
        display: 'inline-block'
    },

    contentContainer: {
        padding: 5
    }
}

/**
 * Tab - é uma componente de layout, com estado interno
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
        content: PropTypes.arrayOf(PropTypes.node)
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
            content
        } = this.props;

        const {
            tabSelectedIdx
        } = this.state;

        let titlesBar = (
            <div style={styles.titleBarContainer}>
                {titles.map((title, idx) => <div style={styles.titleBarItem} onClick={this.selectTab.bind(this, idx)} >{title}</div>)}
            </div>
        )

        return (
            <Paper>
                {titlesBar}
                <hr/>
                <div key={titles[tabSelectedIdx]} style={styles.contentContainer}>
                    {content[tabSelectedIdx]}
                </div>
            </Paper>
        );
    }
}