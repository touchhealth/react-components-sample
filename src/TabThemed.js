import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { theming } from './Theme';
import injectSheet from 'react-jss';
import color from 'color';

import Paper from './Paper';

const styles = theme => ({

    titleBarContainer: {
        position: 'relative',
        borderBottom: [1, 'solid', color('white').darken(0.15).hex()],
        padding: [5, 10, 0, 10],
        '& + hr': {
            marginTop: 0
        }
    },

    titleBarItem: {
        position: 'relative',
        top: 1,
        display: 'inline-block',
        padding: 10,
        borderRadius: [8, 8, 0, 0],
        borderTop: [1, 'solid', color('white').darken(0.15).hex()],
        borderLeft: [1, 'solid', color('white').darken(0.15).hex()],
        borderRight: [1, 'solid', color('white').darken(0.15).hex()],
        backgroundColor: color('white').darken(0.05).hex(),
        '&:hover': {
            backgroundColor: theme.primaryColor,
            color: color(theme.primaryColor).isDark() ? 'white' : 'black'
        }
    },

    titleBarItemSelected: {
        backgroundColor: 'white',
    },

    contentContainer: {
        padding: [20, 10, 10, 10]
    }

})

/**
 * TabThemed - é uma componente de layout de abas com estilos e Tema
 */
@injectSheet(styles, { theming })
export default class TabThemed extends Component {
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
            classes,
            ...otherProps
        } = this.props;

        const {
            tabSelectedIdx
        } = this.state;

        let titlesBar = (
            <div className={classes.titleBarContainer}>
                {titles.map((title, idx) => {
                    return <div className={(idx == tabSelectedIdx ? classes.titleBarItemSelected : "") + " " + classes.titleBarItem} 
                        onClick={this.selectTab.bind(this, idx)} >{title}</div>
                })}
            </div>
        )

        return (
            <Paper {...otherProps}>
                {titlesBar}
                <div key={titles[tabSelectedIdx]} className={classes.contentContainer}>
                    {content[tabSelectedIdx]}
                </div>
            </Paper>
        );
    }
}