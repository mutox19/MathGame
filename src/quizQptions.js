import React, {Component} from 'react';

class QuizOptions extends Component{
    constructor(props){
        super(props);
        this.state = {};
        this.CallParentCheckOptions = this.CallParentCheckOptions.bind(this);
    }
    CallParentCheckOptions(){
        this.props.checkResults();
    }
    render()
    {
        return(
            <div className="fields animated rubberBand" onClick={this.CallParentCheckOptions}>
                <div className="field-block">
                    {this.props.options}
                </div>
                </div>
        );
    }
}


export default QuizOptions;