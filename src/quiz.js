import React, { Component } from "react";
import QuizOptions from './quizQptions';
import classnames from "classnames";

class Quiz extends Component{
    constructor(props){
        super(props);

        let riddle = this.PlayGame();
        let correct = false
        let gameOver = false;
        this.state = {riddle , correct, gameOver};
        this.renderOptions = this.renderOptions.bind(this);
        this.CheckResults = this.CheckResults.bind(this);
        this.PlayNewGame = this.PlayNewGame.bind(this);
    }
    RandomNumber(min,max)
    {
        return Math.floor(Math.random() * (min-max + 1)) + min;
    }
    GenerateRandomOptions(sum)
    {
        let result = sum;
        let resultsArray = [];
        let randomNumberArray = [];
        while(randomNumberArray.length <= 3)
        {
            let randomNumber = this.RandomNumber(1,19);
            if(randomNumberArray.indexOf(randomNumber) > -1) continue;
            randomNumberArray.push(randomNumber);
        }
        //console.log(randomNumberArray);
        for(let i = 0; i < 3; i++)
        {
            let addSubtract = this.RandomNumber(0,1);
            //let result = sum;
            if(addSubtract === 1)
            {
                result += randomNumberArray[i];
                resultsArray.push(result);
                //add the number to the result
            }
            else
            {
                result -= randomNumberArray[i];
                resultsArray.push(result);
                //subtract the number from the result
            }
        }
      
        
        
        return resultsArray;
    }
    PlayGame()
    {
        //console.log(this.RandomNumber(20,48), this.RandomNumber(20,50));
        let field1 = this.RandomNumber(20,48);
        let field2 = this.RandomNumber(20,48);
        let result = field1 + field2;
        let resultsArray = this.GenerateRandomOptions(result);
        resultsArray.push(result);
        resultsArray.sort(function(a,b)
        {
            return 0.5 - Math.random();
        });
        console.log(resultsArray);
        let riddle = {
            resultsArray: resultsArray,
                field: field1,
                field2: field2,
                answer: result
        }

        console.log(riddle);
        if(this.state && this.state.gameOver)
        {
            this.setState({riddle: riddle});
        }else{
            return riddle;
        }
        
    }
    CheckResults(option)
    {
        console.log("checkResults called" + option);
        if(this.state.riddle.answer === option)
        {
            console.log("Correct Answer!!");
            this.setState({
                correct:true, 
                gameOver:true
            });
            
        }else{
            console.log("Sorry you are wrong the answer is: " + this.state.riddle.answer);
            this.setState({
                correct:false, 
                gameOver:true
            });
        }
    }
    renderOptions(){
        return(
            <div className="options">
                {this.state.riddle.resultsArray.map((option, i) => 
                    <QuizOptions options={option} key={i} checkResults= { () => this.CheckResults(option)}/>
                    )
                } 
            </div>
        );
    }
    renderMessage()
    {
        if(this.state.correct)
        {
            return <h3>Good Job!</h3>
        }
        else{
            return <h3>Ohh oh! Answer wrong Play Again!</h3>
        }
    }
    PlayNewGame()
    {
        this.setState({
            correct:false, 
            gameOver:false
        });
        this.PlayGame();
    }
    render(){
        return(
            <div className="quiz">
                <div className="quiz-content">
                    <p className="question">What is the sum of <span className="text-info">{this.state.riddle.field} </span> 
                    and <span className="text-info">{this.state.riddle.field2}</span>
                    </p>
                    {this.renderOptions()}
                    
                </div>
                
                <div className={classnames("after",{'hide': !this.state.gameOver},{'wrong animated zoomOutRight': !this.state.correct}, {'correct animated zoomInDown': this.state.correct})}>
                    {this.renderMessage()}
                </div>
                <div className="play-again!!">
                    <a className="button" onClick={this.PlayNewGame}>Play Again!!</a>
                </div>
            </div>
        );
    }
}


export default Quiz;