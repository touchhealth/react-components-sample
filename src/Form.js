import React, { Component } from 'react';

export const FormContext = React.createContext({});

/**
 * O Formulario gerencia o estado geral e propaga um contexto do tipo FormContext:
 * ```javascript
 * {
 *   handleInputChange, //handleInputChange(event:Event)
 *   getFormState       // getFormState()
 * } 
 * ```
 * Use o contexto como no exemplo abaixo:
 * ```javascript
 * class FormItemComponent extends Component {
 *   static contextType = FormContext;
 *   render() {
 *     const {
 *       handleInputChange,
 *       getFormState
 *     } = this.context
 *     ...
 *   }
 * }
 * ```
 */
export default class Form extends Component {

    /**
     * Metodo para tratar os eventos de onChange de inputs filhos. Salva os valores no estado do form de 
     * acordo com o name do input.
     * @param event o evento da mudança
     */
    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
          [name]: value
        });
    }

    /**
     * Devolve uma copia do estado do form, esse método está disponível no contexto
     */
    getFormState = () => {
        return {...this.state};
    }

    render() {
        const { children, ...otherProps } = this.props;

        let formValue = {
            handleInputChange: this.handleInputChange,
            getFormState: this.getFormState
        } 

        return (
            <FormContext.Provider value={formValue}>
                <div {...otherProps}>
                    {children}
                </div>
            </FormContext.Provider>
        );
    }
}