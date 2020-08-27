import React, { Component } from 'react';   
import propTypes from 'prop-types';

class MilkTeaList extends Component {
    render() { 
        return ( 
        <li onClick={this.handleClick.bind(this)}>{this.props.type}-{this.props.content}</li>
        );
    }

    // 删除列表
    handleClick(){
        // 在这里向父组件传递参数
        this.props.delList(this.props.idx)
    }
}
MilkTeaList.propTypes={
    type:propTypes.string.isRequired,
    content:propTypes.string,
    idx:propTypes.number,
    delList:propTypes.func
}
MilkTeaList.defaultProps={
    type:'green'
}
 
export default MilkTeaList;

/**
 * 父向子传值:
 *  1.最简单的方法:
 *      a.在父文件的子组件标签上,通过属性传值
 *      b.然后再子组件里使用this.props.***来接收
 * 
 * 子向父传值:(首先,在react中,不允许子组件直接向父组件传值)
 *  1. 在子组件中调用父组件的方法
 *      a.在父文件的子组件标签上,注册一个属性,写进方法
 *      b.在子组件中,直接使用this.props.funcName(参数,参数,...)的方式来调用父组件中的方法
 *  
 */