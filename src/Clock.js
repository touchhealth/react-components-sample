import React, { Component } from 'react';
import Paper from './Paper';

/**
 * Clock - é uma componente, com estado interno e controle de ciclo de vida
 */
export default class Clock extends Component {

    timerHandle = null;

    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        }
    }

    /**
     * Recalcula a hora atual
     */
    tick = () => {
        this.setState({ date: new Date() });
    } 

    /**
     * Quando a componente tiver sido desenhada
     */
    componentDidMount() {
        this.timerHandle = setInterval(this.tick, 1000);
    }

    /**
     * Quando a componente sair da tela ela será desmontada
     */
    componentWillUnmount() {
        if (this.timerHandle != null) {
            clearInterval(this.timerHandle);
        }
    }

    render() {
        const { ...otherProps } = this.props;
        const { date } = this.state;
        return (
            <Paper {...otherProps}>{date.toLocaleTimeString()}</Paper>
        );
    }
}