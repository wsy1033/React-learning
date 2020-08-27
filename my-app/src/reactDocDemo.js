import React from 'react';

/** 函数组件，将方法作为参数传递，写法：
 *    1、不传参：
 *      方法定义使用普通/箭头函数 + 参数写法使用普通/箭头函数：任意组合皆可成功
 *    2、传参：
 *      方法定义使用普通/箭头函数 + 参数写法使用箭头函数：任意组合皆可成功
 *      方法定义普通/箭头函数+参数写法使用普通写法：不报错，无法触发事件，每次渲染自动触发事件
 *    3、总结：
 *      a、方法当参数的时候，须使用.bind()
 *      b、不传参随意；传参时方法参数的写法要用箭头函数；所以为了不使用bind，尽量使用箭头函数
 */
function Square(props){
    return (
      <button className="square" 
        onClick={props.onClick} 
        >
        {props.value}
      </button>
    );
}

/**
 * 类组件写法：
 *  不传参：
 *    1、方法定义使用普通/箭头函数 + 参数写法使用箭头函数
 *  传参：
 *    1、方法定义使用普通/箭头函数 + 参数写法使用箭头函数
 *    2、方法定义普通/箭头函数+参数写法使用普通写法：不报错，无法触发事件，每次渲染自动触发事件
 */
class Board extends React.Component {
  test(val){
    console.log("我触发成功啦~~~！！！♪(^∇^*)",val)
  }
  renderSquare(i) {
    // console.log(this.props.squares[i])
    return <Square 
      value={this.props.squares[i]} 
      onClick={ () => this.props.onClick(i)} 
      onLalala={this.test}
    />;
  }
  render() {
    const status = 'Next player: X';
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

export default class Game extends React.Component {
  constructor(props){
    super(props);
    this.state={
      history:[
        {
          squares: Array(9).fill(null),
        }
      ],
      isX:true,
      stepIdx:0
    }
  }

  handleClick(i) {
    const stepIdx = this.state.stepIdx;
    const history = this.state.history.slice(0,stepIdx+1);
    const current = history[history.length-1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.isX ? 'X' : 'O';
    this.setState({
      history:[...history,{squares}],
      isX: !this.state.isX,
      stepIdx:stepIdx+1
    });
  }

  jump(idx){
    // const history = this.state.history.slice(0,idx);
    this.setState({
      stepIdx:idx
    })
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepIdx];
    const winner = calculateWinner(current.squares);
    let status = winner ? ('Winner: ' + winner) : ('Next player: ' + (this.state.xIsNext ? 'X' : 'O'))

    const moves = history.map((item,idx) => {
      const cont = idx?
        'Go to :' + idx :
        'Go to : start'
      return (
        <button key={idx} onClick={() => this.jump(idx)}>
          {cont}
        </button>
      )
    })

    return (
      <div className="game">
        <div className="game-board">
          <Board 
          onClick={i => this.handleClick(i)} 
          squares={current.squares}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
